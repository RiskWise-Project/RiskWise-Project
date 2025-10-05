import { createContext, useContext, useEffect, useState } from "react";
import { db } from "../utils/firebase";
import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
  doc,
  updateDoc,
} from "firebase/firestore";
import { useAuth } from "./auth-context";

const UserNotificationContext = createContext();

export const useUserNotifications = () => useContext(UserNotificationContext);

export const UserNotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const { currentUser } = useAuth();

  useEffect(() => {
    if (!currentUser) return;

    // Fetch only reports created by the logged-in user
    const q = query(
      collection(db, "reports"),
      where("userId", "==", currentUser.uid),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const reports = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setNotifications(reports);
    });

    return () => unsubscribe();
  }, [currentUser]);

  // Use adminRead as the unread indicator
  const unreadCount = notifications.filter((n) => !n.adminRead).length;

  const markAsRead = async (id) => {
    const notification = notifications.find((n) => n.id === id);
    if (!notification || notification.adminRead) return;

    await updateDoc(doc(db, "reports", id), { adminRead: true });
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, adminRead: true } : n))
    );
  };

  const markAllAsRead = async () => {
    const unread = notifications.filter((n) => !n.adminRead);
    await Promise.all(
      unread.map((n) =>
        updateDoc(doc(db, "reports", n.id), { adminRead: true })
      )
    );
    setNotifications((prev) => prev.map((n) => ({ ...n, adminRead: true })));
  };

  return (
    <UserNotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        modalOpen,
        setModalOpen,
        markAsRead,
        markAllAsRead,
      }}
    >
      {children}
    </UserNotificationContext.Provider>
  );
};

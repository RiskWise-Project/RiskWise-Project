import { useState, useEffect } from "react";
import { db, auth } from "../utils/firebase";
import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
} from "firebase/firestore";

export const useReports = () => {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    const fetchReports = async () => {
      const user = auth.currentUser;
      if (!user) return;

      const tokenResult = await user.getIdTokenResult();
      const isAdmin = tokenResult.claims.admin === true;

      let q;
      if (isAdmin) {
        // Admin: fetch all reports
        q = query(collection(db, "reports"), orderBy("createdAt", "desc"));
      } else {
        // Normal user: only fetch their own reports
        q = query(
          collection(db, "reports"),
          where("userId", "==", user.uid),
          orderBy("createdAt", "desc")
        );
      }

      const unsubscribe = onSnapshot(q, (snapshot) => {
        const reportsData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setReports(reportsData);
      });

      return unsubscribe;
    };

    let unsubscribeFunc;
    fetchReports().then((unsubscribe) => {
      unsubscribeFunc = unsubscribe;
    });

    return () => unsubscribeFunc && unsubscribeFunc();
  }, []);

  return reports;
};

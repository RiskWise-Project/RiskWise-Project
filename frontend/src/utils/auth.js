import { getAuth, onAuthStateChanged } from "firebase/auth";

export function getCurrentUser() {
  const auth = getAuth();
  return auth.currentUser ? auth.currentUser.getIdToken() : null;
}

export function getCurrentUserAsync() {
  const auth = getAuth();
  return new Promise((resolve) => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      unsubscribe(); // cleanup listener
      resolve(user || null);
    });
  });
}

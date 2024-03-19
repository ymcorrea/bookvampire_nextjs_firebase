// // firebaseContext.tsx
// import { createContext, useContext, ReactNode, useEffect, useState } from 'react';
// import { auth, GoogleAuthProvider } from './utils/firebase-config'; // Import your Firebase configurations
// import { UserCredential,signInWithPopup,User } from "firebase/auth";

// import { FirebaseContext } from './firebase_context';


// interface FirebaseContextProps {
//   user: User | null;
//   signInWithGoogle: () => Promise<UserCredential>;
//   signOut: () => Promise<void>;
// }



// export const FirebaseProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
//   const [user, setUser] = useState<User | null>(null);

//   useEffect(() => {
//     const unsubscribe = auth.onAuthStateChanged((user) => {
//       setUser(user);
//     });

//     return () => unsubscribe();
//   }, []);

//   const signInWithGoogle = async () => {
//     const provider = new GoogleAuthProvider();
//     try {
//       const result = await signInWithPopup(auth,provider);
//       setUser(result.user);
//       return result;
//     } catch (error) {
//       console.error('Error signing in with Google:', error);
//       throw error;
//     }
//   };

//   const signOut = async () => {
//     try {
//       await auth.signOut();
//       setUser(null);
//     } catch (error) {
//       console.error('Error signing out:', error);
//       throw error;
//     }
//   };

//   const contextValue: FirebaseContextProps = {
//     user,
//     signInWithGoogle,
//     signOut,
//   };

//   return <FirebaseContext.Provider value={contextValue}>{children}</FirebaseContext.Provider>;
// };

// export const useFirebase = () => {
//   const context = useContext(FirebaseContext);
//   if (!context) {
//     throw new Error('useFirebase must be used within a FirebaseProvider');
//   }
//   return context;
// };

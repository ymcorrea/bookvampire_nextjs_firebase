// firebaseContext.tsx
import { createContext, useContext, ReactNode, useEffect, useState } from 'react';
import { auth, GoogleAuthProvider } from './utils/firebase-config'; // Import your Firebase configurations
import { UserCredential,signInWithPopup,User } from "firebase/auth";





interface FirebaseContextProps {
  user: User | null;
  signInWithGoogle: () => Promise<UserCredential>;
  signOut: () => Promise<void>;
}

export const FirebaseContext = createContext<FirebaseContextProps | undefined>(undefined);



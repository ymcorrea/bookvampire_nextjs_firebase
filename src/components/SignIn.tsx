import React from "react";
import {
  getRedirectResult,
  onAuthStateChanged,
  signInWithRedirect,
  signOut,
} from "firebase/auth";

import { auth, provider } from "../utils/firebase-config";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { SettingOutlined, LoginOutlined, QuestionOutlined, BookOutlined } from '@ant-design/icons';
import Modal from "react-modal";
import Link from "next/link"
import Image from "next/image";

import {
  getFirestore,
  collection,
  addDoc,
  doc,
  getDoc,
  setDoc,
} from "firebase/firestore";

import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { FiLogOut } from "react-icons/fi";


interface User {
  name: string | null;
  photoURL: string | null;
}

interface loginProps {
  user: User | null;
  setUser: any;

}

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    padding: "0px",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    background: "#1D262D", // Set to zinc color
    color: "white",
    zIndex: "50",
  },
  overlay: {
    background: "rgba(59, 66, 82, 0.8)", // Set the overlay color to zinc color with some opacity
    zIndex: 1000, // Set a higher zIndex for the overlay
  },
};


const SignIn: React.FC<loginProps> = ({ user, setUser }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [isDropdownFlag, setIsDropdownFlag] = useState(false)
  useEffect(() => {
    const handleSignIn = async () => {
      try {
        const result = await getRedirectResult(auth);

        if (result?.user) {
          const idToken = await result.user.getIdToken();
          await fetch("/api/login", {
            method: "POST",
            headers: {
              Authorization: `Bearer ${idToken}`,
            },
          });

          // Create an entry in the "chats" collection based on user UID
          const firestore = getFirestore();
          const chatsCollection = collection(firestore, "chats");

          // Check if the user document already exists in the "chats" collection
          const userDocRef = doc(chatsCollection, result.user.uid);
          const userDocSnap = await getDoc(userDocRef);

          if (!userDocSnap.exists()) {
            // User document doesn't exist, create a new document
            await setDoc(userDocRef, {
              uid: result.user.uid,
              displayName: result.user.displayName,
              // Add other properties as needed
            });
          }
          setUser({
            name: result.user.displayName,
            photoURL: result.user.photoURL,
          });

          setLoading(false);
        }
      } catch (error) {
        console.error("Error during sign-in:", error);
        setLoading(false);
      }
    };

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser({
          name: user.displayName,
          photoURL: user.photoURL,
        });
        setLoading(false);
      } else {
        setUser(null);
        setLoading(false);
      }
    });

    handleSignIn();

    return () => unsubscribe();
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      const response = await fetch("/api/signout", {
        method: "POST",
      });

      if (response.status === 200) {
        setUser(null);
      }
    } catch (error) {
      console.error("Error during sign-out:", error);
    }
  };

  function signIn() {
    signInWithRedirect(auth, provider);
  }
  const [signinModalIsOpen, setSigninModalIsOpen] = useState(false);


  const openModal = () => {
    setSigninModalIsOpen(true);
  };

  const closeModal = () => {
    setSigninModalIsOpen(false);
  };

  function signInWithGoogle() {
    signInWithRedirect(auth, provider);
  }

  const handleDropdownFlag = () => {
    setIsDropdownFlag(!isDropdownFlag)
  }

  return (
    <>
      <Modal
        isOpen={signinModalIsOpen}
        onRequestClose={closeModal}
        contentLabel="New Book Modal"
        style={{
          ...customStyles,
          overlay: {
            background: "rgba(0, 0, 0, .5)",
            zIndex: 1000,
            // Set a higher zIndex for the overlay
          },
          content: {
            ...customStyles.content,
            zIndex: 1001, // Set a higher zIndex for the modal content
          },
        }}
      >
        <div className="flex justify-end">
          <button className="pr-2 pt-1 rounded-lg  text-2xl " onClick={closeModal}>
          &#x2715;
          </button>
        </div>

        <div className="flex flex-col items-center py-10 px-20">
          <h2 className="text-xl font-semibold mb-8">Sign in with Google</h2>
          <button onClick={signInWithGoogle} className="px-4 py-2 border flex gap-2 bg-white border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-200 hover:border-slate-400 dark:hover:border-slate-500 hover:text-slate-900 dark:hover:text-slate-300 hover:shadow transition duration-150">
            <img className="w-6 h-6" src="https://www.svgrepo.com/show/475656/google-color.svg" loading="lazy" alt="google logo" />
            <span>Continue with Google</span>
          </button>
        </div>

      </Modal>

      <div >
        {loading ? (
          <a className="w-full flex py-3 px-3 items-center gap-3 rounded-md hover:bg-gray-500/10 transition-colors duration-200 text-white cursor-pointer text-sm mb-1 flex-shrink-0 border border-white/20">
            <p>Loading...</p>
          </a>
        ) : (
          <>
            {user ? (
              <>
                {isDropdownFlag && (
                  <div className=" mx-4 border-2 w-[228px] rounded-lg z-10 absolute bottom-[10%] bg-[#1D262D]">
                    <div className="px-4 py-2 text-white">
                       <Link  className="block py-1 hover:bg-[#2A3742]"  href="/price" > <SettingOutlined /> Billing</Link>
                       {/* <a className="block py-1 hover:bg-slate-500"  href="/price"> <SettingOutlined /> Billing</a>  */}
                       <a className="block py-1 hover:bg-slate-500" > <BookOutlined /> Plans</a> 
                       <a className="block py-1 hover:bg-slate-500" > <QuestionOutlined />Help Center</a> 
                       <a className="block py-1 hover:bg-slate-500" onClick={handleSignOut} > <LoginOutlined /> Log out</a> 
                    </div>
                  </div>
                )}
                <a onClick={handleDropdownFlag} className="border-none w-full flex py-3 px-4 items-center gap-3 rounded-mdtransition-colors duration-200 text-white cursor-pointer text-sm mb-1 flex-shrink-0 border border-white/20">
                  <div className="items-baseline space-x-2">
                    <div className="flex flex-row items-center">
                      <svg className="h-12 w-12  text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <p className="text-sm font-medium pl-2">
                        {auth.currentUser?.email}
                      </p>
                    </div>
                    {/* <button
                      className="text-xs text-blue-500 hover:underline focus:outline-none focus:underline text-left"
                      onClick={handleSignOut}
                    >
                      Sign Out
                    </button> */}

                  </div>

                </a>
              </>


            ) : (
              <button onClick={() => setSigninModalIsOpen(true)} className="w-full flex py-3 px-3 items-center gap-3 rounded-md hover:bg-gray-500/10 transition-colors duration-200 text-white cursor-pointer text-sm mb-1 flex-shrink-0 border border-white/20">
                <button className="flex items-center justify-center gap-3.5 ">
                  <FiLogOut className="h-4 w-4" />
                  Sign In
                </button>
              </button>
            )}
          </>
        )}
      </div>

    </>
  );
}

export default SignIn;






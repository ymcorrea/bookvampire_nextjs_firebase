import { useEffect, useRef, useState } from "react";
import Chat from "@/components/Chat";
import MobileSiderbar from "@/components/MobileSidebar";
import Sidebar from "@/components/Sidebar";
import {
  getFirestore,
  collection,
  onSnapshot,
  query,
  where,
  doc,
  setDoc,
  getDocs,
  getDoc,
} from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { useDocument } from "react-firebase-hooks/firestore";
import { auth } from "@/utils/firebase-config";
import { onAuthStateChanged } from "firebase/auth";

import { isEqual } from "lodash";

interface User {
  uid: string | undefined;
  name: string | null;
  photoURL: string | null;
}

interface Chats {
  chat: Array<object> | null;
  displayName: string | null;
  id: string | null;
  uid: string | null;
}

export default function Home() {
  const [isComponentVisible, setIsComponentVisible] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [activeConversation, setActiveConversation] = useState<{
    id: number;
    title: string;
    author: string;
    imageUrl: string;
  } | null>(null);

  const firestore = getFirestore();

  // Use onAuthStateChanged to listen for changes in the authentication state
  // useEffect(() => {
  //   const unsubscribe = onAuthStateChanged(auth, (user) => {
  //     if (user) {
  //       const q = query(collection(firestore, "chats"), where("uid", "==", user.uid));

  //       const unsubscribeChats = onSnapshot(q, (snapshot) => {
  //         const updatedChats = snapshot.docs.map((doc) => ({
  //           id: doc.id,
  //           ...doc.data(),
  //         }));

  //         setChats(updatedChats as any);
  //       });

  //       return () => unsubscribeChats();
  //     }
  //   });

  //   return () => unsubscribe();
  // }, [auth]);
  useEffect(() => {
    if (!user) {
      setChats([]);
    }
  }, [user]);

  const [chats, setChats] = useState<
    {
      id: number;
      title: string;
      author: string;
      imageUrl: string;
      conversation: any[];
    }[]
  >([]);
  const previousChats = useRef(chats);

  const toggleComponentVisibility = () => {
    setIsComponentVisible(!isComponentVisible);
  };

  const [totalConversations, setTotalConversations] = useState<number>(0);

  useEffect(() => {
    // Calculate the total number of conversations
    const total = chats.reduce((acc, chat) => acc + chat.conversation.length, 0);
    setTotalConversations(total);
  }, [chats]);



  const setConversation = (
    conversationArray: any,
    chatId: number | undefined
  ) => {
    setChats((prevChats) => {
      return prevChats.map((chat) =>
        chat.id === chatId ? { ...chat, conversation: conversationArray } : chat
      );
    });
  };

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const q = query(
          collection(firestore, "chats"),
          where("uid", "==", user.uid)
        );

        try {
          const querySnapshot = await getDocs(q);
          // const updatedChats = querySnapshot.docs.map((doc) => ({
          //   id: doc.id,

          //   ...doc.data(),
          // }));

          const updatedChats = querySnapshot.docs.flatMap((doc) => {
            const docData = doc.data();
            // Here, assuming every doc will at least have a 'chat' field that's an array
            return Array.isArray(docData.chat) ? docData.chat : [];
          });

        
          setChats(updatedChats as any);

        
        } catch (error) {
          console.error("Error fetching chats:", error);
        }
      }
    });

    return () => unsubscribeAuth();
  }, []);

  // Update Firestore when local state changes
  useEffect(() => {
    const firestore = getFirestore();
    const user = auth.currentUser;

    if (user) {
      const docRef = doc(firestore, "chats", user.uid);

      // Create a copy of the chats array to avoid side effects
      const getChatsCopy = () => [...chats];

      // Check if the data has actually changed before updating Firestore
      if (!isEqual(getChatsCopy(), previousChats.current)) {
        setDoc(docRef, {
          uid: user.uid,
          displayName: user.displayName,
          chat: getChatsCopy(),
          // Add other properties as needed
        });

        // Update the previousChats reference
        // previousChats.current = chatsCopy;
      }
    }

  
  }, [chats,activeConversation]);

  // ... (rest of the existing code)

  return (
    <main className="overflow-hidden w-full h-screen relative flex">
      {isComponentVisible ? (
        // @ts-ignore 
        <MobileSiderbar
        // @ts-ignore 
          toggleComponentVisibility={toggleComponentVisibility}
          conversations={chats}
          setConversations={setChats}
          activeConversation={activeConversation}
          setActiveConversation={setActiveConversation}
          user={user}
          setUser={setUser}
        />
      ) : null}
      <div className="dark hidden flex-shrink-0 bg-gray-900 md:flex md:w-[260px] md:flex-col">
        <div className="flex h-full min-h-0 flex-col ">
          <Sidebar
            user={user}
            setUser={setUser}
            conversations={chats}
            setConversations={setChats}
            activeConversation={activeConversation}
            setActiveConversation={setActiveConversation}
          />
        </div>
      </div>
      <Chat
        toggleComponentVisibility={toggleComponentVisibility}
        conversation={
          chats.find((chat) => chat.id === activeConversation?.id)
            ?.conversation || []
        }
        setConversation={(conversationArray: any) =>
          setConversation(conversationArray, activeConversation?.id)
        }
        title={activeConversation?.title || "untitled"}
        author={activeConversation?.author || "untitled"}
        image={activeConversation?.imageUrl || ""}
      />
    </main>
  );
}

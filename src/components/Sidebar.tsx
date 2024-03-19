import React, { ReactNode, useEffect, useState } from "react";
import Modal from "react-modal";
import { UploadOutlined } from '@ant-design/icons';
import { cn } from "@/lib/utils"
import Link from "next/link"
import {
  AiOutlineMessage,
  AiOutlinePlus,
  AiOutlineUser,
  AiOutlineSetting,
  AiOutlineLogout,
} from "react-icons/ai";
import { BiLinkExternal } from "react-icons/bi";
import { FiLogOut, FiMessageSquare } from "react-icons/fi";
import { MdLogout } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import Chat from "./Chat";
import SignIn from "./SignIn";
import Image from "next/image";
import {
  signInWithRedirect,
} from "firebase/auth";
import { auth, provider } from "../utils/firebase-config";


interface Conversation {
  id: number;
  title: string;
  author: string;
  imageUrl: string;
  component?: ReactNode; // Assuming component holds a JSX element like a Chat component
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
    background: " #1D262D", // Set to zinc color
    color: "white",
    zIndex: "50",
    width: "380px"
  },
  overlay: {
    background: "rgba(59, 66, 82, 0.8)", // Set the overlay color to zinc color with some opacity
    zIndex: 1000, // Set a higher zIndex for the overlay
  },
};

interface User {
  name: string | null;
  photoURL: string | null;
}

interface SidebarProps {
  user: User | null;
  setUser: any;
  conversations: Conversation[];
  setConversations: any;
  activeConversation: Conversation | null;
  setActiveConversation: React.Dispatch<
    React.SetStateAction<Conversation | null>
  >;
}

const Sidebar: React.FC<SidebarProps> = ({
  user,
  setUser,
  conversations,
  setConversations,
  activeConversation,
  setActiveConversation,
}) => {

  // const [activeConversation, setActiveConversation] = useState<{ id: number; title: string } | null>(null);

  // const [conversations, setConversations] = useState([
  //   { id: 1, title: "Conversation 1" },
  //   { id: 2, title: "Conversation 2" },
  //   // Add more conversations as needed
  // ]);
  const [newbookModalIsOpen, setNewbookModalIsOpen] = useState(false);
  const [signinModalIsOpen, setSigninModalIsOpen] = useState(false)
  const [newChatData, setNewChatData] = useState({
    title: "",
    author: "",
    imageUrl: "",
  });

  const openModal = () => {
    if (user) {
      setNewbookModalIsOpen(true);
      setSigninModalIsOpen(false)
    } else {
      setSigninModalIsOpen(true)
    }

  };


  const closeModal = () => {
    setNewbookModalIsOpen(false);
  };
  const closeSinginModal = () => {
    setSigninModalIsOpen(false);
  };
  function signInWithGoogle() {
    signInWithRedirect(auth, provider);
  }

  const handleNewConversation = () => {
    const newConversation = {
      id: conversations.length + 1,
      title: newChatData.title,
      author: newChatData.author,
      imageUrl: newChatData.imageUrl,
      conversation: [],
    };

    setConversations([...conversations, newConversation]);
    setActiveConversation(newConversation);
    setNewbookModalIsOpen(false); // Close the modal after adding a new conversation
  };

  const handleDeleteConversation = (id: number) => {
    if (user) {
      // If there's only one conversation, set its properties to empty
      if (conversations.length === 1) {
        const updatedConversation = {
          ...conversations[0],
          title: "",
          author: "",
          imageUrl: "",
          conversation: [],
        };
        setConversations([updatedConversation]);
        setActiveConversation(null);
      } else {
        // If there are multiple conversations, remove the conversation with the given id
        const updatedConversations = conversations.filter(
          (conversation) => conversation.id !== id
        );
        setConversations(updatedConversations);

        // If the deleted conversation was the active one, set activeConversation to null
        if (activeConversation && activeConversation.id === id) {
          setActiveConversation(null);
        }
      }
      setSigninModalIsOpen(false)
    } else {
      setSigninModalIsOpen(true)
    }

  };
  const switchConversation = (
    conversation: React.SetStateAction<Conversation | null>
  ) => {
    setActiveConversation(conversation);
  };

  const [alignment, setAlignment] = React.useState('web');

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string,
  ) => {
    setAlignment(newAlignment);
  };
  const [imgUrlFlag,setImgUrlFlag]=useState(true)
  const [uploadFlag,setUploadFlag]=useState(false)
  const handleImgUrl = () => {
    setImgUrlFlag(true)
    setUploadFlag(false)
  }
 

  const handleUplaod = () => {
    setImgUrlFlag(false)
    setUploadFlag(true)
  }

    return (
      <div className="scrollbar-trigger flex h-full w-full flex-1 items-start border-white/20 bg-[#1D262D]">
        <nav className="flex h-full flex-1 flex-col space-y-1">
          <div className="py-3 pl-5">
            <img className="h-[46px] w-[120px]" src="/logo.png" alt="logo" />
          </div>
          <div className=" overflow-y-auto border-b border-white/20" />
          <div className="p-3">
            <a
              onClick={openModal}
              className="flex py-3 px-3 items-center gap-3 rounded-md hover:bg-gray-500/10 transition-colors duration-200 text-white cursor-pointer text-sm  flex-shrink-0 border border-white/20"
            >
              <AiOutlinePlus className="h-4 w-4" />
              New Book
            </a>
            {conversations.map((conversation) => (
              <div key={conversation.id} className="group">
                <a
                  onClick={() => switchConversation(conversation)}
                  className={`relative flex py-2 px-2 gap-3 rounded-md cursor-pointer break-all hover:pr-4 group ${activeConversation === conversation
                    ? "bg-[#2e2f33]  text-white"
                    : ""
                    }`}
                >
                  <div>
                    <div className="w-[24px] h-full border flex border-zinc-600 bg-zinc-700 rounded-sm flex-shrink-0">
                      <div className="h-full flex">
                        <img
                          className="rounded-sm object-cover"
                          src={conversation.imageUrl} // Provide the actual image source or use a default
                          alt={conversation.title}
                        />
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="text-zinc-100 font-light line-clamp-1 text-sm">
                      {conversation.title}
                    </div>
                    <div className="text-zinc-400 text-xs mt-0.5">
                      {conversation.author || "Author Name"}{" "}
                      {/* Provide author name or use a default */}
                    </div>
                  </div>
                  <button
                    onClick={() => handleDeleteConversation(conversation.id)}
                    className="absolute right-0 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                  >
                    <RiDeleteBin6Line className="h-4 w-4" />
                  </button>
                </a>
              </div>
            ))}
          </div>
          <div className="flex-col flex-1 overflow-y-auto border-b border-white/20" />
          <div className="py-4">

            {user &&
              // <div className="p-4 ">
              <div className="px-4">
                <div className="bg-[#2A3742] text-white rounded-full px-2 py-1 mb-2">You have unlimited questions</div>
                <div className="mb-2 flex flex-col items-start justify-start p-4 bg-green-500 text-center rounded-[6px] ">
                  <h3 className="text-black mt-2 font-bold">
                    0/30 questions
                  </h3>
                  <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                    <div className="w-0 bg-blue-600 h-2.5 rounded-full w-[]">
                    </div>
                  </div>
                  <Link href="/price" className="mt-2 bg-green-200 text-black px-6 py-2 rounded-md w-full ">
                    Upgrade now
                  </Link>
                  {/* <a href="\pricing" className="mt-2 bg-green-200 text-black px-6 py-2 rounded-md w-full "> Upgrade now</a> */}
                </div>
              </div>

            }
            {/* <div className="p-4"> */}
            <SignIn user={user} setUser={setUser} />
          </div>
          {/* this is sigin in element position */}
          <Modal
            isOpen={signinModalIsOpen}
            onRequestClose={closeSinginModal}
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
              <button className="pr-2 pt-1 rounded-lg text-2xl " onClick={closeSinginModal}>
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
          <Modal
            isOpen={newbookModalIsOpen}
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
                width: "35%",
              },
            }}
          >
            <div className="flex justify-end">
              <button className="pr-2 pt-1 rounded-lg text-2xl " onClick={closeModal}>
                &#x2715;
              </button>
            </div>
            <div className="px-8">
              <h2 className="text-xl font-bold mb-4">New book</h2>
              <section className="">
                <div className="space-y-4">
                  <div>
                    <label className="block mb-2 ">
                      Book Name
                      <input
                        required
                        type="text"
                        className="w-full rounded-md px-4 py-2 shadow-md bg-[#2A3742] text-zinc-100 mt-4"
                        value={newChatData.title}
                        onChange={(e) =>
                          setNewChatData({ ...newChatData, title: e.target.value })
                        }
                        placeholder="Harry Potter"
                      />
                    </label>
                  </div>
                  <div>
                    <label className="block mb-2">
                      Author
                      <input
                        required
                        type="text"
                        className="w-full rounded-md px-4 py-2 shadow-md bg-[#2A3742] text-zinc-100 mt-4"
                        value={newChatData.author}
                        onChange={(e) =>
                          setNewChatData({ ...newChatData, author: e.target.value })
                        }
                        placeholder="J. K. Rowling"
                      />
                    </label>
                  </div>

                  <div>
                    <label className="block mb-2">
                      <p>Book Cover Image</p>
                      <div className="bg-[#2A3742] rounded-md p-1 my-4 inline-block" >
                    
                        <button onClick={handleImgUrl} className={cn(`py-2 text-[10px] rounded-l-[5px] w-[80px] ${imgUrlFlag ? "bg-[#1D262D] "  : ""} `)}>Image URL</button>
                        <button onClick={handleUplaod} className={cn(`py-2 text-[10px] rounded-r-[5px] w-[80px] ${uploadFlag ? "bg-[#1D262D] "  : ""} `)}>Upload File</button>
                      </div>

                      <div className={cn(`${uploadFlag?"hidden":""}`)}>
                        <input
                          type="text"
                          className="w-full rounded-md px-4 py-2 shadow-md bg-[#2A3742] text-zinc-100 mt-4"
                          value={newChatData.imageUrl}
                          onChange={(e) =>
                            setNewChatData({ ...newChatData, imageUrl: e.target.value })
                          }
                          placeholder="https://m.media-amazon.com/images/M/ThjYmEtjpg_UX1000_.jpg"
                        />
                      </div>
                      <div className={cn(` bg-[#2A3742] rounded-3xl ${imgUrlFlag?"hidden":""}`)}>
                        <button className="w-full p-4">
                          <UploadOutlined className=" text-red-700" />
                          <p> Click or drop<> <br /> </> to upload </p>
                        </button>
                        <div className="flex justify-center">
                          <p className="text-red-700 p-2">(up to 2MB)</p>
                        </div>
                      </div>

                    </label>
                  </div>
                </div>
                <div className="mt-4 flex justify-end py-8 ">
                  <button onClick={closeModal} className="text-white bg-[#2A3742] border-none bg-transparent hover:bg-blue-500 text-blue-700 font-semibold rounded mr-2 px-4">
                    Cancel
                  </button>
                  <button onClick={handleNewConversation} className="text-white border-none bg-[#FF165D] hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-1  px-4 border border-blue-500 hover:border-transparent rounded">
                    +Add Book
                  </button>
                </div>
              </section>
            </div>
          </Modal>


        </nav>
      </div>
    );
  };

  export default Sidebar;

"use client";

import { SetStateAction, useEffect, useRef, useState } from "react";
import { FiSend } from "react-icons/fi";
import { BsChevronDown, BsPlusLg } from "react-icons/bs";
import { RxHamburgerMenu } from "react-icons/rx";
import Image from "next/image";
import Icon from '@mdi/react';
import { mdiCheckboxMultipleMarkedOutline } from '@mdi/js';
import useAutoResizeTextArea from "@/hooks/useAutoResizeTextArea";
import Message from "./Message";
import { OPENAI_MODELS, DEFAULT_OPENAI_MODEL } from "@/shared/Constants";
import { OpenAIModel } from "@/types/Model";
import { divide } from "lodash";

const shortcuts = [
  "Provide a summary of the book",
  "What is this book about?",
  "What is the main idea of this book?",
  "Explain the ending of the book.",
];

const Chat = (props: any) => {
  const {
    toggleComponentVisibility,
    conversation,
    setConversation,
    title,
    author,
    image,
  } = props;

  // const [selectedLanguage, setSelectedLanguage] = useState('English');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showEmptyChat, setShowEmptyChat] = useState(true);

  const [message, setMessage] = useState("");
  const [selectedModel, setSelectedModel] = useState(DEFAULT_OPENAI_MODEL);

  const handleModelChange = (model: OpenAIModel) => {

    setSelectedModel(model);
  };

  const textAreaRef = useAutoResizeTextArea();
  const bottomOfChatRef = useRef<HTMLDivElement>(null);
  //tootip appear 
  // const [tooltipText, setTooltipText] = useState("");
  const [tooltipText, setTooltipText] = useState("");
  const copyLink = () => {
    // Copy link logic here

    // Set the tooltip text to "Link copied"
    setTooltipText("Link copied");

    // Reset the tooltip text after a certain time (e.g., 3 seconds)
    setTimeout(() => {
      setTooltipText("");
    }, 1000); // Changed to 3000 milliseconds for 3 seconds
  };



  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = "24px";
      textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
    }
  }, [message, textAreaRef]);

  useEffect(() => {
    if (bottomOfChatRef.current) {
      bottomOfChatRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [conversation]);

  const sendMessage = async (e: any, shortcut?: string) => {
    e.preventDefault();

    const finalMessage = shortcut?.trim() || message?.trim();


    // Don't send empty messages
    if (finalMessage.length < 1) {
      setErrorMessage("Please enter a message.");
      return;
    } else {
      setErrorMessage("");
    }

    setIsLoading(true);

    // Add the message to the conversation
    setConversation([
      ...conversation,
      { content: finalMessage, role: "user" },
      { content: null, role: "system" },
    ]);

    // Clear the message & remove empty chat
    setMessage("");
    setShowEmptyChat(false);

    try {
      const response = await fetch(`/api/openai`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [...conversation, { content: finalMessage, role: "user" }],
          model: selectedModel,
          prompt: `You are a knowledgeable assistant trained to provide detailed and concise assistance with queries related to the book titled "${title}" by "${author}". You are capable of communicating in ${selectedLanguage} and providing information that is directly relevant, avoiding any unnecessary or redundant content. Please provide accurate, insightful responses that are closely aligned with the contents of the book and the context of the questions`,
        }),
      });

      if (response.ok) {
        const data = await response.json();

        // Add the message to the conversation
        setConversation([
          ...conversation,
          { content: finalMessage, role: "user" },
          { content: data.message, role: "system" },
        ]);
      } else {

        setErrorMessage(response.statusText);
      }

      setIsLoading(false);
    } catch (error: any) {

      setErrorMessage(error.message);

      setIsLoading(false);
    }
  };

  const handleKeypress = (e: any) => {
    // It's triggers by pressing the enter key
    if (e.keyCode == 13 && !e.shiftKey) {
      sendMessage(e);
      e.preventDefault();
    }
  };

  const clickShortcut = (shortcut: string) => {
    // setMessage(shortcut);
    sendMessage(new Event("submit"), shortcut);
  };

  //language menu
  // const handleLanguageChange = (event: { target: { value: SetStateAction<string>; }; }) => {
  //   setSelectedLanguage(event.target.value);
  //   // You can also perform additional actions based on the selected language if needed
  // };
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('English');
  const handleLanguageChange = (language: string) => {
    setSelectedLanguage(language);
    setIsOpen(false);
    // Implement logic to handle language change
  };
  const bookTitle = `${title} by ${author}`
  const letterLen = bookTitle.length
  return (
    <div className="flex max-w-full flex-1 flex-col bg-[#2A3742]">
      <div className=" border-b relative border-zinc-700 px-4 pl-1 pt-3 pb-3 flex items-center justify-between max-md:bg-black">
        <button
          type="button"
          className="pl-4 lg:hidden -ml-0.5 -mt-0.5 inline-flex h-10 w-10 items-center justify-center rounded-md hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white dark:hover:text-white"
          onClick={toggleComponentVisibility}
        >
          <span className="sr-only">Open sidebar</span>
          <RxHamburgerMenu className="h-6 w-6 text-white" />
        </button>
        <div className="w-full text-center text-white">
          {author != "unauthor" || title != "untitled" ? (
            <div className="flex justify-center">
              <div className=" md:hidden">
                {letterLen < 10 ? (
                  <p>{bookTitle}</p>
                ) : (
                  <p>
                    {bookTitle.slice(0, 14)} ....
                  </p>
                )}
              </div>
              <div className=" max-[768px]:hidden">
                {bookTitle}
              </div>
            </div>

          ) : (
            <>
            </>
          )
          }
        </div>

        <div className="flex float-right">

          {conversation.length > 0 ? (
            <div className="relative inline-block">
              <button className="my-[9px] inline-block w-12 h-8 border border-1 text-center rounded-md mr-2" onClick={copyLink}>
                <img className="inline-block align-middle" src="/sharechatBtn.png" alt="Share chat Button" width={18} height={13} />
                {tooltipText && <span className="tooltip"> <Icon className="inline" path={mdiCheckboxMultipleMarkedOutline} size={0.8} /> {tooltipText} </span>}
              </button>
              <style jsx>{`
              .tooltip {
                visibility: visible;
                width: 120px;
                background-color: #7fb7a8;
                color: #fff;
                text-align: center;
                border-radius: 12px;
                padding: 5px;
                position: absolute;
                z-index: 1;
                top: 100%; /* Display tooltip at the bottom of the button */
                left: 50%;
                margin-top:10px;
                transform: translateX(-80%);
                opacity: 1;
                transition: opacity 0.3s ease-in-out; /* Add fade effect */
            }

            .tooltip.fade-in {
                opacity: 1;
            }
            `}</style>
            </div>) : (
            <></>
          )
          }

          <button
            className="inline-block w-12 h-8 border border-1 text-center rounded-md my-[9px]"
          // onClick={() => setIsOpen(!isOpen)}
          >
            <img
              className="inline-block align-middle"
              src="/languageswitch.png"
              alt="Language Switch"
              width={21}
              height={16}
            />
          </button>
        </div>

        {isOpen && (
          <div className=" w-[150px] absolute right-0 z-10  bg-white border border-gray-300 rounded-md shadow-md mt-10">
            <ul className=" w-full text-center">
              <li className=" cursor-pointer hover:bg-lime-600 p-[1px]" onClick={() => handleLanguageChange('English')}>🇺🇸 English</li>
              <li className=" cursor-pointer hover:bg-lime-600 p-[1px]" onClick={() => handleLanguageChange('Spanish')}>🇪🇸 Spanish</li>
              <li className=" cursor-pointer hover:bg-lime-600 p-[1px]" onClick={() => handleLanguageChange('French')}>🇫🇷 French</li>
              <li className=" cursor-pointer hover:bg-lime-600 p-[1px]" onClick={() => handleLanguageChange('German')}>🇩🇪 German</li>
              <li className=" cursor-pointer hover:bg-lime-600 p-[1px]" onClick={() => handleLanguageChange('Italian')}>🇮🇹 Italian</li>
              <li className=" cursor-pointer hover:bg-lime-600 p-[1px]" onClick={() => handleLanguageChange('Portuguese')}>🇵🇹 Portuguese</li>
              <li className=" cursor-pointer hover:bg-lime-600 p-[1px]" onClick={() => handleLanguageChange('Russian')}>🇷🇺 Russian</li>
              <li className=" cursor-pointer hover:bg-lime-600 p-[1px]" onClick={() => handleLanguageChange('Japanese')}>🇯🇵 Japanese</li>
              <li className=" cursor-pointer hover:bg-lime-600 p-[1px]" onClick={() => handleLanguageChange('Chinese')}>🇨🇳 Chinese</li>
              <li className=" cursor-pointer hover:bg-lime-600 p-[1px]" onClick={() => handleLanguageChange('Korean')}>🇰🇷 Korean</li>
              <li className=" cursor-pointer hover:bg-lime-600 p-[1px]" onClick={() => handleLanguageChange('Arabic')}>🇸🇦 Arabic</li>
              <li className=" cursor-pointer hover:bg-lime-600 p-[1px]" onClick={() => handleLanguageChange('Hindi')}>🇮🇳 Hindi</li>
              <li className=" cursor-pointer hover:bg-lime-600 p-[1px]" onClick={() => handleLanguageChange('Turkish')}>🇹🇷 Turkish</li>
              <li className=" cursor-pointer hover:bg-lime-600 p-[1px]" onClick={() => handleLanguageChange('Dutch')}>🇳🇱 Dutch</li>
              <li className=" cursor-pointer hover:bg-lime-600 p-[1px]" onClick={() => handleLanguageChange('Swedish')}>🇸🇪 Swedish</li>
              <li className=" cursor-pointer hover:bg-lime-600 p-[1px]" onClick={() => handleLanguageChange('Norwegian')}>🇳🇴 Norwegian</li>
              <li className=" cursor-pointer hover:bg-lime-600 p-[1px]" onClick={() => handleLanguageChange('Danish')}>🇩🇰 Danish</li>
              <li className=" cursor-pointer hover:bg-lime-600 p-[1px]" onClick={() => handleLanguageChange('Finnish')}>🇫🇮 Finnish</li>
              <li className=" cursor-pointer hover:bg-lime-600 p-[1px]" onClick={() => handleLanguageChange('Polish')}>🇵🇱 Polish</li>
              <li className=" cursor-pointer hover:bg-lime-600 p-[1px]" onClick={() => handleLanguageChange('Romanian')}>🇷🇴 Romanian</li>
              <li className=" cursor-pointer hover:bg-lime-600 p-[1px]" onClick={() => handleLanguageChange('Czech')}>🇨🇿 Czech</li>
              <li className=" cursor-pointer hover:bg-lime-600 p-[1px]" onClick={() => handleLanguageChange('Hungarian')}>🇭🇺 Hungarian</li>
              <li className=" cursor-pointer hover:bg-lime-600 p-[1px]" onClick={() => handleLanguageChange('Greek')}>🇬🇷 Greek</li>
              <li className=" cursor-pointer hover:bg-lime-600 p-[1px]" onClick={() => handleLanguageChange('Bulgarian')}>🇧🇬 Bulgarian</li>
              <li className=" cursor-pointer hover:bg-lime-600 p-[1px]" onClick={() => handleLanguageChange('Ukrainian')}>🇺🇦 Ukrainian</li>
              <li className=" cursor-pointer hover:bg-lime-600 p-[1px]" onClick={() => handleLanguageChange('Hebrew')}>🇮🇱 Hebrew</li>
              <li className=" cursor-pointer hover:bg-lime-600 p-[1px]" onClick={() => handleLanguageChange('Indonesian')}>🇮🇩 Indonesian</li>
              <li className=" cursor-pointer hover:bg-lime-600 p-[1px]" onClick={() => handleLanguageChange('Malay')}>🇲🇾 Malay</li>
              <li className=" cursor-pointer hover:bg-lime-600 p-[1px]" onClick={() => handleLanguageChange('Thai')}>🇹🇭 Thai</li>
              <li className=" cursor-pointer hover:bg-lime-600 p-[1px]" onClick={() => handleLanguageChange('Vietnamese')}>🇻🇳 Vietnamese</li>
              <li className=" cursor-pointer hover:bg-lime-600 p-[1px]" onClick={() => handleLanguageChange('Tagalog')}>🇵🇭 Tagalog</li>
              <li className=" cursor-pointer hover:bg-lime-600 p-[1px]" onClick={() => handleLanguageChange('Filipino')}>🇵🇭 Filipino</li>
              <li className=" cursor-pointer hover:bg-lime-600 p-[1px]" onClick={() => handleLanguageChange('Urdu')}>🇵🇰 Urdu</li>
              <li className=" cursor-pointer hover:bg-lime-600 p-[1px]" onClick={() => handleLanguageChange('Bengali')}>🇧🇩 Bengali</li>
              {/* Add more language options as needed */}
            </ul>
          </div>
        )}

      </div>
      {/* 
      <div className="sticky top-0 z-10 flex items-center border-b border-white/20 bg-black pl-1 pt-1 text-gray-200 sm:pl-3 md:hidden">
        <button
          type="button"
          className="-ml-0.5 -mt-0.5 inline-flex h-10 w-10 items-center justify-center rounded-md hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white dark:hover:text-white"
          onClick={toggleComponentVisibility}
        >
          <span className="sr-only">Open sidebar</span>
          <RxHamburgerMenu className="h-6 w-6 text-white" />
        </button>
        <h1 className="flex-1 text-center text-base font-normal">{title} by {author}</h1>
         <button type="button" className="px-3">
          <BsPlusLg className="h-6 w-6" />
        </button>
      </div> */}


      <div className="relative h-full w-full transition-width flex flex-col overflow-hidden items-stretch flex-1 ">
        <div className="flex-1 overflow-hidden">
          <div className="react-scroll-to-bottom--css-ikyem-79elbk h-full">
            <div className="react-scroll-to-bottom--css-ikyem-1n7m0yu">
              {!showEmptyChat && conversation.length > 0 ? (
                <div className="flex flex-col items-center text-sm bg-[#2A3742]">
                  {/* <div className="flex w-full items-center justify-center gap-1 border-b border-black/10 bg-gray-50 p-3 text-gray-500 dark:border-gray-900/50 dark:bg-gray-700 dark:text-gray-300">
                    Model: {selectedModel.name}
                  </div> */}
                  {conversation.map((message: any, index: any) => (
                    <Message key={index} message={message} />
                  ))}

                  <div className="w-full h-32 md:h-48 flex-shrink-0"></div>
                  <div ref={bottomOfChatRef}></div>
                </div>
              ) : null}
              {showEmptyChat ? (
                <div className="py-10 relative w-full flex flex-col h-full">

                  <h1 className="text-2xl sm:text-4xl font-semibold text-center text-gray-200 dark:text-gray-600 flex gap-2 items-center justify-center h-screen">
                    Book Vampire
                  </h1>
                </div>
              ) : null}
              <div className="flex flex-col items-center text-sm dark:bg-gray-800"></div>
            </div>
          </div>
        </div>
        <div className="absolute border-none bottom-0 left-0 w-full border-t md:border-t-0 dark:border-white/20 md:border-transparent md:dark:border-transparent md:bg-vert-light-gradient  dark:bg-gray-800 md:!bg-transparent dark:md:bg-vert-dark-gradient pt-2">
          {showEmptyChat && (
            <div className="stretch my-2.5 mx-2 gap-3 last:mb-2 md:mx-4 md:last:mb-6 lg:mx-auto lg:max-w-2xl xl:max-w-3xl">
              <div className="text-zinc-100 text-sm font-medium mb-2 flex items-center gap-2">
                <div>
                  <svg
                    stroke="currentColor"
                    fill="none"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
                  </svg>
                </div>
                <div>Shortcuts</div>
              </div>
              <div className="lg:grid lg:grid-cols-2 lg:gap-2 max-md:flex max-md:flex-col">
                {shortcuts.map((shortcut) => (
                  <button
                    key={shortcut}
                    onClick={() => clickShortcut(shortcut)}
                    className="hover:bg-zinc-700/30 shadow-md  border-zinc-700 border text-zinc-200 p-2 rounded-md text-sm"
                  >
                    {shortcut}
                  </button>
                ))}
              </div>
            </div>
          )}
          <form className="stretch mx-2 flex flex-row gap-3 last:mb-2 md:mx-4 md:last:mb-6 lg:mx-auto lg:max-w-2xl xl:max-w-3xl">
            <div className="relative flex flex-col h-full flex-1 items-stretch md:flex-col">
              {errorMessage ? (
                <div className="mb-2 md:mb-0">
                  <div className="h-full flex ml-1 md:w-full md:m-auto md:mb-2 gap-0 md:gap-2 justify-center">
                    <span className="text-red-500 text-sm">{errorMessage}</span>
                  </div>
                </div>
              ) : null}
              <div className="bg-[#3A4957]	 flex flex-col w-full py-2 flex-grow md:py-3 md:pl-4 relative border border-black/10 dark:border-gray-900/50 rounded-md shadow-[0_0_10px_rgba(0,0,0,0.10)] dark:shadow-[0_0_15px_rgba(0,0,0,0.10)] ">
                <textarea
                  ref={textAreaRef}
                  value={message}
                  tabIndex={0}
                  data-id="root"
                  style={{
                    height: "24px",
                    maxHeight: "200px",
                    overflowY: "hidden",
                  }}
                  // rows={1}
                  placeholder="Type your question..."
                  className="m-0 w-full resize-none border-0 bg-[#3A4957] p-0 pr-7 focus:ring-0 focus-visible:ring-0 dark:bg-transparent pl-2 md:pl-0  text-white "
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={handleKeypress}
                ></textarea>
                <button
                  disabled={isLoading || message?.length === 0}
                  onClick={sendMessage}
                  className="absolute p-1 rounded-md bottom-1.5 md:bottom-2.5 bg-transparent disabled:bg-gray-500 right-1 md:right-2 disabled:opacity-40"
                >
                  <FiSend className="h-4 w-4 mr-1 text-white " />
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

    </div>
  );
};

export default Chat;
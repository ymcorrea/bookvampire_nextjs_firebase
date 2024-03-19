import { SiOpenai } from "react-icons/si";
import { HiUser } from "react-icons/hi";
import { TbCursorText } from "react-icons/tb";
import Image from "next/image";

const Message = (props: any) => {
  const { message } = props;
  const { role, content: text } = message;
  console.log("AAAaaaa", message);

  const isUser = role === "user";

  return (
    <div
      // className={`group w-full text-gray-800 dark:text-gray-100 border-b border-black/10 dark:border-gray-900/50 
      // ${
      //   isUser ? "dark:bg-gray-800" : "bg-gray-50 dark:bg-[#444654]"
      // }`
      // }
      className="group w-full text-white "
    >
      <div className="text-base gap-4 md:gap-6 md:max-w-2xl lg:max-w-xl xl:max-w-3xl flex lg:px-0 m-auto w-full">
        <div className="gap-4 md:gap-6 md:max-w-2xl lg:max-w-xl xl:max-w-3xl p-4 md:py-6 lg:px-0 m-auto w-full">
          
          <div className="flex flex-col relative">
            <div className="flex rounded-e-full rounded-s-full relative p-1 rounded-sm text-white text-opacity-100r">
              {isUser ? (
                // <HiUser className="h-4 w-4 text-white" />
                <div className="flex items-center">
                  <svg className=" h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="pl-2">You</span>
                </div>

              ) : (
                // <SiOpenai className="h-4 w-4 text-white" />
                <div className="flex items-center">
                  <img className="h-8 w-8 rounded-s-full rounded-e-full" src="/gptavatar.png" alt="gptavarta" />
                  <span className="pl-2">Book Vampire</span>
                </div>

              )}
            </div>
            <div className="text-xs flex items-center justify-center gap-1 absolute left-0 top-2 -ml-4 -translate-x-full group-hover:visible !invisible">
              <button
                disabled
                className="text-gray-300 dark:text-gray-400"
              ></button>
              <span className="flex-grow flex-shrink-0">1 / 1</span>
              <button
                disabled
                className="text-gray-300 dark:text-gray-400"
              ></button>
            </div>
          </div>
          
          <div className=" relative flex w-[calc(100%-50px)] flex-col gap-1 md:gap-3 lg:w-[calc(100%-115px)]">
            <div className=" flex flex-grow flex-col gap-3">
              <div className=" min-h-20 flex flex-col items-start gap-4 whitespace-pre-wrap break-words">
                <div className="pl-11 markdown prose w-full break-words dark:prose-invert dark">
                  {!isUser && text === null ? (
                    <TbCursorText className="h-6 w-6 animate-pulse" />
                  ) : (
                    <p>{text}</p>
                  )}
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Message;

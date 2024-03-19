
import { Button } from "@/components/ui/button"
import Image from "next/image";


const Homepage = () => {
    return (
        <div className="bg-gray-800 text-center h-full text-white flex flex-col justify-between">
            <div className=" pt-4">
                <p className="text-[60px] font-bold font-serif">Don&#39;t be scared,<br /> It&#39;s just an AI chatbot.</p>
            </div>
            <div className="">
                <p className="text-[24px]">
                    You only need the title and its author, and <> <br /></>
                    Artificial Intelligence takes care of the rest.
                </p>
            </div>
            <div className="">
                <Button
                    className="bg-[#FF165D] px-12 py-6 border-none">Start for free</Button>
            </div>
            <div className="flex justify-center">
                <div className=" w-[15%]">
                <img className="mt-[25%]" src="/person1.png" alt="" />
                </div>
                <div className="w-2/5">
                <img className="mt-[20%]" src="/production.png" alt="" />
                </div>
            </div>
        </ div>
    )
}
export default Homepage

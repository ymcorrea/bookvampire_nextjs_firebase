
import { Button } from "@/components/ui/button"
import Image from "next/image";

const loginpage = () => {
    return (
        <div className="bg-gray-800 text-white px-10 pt-8 px-14 h-full flex flex-col justify-between" >
            <div className="flex justify-between">
                <img className="w-[120px] h-[46px]" src="/logo.png" alt="" />
                <div>
                    <Button className="px-6 py-2 mr-2 border-white border">
                        sign in
                    </Button>
                    <Button className="bg-[#FF165D] px-6 py-2">
                        start for free
                    </Button>
                </div>
            </div>

            <div className=" bg-[url('/person2.png')] bg-[length:50%_80%] bg-[bottom_right_80px] bg-no-repeat h-full">
                <p className="text-[72px] font-serif font-extrabold mt-24">Quench your <><br /></>thirst for... wisdow!</p>
                <p className="text-[18px] py-8">
                    Enhance your reading experience by engaging in AI <> <br /> </>
                    conversations with any book. Ask anything and unlock<> <br /> </>
                    a world of knowledge.
                </p>
                <Button className="text-[18px] bg-[#FF165D] px-12 py-6">
                    Start for free
                </Button>
            </div>


        </div>
    )
}
export default loginpage

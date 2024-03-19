"use client"

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import React, { useState } from "react"
import { cn } from "@/lib/utils"
import { Switch } from 'antd';
import { LeftOutlined } from "@ant-design/icons"
import Link from 'next/link';

type PricingSwitchProps = {
    onSwitch: (value: string) => void
}

type PricingCardProps = {
    isYearly?: boolean
    title: string
    price:string
    monthlyPrice?: number
    yearlyPrice?: number
    description: string
    features: string[]
    actionLabel: string
    popular?: boolean
    exclusive?: boolean
    
}

const PricingHeader = ({ title, subtitle }: { title: string; subtitle: string }) => (
    <section className="text-center">
        <h2 className="text-3xl font-bold">{title}</h2>
        <p className="text-xl pt-1">{subtitle}</p>
        <> <br /></>
    </section>
)

const PricingSwitch = ({ onSwitch }: PricingSwitchProps) => (
    <div className="text-center">
        <span>Billed monthly</span>
        <Switch className="mx-4" style={{ backgroundColor: '#FF165D' }} defaultChecked />
        <span>Billed anually</span>

    </div>
)

const PricingCard = ({ isYearly, title, monthlyPrice, yearlyPrice, description, features, actionLabel, popular, exclusive, price }: PricingCardProps) => (
    <Card
        className={cn(` text-white border-none w-72 flex flex-col justify-between p-4 hover:bg-[#3D3D3D] ${popular ? "border-rose-400" : "border-zinc-700"} mx-auto sm:mx-0`, {
            "animate-background-shinedark:bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] transition-colors":
                exclusive,
        })}>
        <div>
            <CardHeader className="pt-4">
                {/* {isYearly && yearlyPrice && monthlyPrice ? (
                    <div className="flex justify-between">
                        <CardTitle className=" dark:text-zinc-300 text-lg pb-12">{title}</CardTitle>
                        <div
                            className={cn("px-2.5 rounded-xl h-fit text-sm py-1 bg-zinc-200 dark:bg-zinc-800 dark:text-white", {
                                "bg-gradient-to-r from-orange-400 to-rose-400 dark:text-black ": popular,
                            })}>
                            Save ${monthlyPrice * 12 - yearlyPrice}
                        </div>
                    </div>
                ) : ( */}
                    <CardTitle className=" dark:text-zinc-300 text-lg pb-12">{title}</CardTitle>
                 {/* )} */}

                <div className="flex gap-0.5">
                 <h3 className="text-3xl font-bold ">{price}</h3>
                    {/* <h3 className="text-3xl font-bold ">{yearlyPrice && isYearly ? "$" + yearlyPrice : monthlyPrice ? "$" + monthlyPrice : "Custom"}</h3>
                    <span className="flex flex-col justify-end text-sm mb-1">{yearlyPrice && isYearly ? "/year" : monthlyPrice ? "/month" : null}</span> */}
                </div>
            </CardHeader>

            <CardFooter className="">
                <Button className="relative inline-flex w-full items-center justify-center rounded-md bg-[#FF165D] text-white dark:bg-white px-6 font-medium  dark:text-black transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
                    <div className="absolute -inset-0.5 -z-10 rounded-lg bg-gradient-to-b from-[#c7d2fe] to-[#8678f9] opacity-75 blur" />
                    {actionLabel}
                </Button>
            </CardFooter>

            <CardDescription className="pt-1.5 h-12 pl-6">{description}</CardDescription>

            <CardContent className="text-white flex flex-col gap-2">
                {features.map((feature: string) => (
                    <CheckItem key={feature} text={feature} />
                ))}
            </CardContent>
        </div>


    </Card>
)

const CheckItem = ({ text }: { text: string }) => (
    <div className="flex gap-2">
        <CheckCircle2 size={18} className="my-auto text-white" />
        <p className="pt-0.5 dark:text-zinc-300 text-sm">{text}</p>
    </div>
)

export default function Page() {
    const [isYearly, setIsYearly] = useState(false)
    const togglePricingPeriod = (value: string) => setIsYearly(parseInt(value) === 1)

    const plans = [
        {
            title: "Free",
            monthlyPrice: 10,
            yearlyPrice: 100,
            price:"$0",
            description: "This includes",
            features: ["20 questions", "3 Books", "30+ language", "3 days chat history"],
            actionLabel: "Subcribe",
        },
        {
            title: "Plus",
            monthlyPrice: 25,
            yearlyPrice: 250,
            price:"$16.99",
            description: "This includes",
            features: ["200questions/month", "5 Books", "30+ language", "15 days chat hisroty"],
            actionLabel: "Subcribe",
            popular: true,
        },
        {
            title: "Premium",
            price: "$19.99",
            description: "This includes",
            features: ["unlimited questions", "unlimited Books", "30+ language", "180 days chat hisroty"],
            actionLabel: "Subcribe",
            exclusive: true,
        },
        {
            title: "Genious",
            price: "$99.99",
            description: "This includes",
            features: ["unlimited questions", "unlimited Books", "30+ language", "365 days chat hisroty"],
            actionLabel: "Subcribe",
            exclusive: true,
        },
    ]
    return (
        <div className=" bg-[#262626] lg:h-full">
            <div className="text-white p-8 text-[20px]">
                <Link href="/">
                    <LeftOutlined /> Back
                </Link>
            </div>
            <div className="text-white py-8 ">
                {/* <PricingHeader title="Pricing Plans" subtitle="Choose the plan that's right for you" /> */}
                <PricingSwitch onSwitch={togglePricingPeriod} />
                <section className="flex flex-col sm:flex-row sm:flex-wrap justify-center gap-8 mt-40">
                    {plans.map((plan) => {
                        return <PricingCard key={plan.title} {...plan} isYearly={isYearly} />
                    })}
                </section>
            </div>

        </div>

    )
}

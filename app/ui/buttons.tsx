'use client'

import { Button } from "flowbite-react";

export function ButtonSubmit({ text }: { text: string }) {
    return (
        <button type="submit" className="w-auto bg-[#5884C4] hover:bg-[#3062ae] text-white text-[16px] font-medium py-1 px-10 rounded-[6px] drop-shadow-lg">{text}</button>
    )
}
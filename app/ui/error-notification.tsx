'use client'

import { Modal, Button } from "flowbite-react"

export default function ErrorNotification({ message }: { message: string }) {
    return (
        <div className="p-2 bg-red-400 border-1 border-red-500 rounded-md">
            <p className="font-medium text-[14px] text-white text-center">{message}</p>
        </div>
    )
}
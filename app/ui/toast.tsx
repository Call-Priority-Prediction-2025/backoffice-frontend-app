import { Toast } from "flowbite-react";
import { HiCheck, HiExclamation, HiX } from "react-icons/hi";

export default function ToastNotification({ message }: { message: string }) {
    return (
        <Toast className="absolute right-16 top-5">
            <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-100 text-red-500 dark:bg-green-800 dark:text-green-200">
                <HiX className="h-5 w-5" />
            </div>
            <div className="ml-3 text-sm font-normal"> <span>Failed : </span> {message}</div>
        </Toast>
    )
}
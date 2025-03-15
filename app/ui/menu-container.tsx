import { twMerge } from "tailwind-merge"

export default function MenuContainer({ children, containerSize, titleMenu }: { children: React.ReactNode, containerSize: string, titleMenu?: string }) {
    return (
        <div className={twMerge(containerSize, "px-6 py-4 bg-white rounded-2xl drop-shadow-lg border border-[#CFCFCF]")}>
            {titleMenu && <h2 className="text-[22px] underline underline-offset-8">{titleMenu}</h2>}

            <div className="mt-5">
                {children}
            </div>
        </div>
    )
}
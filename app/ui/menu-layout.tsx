export default function MenuLayout({ children, titleHeader }: { children: React.ReactNode, titleHeader: string }) {
    return (
        <div className="w-full h-screen px-10 py-5">
            <div className="flex flex-col gap-5">
                {/* Menu Header */}
                <div className="w-auto mt-5 font-medium text-[#3D3D3D] text-[30px]">
                    <p>{titleHeader}</p>
                </div>

                {/* Menu Content */}
                {children}
            </div>
        </div>
    )
}
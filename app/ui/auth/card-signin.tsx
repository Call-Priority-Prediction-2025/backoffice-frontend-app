'use client'

import { Card, Label, TextInput } from "flowbite-react";
import { Spinner } from "flowbite-react";
import { useRouter } from "next/navigation";
import { Montserrat } from "next/font/google";
import { submitSignIn } from "@/app/services/auth-service";
import React, { useState } from "react";
import Image from "next/image";
import Cookies from "js-cookie";
import Swal from "sweetalert2";

const montserrat = Montserrat({
    subsets: ["latin"],
    variable: "--font-montserrat",
})

export default function CardSignIn() {
    const [userCode, setUserCode] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmitSignIn = async (event: React.FormEvent<HTMLFormElement>) => {
        try {
            event.preventDefault();
            setLoading(true);

            let inputData = {
                userCode, password
            }

            let resultResponse = await submitSignIn(inputData)

            Cookies.set("token", resultResponse.data.access_token, { expires: 1 })

            router.push("/dashboard/prediction")

            Swal.fire({
                icon: 'success',
                title: 'Login successful',
                showConfirmButton: false,
                timer: 2000,
                toast: true,
                position: 'top-end',
                timerProgressBar: true
            });
        } catch (error: any) {
            Swal.fire({
                title: 'Oops...',
                text: error.message,
                icon: 'warning',
                confirmButtonText: 'okay'
            })
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            <Card className={`w-[450px] ${montserrat.className} p-5 border-[1.3px] border-[#CFCFCF] rounded-xl shadow-xl`} >
                <div className="flex flex-col gap-2">
                    <div className="flex justify-center items-center">
                        <Image className="" src={"/app-logo.png"} alt="logo" width={250} height={250} />
                    </div>
                    {/* <div className="text-center">
                    <p className={`text-xl font-medium `}>Sign-In Application</p>
                </div> */}
                </div>
                <div className="mt-5">
                    <form className="flex flex-col gap-3" onSubmit={handleSubmitSignIn}>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="usercode" value="User Code" />
                            </div>
                            <TextInput id="usercode" onChange={(e) => setUserCode(e.target.value)} type="text" placeholder="214172****" name="usercode" required />
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="password1" value="Password" />
                            </div>
                            <TextInput id="password1" onChange={(e) => setPassword(e.target.value)} type="password" name="password" placeholder="*********" required />
                        </div>
                        <div>
                            <button className="w-full mt-3 bg-[#5884C4] hover:bg-[#3062ae] text-white text-[16px] font-medium py-2 px-10 rounded-[6px] drop-shadow-lg">Sign-In</button>
                        </div>
                        <div className="flex justify-center items-center mt-3">
                            {loading && <Spinner aria-label="Medium sized spinner example" size="lg" />}
                        </div>
                    </form>
                </div>
            </Card>
        </>
    )
}
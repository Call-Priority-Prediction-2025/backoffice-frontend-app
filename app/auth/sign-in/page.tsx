import CardSignIn from "@/app/ui/auth/card-signin";

export const metadata = {
    title: 'Sign In | Backoffice',
}

export default function Page() {
    return (
        <div className="h-screen flex justify-center items-center">
            <CardSignIn />
        </div>
    )
}
import { LogoutIcon } from "@heroicons/react/outline"
import { useMutation } from "@tanstack/react-query"
import { useUser } from "contexts/UserContext"
import Router from "next/router"

const UserStatus: React.FC<{
    name: string | null
    status: string
    image: string | null
}> = ({ name, status, image }) => {
    const { logOut } = useUser()

    const logOutMutation = useMutation({
        mutationFn: logOut,
        onSuccess: () => {
            Router.push("/")
        },
        onError: (err) => {
            console.log(err)
        },
    })

    const handleLogout = () => {
        logOutMutation.mutate()
    }

    return (
        <div className="flex h-full w-full items-center gap-4 py-2 px-4">
            {image ? (
                <img src={image} className="h-14 w-14 rounded-full" alt="plm" />
            ) : (
                <div
                    className={`flex h-14 w-14 items-center justify-center rounded-full bg-purple-300 p-5 text-3xl font-extrabold text-dark-1`}
                >
                    ?
                </div>
            )}
            <div className="flex w-full flex-col gap-1">
                <div className="text-lg font-bold">{name}</div>
                {status && <div className="text-gray-300">{status}</div>}
            </div>
            <button
                className="rounded-xl bg-purple-300 p-2 transition-colors duration-300 hover:bg-red-400"
                type="button"
                title="Logout"
                onClick={handleLogout}
            >
                <LogoutIcon className="h-10 w-10 text-dark-1" />
            </button>
        </div>
    )
}

export default UserStatus

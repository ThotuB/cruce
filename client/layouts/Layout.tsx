import { HomeIcon } from "@heroicons/react/solid"
import Chat from "components/chat/Chat"
import Modal from "components/common/Modal"
import Auth from "components/user-status/Auth"
import UserStatus from "components/user-status/UserStatus"
import { useUser } from "contexts/UserContext"
import React, { useState } from "react"

const Layout: React.FC<{
    children: React.ReactNode
}> = ({ children }) => {
    const [loginModal, setLoginModal] = useState(false)

    const { user, guest } = useUser()

    return (
        <div className="flex h-screen max-h-screen w-full flex-col bg-dark-1 font-site text-white">
            <div className="min-h-max px-2 font-mono font-bold">CRUCE</div>
            <div className="flex-1 overflow-hidden">
                <div className="flex h-full w-full">
                    <div className="flex flex-col px-2 pt-4">
                        <HomeButton />
                    </div>
                    <div className="relative flex w-full overflow-hidden rounded-tl-xl bg-dark-2">
                        {loginModal && (
                            <Modal onClose={() => setLoginModal(false)}>
                                <Auth onAuth={() => setLoginModal(false)} />
                            </Modal>
                        )}
                        <div className="flex w-96 flex-col">
                            <div className="h-24 w-full border-b-2 border-gray-900 bg-dark-3">
                                {guest ? (
                                    <div className="flex h-full items-center justify-center text-3xl">
                                        <button
                                            className="cursor-pointer rounded-md bg-dark-1 px-5 py-3 transition-colors duration-150 ease-linear hover:bg-purple-300"
                                            onClick={() => setLoginModal(true)}
                                        >
                                            Log In / Sign Up
                                        </button>
                                    </div>
                                ) : (
                                    <UserStatus
                                        name={user.displayName}
                                        status={"Online"}
                                        image={user.photoURL}
                                    />
                                )}
                            </div>
                            <Chat />
                        </div>
                        <div className="h-full w-full bg-dark-4">
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Layout

const HomeButton = () => {
    return (
        <div className="flex items-center justify-center">
            <div className="h-18 w-18 rounded-full bg-dark-2 p-2">
                <HomeIcon className="h-10 w-10 text-white" />
            </div>
        </div>
    )
}

import { HomeIcon } from '@heroicons/react/solid';
import Chat from 'components/chat/Chat';
import Modal from 'components/common/Modal';
import Auth from 'components/user-status/Auth';
import UserStatus from 'components/user-status/UserStatus';
import { useUser } from 'contexts/UserContext';
import React, { useState } from 'react';

const Layout: React.FC<{
    children: React.ReactNode;
}> = ({ children }) => {
    const [loginModal, setLoginModal] = useState(false);

    const { user, guest } = useUser();

    return (
        <div className="w-full h-screen max-h-screen bg-dark-1 text-white font-site flex flex-col">
            <div className="px-2 min-h-max font-bold font-mono">
                CRUCE
            </div>
            <div className="flex-1 overflow-hidden">
                <div className="flex w-full h-full">
                    <div className="flex flex-col px-2 pt-4">
                        <HomeButton />
                    </div>
                    <div className="flex w-full bg-dark-2 rounded-tl-xl overflow-hidden relative">
                        {loginModal && (
                            <Modal
                                onClose={() => setLoginModal(false)}
                            >
                                <Auth onAuth={() => setLoginModal(false)} />
                            </Modal>
                        )}
                        <div className="flex flex-col w-96">
                            <div className="w-full h-24 bg-dark-3 border-b-2 border-gray-900">
                                {guest ?
                                    <div className='flex items-center justify-center h-full text-3xl'>
                                        <button className='px-5 py-3 rounded-md transition-colors duration-150 ease-linear bg-dark-1 hover:bg-purple-300 cursor-pointer'
                                            onClick={() => setLoginModal(true)}
                                        >
                                            Log In / Sign Up
                                        </button>
                                    </div> :
                                    <UserStatus
                                        name={user.displayName}
                                        status={"Online"}
                                        image={user.photoURL}
                                    />
                                }
                            </div>
                            <Chat />
                        </div>
                        <div className="w-full h-full bg-dark-4">
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Layout

const HomeButton = () => {
    return (
        <div className="flex justify-center items-center">
            <div className="h-18 w-18 bg-dark-2 rounded-full p-2">
                <HomeIcon className="w-10 h-10 text-white" />
            </div>
        </div>
    )
}

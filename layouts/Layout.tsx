import { HomeIcon } from '@heroicons/react/solid';
import Chat from 'components/chat/Chat';
import Modal from 'components/common/Modal';
import Auth from 'components/user-status/Auth';
import UserStatus from 'components/user-status/UserStatus';
import { useUser } from 'contexts/UserContext';
import { useEffect, useState } from 'react';
import { getMessages } from 'services/chat';
import { IMessage } from 'types/game';

interface LayoutProps {
    children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
    const [loginModal, setLoginModal] = useState(false);

    const { user, guest } = useUser();

    return (
        <div className="w-full h-screen max-h-screen bg-dark-1 text-white font-site flex flex-col">
            <div className="px-2 min-h-max">
                CRUCE
            </div>
            <div className="grow overflow-hidden">
                <div className="flex w-full h-full">
                    <div className="flex flex-col py-1 px-2">
                        <div className="h-16 flex justify-center items-center">
                            <div className="bg-dark-2 rounded-full p-2">
                                <HomeIcon className="w-10 h-10 text-white" />
                            </div>
                        </div>
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
                            <div className="w-full h-24 bg-dark-3 border-b border-gray-900">
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
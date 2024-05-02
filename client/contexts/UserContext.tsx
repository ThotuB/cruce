import { createContext, useContext, useEffect, useState } from "react"
import { auth } from 'utils/firebase'
import {
    UserCredential,
    User,
    signOut,
    signInWithPopup,
    GoogleAuthProvider
} from 'firebase/auth'

interface UserContext {
    user: User;
    guest: boolean;
    logInGoogle: () => Promise<UserCredential>;
    logOut: () => Promise<void>;
}

const UserContext = createContext({} as UserContext)

export function useUser() {
    return useContext(UserContext)
}

interface UserProviderProps {
    children: React.ReactNode;
}

const defaultUser = {
    uid: Math.random().toString(32).slice(2),
    displayName: 'Guest',
    photoURL: 'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y'
}

export function UserProvider({ children }: UserProviderProps) {
    const [user, setUser] = useState<User>(defaultUser as User)
    const [guest, setGuest] = useState<boolean>(true)

    const logInGoogle = () => {
        return signInWithPopup(auth, new GoogleAuthProvider())
    }

    const logOut = () => {
        return signOut(auth)
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setUser(user ?? defaultUser as User)
            setGuest(!user)
        })

        return unsubscribe
    }, [])

    const value = {
        user,
        guest,
        logInGoogle,
        logOut
    }

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    )
}
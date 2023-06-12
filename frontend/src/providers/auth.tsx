import React, { createContext, FC, ReactNode, useState } from 'react';

export type User = {
    username: string;
    access_token: string;
    refresh_token: string;
};

type AuthContextType = {
    user: User | null;
    setUser: ((user: User) => void) | null;
    signOut: (() => void) | null;
};

export const AuthContext = createContext<AuthContextType>({
    user: null,
    setUser: null,
    signOut: null,
});

type Props = {
    children: ReactNode;
};
export const AuthProvider: FC<Props> = ({ children }) => {
    const getFromStorage = () => {
        const userFromStorage = sessionStorage.getItem('user');
        if (userFromStorage) {
            return JSON.parse(userFromStorage);
        }
        return null;
    };

    const [user, setUser] = useState<User | null>(getFromStorage());

    const setToStorage = (user: User) => {
        setUser(user);
        sessionStorage.setItem('user', JSON.stringify(user));
    };

    const removeFromStorage = () => {
        sessionStorage.removeItem('user');
        setUser(null);
    };

    const value = {
        user,
        setUser: setToStorage,
        signOut: removeFromStorage,
    };

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
};

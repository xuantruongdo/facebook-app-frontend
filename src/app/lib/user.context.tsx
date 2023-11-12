'use client'

import React, { createContext, useContext, useState } from 'react';
import io, { Socket } from "socket.io-client";

const ENDPOINT = "http://localhost:8002";


const UserContext = createContext<IUserContext | null>(null);

export const UserContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [socket, setSocket] = React.useState<Socket>();

    React.useEffect(() => {
        const newSocket = io(ENDPOINT);
        setSocket(newSocket);
    
        return () => {
          if (newSocket) {
            newSocket.disconnect();
          }
        };
      }, [setSocket]);

    const [onlineUsers, setOnlineUsers] = useState<IUser[]>();

    return (
        <UserContext.Provider value={{ onlineUsers, setOnlineUsers, socket, setSocket }}>
            {children}
        </UserContext.Provider>
    )
}

export const useUserContext = () => useContext(UserContext);
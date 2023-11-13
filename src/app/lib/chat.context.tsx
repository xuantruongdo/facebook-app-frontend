'use client'

import React, { createContext, useContext, useState } from 'react';

const ChatContext = createContext<IChatContext | null>(null);

export const ChatContextProvider = ({ children }: { children: React.ReactNode }) => {

    const [chats, setChats] = useState<IChat[]>();
    const [selectedChat, setSelectedChat] = useState<IChat>();

    return (
        <ChatContext.Provider value={{ chats, setChats, selectedChat, setSelectedChat }}>
            {children}
        </ChatContext.Provider>
    )
}

export const useChatContext = () => useContext(ChatContext);
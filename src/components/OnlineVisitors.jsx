// src/App.js
import React, { useEffect, useState } from 'react';
import {io} from 'socket.io-client';
import useLanguagePrefix from "../services/languagePrefix.jsx";
const PORT = import.meta.env.VITE_SERVER_PORT || 5178;
const currentDomain = window.location.hostname;
const currentProtocol = window.location.protocol
const ENDPOINT = `${currentProtocol}//${currentDomain}:${PORT}`;
function OnlineVisitors() {
    const [onlineUsers, setOnlineUsers] = useState(0);
    const langPrefix = useLanguagePrefix();

    useEffect(() => {
        const socket = io(ENDPOINT);

        socket.on('updateUsers', (users) => {
            setOnlineUsers(users);
        });

        return () => {
            socket.disconnect();
        };
    }, []);

    return (
        <>{(langPrefix === "en" && "Online: ") || "Онлайн: "}{onlineUsers}</>
    );
}

export default OnlineVisitors;
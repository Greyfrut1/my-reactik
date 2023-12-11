import React, { useState, useEffect } from 'react';

const OnlineUsersCounter = () => {
    const [activeUsers, setActiveUsers] = useState(0);

    const handleOnlineStatusChange = () => {
        setActiveUsers((prevUsers) => (navigator.onLine ? prevUsers + 1 : prevUsers - 1));
    };

    useEffect(() => {
        // Додати слухача події для зміни статусу онлайн/офлайн
        window.addEventListener('online', handleOnlineStatusChange);
        window.addEventListener('offline', handleOnlineStatusChange);

        // Початкове значення
        setActiveUsers(navigator.onLine ? 1 : 0);

        // Прибрати слухачів подій при виході з компонента
        return () => {
            window.removeEventListener('online', handleOnlineStatusChange);
            window.removeEventListener('offline', handleOnlineStatusChange);
        };
    }, []);

    return (
        <div>
            <h1>Кількість користувачів на сайті: {activeUsers}</h1>
        </div>
    );
};

export default OnlineUsersCounter;

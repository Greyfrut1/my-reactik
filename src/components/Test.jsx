import React, { useState, useEffect } from "react";
import ReactGA from 'react-ga';
import { google } from "googleapis";
ReactGA.initialize('UA-420354319-01');
ReactGA.pageview(window.location.pathname + window.location.search);

const Test = () => {
    const [usersOnline, setUsersOnline] = useState(0);
    useEffect(() => {


        const fetchData = async () => {
            try {
                // Завантажте ваш ключ JSON та встановіть шлях до нього
                const keyPath = "/Quickstart-e923c901a3c9.json";
                const viewId = "ваш_ID_перегляду"; // Замініть на свій власний ID перегляду

                const jwtClient = new google.auth.JWT({
                    keyFile: keyPath,
                    scopes: ["https://www.googleapis.com/auth/analytics.readonly"],
                });

                // Авторизуйтеся за допомогою ключа доступу
                await jwtClient.authorize();

                // Створіть об'єкт Google Analytics
                const analyticsreporting = google.analyticsreporting({
                    version: "v4",
                    auth: jwtClient,
                });

                // Отримайте дані про користувачів
                const response = await analyticsreporting.reports.batchGet({
                    requestBody: {
                        reportRequests: [
                            {
                                viewId,
                                dateRanges: [{ startDate: "7daysAgo", endDate: "today" }],
                                metrics: [{ expression: "ga:activeUsers" }],
                            },
                        ],
                    },
                });

                // Отримайте кількість користувачів звідси і оновіть стан
                const usersOnline = response.data.reports[0].data.totals[0].values[0];
                setUsersOnline(usersOnline);
            } catch (error) {
                console.error("Error fetching data from Google Analytics API:", error);
            }
        };

        // Викличте функцію отримання даних при завантаженні компоненту
        fetchData();
    }, []);

    return (
        <div>
            <p>Поточна кількість користувачів онлайн: {usersOnline}</p>
        </div>
    );
};

export default Test;
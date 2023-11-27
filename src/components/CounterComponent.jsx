import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ReactGA from 'react-ga';

function CounterComponent() {
    const location = useLocation();
    const [pageViews, setPageViews] = useState(0);

    useEffect(() => {
        const initialiseAnalytics = () => {
            ReactGA.initialize(import.meta.env.VITE_GA_ID);
        };

        ReactGA.set({ page: window.location.pathname });
        ReactGA.pageview(window.location.pathname + window.location.search);

        setPageViews(prev => prev + 1);
    }, []);

    return (
        <div>
            <p>Кількість відвідувачів сторінки: {pageViews}</p>
        </div>
    );
}

export default CounterComponent;

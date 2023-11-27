import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ReactGA from 'react-ga';

function CounterComponent() {
    const location = useLocation();
    const [pageViews, setPageViews] = useState(0);

    useEffect(() => {
        const initialiseAnalytics = () => {
            const TRACKING_ID = process.env.REACT_APP_GA_ID;
            ReactGA.initialize(TRACKING_ID);
        };


        const trackPageView = () => {
            ReactGA.pageview(location.pathname + location.search);
        };
        initialiseAnalytics();

        const handlePageView = () => {
            trackPageView();
            setPageViews((prevPageViews) => prevPageViews + 1);
        };

        const unlisten = ReactGA.history.listen(handlePageView);

        handlePageView();

        return () => unlisten();
    }, [location]);

    return (
        <div>
            <p>Кількість відвідувачів сторінки: {pageViews}</p>
        </div>
    );
}

export default CounterComponent;

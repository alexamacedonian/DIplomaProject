import React from 'react';
import Header from '../Components/Header';
import Profile from '../Components/Profile';

export default function AirQualityPage() {
    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <Profile />
        </div>
    );
}

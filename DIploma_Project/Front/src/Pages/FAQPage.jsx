import React from 'react';
import Header from '../Components/Header';
import AirQualityInfo from '../Components/FAQ';

export default function AirQualityPage() {
    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <AirQualityInfo />
        </div>
    );
}

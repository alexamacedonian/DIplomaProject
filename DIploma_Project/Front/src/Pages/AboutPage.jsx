import React from 'react';
import Header from '../Components/Header';
import About from '../Components/About';

export default function AirQualityPage() {
    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <About />
        </div>
    );
}

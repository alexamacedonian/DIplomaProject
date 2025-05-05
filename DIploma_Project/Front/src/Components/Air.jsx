import React from 'react';
import BarChartData from './BarChartData';
import DotGraph from './DotGraph';

export default function AirQualityTabs({ activeTab }) {
  const renderContent = () => {
    const renderComparison = (title) => (
      <div className='text-center mt-6 md:mt-10 text-white'>
        <div className='bg-[#2E5C74]/40 rounded-lg p-4 md:p-8 w-[80%] mx-auto'>
          <h2 className='text-xl md:text-2xl font-bold mb-8'>{title} Comparison</h2>
          <div className='w-full h-[350px] bg-[#4D6F97]/20 rounded-lg flex flex-col md:flex-row items-start justify-between gap-6 p-4'>
            <div className='w-full md:w-1/2'>
              <BarChartData activeTab={activeTab} className='text-white' />
            </div>
            <div className='w-full md:w-1/2'>
              <DotGraph activeTab={activeTab} className='text-white' />
            </div>
          </div>
        </div>
      </div>
    );

    switch (activeTab) {
      case 'Daily':
        return renderComparison('Daily');
      case 'Monthly':
        return renderComparison('Monthly');
      case 'Yearly':
        return renderComparison('Yearly');
      case 'Recent':
      default:
        return (
          <div className='text-center mt-6 md:mt-10 text-white'>
            <div className='bg-[#2E5C74]/40 rounded-lg p-4 md:p-8 w-[80%] mx-auto'>
              <h2 className='text-xl md:text-2xl font-bold mb-8'>
                Recent Comparison
              </h2>
              <div className='w-full h-48 md:h-64 lg:h-80 bg-[#4D6F97]/20 rounded-lg flex items-center justify-center'>
                <p className='text-lg'>
                  Recent data visualization will appear here
                </p>
              </div>
            </div>
          </div>
        );
    }
  };

  return <div className='px-2 sm:px-4 pb-8'>{renderContent()}</div>;
}

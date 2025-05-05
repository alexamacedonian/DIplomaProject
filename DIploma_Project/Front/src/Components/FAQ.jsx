import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import map1 from '../assets/map2.svg';
import map2 from '../assets/map3.svg';

export default function AirQualityInfo() {
  const navigate = useNavigate();

  return (
    <div className='min-h-screen w-full px-4 sm:px-6 md:px-12 py-8 md:py-16 bg-gradient-to-b from-[#4D6F97] to-[#A9C9D5] text-white'>
      <div className='mb-4'>
        <button
          onClick={() => navigate('/')}
          className='flex items-center gap-1 text-white hover:text-gray-200 transition-colors'
        >
          <ArrowLeft size={20} />
          <span>Back</span>
        </button>
      </div>

      <div className='flex flex-col lg:flex-row gap-8 lg:gap-12 justify-center items-start max-w-6xl mx-auto'>
        {/* LEFT SIDE — TEXT */}
        <div className='w-full lg:w-1/2 flex flex-col gap-6 md:gap-8'>
          <div className='bg-[#2E5C74]/30 p-4 rounded-lg'>
            <h2 className='text-lg sm:text-xl font-bold mb-2'>
              What are IoT air quality sensors?
            </h2>
            <p className='text-xs sm:text-sm leading-relaxed text-gray-100'>
              IoT air quality sensors are devices that are used to monitor air
              pollution levels in real time. They are usually installed in
              various areas of the city and collect data on the content of
              harmful substances in the atmosphere, such as nitrogen oxides,
              carbon dioxide, small particles and others.
            </p>
          </div>

          <div className='bg-[#2E5C74]/30 p-4 rounded-lg'>
            <h2 className='text-lg sm:text-xl font-bold mb-2'>
              What are the benefits of air quality data visualization?
            </h2>
            <p className='text-xs sm:text-sm leading-relaxed text-gray-100'>
              Visualizing air quality data allows you to visually track changes
              in air pollution levels in different parts of a city or region.
              This helps residents and organizations make informed decisions
              about health and safety.
            </p>
          </div>

          <div className='bg-[#2E5C74]/30 p-4 rounded-lg'>
            <h2 className='text-lg sm:text-xl font-bold mb-2'>
              What air quality data do you collect?
            </h2>
            <p className='text-xs sm:text-sm leading-relaxed text-gray-100'>
              We collect data on the content of various harmful substances in
              the atmosphere, such as nitrogen dioxide (NO2), carbon oxides
              (CO), fine particles (PM2.5), ozone (O3) and others. This data
              provides valuable information about the current state of the air
              and its impact on health.
            </p>
          </div>

          <div className='bg-[#2E5C74]/30 p-4 rounded-lg'>
            <h2 className='text-lg sm:text-xl font-bold mb-2'>
              How often is the data on your site updated?
            </h2>
            <p className='text-xs sm:text-sm leading-relaxed text-gray-100'>
              We update air quality data on our website in real time.
              Information on the content of harmful substances is updated
              continuously as new data is received from our IoT sensors.
            </p>
          </div>
        </div>

        {/* RIGHT SIDE — IMAGES */}
        <div className='w-full lg:w-1/2 flex flex-col gap-4 md:gap-6 items-center mt-4 lg:mt-0'>
          <img
            src={map1}
            alt='Kazakhstan Air Map'
            className='w-full max-w-[460px] rounded-md shadow-md object-contain'
          />
          <img
            src={map2}
            alt='District Map Comparison'
            className='w-full max-w-[460px] rounded-md shadow-md object-contain'
          />
        </div>
      </div>
    </div>
  );
}

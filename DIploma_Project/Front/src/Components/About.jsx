import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function About() {
  const navigate = useNavigate();

  return (
    <div className='flex flex-col min-h-screen bg-gradient-to-b from-[#4D6F97] to-[#A9C9D5] text-white p-4'>
      <div className='mb-4'>
        <button
          onClick={() => navigate('/')}
          className='flex items-center gap-1 text-white hover:text-gray-200 transition-colors'
        >
          <ArrowLeft size={20} />
          <span>Back</span>
        </button>
      </div>

      <div className='flex items-center justify-center flex-1'>
        <div className='max-w-xs sm:max-w-md md:max-w-lg lg:max-w-2xl text-center space-y-4 md:space-y-6 bg-[#2E5C74]/30 p-4 md:p-8 rounded-lg'>
          <p className='text-xl md:text-2xl'>Dear users,</p>
          <p className='text-sm md:text-lg'>
            Our project to create a website for visualizing and analyzing air
            quality data is an initiative to raise awareness of the importance
            of caring for the environment and the health of urban populations.
          </p>
          <p className='text-sm md:text-lg'>
            We collect air quality data using modern IoT sensors installed in
            various parts of the city. Our efforts are aimed at providing the
            public with access to this information in a convenient and
            understandable format.
          </p>
          <p className='text-sm md:text-lg'>
            Our team is made up of experts in web development, design, and data
            analysis who work to make our site the hub for air quality
            information in your city.
          </p>
          <p className='text-sm md:text-lg'>
            We hope our project will help you be more aware of the environment
            and make more informed decisions to maintain your health and
            well-being.
          </p>
          <p className='text-sm md:text-lg'>
            <strong>Sincerely,</strong> <br />
            Air quality data visualization project team.
          </p>
        </div>
      </div>
    </div>
  );
}

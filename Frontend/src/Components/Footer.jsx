import React from 'react';
import { FaFacebookSquare, FaInstagram, FaLinkedin, FaTwitter } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <div id='footer' className=' py-5 md:px-20 bg-white mt-16 w-full xl:w-[1280px]'>
      <div className='max-w-screen-xl mx-auto flex flex-col md:flex-row justify-between items-center gap-5 w-full'>
        <div className="flex flex-col items-center lg:items-center text-center lg:text-left mb-6 lg:mb-0  md:w-1/2  ">
          <h1 className='text-4xl font-semibold'>
            <span className='text-purple-600 font-extrabold'>G</span>iga
            <span className='text-purple-600 font-extrabold'>L</span>uxe
          </h1>
          <p className="text-lg mt-2 mb-4 text-center">
            The hotel was amazing! The staff was friendly, the rooms were comfortable, and the view was breathtaking. I will definitely be back!
          </p>
          <div className="border-2 w-24 rounded-full border-purple-600"></div>
        </div>

        <div className='flex flex-col items-center lg:items-center mb-6 lg:mb-0 md:w-1/2  '>
          <h2 className='text-xl font-semibold mb-4'>Quick Links</h2>
          <ul className='flex flex-col gap-3 text-center lg:text-left'>
            <li className='cursor-pointer hover:text-purple-600'>
              <a href="#services">Services</a>
            </li>
            <li className='cursor-pointer hover:text-purple-600 '>
              <Link to="/About">
                <a>Contact</a>
              </Link>
            </li>
            <li className='cursor-pointer hover:text-purple-600 '>
              <Link to="/About">
                <a>About</a>
              </Link>
            </li>
          </ul>
        </div>

        <div className="flex flex-col items-center lg:items-center w-1/2  ">
          <h2 className='text-xl font-semibold mb-4'>Follow Us</h2>
          <div className="flex gap-4 text-3xl">
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className='cursor-pointer hover:text-purple-600'>
              <FaFacebookSquare />
            </a>
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className='cursor-pointer hover:text-purple-600'>
              <FaInstagram />
            </a>
            <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className='cursor-pointer hover:text-purple-600'>
              <FaLinkedin />
            </a>
            <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className='cursor-pointer hover:text-purple-600'>
              <FaTwitter />
            </a>
          </div>
        </div>
      </div>

      <div className="mt-10 pt-4 border-t border-purple-600 text-center">
        <p className="text-sm ">&copy; 2024 GigaLuxe. All rights reserved.</p>
      </div>
    </div>
  );
};

export default Footer;

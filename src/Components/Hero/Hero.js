import React, { useState, useEffect } from 'react';
import image from '../Assets/myimage.jpg';
import { motion } from 'framer-motion';
import {ReactTyped} from 'react-typed';
import { IoMdCall } from 'react-icons/io';
import bgimage from '../Assets/Hero-img.png';


const scrollToContact = () => {
  const contactSection = document.getElementById('contact');
  if (contactSection) {
    contactSection.scrollIntoView({ behavior: 'smooth' });
  }
};

const Hero = () => {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const initialX = windowSize.width >= 640 ? -300 : -170;

  return (
    <>
    <div className="relative">
      <div
        className="bg-no-repeat bg-cover h-full bg-center"
        style={{ backgroundImage: `url(${bgimage})` }}
      >
        <div
          className="relative w-full bg-blend-multiply bg-[#0000007a] pt-40 py-24 xl:px-14 lg:px-10 px-8 overflow-hidden"
          id="home"
        >
          <div className="max-w-[1240px] mx-auto flex flex-col md:flex-row xl:px-8 lg:px-6">
            <motion.div
              initial={{ x: initialX, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{
                delay: 0.2,
                x: { type: 'spring', stiffness: 60 },
                opacity: { duration: 1 },
                ease: 'easeIn',
                duration: 1,
              }}
              className="md:w-2/3 md:mt-6"
            >
              <h1
                className="md:text-6xl text-white text-5xl font-bold tracking-wide py-2"
                style={{ lineHeight: '5.5rem' }}
              >
                Hello!<br /> I'm Sudais Khan.
              </h1>
              <div className="mt-3">
                <ReactTyped
                  className="md:text-4xl text-white text-3xl font-medium tracking-wide py-2"
                  strings={[
                    'Web Developer.',
                    'Full Stack Developer.',
                    'MERN Stack Developer.',
                    'Graphic Designer.',
                  ]}
                  typeSpeed={100}
                  backSpeed={40}
                  loop
                />
              </div>
              <button
                onClick={scrollToContact}
                className="relative flex font-medium items-center bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% hover:from-emerald-500 hover:via-sky-500 hover:to-indigo-500 hover:bg-gradient-to-r hover:from-10% hover:via-30% hover:to-90% text-white mt-14 py-4 px-10 shadow-2xl shadow-indigo-500 hover:shadow-none rounded-xl"
              >
                <span className="mr-3 text-lg">Contact Me</span>
                <IoMdCall className="text-xl" />
              </button>
            </motion.div>
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 60, duration: 1 }}
            >
              <img
                src={image}
                className="sm:w-[400px] md:mt-0 mt-20 w-80 rounded-full md:ms-auto my-4 md:ml-auto"
                alt="Sudais Khan"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default Hero;
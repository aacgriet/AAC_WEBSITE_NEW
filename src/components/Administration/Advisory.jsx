import React from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Mousewheel, Keyboard } from 'swiper';
import 'swiper/css';
import { motion } from 'framer-motion';
import styles from './styles.module.css';

const advisorData = [
  {
    id: "5",
    name: "Dr. Arvind Vishnubhatla",
    occupation: "PROFESSOR, ECE GRIET",
    about:
      "Dr. Arvind Vishnubhatla is currently working as Professor at GRIET.His areas of research and interests include Signal Processing, Embedded Systems, System Design. He worked on GSM switch Microlite Development of a Distributed digital control system for the automation of Steel plants.",
    image:
      "https://res.cloudinary.com/aacgriet/image/upload/v1664100146/AAC-web/mentors/aravind_gnf36b.jpg",
  },
];

const Advisory = () => {
  return (
    <div className="my-20">
      <div className="container mx-auto my-20">
        <motion.h2 
          className="text-5xl font-serif text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          ADVISORS
        </motion.h2>
      </div>
      
      <Swiper
        spaceBetween={50}
        slidesPerView={1}
        grabCursor={true}
        mousewheel={true}
        keyboard={true}
        modules={[Mousewheel, Keyboard]}
      >
        {advisorData.map((item) => (
          <SwiperSlide key={item.id}>
            <div className={styles.carouselItem}>
              <div className="container-fluid">
                <div className="max-w-5xl mx-auto h-auto md:h-96 px-4">
                  <div className="flex flex-col-reverse md:flex-row items-center md:space-x-10">
                    <div className="w-full md:w-1/2 py-6 md:py-10 md:px-10">
                      <div className="text-white rounded-2xl h-full w-full overflow-hidden">
                        <h3 className="text-2xl font-serif text-center py-3">
                          {item.name}
                        </h3>
                        <h4 className="text-base font-serif text-center py-3">
                          {item.occupation}
                        </h4>
                        <p className="text-justify font-sans">
                          {item.about}
                        </p>
                      </div>
                    </div>
                    
                    <div className="w-full md:w-1/2 py-6 md:py-10 md:px-10">
                      <div className="h-full w-full overflow-hidden flex justify-center">
                        <Image
                          src={item.image}
                          alt={item.name}
                          width={320}
                          height={320}
                          className="rounded-full object-cover"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Advisory;
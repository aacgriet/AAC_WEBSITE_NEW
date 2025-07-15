import React from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Mousewheel, Keyboard } from 'swiper';
import 'swiper/css';
import { motion } from 'framer-motion';

const headAdvisorData = [
  {
    id: "1",
    name: "Dr. Jandhyala N Murthy",
    occupation: "DIRECTOR, GRIET",
    about:
      "Dr. Jandhyala N Murthy after voluntarily taking retirement from the IAF as a Wing Commander in 2001,immediately joined as a professor in the Department of Mechanical Engineering at GRIET.Later on taking up the position as the Director of GRIET since 31 January 2018, after a successful tenure as the Principal of GRIET since March 2004.His areas of interest span the Thermal Engineering domain, Gas Turbine Combustion Chambers, simulation and education.",
    image:
      "https://res.cloudinary.com/aacgriet/image/upload/v1664100146/AAC-web/mentors/Dr-Jandhyala-Murthy_tgqu8z.jpg",
  },
  {
    id: "2",
    name: "Dr. J Praveen",
    occupation: "PRINCIPAL, GRIET",
    about:
      "Dr. J Praveen has contributed to a major research areas in Power Electronics and has published more than 80 research papers in reputed International and National Journals and Conferences.He is Registered as a  PhD Guide at Department of Electrical and Electronics Engineering, J.N.T University.Along with his other achievements he also received  International Certification on 'High Impact Teaching Skills' by Dale Carnegie & Associates Inc. Trainers (USA), Mission 10x, Wipro Technologies. ",
    image:
      "https://res.cloudinary.com/aacgriet/image/upload/v1664100147/AAC-web/mentors/jpraveen_mzj4fp.jpg",
  },
  {
    id: "4",
    name: "Dr. Mamidi Kiran Kumar",
    occupation: "DEAN, AAC",
    about:
      "Dr. Mamidi Kiran Kumar, an Associate Professor in the Department of Artificial Intelligence and Machine Learning Engineering at Gokaraju Rangaraju Institute of Engineering and Technology (GRIET) in Hyderabad, is a Rajeev Gandhi National Fellowship awardee. Specializing in Area-based Localization Techniques for Wireless Sensor Networks. With over a decade of academic and research experience, he's proficient in teaching B.TECH and M.TECH students, and has evaluated Graduate Level Examinations.",
    image:
      "https://res.cloudinary.com/dltvvelmx/image/upload/v1694781872/kiran1610_hhgs1v.jpg",
  },
];

const headFacultyadvisor = () => {
  return (
    <div className="my-20">
      <div className="container mx-auto my-20">
        <motion.h2 
          className="text-5xl font-serif text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Head Advisors
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
        {headAdvisorData.map((item) => (
          <SwiperSlide key={item.id}>
            <div className="carousel-item active bg-black">
              <div className="container-fluid">
                <div className="max-w-5xl mx-auto h-auto md:h-96 px-4">
                  <div className="flex flex-col-reverse md:flex-row items-center md:space-x-10">
                    <div className="w-full md:w-1/2 py-6 md:py-10 md:px-10">
                      <div className="text-white rounded-2xl h-full w-full overflow-hidden">
                        <h3 className="text-2xl font-serif text-center py-3">
                          {item.name}
                        </h3>
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

export default headFacultyadvisor;
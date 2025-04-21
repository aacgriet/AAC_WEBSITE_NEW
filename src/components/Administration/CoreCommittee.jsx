import React from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Mousewheel, Keyboard } from 'swiper';
import 'swiper/css';
import { motion } from 'framer-motion';

const coreCommitteeData = [
  {
    Id: "1",
    Name: "Abhiram Pedamallu",
    Designation: "President",
    Image: "https://res.cloudinary.com/aacgriet/image/upload/c_fill,w_1600,h_1600,ar_1:1,g_auto/v1717160195/AAC-web/corecommittee2024/AbhiramPedamallu.jpg",
  },
  {
    Id: "3",
    Name: "V. Dinesh Chandra",
    Designation: "Vice President",
    Image: "https://res.cloudinary.com/aacgriet/image/upload/c_fill,w_1600,h_1600,ar_1:1,g_auto/v1717160196/AAC-web/corecommittee2024/DineshChandraVakkapatla.jpg",
  },
  {
    Id: "5",
    Name: "Abhiram Dodda",
    Designation: "Technical Coordinator",
    Image: "https://res.cloudinary.com/aacgriet/image/upload/c_fill,w_1600,h_1600,ar_1:1,g_auto/v1717160195/AAC-web/corecommittee2024/AbhiramDodda.jpg",
  },
  {
    Id: "6",
    Name: "Seetaram Koushik",
    Designation: "Database Coordinator",
    Image: "https://res.cloudinary.com/aacgriet/image/upload/c_fill,w_1600,h_1600,ar_1:1,g_auto/v1717160199/AAC-web/corecommittee2024/SeetaramKoushik.jpg",
  },
  {
    Id: "7",
    Name: "Manav",
    Designation: "Finance Coordinator",
    Image: "https://res.cloudinary.com/aacgriet/image/upload/c_fill,w_1600,h_1600,ar_1:1,g_auto/v1717160196/AAC-web/corecommittee2024/Manav.webp",
  },
  {
    Id: "8",
    Name: "Srija Cherukuri",
    Designation: "PR Coordinator",
    Image: "https://res.cloudinary.com/aacgriet/image/upload/c_fill,w_1600,h_1600,ar_1:1,g_auto/v1717160199/AAC-web/corecommittee2024/SrijaCherukuri.jpg",
  },
];

const MemberCard = ({ img, name, designation }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 300 }}
      className="max-w-[300px] rounded-lg overflow-hidden shadow-2xl bg-white"
    >
      <div className="flex justify-center p-4">
        <Image
          src={img}
          alt={name}
          width={240}
          height={240}
          className="rounded-xl object-cover shadow-md"
        />
      </div>
      <div className="px-6 py-4 text-center">
        <h3 className="font-bold text-lg mb-2">{name}</h3>
        <p className="text-gray-700 text-base">{designation}</p>
      </div>
    </motion.div>
  );
};

const CoreCommittee = () => {
  return (
    <div className="my-20">
      <div className="container mx-auto my-20">
        <motion.h2 
          className="text-5xl font-serif text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          CORE COMMITTEE
        </motion.h2>
      </div>
      
      <Swiper
        spaceBetween={30}
        slidesPerView={1}
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 40,
          },
        }}
        grabCursor={true}
        mousewheel={true}
        keyboard={true}
        modules={[Mousewheel, Keyboard]}
      >
        {coreCommitteeData.map((item) => (
          <SwiperSlide key={item.Id}>
            <div className="flex justify-center h-auto md:h-96">
              <MemberCard
                img={item.Image}
                name={item.Name}
                designation={item.Designation}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default CoreCommittee;
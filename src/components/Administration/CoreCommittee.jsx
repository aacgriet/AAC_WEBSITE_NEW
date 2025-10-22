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
  {
    Id: "25",
    Name: "Rohitha Tunikipati",
    Designation: "Manager",
    Image: "https://res.cloudinary.com/aacgriet/image/upload/c_fill,w_1600,h_1600,ar_1:1,g_auto/v1717160199/AAC-web/corecommittee2024/RohithaTunikipati.jpg",
  },
  {
    Id: "13",
    Name: "Rithvik Mandya",
    Designation: "Manager",
    Image: "https://res.cloudinary.com/aacgriet/image/upload/c_fill,w_1600,h_1600,ar_1:1,g_auto/v1717160197/AAC-web/corecommittee2024/RithvikMandya.jpg",
  },
  {
    Id: "14",
    Name: "Harshitha Chilupuri",
    Designation: "Manager",
    Image: "https://res.cloudinary.com/aacgriet/image/upload/c_fill,w_1600,h_1600,ar_1:1,g_auto/v1717160195/AAC-web/corecommittee2024/ChilupuriHarshitha.jpg",
  },
  {
    Id: "15",
    Name: "Swetha Soundararajan",
    Designation: "Manager",
    Image: "https://res.cloudinary.com/aacgriet/image/upload/c_fill,w_1600,h_1600,ar_1:1,g_auto/v1717160200/AAC-web/corecommittee2024/SwethaSoundar.jpg",
  },
  {
    Id: "16",
    Name: "Nishith Reddy Duvvuru",
    Designation: "Manager",
    Image: "https://res.cloudinary.com/aacgriet/image/upload/c_fill,w_1600,h_1600,ar_1:1,g_auto/v1717160195/AAC-web/corecommittee2024/AsahiSahiba.jpg",
  },
  {
    Id: "17",
    Name: "N Akshaya",
    Designation: "Manager",
    Image: "https://res.cloudinary.com/aacgriet/image/upload/c_fill,w_1600,h_1600,ar_1:1,g_auto/v1717160200/AAC-web/corecommittee2024/AkshayaN.png",
  },
  {
    Id: "18",
    Name: "Meghana Satya Datla",
    Designation: "Manager",
    Image: "https://res.cloudinary.com/aacgriet/image/upload/c_fill,w_1600,h_1600,ar_1:1,g_auto/v1717160197/AAC-web/corecommittee2024/MeghanaDatla.jpg",
  },
  {
    Id: "19",
    Name: "Chilkuri Abhinav Reddy",
    Designation: "Manager",
    Image: "https://res.cloudinary.com/aacgriet/image/upload/c_fill,w_1600,h_1600,ar_1:1,g_auto/v1717160194/AAC-web/corecommittee2024/AbhinavChilkuri.jpg",
  },
  {
    Id: "20",
    Name: "Chava Sai Sree Praneeth",
    Designation: "Manager",
    Image: "https://res.cloudinary.com/aacgriet/image/upload/c_fill,w_1600,h_1600,ar_1:1,g_auto/v1717160200/AAC-web/corecommittee2024/SaiPranu.jpg",
  },
  {
    Id: "21",
    Name: "Arekela Anjali",
    Designation: "Manager",
    Image: "https://res.cloudinary.com/aacgriet/image/upload/c_fill,w_1600,h_1600,ar_1:1,g_auto/v1717160200/AAC-web/corecommittee2024/AnjaliArekela.jpg",
  },
  {
    Id: "22",
    Name: "Abhinav Jayanth",
    Designation: "Manager",
    Image: "https://res.cloudinary.com/aacgriet/image/upload/c_fill,w_400,h_400,ar_1:1,g_auto/v1717163090/AAC-web/corecommittee2024/AbhinavJayanthUltraProMax.png",
  },
  {
    Id: "23",
    Name: "Endrapu Kranthi Raj",
    Designation: "Manager",
    Image: "https://res.cloudinary.com/aacgriet/image/upload/c_fill,w_1600,h_1600,ar_1:1,g_auto/v1717160196/AAC-web/corecommittee2024/KranthiRaj.jpg",
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
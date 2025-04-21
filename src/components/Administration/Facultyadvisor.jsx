import React from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Mousewheel, Keyboard } from 'swiper';
import 'swiper/css';
import { motion } from 'framer-motion';

const facultyAdvisorData = [
  {
    id: "1",
    name: "Dr. S.N.N.Pandit",
    about:
      "Dr.S.N.N.Pandit was the founder head of the statistics department in Dibrugarh University, Assam. Dr.Pandit gave the idea of 'Advanced Academic Center' in 2004 as a forum to generate creative ideas involving faculty and students at the time of his visit to GRIET in 2003-04 when he had motivated faculty towards research. Dr.Pandit has also supervised 35 Ph.D scholars in variety of domains. He was the founder director of Center Of Quantitative Methods at Osmania University.",
    image:
      "https://res.cloudinary.com/aacgriet/image/upload/v1664100148/AAC-web/mentors/pandith_s8bqhh.jpg",
  },
  {
    id: "2",
    name: "Dr. Satteluri R.K.Iyengar",
    about:
      "Dr.S.R.K.Iyengar was professor at IIT Delhi in the department of Mathematics for over 38 years.Dr.Iyengar worked as a post-doctoral fellow at the Oxford University Computing Laborator,U.K.He is the author of over half a dozen text books,which have won industrial acclaims. Dr.Iyengar served GRIET between 2004 to 2012 with distinction. he brought in good academic culture in the institute. he was the first Dean,Academic Affairs at GRIET. Dr.Iyengar is one of the pillars of Advanced Academic Center at GRIET along with DR.S.N.N.Pandit.",
    image:
      "https://res.cloudinary.com/aacgriet/image/upload/v1664100147/AAC-web/mentors/iyengar_dmrolm.jpg",
  },
];

const Facultyadvisor = () => {
  return (
    <div className="my-20">
      <div className="container mx-auto my-20">
        <motion.h2 
          className="text-5xl font-serif text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          INSTIGATORS
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
        {facultyAdvisorData.map((item) => (
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

export default Facultyadvisor;
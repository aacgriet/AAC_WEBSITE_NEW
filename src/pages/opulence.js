import React from 'react';
import Head from 'next/head';
import { 
  HiLightBulb, 
  HiCommandLine, 
  HiUsers, 
  HiArrowRight, 
  HiMapPin, 
  HiCalendarDays, 
  HiPhone, 
  HiEnvelope,
  HiRocketLaunch
} from 'react-icons/hi2';

import Navbar from '../components/Navbar'; 
import Footer from '../components/Footer';
// const Modal = ({ isOpen, onClose, title, content }) => {
//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-4">
//       <div className="bg-[#1a0b05] max-w-4xl w-full max-h-[90vh] overflow-y-auto rounded-2xl p-6 md:p-8 border border-orange-500/30 relative">
        
//         <button
//           onClick={onClose}
//           className="absolute top-4 right-4 text-orange-400 hover:text-white text-xl"
//         >
//           ✕
//         </button>

//         <h2 className="text-2xl md:text-3xl font-black text-white mb-4 uppercase italic">
//           {title}
//         </h2>

//         <div className="text-[#d4a373] text-sm leading-relaxed whitespace-pre-line">
//           {content}
//         </div>
//       </div>
//     </div>
//   );
// };
const Modal = ({ isOpen, onClose, title, content }) => {
  if (!isOpen) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-[99999] bg-black/80 backdrop-blur-md flex items-center justify-center"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="
          w-full md:max-w-4xl
          h-[92vh] md:h-auto
          md:max-h-[85vh]
          bg-[#1a0b05]
          rounded-2xl
          p-5 md:p-8
          overflow-y-auto
          border border-orange-500/30
          shadow-2xl
        "
      >

        {/* ✅ FAKE TOP SPACING (fix navbar overlap) */}
        <div className="h-20 md:h-0"></div>

        {/* HEADER */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg md:text-3xl font-black text-white uppercase italic">
            {title}
          </h2>

          <button
            onClick={onClose}
            className="text-orange-400 hover:text-white text-xl"
          >
            ✕
          </button>
        </div>

        {/* CONTENT (formatted nicely) */}
        <div className="text-[#d4a373] text-sm md:text-[15px] leading-relaxed whitespace-pre-line space-y-3">
          {content.split('\n').map((line, i) => (
            <p
              key={i}
              className={
                line.endsWith(':')
                  ? "text-white font-bold mt-4"
                  : ""
              }
            >
              {line}
            </p>
          ))}
        </div>

      </div>
    </div>
  );
};
const ContactCard = ({ name, role, phone }) => (
  <div className="bg-[#1a0b05]/60 border border-orange-900/30 p-5 md:p-6 rounded-2xl backdrop-blur-md hover:border-orange-500/50 transition-all group">
    <h4 className="text-white font-black uppercase italic tracking-tighter text-lg md:xl leading-none mb-1">{name}</h4>
    <p className="text-orange-500 text-[9px] md:text-[10px] font-bold uppercase tracking-[0.2em] mb-4">{role}</p>
    <a href={`tel:${phone.replace(/\s+/g, '')}`} className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors text-xs md:text-sm font-bold">
      <HiPhone size={14} className="text-orange-600" /> {phone}
    </a>
  </div>
);

// const EventCard = ({ icon: Icon, title, description, accentColor }) => {
//   const googleDocUrl = "https://docs.google.com/document/d/19ryYEEEZXfbJv_Y-pm2emfYXjBiWuAkIojKMiyd-wGU/edit?tab=t.0";
  
//   return (
//     <div className="group relative p-6 md:p-8 rounded-3xl bg-[#2a1309]/40 border border-[#4a2311] hover:border-orange-500/50 transition-all duration-500 flex flex-col h-full backdrop-blur-xl overflow-hidden shadow-2xl">
//       <div className={`w-12 h-12 md:w-14 md:h-14 rounded-2xl ${accentColor} flex items-center justify-center mb-5 md:mb-6 border border-orange-500/20`}>
//         <Icon size={24} className="md:size-[28px]" />
//       </div>
//       <h3 className="text-xl md:text-2xl font-black text-white mb-3 md:mb-4 tracking-tighter uppercase italic">{title}</h3>
//       <p className="text-[#d4a373] leading-relaxed mb-6 md:mb-8 flex-grow text-sm md:text-[15px] font-medium uppercase tracking-tight">
//         {description}
//       </p>
//       <a 
//         href={googleDocUrl}
//         target="_blank"
//         rel="noopener noreferrer"
//         className="flex items-center text-xs md:text-sm font-black tracking-widest text-orange-500 uppercase italic cursor-pointer group-hover:gap-3 transition-all"
//       >
//         Register <HiArrowRight size={16} className="ml-1" />
//       </a>
//     </div>
//   );
// };
const EventCard = ({
  icon: Icon,
  link,
  title,
  description,
  accentColor,
  fullContent,
  eligibility
}) => {
  const [open, setOpen] = React.useState(false);
  const googleDocUrl = link;

  return (
    <>
      <div className="group relative p-6 md:p-8 rounded-3xl bg-[#2a1309]/40 border border-[#4a2311] hover:border-orange-500/50 transition-all duration-500 flex flex-col h-full backdrop-blur-xl overflow-hidden shadow-2xl">
        
        {/* Eligibility Tag */}
        <span className="absolute top-4 right-4 text-[10px] md:text-xs px-3 py-1 rounded-full font-black tracking-widest uppercase italic bg-white/5 border border-white/10 text-orange-300">
          {eligibility}
        </span>

        <div className={`w-12 h-12 md:w-14 md:h-14 rounded-2xl ${accentColor} flex items-center justify-center mb-5 md:mb-6 border border-orange-500/20`}>
          <Icon size={24} className="md:size-[28px]" />
        </div>

        <h3 className="text-xl md:text-2xl font-black text-white mb-3 md:mb-4 tracking-tighter uppercase italic">
          {title}
        </h3>

        <p className="text-[#d4a373] leading-relaxed mb-6 md:mb-8 flex-grow text-sm md:text-[15px] font-medium uppercase tracking-tight">
          {description}
        </p>

        <div className="flex justify-between items-center mt-auto">
          <button
            onClick={() => setOpen(true)}
            className="text-xs md:text-sm font-black tracking-widest text-orange-400 uppercase italic hover:text-white"
          >
            About →
          </button>

          <a
            href={googleDocUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center text-xs md:text-sm font-black tracking-widest text-orange-500 uppercase italic"
          >
            Register <HiArrowRight size={16} className="ml-1" />
          </a>
        </div>
      </div>

      <Modal
        isOpen={open}
        onClose={() => setOpen(false)}
        title={title}
        content={fullContent}
      />
    </>
  );
};
// const EventCard = ({ icon: Icon,link, title, description, accentColor, fullContent }) => {
//   const [open, setOpen] = React.useState(false);
//   const googleDocUrl = link;
  
//   return (
//     <>
//       <div className="group relative p-6 md:p-8 rounded-3xl bg-[#2a1309]/40 border border-[#4a2311] hover:border-orange-500/50 transition-all duration-500 flex flex-col h-full backdrop-blur-xl overflow-hidden shadow-2xl">
        
//         <div className={`w-12 h-12 md:w-14 md:h-14 rounded-2xl ${accentColor} flex items-center justify-center mb-5 md:mb-6 border border-orange-500/20`}>
//           <Icon size={24} className="md:size-[28px]" />
//         </div>

//         <h3 className="text-xl md:text-2xl font-black text-white mb-3 md:mb-4 tracking-tighter uppercase italic">
//           {title}
//         </h3>

//         <p className="text-[#d4a373] leading-relaxed mb-6 md:mb-8 flex-grow text-sm md:text-[15px] font-medium uppercase tracking-tight">
//           {description}
//         </p>

//         <div className="flex justify-between items-center mt-auto">
//           <button
//             onClick={() => setOpen(true)}
//             className="text-xs md:text-sm font-black tracking-widest text-orange-400 uppercase italic hover:text-white"
//           >
//             About →
//           </button>

//           <a 
//             href={googleDocUrl}
//             target="_blank"
//             rel="noopener noreferrer"
//             className="flex items-center text-xs md:text-sm font-black tracking-widest text-orange-500 uppercase italic"
//           >
//             Register <HiArrowRight size={16} className="ml-1" />
//           </a>
//         </div>
//       </div>

//       <Modal
//         isOpen={open}
//         onClose={() => setOpen(false)}
//         title={title}
//         content={fullContent}
//       />
//     </>
//   );
// };
// Destructure 'link' from props
// const EventCard = ({ icon: Icon, title, description, accentColor, fullContent, link }) => {
//   const [open, setOpen] = React.useState(false);
  
//   return (
//     <>
//       <div className="group ...">
//         {/* ... existing icon and title code ... */}

//         <div className="flex justify-between items-center mt-auto">
//           <button
//             onClick={() => setOpen(true)}
//             className="text-xs md:text-sm font-black tracking-widest text-orange-400 uppercase italic hover:text-white"
//           >
//             About →
//           </button>

//           {/* Change googleDocUrl to link */}
//           <a 
//             href={link} 
//             target="_blank"
//             rel="noopener noreferrer"
//             className="flex items-center text-xs md:text-sm font-black tracking-widest text-orange-500 uppercase italic"
//           >
//             Register <HiArrowRight size={16} className="ml-1" />
//           </a>
//         </div>
//       </div>

//       <Modal
//         isOpen={open}
//         onClose={() => setOpen(false)}
//         title={title}
//         content={fullContent}
//       />
//     </>
//   );
// };
const OpulenceLanding = () => {
  const googleDocUrl = "https://docs.google.com/document/d/19ryYEEEZXfbJv_Y-pm2emfYXjBiWuAkIojKMiyd-wGU/edit?tab=t.0";
  const mapsUrl = "https://maps.google.com";

  const contacts = [
    { name: "Aluri Surya Teja", role: "G-Prime", phone: "+91 8885030188" },
    { name: "Ramesitti Bhuvan Sai", role: "IdeaSprint", phone: "+91 6302659212" },
    { name: "Raghavendra Chekuri", role: "Workshop", phone: "+91 9652353250" },
    
  ];

  const events = [
{
  icon: HiLightBulb,
  link:"https://forms.gle/UDKzUwvdBvfGd9Up9",
  title: "IdeaSprint",
  eligibility:"Open For All",
  description: "Strategic brainstorming and creative problem solving for the final mission frontiers.",
  accentColor: "bg-orange-600/10 text-orange-500",
  fullContent: `Innovation & Problem-Solving Challenge


IdeaSprint is the flagship ideation challenge of Opulence 2026, organized by the Advanced Academic Center (AAC) of GRIET, Hyderabad. It is a multi-stage innovation competition designed to test creativity, critical thinking, and problem-solving skills, with problem statements provided and evaluated by NGOs to ensure real-world relevance and impact. Participants will brainstorm, build, and present impactful ideas that address real-world challenges across technology, society, and business. Open to students from colleges across Hyderabad, IdeaSprint offers a platform for innovators and thinkers to showcase their skills and transform imagination into actionable solutions.

Guidelines :
Open to all undergraduate students from any college or stream.
Participants must register in teams of 3 to 4 members.
Registration Fee: ₹200 per person.

Event Format :
Pre-Event Activity: Problem Statement Selection
Mode: During Online registration
Teams will choose their problem statement at the time of registration.
Allotment will be based on a first-come, first-served basis.

Round 1: One minute Pitch
Round 2: Final Pitch (3 min + Q&A)

Rules :
Teams must consist of 3 to 4 members.
A participant can only be part of one team.
College ID verification required.

Prizes :
₹8,000 prize pool + certificates`
},

{
  icon: HiUsers,
  link:"https://unstop.com/p/devops-workshop-opulence-2026-advanced-academic-center-1661507",
  title: "DevOps Workshop",
  eligibility:"GRIET / GLEC",
  description: "Hands-on DevOps technical drills led by industry expedition leads and core experts.",
  accentColor: "bg-red-600/10 text-red-500",
  fullContent: `

The DevOps Workshop at Opulence 2026 is a comprehensive, beginner-friendly session designed to introduce participants to the core principles and practices that power modern software development and deployment. It focuses on key DevOps concepts such as Continuous Integration and Continuous Deployment (CI/CD), containerization using Docker, and cloud-native workflows.

Speaker:
Varsha Verma – DevOps Engineer & Cloud Automation Specialist

Eligibility:
Open to all students. No prior experience required.

Details:
Venue: ECE Seminar Hall
Date: 10 April 2026
Time: 10 AM – 4 PM

Topics:
Git & GitHub, GitHub Actions, Docker & Containerization, Cloud basics (AWS), Infrastructure as Code, Kubernetes demo

Why Attend:
certificate`
},

{
  icon: HiCommandLine,
  link:"https://unstop.com/p/g-prime-opulence-2026-advanced-academic-center-1661460",
  title: "G-Prime",
  eligibility:"Open For All",
  description: "The premier technical coding contest across the entire Hyderabad technical frontier.",
  accentColor: "bg-amber-600/10 text-amber-500",
  fullContent: `About:
G-Prime is a multi-stage competitive programming contest designed to challenge participants in algorithmic thinking, coding efficiency, and problem-solving. It offers a dynamic platform for students to test their skills, compete with peers, and gain real-world coding experience.

Guidelines:
Participants can register either individually or as a team of up to two members. The contest is open to all undergraduate students, regardless of their branch or prior experience.

Round 1 (Preliminary):
Conducted online and free for all participants, this round features a timed competitive programming contest. Top-performing participants/teams will be shortlisted for the final round based on their performance.

Round 2 (Finale):
The final round will be held offline at GRIET, Hyderabad. Shortlisted participants must pay a registration fee of ₹250 per person. The round will involve advanced problem-solving challenges, with details shared at the venue.

Rules:
Each team can have a maximum of two members, and a participant can be part of only one team. Strict action will be taken against plagiarism or any unfair practices, leading to disqualification. College ID verification is mandatory for the offline round, and all decisions made by the judges are final.

Prizes:
₹15,000 Prize Pool + Certificates`
}
];

  return (
    <div className="min-h-screen bg-[#0f0704] text-[#fae1dd] selection:bg-orange-500/30 font-sans overflow-x-hidden">
      <Head>
        <title>OPULENCE 2026 | AAC GRIET</title>
      </Head>

      {/* Background */}
      <div className="fixed inset-0 pointer-events-none -z-10 bg-[#0f0704]">
        <div className="absolute inset-0 bg-gradient-to-b from-[#4a1c09]/50 via-transparent to-[#0f0704]"></div>
        <div className="absolute bottom-0 left-0 w-full h-[40vh] md:h-[50vh] opacity-25 transform scale-105">
          <svg viewBox="0 0 1440 320" preserveAspectRatio="none" className="w-full h-full">
            <path fill="#4a1c09" d="M0,224L48,213.3C96,203,192,181,288,186.7C384,192,480,224,576,218.7C672,213,768,171,864,149.3C960,128,1056,128,1152,149.3C1248,171,1344,213,1392,234.7L1440,256L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
        </div>
      </div>

      <Navbar />

      <main className="max-w-7xl mx-auto px-5 md:px-6 pt-24 md:pt-32 pb-16 md:pb-24 relative z-10">
        
        {/* Hero Section */}
        <header className="text-center mb-20 md:mb-36">
          <div className="inline-flex items-center gap-2 mb-6 md:mb-8 px-4 py-1.5 md:px-5 md:py-2 rounded-full border border-orange-500/30 bg-orange-500/5 text-orange-500 text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em] md:tracking-[0.4em]">
            SYSTEM READY: MISSION 2026
          </div>
          
          <h1 className="text-5xl sm:text-6xl md:text-[10rem] lg:text-[12rem] font-black mb-4 md:mb-6 tracking-tighter leading-[0.9] md:leading-[0.8] italic uppercase text-white drop-shadow-xl">
            OPULENCE <span className="block md:inline text-transparent bg-clip-text bg-gradient-to-b from-orange-400 to-red-700 not-italic">2026</span>
          </h1>
          
          <p className="text-[#d4a373] text-base md:text-2xl leading-relaxed max-w-3xl mx-auto font-black uppercase tracking-[0.1em] md:tracking-[0.2em] opacity-90 mb-10 md:mb-12 italic px-4">
            Advanced Academic Center
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6 px-4">
            <a rel="noopener noreferrer" 
               className="w-full sm:w-auto group inline-flex items-center justify-center gap-4 bg-orange-600 hover:bg-orange-500 text-white px-8 py-4 md:px-12 md:py-5 rounded-full font-black tracking-tighter transition-all transform hover:scale-105 shadow-lg uppercase italic text-base md:text-lg">
              <HiCalendarDays size={20} />
              <span className="w-px h-6 bg-white/20 hidden sm:block"></span>
              April 10th
            </a>
            
            <a 
  href="https://maps.app.goo.gl/q5SKfjuPFttacNL28" 
  target="_blank" 
  rel="noopener noreferrer" 
  className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 md:px-10 md:py-5 bg-white/5 border border-white/10 rounded-full font-black text-orange-100 backdrop-blur-sm text-sm hover:border-orange-500/50 transition-all uppercase tracking-widest italic"
>
  <HiMapPin size={18} className="text-orange-500" />
  GRIET Campus
</a>
          </div>
        </header>

        {/* Feature Grid */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-24 md:mb-44">
          {events.map((event, idx) => (
            <EventCard key={idx} {...event} />
          ))}
        </section>

        {/* Command Center */}
        <section id="organizers" className="pt-16 md:pt-24 border-t border-white/5">
          <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-12 md:mb-16 gap-4 text-center md:text-left">
            <div className="max-w-xl">
              <div className="flex items-center justify-center md:justify-start gap-3 text-orange-500 mb-2">
                <HiRocketLaunch size={24} />
                <span className="font-black uppercase tracking-[0.2em] md:tracking-[0.3em] text-[10px] md:text-xs">Expedition Leaders</span>
              </div>
              <h2 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter leading-none">Contacts:-</h2>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-12 md:mb-16">
            {contacts.map((person, idx) => (
              <ContactCard key={idx} {...person} />
            ))}
          </div>
          
          <div className="p-8 md:p-10 rounded-[2rem] md:rounded-[2.5rem] bg-gradient-to-r from-orange-600/20 to-transparent border border-orange-500/30 flex flex-col md:flex-row items-center justify-between gap-8 backdrop-blur-md">
            <div className="text-center md:text-left">
                <p className="text-white font-black uppercase italic tracking-tighter text-xl md:text-2xl mb-1">Mail Id:- </p>
                <p className="text-orange-200/60 font-bold uppercase tracking-widest text-xs md:text-sm flex items-center justify-center md:justify-start gap-2">
                    <HiEnvelope size={16} /> aacgrietcore@gmail.com
                </p>
            </div>
            <a href="mailto:aacgrietcore@gmail.com" className="w-full md:w-auto px-10 py-4 rounded-full bg-white text-black font-black uppercase italic text-sm hover:bg-orange-500 hover:text-white transition-all text-center shadow-lg">
                Send Message
            </a>
          </div>
        </section>
      </main>

      <Footer />

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@1,900&display=swap');
        h1, h2, h3, h4 { font-family: 'Montserrat', sans-serif !important; }
        body { background-attachment: fixed; margin: 0; padding: 0; }
      `}</style>
    </div>
  );
};

export default OpulenceLanding;

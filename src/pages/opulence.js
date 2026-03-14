import React from 'react';
import Head from 'next/head';
// Using Hi2 (Hero Icons 2) - very stable in Next.js 14
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

// Double check these paths! If your files are in /src/components, change to '../src/components/Navbar'
import Navbar from '../components/Navbar'; 
import Footer from '../components/Footer';

const ContactCard = ({ name, role, phone }) => (
  <div className="bg-[#1a0b05]/60 border border-orange-900/30 p-6 rounded-2xl backdrop-blur-md hover:border-orange-500/50 transition-all group">
    <h4 className="text-white font-black uppercase italic tracking-tighter text-xl leading-none mb-1">{name}</h4>
    <p className="text-orange-500 text-[10px] font-bold uppercase tracking-[0.2em] mb-4">{role}</p>
    <a href={`tel:${phone.replace(/\s+/g, '')}`} className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors text-sm font-bold">
      <HiPhone size={14} className="text-orange-600" /> {phone}
    </a>
  </div>
);

const EventCard = ({ icon: Icon, title, description, accentColor }) => {
  const googleDocUrl = "https://docs.google.com/document/d/19ryYEEEZXfbJv_Y-pm2emfYXjBiWuAkIojKMiyd-wGU/edit?tab=t.0";
  
  return (
    <div className="group relative p-8 rounded-3xl bg-[#2a1309]/40 border border-[#4a2311] hover:border-orange-500/50 transition-all duration-500 flex flex-col h-full backdrop-blur-xl overflow-hidden shadow-2xl">
      <div className={`w-14 h-14 rounded-2xl ${accentColor} flex items-center justify-center mb-6 border border-orange-500/20`}>
        <Icon size={28} />
      </div>
      <h3 className="text-2xl font-black text-white mb-4 tracking-tighter uppercase italic">{title}</h3>
      <p className="text-[#d4a373] leading-relaxed mb-8 flex-grow text-[15px] font-medium uppercase tracking-tight">
        {description}
      </p>
      <a 
        href={googleDocUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center text-sm font-black tracking-widest text-orange-500 uppercase italic cursor-pointer group-hover:gap-3 transition-all"
      >
        Register <HiArrowRight size={16} className="ml-1" />
      </a>
    </div>
  );
};

const OpulenceLanding = () => {
  const googleDocUrl = "https://docs.google.com/document/d/19ryYEEEZXfbJv_Y-pm2emfYXjBiWuAkIojKMiyd-wGU/edit?tab=t.0";
  const mapsUrl = "https://maps.google.com";

  const contacts = [
    { name: "Aluri Surya Teja", role: "President", phone: "+91 888 503 0188" },
    { name: "Ramesitti Bhuvan Sai", role: "Vice President", phone: "+91 888 503 0188" },
    { name: "Raghavendra Chekuri", role: "Event Management", phone: "+91 888 503 0188" },
    { name: "Sajid Zubair", role: "Public Relations", phone: "+91 888 503 0188" }
  ];

  const events = [
    { 
        icon: HiLightBulb, 
        title: "Ideathon", 
        description: "Strategic brainstorming and creative problem solving for the final mission frontiers.", 
        accentColor: "bg-orange-600/10 text-orange-500" 
    },
    { 
        icon: HiUsers, 
        title: "Workshops", 
        description: "Hands-on DevOps technical drills led by industry expedition leads and core experts.", 
        accentColor: "bg-red-600/10 text-red-500" 
    },
    { 
        icon: HiCommandLine, 
        title: "G-Prime", 
        description: "The premier technical coding contest across the entire Hyderabad technical frontier.", 
        accentColor: "bg-amber-600/10 text-amber-500" 
    }
  ];

  return (
    <div className="min-h-screen bg-[#0f0704] text-[#fae1dd] selection:bg-orange-500/30 font-sans overflow-x-hidden">
      <Head>
        <title>OPULENCE 2026 | AAC GRIET</title>
      </Head>

      <div className="fixed inset-0 pointer-events-none -z-10 bg-[#0f0704]">
        <div className="absolute inset-0 bg-gradient-to-b from-[#4a1c09]/50 via-transparent to-[#0f0704]"></div>
        <div className="absolute bottom-0 left-0 w-full h-[50vh] opacity-25 transform scale-105">
          <svg viewBox="0 0 1440 320" preserveAspectRatio="none" className="w-full h-full">
            <path fill="#4a1c09" d="M0,224L48,213.3C96,203,192,181,288,186.7C384,192,480,224,576,218.7C672,213,768,171,864,149.3C960,128,1056,128,1152,149.3C1248,171,1344,213,1392,234.7L1440,256L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
        </div>
      </div>

      <Navbar />

      <main className="max-w-7xl mx-auto px-6 pt-32 pb-24 relative z-10">
        <header className="text-center mb-36">
          <div className="inline-flex items-center gap-2 mb-8 px-5 py-2 rounded-full border border-orange-500/30 bg-orange-500/5 text-orange-500 text-[10px] font-black uppercase tracking-[0.4em]">
            SYSTEM READY: MISSION 2026
          </div>
          <h1 className="text-7xl md:text-[12rem] font-black mb-6 tracking-tighter leading-[0.8] italic uppercase text-white drop-shadow-[0_20px_50px_rgba(234,88,12,0.4)]">
            OPULENCE <span className="text-transparent bg-clip-text bg-gradient-to-b from-orange-400 to-red-700 not-italic">2026</span>
          </h1>
          <p className="text-[#d4a373] text-xl md:text-2xl leading-relaxed max-w-3xl mx-auto font-black uppercase tracking-[0.2em] opacity-90 mb-12 italic">
            Advanced Academic Center
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6">
            <a href={googleDocUrl} target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-4 bg-orange-600 hover:bg-orange-500 text-white px-12 py-5 rounded-full font-black tracking-tighter transition-all transform hover:scale-105 shadow-xl uppercase italic text-lg cursor-pointer">
              <HiCalendarDays size={22} />
              <span className="w-px h-6 bg-white/20"></span>
              April 10th
            </a>
            <a href={mapsUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-10 py-5 bg-white/5 border border-white/10 rounded-full font-black text-orange-100 backdrop-blur-sm text-sm hover:border-orange-500/50 transition-all group uppercase tracking-widest italic cursor-pointer">
              <HiMapPin size={18} className="text-orange-500" /> GRIET Campus
            </a>
          </div>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-44">
          {events.map((event, idx) => (
            <EventCard key={idx} {...event} />
          ))}
        </section>

        <section id="organizers" className="pt-24 border-t border-white/5">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div className="max-w-xl">
              <div className="flex items-center gap-3 text-orange-500 mb-2">
                <HiRocketLaunch size={24} />
                <span className="font-black uppercase tracking-[0.3em] text-xs">Expedition Leaders</span>
              </div>
              <h2 className="text-6xl font-black uppercase italic tracking-tighter leading-none">Command Center</h2>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {contacts.map((person, idx) => (
              <ContactCard key={idx} {...person} />
            ))}
          </div>
          <div className="p-10 rounded-[2.5rem] bg-gradient-to-r from-orange-600/20 to-transparent border border-orange-500/30 flex flex-col md:flex-row items-center justify-between gap-8 backdrop-blur-md">
            <div>
                <p className="text-white font-black uppercase italic tracking-tighter text-2xl mb-1">Official Transmission</p>
                <p className="text-orange-200/60 font-bold uppercase tracking-widest text-sm flex items-center gap-2">
                    <HiEnvelope size={16} /> aac.griet@gmail.com
                </p>
            </div>
            <a href="mailto:aac.griet@gmail.com" className="w-full md:w-auto px-10 py-4 rounded-full bg-white text-black font-black uppercase italic text-sm hover:bg-orange-500 hover:text-white transition-all text-center">
                Send Message
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default OpulenceLanding;

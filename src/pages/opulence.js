import React from 'react';
import Head from 'next/head';
import { 
  Lightbulb, 
  Terminal, 
  Users, 
  ArrowRight, 
  MapPin, 
  Phone, 
  MessageSquare, 
  Mail 
} from 'lucide-react';

// Ensure these paths match your project structure
import Navbar from '../components/Navbar'; 
import Footer from '../components/Footer';

const EventCard = ({ icon: Icon, title, description, accentColor }) => {
  const googleDocUrl = "https://docs.google.com/document/d/19ryYEEEZXfbJv_Y-pm2emfYXjBiWuAkIojKMiyd-wGU/edit?tab=t.0";

  return (
    <div className="group relative p-8 rounded-2xl bg-[#ffffff05] border border-[#ffffff10] hover:border-blue-500/40 transition-all duration-500 flex flex-col h-full backdrop-blur-md">
      <div className="absolute inset-0 bg-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl -z-10"></div>
      
      <div className={`w-14 h-14 rounded-xl ${accentColor} flex items-center justify-center mb-6 border border-white/5`}>
        <Icon size={28} />
      </div>
      
      <h3 className="text-2xl font-bold text-white mb-4 tracking-tight">{title}</h3>
      <p className="text-[#94a3b8] leading-relaxed mb-8 flex-grow text-[15px]">
        {description}
      </p>
      
      <a 
        href={googleDocUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center text-sm font-bold tracking-widest text-blue-400 hover:text-blue-300 uppercase transition-colors"
      >
        Register <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
      </a>
    </div>
  );
};

const OrganizerCard = ({ name, role, phone }) => (
  <div className="bg-white/5 border border-white/10 p-6 rounded-2xl backdrop-blur-sm hover:border-blue-500/30 transition-all group">
    <p className="text-blue-400 text-[10px] font-bold uppercase tracking-[0.2em] mb-1">{role}</p>
    <h4 className="text-xl font-bold text-white mb-4 tracking-tight">{name}</h4>
    <div className="space-y-3">
      <a href={`tel:${phone}`} className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors text-sm">
        <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center group-hover:bg-blue-500/20">
          <Phone size={14} className="text-blue-400" />
        </div>
        {phone}
      </a>
      <a href={`https://wa.me/${phone.replace(/[\s+]/g, '')}`} target="_blank" rel="noreferrer" className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors text-sm">
        <div className="w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center group-hover:bg-emerald-500/20">
          <MessageSquare size={14} className="text-emerald-400" />
        </div>
        Chat on WhatsApp
      </a>
    </div>
  </div>
);

const OpulenceLanding = () => {
  const mapsUrl = "https://maps.app.goo.gl/ZZbS1uZP9nx9jFD38"; 
  const googleDocUrl = "https://docs.google.com/document/d/19ryYEEEZXfbJv_Y-pm2emfYXjBiWuAkIojKMiyd-wGU/edit?tab=t.0";

  const events = [
    {
      icon: Lightbulb,
      title: "Ideathon",
      description: "Encouraging teamwork, creativity, and problem-solving. A platform to pitch innovative ideas and turn them into real-world solutions.",
      accentColor: "bg-blue-600/10 text-blue-500"
    },
    {
      icon: Users,
      title: "Workshops",
      description: "Hands-on sessions with industry tools. This year, we're hosting a flagship DevOps workshop to bridge academia and professional expertise.",
      accentColor: "bg-purple-600/10 text-purple-500"
    },
    {
      icon: Terminal,
      title: "G-Prime",
      description: "Our premier coding contest designed to challenge technical and logical thinking across various competitive programming levels.",
      accentColor: "bg-emerald-600/10 text-emerald-500"
    }
  ];

  const organizers = [
    {
      name: "Aluri Surya Teja",
      role: "President, AAC",
      phone: "+91 888 503 0188"
    },
    {
      name: "AAC Core Team",
      role: "Event Coordination",
      phone: "+91 888 503 0188" // Update with second contact if needed
    }
  ];

  return (
    <div className="min-h-screen bg-[#020617] text-white selection:bg-blue-500/30 font-sans">
      <Head>
        <title>Opulence 2026 | AAC GRIET</title>
        <meta name="description" content="Flagship technical event by Advanced Academic Center, GRIET Hyderabad." />
      </Head>
      
      {/* Background Radial Glows matching aacgriet.com */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-900/20 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[-10%] right-[-5%] w-[40%] h-[40%] bg-purple-900/10 blur-[120px] rounded-full"></div>
      </div>

      <Navbar />

      <main className="max-w-7xl mx-auto px-6 pt-32 pb-24 relative">
        
        {/* Hero Section */}
        <header className="text-center mb-28">
          <h2 className="text-blue-500 font-bold tracking-[0.4em] uppercase text-[10px] md:text-xs mb-6 opacity-80">
            Advanced Academic Center Presents
          </h2>
          <h1 className="text-6xl md:text-9xl font-black mb-8 tracking-tighter leading-none italic">
            OPULENCE <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#60a5fa] to-[#a855f7] not-italic">2026</span>
          </h1>
          <p className="text-[#94a3b8] text-lg md:text-xl leading-relaxed max-w-2xl mx-auto font-medium">
            An interdisciplinary technical hub where creativity, innovation, and excellence converge to shape the future of engineering.
          </p>
          
          <div className="mt-14 flex flex-wrap items-center justify-center gap-6">
            <a 
             
              rel="noopener noreferrer"
              className="bg-blue-600 hover:bg-blue-500 text-white px-10 py-4 rounded-full font-bold transition-all transform hover:scale-105 shadow-xl shadow-blue-500/20 text-sm"
            >
              🗓️ April 10th
            </a>
            
            <a 
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-8 py-4 bg-white/5 border border-white/10 rounded-full font-bold backdrop-blur-sm text-sm hover:bg-white/10 hover:border-blue-500/50 transition-all group"
            >
              <MapPin size={18} className="text-blue-400 group-hover:animate-bounce" />
              GRIET Campus
            </a>
          </div>
        </header>

        {/* Triple Feature Grid */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-40">
          {events.map((event, idx) => (
            <EventCard key={idx} {...event} />
          ))}
        </section>

        {/* Contact & Organizers Section */}
        <section id="contact" className="pt-20 border-t border-white/5">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8 text-center md:text-left">
            <div className="max-w-xl">
              <h2 className="text-4xl md:text-5xl font-black mb-4 tracking-tight">Connect with Us</h2>
              <p className="text-gray-400 text-lg">Reach out to our lead organizers for event-specific queries or collaboration opportunities.</p>
            </div>
            <div className="h-px flex-grow bg-white/10 mb-6 mx-12 hidden lg:block"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {organizers.map((person, idx) => (
              <OrganizerCard key={idx} {...person} />
            ))}
            
            {/* Quick Email Box */}
            <div className="bg-gradient-to-br from-blue-600/20 to-purple-700/20 border border-white/10 p-8 rounded-2xl flex flex-col justify-center relative overflow-hidden group">
              <div className="absolute -right-4 -top-4 text-white/5 group-hover:text-white/10 transition-colors">
                <Mail size={120} />
              </div>
              <h4 className="text-white font-bold text-xl mb-2">Have Questions?</h4>
              <p className="text-blue-200/60 text-sm mb-6">Drop us a mail for formal invitations or sponsorship details.</p>
              <a href="mailto:aac.griet@gmail.com" className="text-white font-bold hover:text-blue-400 transition-colors flex items-center gap-2">
                aac.griet@gmail.com <ArrowRight size={16} />
              </a>
            </div>
          </div>
        </section>

      </main>

      <Footer />

      {/* Smooth scroll anchor for the bounce arrow */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700;900&display=swap');
        html { scroll-behavior: smooth; }
      `}</style>
    </div>
  );
};

export default OpulenceLanding;import React from 'react';
import Head from 'next/head';
import { 
  Lightbulb, 
  Terminal, 
  Users, 
  ArrowRight, 
  MapPin, 
  Phone, 
  MessageSquare, 
  Mail 
} from 'lucide-react';

// Ensure these paths match your project structure
import Navbar from '../components/Navbar'; 
import Footer from '../components/Footer';

const EventCard = ({ icon: Icon, title, description, accentColor }) => {
  const googleDocUrl = "https://docs.google.com/document/d/19ryYEEEZXfbJv_Y-pm2emfYXjBiWuAkIojKMiyd-wGU/edit?tab=t.0";

  return (
    <div className="group relative p-8 rounded-2xl bg-[#ffffff05] border border-[#ffffff10] hover:border-blue-500/40 transition-all duration-500 flex flex-col h-full backdrop-blur-md">
      <div className="absolute inset-0 bg-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl -z-10"></div>
      
      <div className={`w-14 h-14 rounded-xl ${accentColor} flex items-center justify-center mb-6 border border-white/5`}>
        <Icon size={28} />
      </div>
      
      <h3 className="text-2xl font-bold text-white mb-4 tracking-tight">{title}</h3>
      <p className="text-[#94a3b8] leading-relaxed mb-8 flex-grow text-[15px]">
        {description}
      </p>
      
      <a 
        href={googleDocUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center text-sm font-bold tracking-widest text-blue-400 hover:text-blue-300 uppercase transition-colors"
      >
        Register <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
      </a>
    </div>
  );
};

const OrganizerCard = ({ name, role, phone }) => (
  <div className="bg-white/5 border border-white/10 p-6 rounded-2xl backdrop-blur-sm hover:border-blue-500/30 transition-all group">
    <p className="text-blue-400 text-[10px] font-bold uppercase tracking-[0.2em] mb-1">{role}</p>
    <h4 className="text-xl font-bold text-white mb-4 tracking-tight">{name}</h4>
    <div className="space-y-3">
      <a href={`tel:${phone}`} className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors text-sm">
        <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center group-hover:bg-blue-500/20">
          <Phone size={14} className="text-blue-400" />
        </div>
        {phone}
      </a>
      <a href={`https://wa.me/${phone.replace(/[\s+]/g, '')}`} target="_blank" rel="noreferrer" className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors text-sm">
        <div className="w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center group-hover:bg-emerald-500/20">
          <MessageSquare size={14} className="text-emerald-400" />
        </div>
        Chat on WhatsApp
      </a>
    </div>
  </div>
);

const OpulenceLanding = () => {
  const mapsUrl = "https://maps.app.goo.gl/ZZbS1uZP9nx9jFD38"; 
  const googleDocUrl = "https://docs.google.com/document/d/19ryYEEEZXfbJv_Y-pm2emfYXjBiWuAkIojKMiyd-wGU/edit?tab=t.0";

  const events = [
    {
      icon: Lightbulb,
      title: "Ideathon",
      description: "Encouraging teamwork, creativity, and problem-solving. A platform to pitch innovative ideas and turn them into real-world solutions.",
      accentColor: "bg-blue-600/10 text-blue-500"
    },
    {
      icon: Users,
      title: "Workshops",
      description: "Hands-on sessions with industry tools. This year, we're hosting a flagship DevOps workshop to bridge academia and professional expertise.",
      accentColor: "bg-purple-600/10 text-purple-500"
    },
    {
      icon: Terminal,
      title: "G-Prime",
      description: "Our premier coding contest designed to challenge technical and logical thinking across various competitive programming levels.",
      accentColor: "bg-emerald-600/10 text-emerald-500"
    }
  ];

  const organizers = [
    {
      name: "Aluri Surya Teja",
      role: "President, AAC",
      phone: "+91 888 503 0188"
    },
    {
      name: "AAC Core Team",
      role: "Event Coordination",
      phone: "+91 888 503 0188" // Update with second contact if needed
    }
  ];

  return (
    <div className="min-h-screen bg-[#020617] text-white selection:bg-blue-500/30 font-sans">
      <Head>
        <title>Opulence 2026 | AAC GRIET</title>
        <meta name="description" content="Flagship technical event by Advanced Academic Center, GRIET Hyderabad." />
      </Head>
      
      {/* Background Radial Glows matching aacgriet.com */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-900/20 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[-10%] right-[-5%] w-[40%] h-[40%] bg-purple-900/10 blur-[120px] rounded-full"></div>
      </div>

      <Navbar />

      <main className="max-w-7xl mx-auto px-6 pt-32 pb-24 relative">
        
        {/* Hero Section */}
        <header className="text-center mb-28">
          <h2 className="text-blue-500 font-bold tracking-[0.4em] uppercase text-[10px] md:text-xs mb-6 opacity-80">
            Advanced Academic Center Presents
          </h2>
          <h1 className="text-6xl md:text-9xl font-black mb-8 tracking-tighter leading-none italic">
            OPULENCE <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#60a5fa] to-[#a855f7] not-italic">2026</span>
          </h1>
          <p className="text-[#94a3b8] text-lg md:text-xl leading-relaxed max-w-2xl mx-auto font-medium">
            An interdisciplinary technical hub where creativity, innovation, and excellence converge to shape the future of engineering.
          </p>
          
          <div className="mt-14 flex flex-wrap items-center justify-center gap-6">
            <a 
             
              rel="noopener noreferrer"
              className="bg-blue-600 hover:bg-blue-500 text-white px-10 py-4 rounded-full font-bold transition-all transform hover:scale-105 shadow-xl shadow-blue-500/20 text-sm"
            >
              🗓️ April 10th
            </a>
            
            <a 
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-8 py-4 bg-white/5 border border-white/10 rounded-full font-bold backdrop-blur-sm text-sm hover:bg-white/10 hover:border-blue-500/50 transition-all group"
            >
              <MapPin size={18} className="text-blue-400 group-hover:animate-bounce" />
              GRIET Campus
            </a>
          </div>
        </header>

        {/* Triple Feature Grid */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-40">
          {events.map((event, idx) => (
            <EventCard key={idx} {...event} />
          ))}
        </section>

        {/* Contact & Organizers Section */}
        <section id="contact" className="pt-20 border-t border-white/5">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8 text-center md:text-left">
            <div className="max-w-xl">
              <h2 className="text-4xl md:text-5xl font-black mb-4 tracking-tight">Connect with Us</h2>
              <p className="text-gray-400 text-lg">Reach out to our lead organizers for event-specific queries or collaboration opportunities.</p>
            </div>
            <div className="h-px flex-grow bg-white/10 mb-6 mx-12 hidden lg:block"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {organizers.map((person, idx) => (
              <OrganizerCard key={idx} {...person} />
            ))}
            
            {/* Quick Email Box */}
            <div className="bg-gradient-to-br from-blue-600/20 to-purple-700/20 border border-white/10 p-8 rounded-2xl flex flex-col justify-center relative overflow-hidden group">
              <div className="absolute -right-4 -top-4 text-white/5 group-hover:text-white/10 transition-colors">
                <Mail size={120} />
              </div>
              <h4 className="text-white font-bold text-xl mb-2">Have Questions?</h4>
              <p className="text-blue-200/60 text-sm mb-6">Drop us a mail for formal invitations or sponsorship details.</p>
              <a href="mailto:aac.griet@gmail.com" className="text-white font-bold hover:text-blue-400 transition-colors flex items-center gap-2">
                aac.griet@gmail.com <ArrowRight size={16} />
              </a>
            </div>
          </div>
        </section>

      </main>

      <Footer />

      {/* Smooth scroll anchor for the bounce arrow */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700;900&display=swap');
        html { scroll-behavior: smooth; }
      `}</style>
    </div>
  );
};

export default OpulenceLanding;

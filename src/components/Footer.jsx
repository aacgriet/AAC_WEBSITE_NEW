import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  FaInstagram, 
  FaYoutube, 
  FaLinkedin, 
  FaGithub 
} from 'react-icons/fa';

const Logo = () => {
  return (
    <Image 
      src="/images/logo.png" // Local image path
      height={144} 
      width={144} 
      alt="AAC Logo" 
    />
  );
};

const SocialButton = ({ children, label, href }) => {
  return (
    <a
      className="bg-black hover:bg-gray-700 text-white rounded-full w-12 h-12 inline-flex items-center justify-center transition-colors duration-300"
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
    >
      {children}
    </a>
  );
};

const Footer = () => {
  return (
    <footer>
      <div className="bg-[#172E7C] text-white">
        <div className="container mx-auto py-4 px-4">
          <div className="md:flex md:justify-between md:items-center">
            <Logo />
            
            <div className="flex flex-col md:mt-0 mt-4">
              <Link href="/News" className="py-2 font-bold text-white">
                News
              </Link>
              <Link href="/Events" className="py-2 font-bold text-white">
                Events
              </Link>
              <Link href="/Research" className="py-2 font-bold text-white">
                Research
              </Link>
              <Link href="/Administration" className="py-2 font-bold text-white">
                Administration
              </Link>
            </div>
            
            <div className="flex flex-col items-center md:mt-0 mt-4">
              <div className="flex space-x-6 mb-4">
                <SocialButton label="LinkedIn" href="https://www.linkedin.com/school/aac-griet/">
                  <FaLinkedin />
                </SocialButton>
                <SocialButton label="YouTube" href="https://www.youtube.com/channel/UCqpWtDtDLxBLy8yJZO_-eBw">
                  <FaYoutube />
                </SocialButton>
                <SocialButton label="Instagram" href="https://instagram.com/aac_grietofficial?igshid=YmMyMTA2M2Y=">
                  <FaInstagram />
                </SocialButton>
                <SocialButton label="GitHub" href="https://github.com/aacgriet">
                  <FaGithub />
                </SocialButton>
              </div>
              <a href="mailto:aacgriet.org@gmail.com" className="text-white">
                aacgriet.org@gmail.com
              </a>
            </div>
          </div>
        </div>
        
        <hr className="border-t border-gray-600" />
        
        <div className="text-center p-2 text-sm">
          © {new Date().getFullYear()} AAC Website. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
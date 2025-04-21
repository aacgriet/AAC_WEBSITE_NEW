import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-[#172E7C] text-[#CCE3FF]">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <button
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle Menu"
          >
            {isOpen ? (
              <CloseIcon color="black" boxSize={6} />
            ) : (
              <HamburgerIcon color="white" boxSize={6} />
            )}
          </button>

          <div className="hidden md:flex w-full items-center justify-between">
            <div className="flex w-full justify-between items-center space-x-4">
              <Link
                href="/Research"
                className="px-2 py-1 rounded-md hover:bg-gray-200 hover:text-gray-700"
              >
                RESEARCH
              </Link>
              <Link
                href="/Events"
                className="px-2 py-1 rounded-md hover:bg-gray-200 hover:text-gray-700"
              >
                EVENTS
              </Link>
              <Link
                href="/"
                className="nav-logo bg-[#CCE3FF] rounded-b-[30px] px-5 py-4 z-10"
              >
                <div className="nav-img mt-4 px-2">
                  <Image
                    width={190}
                    height={75}
                    src="/images/logo.png" // Local image path
                    alt="AAC Logo"
                  />
                </div>
              </Link>
              <Link
                href="/News"
                className="px-2 py-1 rounded-md hover:bg-gray-200 hover:text-gray-700"
              >
                NEWS
              </Link>
              <Link
                href="/Administration"
                className="px-2 py-1 rounded-md hover:bg-gray-200 hover:text-gray-700"
              >
                ADMINISTRATION
              </Link>
            </div>
          </div>
        </div>

        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden pb-4"
          >
            <div className="flex flex-col space-y-4">
              <Link
                href="/"
                className="px-2 py-1 rounded-md hover:text-gray-300"
                onClick={() => setIsOpen(false)}
              >
                HOME
              </Link>
              <Link
                href="/Research"
                className="px-2 py-1 rounded-md hover:text-gray-300"
                onClick={() => setIsOpen(false)}
              >
                RESEARCH
              </Link>
              <Link
                href="/Events"
                className="px-2 py-1 rounded-md hover:text-gray-300"
                onClick={() => setIsOpen(false)}
              >
                EVENTS
              </Link>
              <Link
                href="/News"
                className="px-2 py-1 rounded-md hover:text-gray-300"
                onClick={() => setIsOpen(false)}
              >
                NEWS
              </Link>
              <Link
                href="/Administration"
                className="px-2 py-1 rounded-md hover:text-gray-300"
                onClick={() => setIsOpen(false)}
              >
                ADMINISTRATION
              </Link>
            </div>
          </motion.div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

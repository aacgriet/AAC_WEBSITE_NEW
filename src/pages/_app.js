import React, { useEffect } from 'react';
import Head from 'next/head';
import { ChakraProvider } from '@chakra-ui/react';
import { Inter, Merriweather, Poppins } from 'next/font/google';
import '@/styles/globals.css';

// Import styles for Swiper
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// Load fonts
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const merriweather = Merriweather({
  subsets: ['latin'],
  weight: ['300', '400', '700', '900'],
  variable: '--font-merriweather',
});

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-poppins',
});

function MyApp({ Component, pageProps }) {
  // Prevent Lottie console warnings in development
  useEffect(() => {
    window.console.warn = () => {};
  }, []);

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="Advanced Academic Center (AAC) at GRIET, Hyderabad - An inter-disciplinary research centre focused on innovation and excellence" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <main className={`${inter.variable} ${merriweather.variable} ${poppins.variable}`}>
        <ChakraProvider>
          <Component {...pageProps} />
        </ChakraProvider>
      </main>
    </>
  );
}

export default MyApp;
// src/pages/_app.js
import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { Inter, Merriweather, Plus_Jakarta_Sans, Sora, Work_Sans } from 'next/font/google';
import { AnimatePresence } from 'framer-motion';
import '../styles/globals.css';

// Import styles for Swiper
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// Load Work Sans Variable font
const workSans = Work_Sans({
  subsets: ['latin'],
  variable: '--font-work-sans',
  display: 'swap',
});

// Load other modern fonts
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const merriweather = Merriweather({
  subsets: ['latin'],
  weight: ['300', '400', '700', '900'],
  variable: '--font-merriweather',
  display: 'swap',
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-jakarta',
  display: 'swap',
});

const sora = Sora({
  subsets: ['latin'],
  variable: '--font-sora',
  display: 'swap',
});

// Custom Chakra theme
const theme = extendTheme({
  colors: {
    brand: {
      50: '#e6eeff',
      100: '#b3cdff',
      200: '#80abff',
      300: '#4d8aff',
      400: '#1a68ff',
      500: '#0052e6',
      600: '#0041b3',
      700: '#003180',
      800: '#00204d',
      900: '#00101a',
    },
  },
  fonts: {
    heading: 'var(--font-work-sans), var(--font-sora), var(--font-merriweather)',
    body: 'var(--font-work-sans), var(--font-inter), var(--font-jakarta)',
  },
  components: {
    Button: {
      baseStyle: {
        fontWeight: 'medium',
        borderRadius: 'full',
      },
    },
  },
});

// Loading component
const LoadingScreen = () => (
  <div className="fixed inset-0 flex items-center justify-center bg-blue-900 z-50">
    <div className="flex flex-col items-center">
      <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin mb-4"></div>
      <p className="text-white text-lg">Loading</p>
    </div>
  </div>
);

function MyApp({ Component, pageProps, router }) {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Handle route change events for loading state
    const handleStart = () => setLoading(true);
    const handleComplete = () => setLoading(false);

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleComplete);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleComplete);
      router.events.off('routeChangeError', handleComplete);
    };
  }, [router]);

  // Prevent Lottie console warnings in development
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      window.console.warn = () => {};
    }
  }, []);

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="Advanced Academic Center (AAC) at GRIET, Hyderabad - An inter-disciplinary research centre focused on innovation and excellence" />
        <link rel="icon" href="/images/logo.png" />
      </Head>
      
      <main className={`${inter.variable} ${merriweather.variable} ${jakarta.variable} ${sora.variable} ${workSans.variable} font-sans`}>
        <ChakraProvider theme={theme}>
          {loading && <LoadingScreen />}
          
          <AnimatePresence mode="wait">
            <Component {...pageProps} key={router.route} />
          </AnimatePresence>
        </ChakraProvider>
      </main>
    </>
  );
}

export default MyApp;
import Layout from "@/components/Layout";
import { motion } from "framer-motion";

export default function Certificates() {
  return (
    <Layout title="Certificates">

      <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-black">

       
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -left-20 top-10 h-72 w-72 rounded-full bg-blue-600/30 blur-3xl animate-pulse"></div>
          <div className="absolute -right-10 bottom-10 h-80 w-80 rounded-full bg-indigo-500/30 blur-3xl animate-pulse"></div>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-6 pt-36 pb-20 text-center">

          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-bold tracking-tight text-white mb-6"
          >
            Certificate Verification & Downloads 2025
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-gray-300 max-w-2xl mx-auto mb-10"
          >
            Click the button below to securely access and download your issued certificates.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="backdrop-blur-sm bg-white/5 border border-white/10 rounded-2xl p-10 inline-block shadow-xl"
          >
            <a
              href="https://drive.google.com/drive/folders/1TO3oFYhKPytZVesEE3WUlHmZAE6mb6sE?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 rounded-xl text-white bg-blue-600 hover:bg-blue-700 shadow-lg transition transform hover:-translate-y-0.5"
            >
              Open Certificates Folder
            </a>
          </motion.div>

        </div>
      </div>
    </Layout>
  );
}

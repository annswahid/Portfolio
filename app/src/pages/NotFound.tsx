import { Link } from "react-router";
import { motion } from "framer-motion";
import { ArrowLeft, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-cyan-900/20" />
      <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 text-center"
      >
        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center mx-auto mb-6">
          <Sparkles className="w-10 h-10 text-white" />
        </div>
        <h1
          className="text-7xl sm:text-9xl font-black text-white mb-4"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          404
        </h1>
        <p className="text-xl text-gray-400 mb-8">
          This page got lost in the starfield
        </p>
        <Link to="/">
          <Button className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white px-8">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </Link>
      </motion.div>
    </div>
  );
}

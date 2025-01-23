import { Github, Linkedin, ArrowRight } from "lucide-react";
import { Element } from "react-scroll";

const Hero = () => {
  return (
    <section className="min-h-screen flex items-center justify-center bg-navy pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-purple-light text-lg mb-4 animate-fade-in">Product Manager</p>
          <h1 className="text-4xl sm:text-6xl font-bold text-white mb-6 animate-fade-in">
             Fintech & Automotive <span className="text-purple-light">Innovations</span>
          </h1>
          <p className="text-xl sm:text-2xl text-gray-300 mb-8 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            Bridging the gap between technology and mobility solutions
          </p>
          <div className="flex justify-center space-x-4 mb-12 animate-fade-in" style={{ animationDelay: "0.4s" }}>
            <a
              href="https://github.com/priyanshukumar0309"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-white transition-colors"
            >
              <Github size={24} />
            </a>
            <a
              href="https://linkedin.com/in/kpriyanshu"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-white transition-colors"
            >
              <Linkedin size={24} />
            </a>
          </div>
          <a
            href="projects"
            className="inline-flex items-center px-6 py-3 bg-purple hover:bg-purple-light text-white font-semibold rounded-lg transition-colors animate-fade-in"
            style={{ animationDelay: "0.6s" }}
          >
            View My Work
            <ArrowRight className="ml-2" size={20} />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
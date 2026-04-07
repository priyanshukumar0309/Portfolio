import { Github, Linkedin, ArrowRight } from "lucide-react";
import { portfolioOwner } from "@/data/portfolioContent";

const Hero = () => {
  return (
    <section
      className="min-h-screen flex items-center justify-center bg-navy pt-16 relative"
      style={{
        backgroundImage: "url('/hero.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-85"></div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-purple-light text-4xl mb-4 animate-fade-in">{portfolioOwner.title}</h1>
          <h2 className="text-2xl sm:text-6xl font-bold text-white mb-6 animate-fade-in">
            {portfolioOwner.heroTitle.split(" ").slice(0, -1).join(" ")} <span className="text-green-400">{portfolioOwner.heroTitle.split(" ").slice(-1)}</span>
          </h2>
          <p
            className="text-xl sm:text-2xl text-gray-300 mb-8 animate-fade-in"
            style={{ animationDelay: "0.2s" }}
          >
            {portfolioOwner.heroSubtitle}
          </p>
          <div
            className="flex justify-center space-x-4 mb-12 animate-fade-in"
            style={{ animationDelay: "0.4s" }}
          >
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
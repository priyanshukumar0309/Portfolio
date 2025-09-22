import { ExternalLink, Github, Car, CreditCard, Gauge, Banknote, Building2 } from "lucide-react";

interface Project {
  title: string;
  description: string;
  image: string;
  technologies: string[];
  liveUrl: string;
  icon: JSX.Element;
}

const projects: Project[] = [
  {
    title: "Finafa.eu",
    description: "Founder of end-to-end SMB finance management platform. Comprehensive financial solutions for small and medium businesses including accounting, invoicing, expense tracking, and financial analytics.",
    image: "/Fino.webp",
    technologies: ["React", "Node.js", "PostgreSQL", "Stripe", "AWS"],
    liveUrl: "https://finafa.eu",
    icon: <Building2 className="text-purple-light" size={24} />,
  },
  {
    title: "Autmobile LoanHub",
    description: "Car LoanHub is a platform that simplifies car financing by helping you compare and choose the best leasing and loan options",
    image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80",
    technologies: ["React Native", "Node.js", "PostgreSQL"],
    liveUrl: "https://loanhub.kumarpriyanshu.in/",
    icon: <Car className="text-purple-light" size={24} />,
  },
];

const ProjectGrid = () => {
  return (
    <>
      <section id="projects" className="py-20 bg-navy-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-12 text-center">Featured Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <div
                key={index}
                className="bg-navy p-6 rounded-xl hover:transform hover:scale-105 transition-all duration-300"
              >
                <div className="flex items-center mb-4">
                  {project.icon}
                  <h3 className="text-xl font-semibold text-white ml-2">{project.title}</h3>
                </div>
                <div className="relative aspect-video mb-4 overflow-hidden rounded-lg">
                  {/* Floating Bubbles for Finafa.eu */}
                  {project.title === "Finafa.eu" && (
                    <>
                      <div className="absolute top-4 left-4 w-3 h-3 bg-blue-400 rounded-full opacity-60 animate-bubble-float-1"></div>
                      <div className="absolute top-8 right-6 w-2 h-2 bg-green-400 rounded-full opacity-50 animate-bubble-float-2"></div>
                      <div className="absolute bottom-6 left-8 w-2.5 h-2.5 bg-purple-400 rounded-full opacity-55 animate-bubble-float-3"></div>
                      <div className="absolute bottom-4 right-4 w-2 h-2 bg-cyan-400 rounded-full opacity-45 animate-bubble-float-4"></div>
                      <div className="absolute top-12 left-12 w-1.5 h-1.5 bg-yellow-400 rounded-full opacity-40 animate-bubble-float-5"></div>
                      <div className="absolute bottom-12 right-12 w-3 h-3 bg-pink-400 rounded-full opacity-35 animate-bubble-float-6"></div>
                    </>
                  )}
                  
                  <img
                    src={project.image}
                    alt={project.title}
                    className={`w-full h-full ${
                      project.title === "Finafa.eu" 
                        ? "object-contain animate-float" 
                        : "object-cover"
                    }`}
                    style={project.title === "Finafa.eu" ? {
                      animation: "float 3s ease-in-out infinite",
                      transformOrigin: "center bottom",
                      backgroundColor: "transparent",
                      filter: "drop-shadow(0 0 20px rgba(59, 130, 246, 0.3)) drop-shadow(0 0 40px rgba(16, 185, 129, 0.2))",
                    } : {}}
                  />
                  
                  {/* Enhanced Glow Effect for Finafa.eu */}
                  {project.title === "Finafa.eu" && (
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-green-500/10 to-purple-500/10 rounded-lg animate-glow-pulse"></div>
                  )}
                </div>
                <p className="text-gray-300 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-3 py-1 bg-purple/20 text-purple-light rounded-full text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex space-x-4">
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-white hover:text-purple-light transition-colors"
                  >
                    <ExternalLink size={20} className="mr-2" />
                    Live Demo
                  </a>
                  
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Custom CSS for floating animation and bubble effects */}
      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          25% {
            transform: translateY(-8px) rotate(1deg);
          }
          50% {
            transform: translateY(-12px) rotate(0deg);
          }
          75% {
            transform: translateY(-8px) rotate(-1deg);
          }
        }

        @keyframes bubble-float-1 {
          0%, 100% { transform: translateY(0px) translateX(0px) scale(1); }
          25% { transform: translateY(-6px) translateX(3px) scale(1.1); }
          50% { transform: translateY(-12px) translateX(0px) scale(0.9); }
          75% { transform: translateY(-6px) translateX(-3px) scale(1.05); }
        }

        @keyframes bubble-float-2 {
          0%, 100% { transform: translateY(0px) translateX(0px) scale(1); }
          33% { transform: translateY(-8px) translateX(-2px) scale(1.2); }
          66% { transform: translateY(-4px) translateX(4px) scale(0.8); }
        }

        @keyframes bubble-float-3 {
          0%, 100% { transform: translateY(0px) translateX(0px) scale(1); }
          20% { transform: translateY(-10px) translateX(2px) scale(1.15); }
          40% { transform: translateY(-5px) translateX(-3px) scale(0.85); }
          60% { transform: translateY(-15px) translateX(1px) scale(1.1); }
          80% { transform: translateY(-8px) translateX(-1px) scale(0.95); }
        }

        @keyframes bubble-float-4 {
          0%, 100% { transform: translateY(0px) translateX(0px) scale(1); }
          30% { transform: translateY(-7px) translateX(-4px) scale(1.3); }
          70% { transform: translateY(-14px) translateX(3px) scale(0.7); }
        }

        @keyframes bubble-float-5 {
          0%, 100% { transform: translateY(0px) translateX(0px) scale(1); }
          40% { transform: translateY(-9px) translateX(2px) scale(1.4); }
          80% { transform: translateY(-3px) translateX(-2px) scale(0.6); }
        }

        @keyframes bubble-float-6 {
          0%, 100% { transform: translateY(0px) translateX(0px) scale(1); }
          25% { transform: translateY(-5px) translateX(-3px) scale(1.1); }
          50% { transform: translateY(-12px) translateX(2px) scale(0.9); }
          75% { transform: translateY(-8px) translateX(4px) scale(1.2); }
        }

        @keyframes glow-pulse {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.6; }
        }

        .animate-bubble-float-1 { animation: bubble-float-1 4s ease-in-out infinite; }
        .animate-bubble-float-2 { animation: bubble-float-2 3.5s ease-in-out infinite; }
        .animate-bubble-float-3 { animation: bubble-float-3 5s ease-in-out infinite; }
        .animate-bubble-float-4 { animation: bubble-float-4 4.5s ease-in-out infinite; }
        .animate-bubble-float-5 { animation: bubble-float-5 3.8s ease-in-out infinite; }
        .animate-bubble-float-6 { animation: bubble-float-6 4.2s ease-in-out infinite; }
        .animate-glow-pulse { animation: glow-pulse 2s ease-in-out infinite; }
      `}</style>
    </>
  );
};

export default ProjectGrid;
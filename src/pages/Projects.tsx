import Navbar from "@/components/Navbar";
import ProjectGrid from "@/components/ProjectGrid";

const Projects = () => {
  return (
    <div className="bg-navy min-h-screen">
      <Navbar />
      <div className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-4xl font-bold text-white mb-8 animate-fade-in">Featured Projects</h1>
          <p className="text-gray-300 mb-12 max-w-2xl animate-fade-in" style={{ animationDelay: "0.2s" }}>
            Explore my portfolio of fintech and automotive innovations, showcasing the intersection of financial technology and mobility solutions.
          </p>
          <ProjectGrid />
        </div>
      </div>
    </div>
  );
};

export default Projects;
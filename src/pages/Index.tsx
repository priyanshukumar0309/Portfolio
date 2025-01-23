import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Contact from "@/components/Contact";
import ProjectGrid from "@/components/ProjectGrid";

const Index = () => {
  return (
    <div className="bg-navy min-h-screen">
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Contact />
      <ProjectGrid />
    </div>
  );
};

export default Index;
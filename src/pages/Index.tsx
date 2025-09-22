import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Contact from "@/components/Contact";
import ScrollAnimation from "@/components/ScrollAnimation";

const Index = () => {
  return (
    <div className="bg-navy min-h-screen">
      <Navbar />
      <ScrollAnimation />
      <Hero />
      <About />
      <Skills />
      <Contact />
    </div>
  );
};

export default Index;
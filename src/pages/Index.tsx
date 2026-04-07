import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Contact from "@/components/Contact";
import ScrollAnimation from "@/components/ScrollAnimation";
import ProjectSpaceMode from "@/components/ProjectSpaceMode";

const Index = () => {
  const [spaceMode, setSpaceMode] = useState(true);
  useEffect(() => {
    const handler = () => setSpaceMode((prev) => !prev);
    window.addEventListener("toggle-space-mode", handler as EventListener);
    return () => window.removeEventListener("toggle-space-mode", handler as EventListener);
  }, []);

  return (
    <>
      {spaceMode ? (
        <ProjectSpaceMode />
      ) : (
        <div className="bg-navy min-h-screen">
          <Navbar />
          <ScrollAnimation />
          <Hero />
          <About />
          <Skills />
          <Contact />
        </div>
      )}
    </>
  );
};

export default Index;
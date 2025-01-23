import { ExternalLink, Github, Car, CreditCard, Gauge, Banknote } from "lucide-react";

interface Project {
  title: string;
  description: string;
  image: string;
  technologies: string[];
  liveUrl: string;
  githubUrl: string;
  icon: JSX.Element;
}

const projects: Project[] = [
  {
    title: "FinDrive Analytics",
    description: "An AI-powered platform analyzing vehicle financing patterns and predicting market trends for automotive lenders.",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80",
    technologies: ["Python", "TensorFlow", "React", "AWS"],
    liveUrl: "https://project1.vercel.app",
    githubUrl: "https://github.com/yourusername/project1",
    icon: <Gauge className="text-purple-light" size={24} />,
  },
  {
    title: "AutoPay Gateway",
    description: "A secure payment processing system specifically designed for automotive dealerships and service centers.",
    image: "https://images.unsplash.com/photo-1580674285054-bed31e145f59?auto=format&fit=crop&w=800&q=80",
    technologies: ["Node.js", "Stripe API", "React", "MongoDB"],
    liveUrl: "https://project2.vercel.app",
    githubUrl: "https://github.com/yourusername/project2",
    icon: <CreditCard className="text-purple-light" size={24} />,
  },
  {
    title: "Vehicle Fleet Management",
    description: "Real-time fleet tracking and management system with integrated financial reporting and maintenance scheduling.",
    image: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&w=800&q=80",
    technologies: ["React Native", "Node.js", "PostgreSQL"],
    liveUrl: "https://project3.vercel.app",
    githubUrl: "https://github.com/yourusername/project3",
    icon: <Car className="text-purple-light" size={24} />,
  },
  {
    title: "Auto Loan Optimizer",
    description: "Machine learning-based loan approval and optimization system for automotive financing institutions.",
    image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80",
    technologies: ["Python", "scikit-learn", "FastAPI", "React"],
    liveUrl: "https://project4.vercel.app",
    githubUrl: "https://github.com/yourusername/project4",
    icon: <Banknote className="text-purple-light" size={24} />,
  },
];

const ProjectGrid = () => {
  return (
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
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
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
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-white hover:text-purple-light transition-colors"
                >
                  <Github size={20} className="mr-2" />
                  Code
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectGrid;
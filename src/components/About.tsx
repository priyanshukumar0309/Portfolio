import { Briefcase, Car, LineChart } from "lucide-react";
import { Element } from "react-scroll";

const About = () => {
  return (
    <Element name="about">
    <section id="about" className="py-20 bg-navy-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1">
            <h2 className="text-3xl font-bold text-white mb-6">About Me</h2>
            <div className="space-y-6 text-gray-300">
              <p className="flex items-center gap-2">
                <Briefcase className="text-purple-light flex-shrink-0" size={20} />
                Product Manager with expertise in fintech and automotive technologies
              </p>
              <p className="flex items-center gap-2">
                <Car className="text-purple-light flex-shrink-0" size={20} />
                Passionate about revolutionizing mobility solutions through innovative financial technology
              </p>
              <p className="flex items-center gap-2">
                <LineChart className="text-purple-light flex-shrink-0" size={20} />
                Experienced in leading cross-functional teams to deliver data-driven solutions
              </p>
              <p className="mt-6">
                I specialize in bridging the gap between automotive innovation and financial technology,
                creating solutions that make vehicle ownership and mobility more accessible and efficient.
                My experience spans from developing vehicle financing platforms to implementing
                fleet management solutions.
              </p>
            </div>
          </div>
          <div className="order-1 md:order-2">
            <div className="relative">
              <div className="aspect-square rounded-2xl overflow-hidden">
                <img
                  src="./aboutMe.jpg"
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute inset-0 bg-purple/20 rounded-2xl"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
    </Element>
  );
};

export default About;
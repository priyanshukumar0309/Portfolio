import { Briefcase, Car, LineChart, GraduationCap, Landmark, CreditCard, type LucideIcon } from "lucide-react";
import { Element } from "react-scroll";
import { aboutContent, journeyItems } from "@/data/portfolioContent";
import { inlineBold } from "@/utils/inlineBold";

function journeyIcon(company: string): LucideIcon {
  if (company.includes("Volvo")) return Car;
  if (company.includes("Paysafe")) return CreditCard;
  if (company.includes("ICICI")) return Landmark;
  return GraduationCap;
}

const About = () => {
  return (
    <Element name="about">
      <section id="about" className="py-20 bg-navy-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Left Column */}
            <div className="order-2 md:order-1">
              <h2 className="text-4xl font-bold text-white mb-6">About Me</h2>
              <div className="space-y-6 text-gray-300">
                <p className="flex items-center gap-2">
                  <Briefcase className="text-purple-light flex-shrink-0" size={20} />
                  {inlineBold(aboutContent.bullets[0])}
                </p>
                <p className="flex items-center gap-2">
                  <Car className="text-purple-light flex-shrink-0" size={20} />
                  {inlineBold(aboutContent.bullets[1])}
                </p>
                <p className="flex items-center gap-2">
                  <LineChart className="text-purple-light flex-shrink-0" size={20} />
                  {inlineBold(aboutContent.bullets[2])}
                </p>
                <p className="mt-6">{inlineBold(aboutContent.summary)}</p>
              </div>
            </div>

            {/* Right Column */}
            <div className="order-1 md:order-2">
              <div className="relative">
                <div className="rounded-bl-3xl rounded-tr-3xl overflow-hidden">
                  <img
                    src="./aboutMe.png"
                    alt="Profile"
                    className="w-full h-auto object-cover rounded-2xl"
                    style={{ 
                      backgroundColor: 'transparent'
                    }}
                  />
                </div>
                <div className="absolute inset-0 rounded-2xl"></div>
              </div>
            </div>
          </div>
          
          
          {/* Timeline Section*/}

          <div className="mt-16">
            <h3 className="text-4xl font-semibold text-white mb-6">My Journey</h3>
            <div className="space-y-8 border-l-2 border-gray-700 w-full">
              <div className="w-8 flex justify-center items-center">
                <div className="w-8 bg-gray-700 h-full"></div>
              </div> 

              {journeyItems.map((item) => {
                const Icon = journeyIcon(item.company);
                return (
                  <div key={`${item.company}-${item.period}-${item.role}`} className="flex gap-4 pl-8 relative">
                    <Icon className="text-purple-light flex-shrink-0" size={40} />
                    <div className="flex justify-between w-full gap-4">
                      <div>
                        <h3 className="text-2xl font-medium text-white">
                          {item.company} — {item.role}
                        </h3>
                        <ul className="list-disc list-inside text-gray-400 mt-2 space-y-1">
                          <h4 className="text-m font-medium text-gray-300 list-none -ml-4 mb-1">{inlineBold(item.highlight)}</h4>
                          {item.bullets.map((b, bi) => (
                            <li key={bi}>{inlineBold(b)}</li>
                          ))}
                        </ul>
                      </div>
                      <p className="text-gray-100 shrink-0 self-start">{item.period}</p>
                    </div>
                  </div>
                );
              })}

            </div>
          </div>
        </div>
      </section>
    </Element>
  );
};

export default About;

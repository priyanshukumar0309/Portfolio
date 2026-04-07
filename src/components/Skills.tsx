import { Element } from "react-scroll";
import { skillCategories } from "@/data/portfolioContent";

const Skills = () => {
  return (
    <Element name="skills">
    <section id="skills" className="py-20 bg-navy">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-white mb-12 text-center">Skills & Expertise</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {skillCategories.map((category, index) => (
            <div
              key={index}
              className="bg-navy-light p-6 rounded-xl hover:transform hover:scale-105 transition-all duration-300"
            >
              <h3 className="text-xl font-semibold text-white mb-4">{category.title}</h3>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, skillIndex) => (
                  <span
                    key={skillIndex}
                    className="px-3 py-1 bg-green-400 text-black rounded-full text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
    </Element>
  );
};

export default Skills;
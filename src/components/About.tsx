const About = () => {
  return (
    <section id="about" className="py-20 bg-navy-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1">
            <h2 className="text-3xl font-bold text-white mb-6">About Me</h2>
            <div className="space-y-4 text-gray-300">
              <p>
                Hello! I'm a passionate full-stack developer with a love for creating beautiful,
                functional, and user-friendly applications. My journey in tech started with...
              </p>
              <p>
                I specialize in building modern web applications using cutting-edge technologies.
                When I'm not coding, you can find me exploring new technologies, contributing to
                open-source projects, or sharing my knowledge with the developer community.
              </p>
              <p>
                Currently, I'm focused on building accessible, human-centered products that make
                a real difference in people's lives.
              </p>
            </div>
          </div>
          <div className="order-1 md:order-2">
            <div className="relative">
              <div className="aspect-square rounded-2xl overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80"
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
  );
};

export default About;
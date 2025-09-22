import { Mail, Github, Linkedin, Calendar } from "lucide-react";
import { Element } from "react-scroll";

const Contact = () => {

  return (
    <Element name="contact">
    <section id="contact" className="py-20 bg-navy">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Get In Touch</h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            I'm currently open to new opportunities and collaborations. Whether you have a question
            or just want to say hi, feel free to reach out!
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6">
            <a
              href="mailto:kumar.priyanshu.official@gmail.com"
              className="flex items-center px-4 sm:px-6 py-3 bg-purple hover:bg-purple-light text-white font-semibold rounded-lg transition-colors w-full sm:w-auto justify-center"
            >
              <Mail className="mr-2" size={20} />
              Email Me
            </a>
            <a
              href="https://calendar.app.google/Cj7ZFp33coEQR8zv5"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center px-4 sm:px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-colors w-full sm:w-auto justify-center"
            >
              <Calendar className="mr-2" size={20} />
              Schedule Meeting
            </a>
            <a
              href="https://github.com/priyanshukumar0309"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center px-4 sm:px-6 py-3 bg-navy-light hover:bg-navy text-white font-semibold rounded-lg transition-colors w-full sm:w-auto justify-center"
            >
              <Github className="mr-2" size={20} />
              GitHub
            </a>
            <a
              href="https://linkedin.com/in/kpriyans"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center px-4 sm:px-6 py-3 bg-navy-light hover:bg-navy text-white font-semibold rounded-lg transition-colors w-full sm:w-auto justify-center"
            >
              <Linkedin className="mr-2" size={20} />
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </section>
    </Element>
  );
};

export default Contact;
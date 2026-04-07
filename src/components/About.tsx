import { Briefcase, Car, LineChart, Calendar, GraduationCap, Landmark,CreditCard } from "lucide-react";
import { Element } from "react-scroll";
import { aboutContent, journeyItems } from "@/data/portfolioContent";

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
                  {aboutContent.bullets[0]}
                </p>
                <p className="flex items-center gap-2">
                  <Car className="text-purple-light flex-shrink-0" size={20} />
                  {aboutContent.bullets[1]}
                </p>
                <p className="flex items-center gap-2">
                  <LineChart className="text-purple-light flex-shrink-0" size={20} />
                  {aboutContent.bullets[2]}
                </p>
                <p className="mt-6">
                  {aboutContent.summary}
                </p>
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

              {/* Timeline Item 1 */}
              <div className="flex gap-4 pl-8 relative">
                <Car className="text-purple-light flex-shrink-0" size={40} />
                <div className="flex justify-between w-full">
                  <div>
                    <h3 className="text-2xl font-medium text-white">{journeyItems[0].company} - {journeyItems[0].role}</h3>
                    
                    <ul className="list-disc list-inside text-gray-400 mt-2">
                    <h4 className="text-m font-medium text-gray-300">{journeyItems[0].highlight}</h4>  
                      <li>{journeyItems[0].bullets[0]}</li>
                      <li>{journeyItems[0].bullets[1]}</li>
                    </ul>
                  </div>
                  <p className="text-gray-100 ">{journeyItems[0].period}</p>
                </div>
              </div>

              {/* Timeline Item 2 */}
              <div className="flex gap-4 pl-8 relative">
                <CreditCard className="text-purple-light flex-shrink-0" size={40} />
                <div className="flex justify-between w-full">
                  <div>
                    <h3 className="text-2xl font-medium text-white">Paysafe - Senior Product Manager</h3>
                    <ul className="list-disc list-inside text-gray-400 mt-2">
                    <h4 className="text-m font-medium text-gray-300">Promoted to work on strategies after being involved in execution</h4>  
                      <li>Global strategy for APMs,APIs and Checkout; expanding into Crypto, iGaming, and Travel</li>
                      <li>4500+ clients with annual $20B+ volume.</li>
                    </ul>
                  </div>
                  <p className="text-gray-100 self-start">2023-2024</p>
                </div>
              </div>

              {/* Timeline Item 3 */}
              <div className="flex gap-4 pl-8 relative">
                <CreditCard className="text-purple-light flex-shrink-0" size={40} />
                <div className="flex justify-between w-full">
                  <div>
                    <h3 className="text-2xl font-medium text-white">Paysafe - Product Manager</h3>
                    <ul className="list-disc list-inside text-gray-400 mt-2">
                    <h4 className="text-m font-medium text-gray-300">I was hired to work on development of new API products  </h4>  

                      <li>Payments API GTM, APM integrations, Checkout Development</li>
                      <li>Payment services to API-based solutions across global markets</li>
                    </ul>
                  </div>
                  <p className="text-gray-100 self-start">2021-2023</p>
                </div>
              </div>

              {/* Timeline Item 4 */}
              <div className="flex gap-4 pl-8 relative">
                <Landmark className="text-purple-light flex-shrink-0" size={40} />
                <div className="flex justify-between w-full">
                  <div>
                    <h3 className="text-2xl font-medium text-white">ICICI Bank - Product Manager</h3>
                    <ul className="list-disc list-inside text-gray-400 mt-2">
                    <h4 className="text-m font-medium text-gray-300">Fresh College Gradutate to work as Analyst and implementor of solutions</h4>  

                      <li>API Gateway development, integrating 20+ products with 40M+ daily transactions.</li>
                      <li>Managed ICICI Bank API portal, VKYC, UPI, APIGEE and Layer 7 Gateway</li>
                    </ul>
                  </div>
                  <p className="text-gray-100 self-start">2019-2021</p>
                </div>
              </div>

              {/* Timeline Item 5 */}
              <div className="flex gap-4 pl-8 relative">
                <GraduationCap className="text-purple-light flex-shrink-0" size={40} />
                <div className="flex justify-between w-full">
                  <div>
                    <h3 className="text-2xl font-medium text-white">IIT Bombay</h3>
                    <ul className="list-disc list-inside text-gray-400 mt-2">
                    <h4 className="text-m font-medium text-gray-300">Best Years of my life till date</h4>  

                      <li>B. Tech Honors in Civil Engineering specialized in Remote Sensing and Image Processing </li>
                      <li>Purdue University Visiting Researcher; Undergraduate Research Award</li>
                      <li>Freshmen Mentor; General Secretary H2</li>
                    </ul>
                  </div>
                  <p className="text-gray-100 self-start">2015-2019</p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>
    </Element>
  );
};

export default About;

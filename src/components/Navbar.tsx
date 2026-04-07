import { useState } from "react";
import { Menu, X, Home, User, Code, Mail, Briefcase, BookOpen, Sparkles } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { Link as ScrollLink, scroller } from "react-scroll";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { name: "Home", href: "/", isScroll: false, icon: Home },
    { name: "About", href: "about", isScroll: true, icon: User },
    { name: "Skills", href: "skills", isScroll: true, icon: Code },
    { name: "Contact", href: "contact", isScroll: true, icon: Mail },
    { name: "Projects", href: "/projects", isScroll: false, icon: Briefcase },
    { name: "Blog", href: "/blog", isScroll: false, icon: BookOpen },
  ];

  const toggleSpaceMode = () => {
    window.dispatchEvent(new CustomEvent("toggle-space-mode"));
    navigate("/");
    setIsOpen(false);
  };

  const handleNavClick = (href: string, isScroll: boolean) => {
    if (isScroll) {
      if (location.pathname === "/") {
        // Scroll directly if already on the home page
        scroller.scrollTo(href, {
          smooth: true,
          duration: 500,
          offset: -70, // Adjust based on your navbar height
        });
      } else {
        // Navigate to home and scroll after navigation
        navigate("/");
        setTimeout(() => {
          scroller.scrollTo(href, {
            smooth: true,
            duration: 500,
            offset: -70,
          });
        }, 300); // Ensure the navigation is complete
      }
    } else {
      // Navigate normally for non-scroll links
      navigate(href);
    }
    setIsOpen(false);
  };

  return (
    <nav className="fixed top-0 w-full bg-navy/80 backdrop-blur-md z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <ScrollLink
              to="/"
              smooth
              className="text-white font-bold text-xl cursor-pointer"
              onClick={() => navigate("/")}
            >
              Kumar Priyanshu
            </ScrollLink>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navItems.map((item) => {
                const IconComponent = item.icon;
                return (
                  <button
                    key={item.name}
                    onClick={() => handleNavClick(item.href, item.isScroll)}
                    className={`${
                      location.pathname === item.href
                        ? "text-purple-light"
                        : "text-gray-300 hover:text-white"
                    } px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-2`}
                  >
                    <IconComponent size={16} />
                    {item.name}
                  </button>
                );
              })}
              <button
                onClick={toggleSpaceMode}
                className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-2"
              >
                <Sparkles size={16} />
                Space Mode
              </button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-300 hover:text-white"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-navy">
            {navItems.map((item) => {
              const IconComponent = item.icon;
              return (
                <button
                  key={item.name}
                  onClick={() => handleNavClick(item.href, item.isScroll)}
                  className={`${
                    location.pathname === item.href
                      ? "text-purple-light"
                      : "text-gray-300 hover:text-white"
                  } px-3 py-2 rounded-md text-base font-medium flex items-center gap-3 w-full`}
                >
                  <IconComponent size={18} />
                  {item.name}
                </button>
              );
            })}
            <button
              onClick={toggleSpaceMode}
              className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-base font-medium flex items-center gap-3 w-full"
            >
              <Sparkles size={18} />
              Space Mode
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
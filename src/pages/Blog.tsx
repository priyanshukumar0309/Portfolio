import Navbar from "@/components/Navbar";
import { ArrowRight } from "lucide-react";

const blogPosts = [
  {
    title: "Measurement",
    excerpt: "ICSE curriculum is quite rigorous in academics...",
    date: "2022-03-15",
    readTime: "2 min read",
    category: "Science and Philosophy",
    link:'https://www.linkedin.com/posts/kpriyanshu_icse-curriculum-is-quite-rigorous-in-academics-activity-6915290630717898752-SoLQ'
  }
];

const Blog = () => {
  return (
    <div className="bg-navy min-h-screen">
      <Navbar />
      <div className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-4xl font-bold text-white mb-8 animate-fade-in">Blog & Insights</h1>
          <p className="text-gray-300 mb-12 max-w-2xl animate-fade-in" style={{ animationDelay: "0.2s" }}>
            Thoughts and insights on fintech, automotive technology, and product management.
          </p>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {blogPosts.map((post, index) => (
              <div
                key={index}
                className="bg-navy-light p-6 rounded-xl hover:transform hover:scale-105 transition-all duration-300 animate-fade-in"
                style={{ animationDelay: `${0.2 * (index + 1)}s` }}
              >
                <div className="flex justify-between items-start mb-4">
                  <span className="text-purple-light text-sm">{post.category}</span>
                  <span className="text-gray-400 text-sm">{post.date}</span>
                </div>
                <h2 className="text-xl font-semibold text-white mb-3">{post.title}</h2>
                <p className="text-gray-300 mb-4">{post.excerpt}</p>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 text-sm">{post.readTime}</span>
                  <button
                    onClick={() => window.open(post.link, "_blank", "noopener,noreferrer")} // Replace 'post.link' with the actual URL or dynamic value
                    className="text-purple-light hover:text-purple transition-colors flex items-center gap-2"
                  >
                    Read More <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
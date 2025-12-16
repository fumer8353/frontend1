const About = () => {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8">
        <h1 className="text-4xl font-bold mb-6 text-gray-800 dark:text-gray-100">About Us</h1>
        
        <div className="space-y-6 text-gray-700 dark:text-gray-300">
          <section>
            <h2 className="text-2xl font-semibold mb-3 text-gray-800 dark:text-gray-100">Welcome to Our Blog</h2>
            <p className="leading-relaxed">
              We are passionate about sharing knowledge, insights, and stories through our carefully curated blog posts. 
              Our mission is to provide valuable content that inspires, educates, and entertains our readers.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3 text-gray-800 dark:text-gray-100">Our Story</h2>
            <p className="leading-relaxed">
              Founded with a vision to create a platform where ideas flourish and conversations begin, our blog 
              has grown into a community of engaged readers and talented writers. We believe in the power of 
              words to change perspectives and drive positive change.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3 text-gray-800 dark:text-gray-100">What We Offer</h2>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Regular blog posts on various topics</li>
              <li>Premium content for subscribed members</li>
              <li>Interactive comments and community engagement</li>
              <li>Expert insights and thought leadership</li>
              <li>Early access to new articles for premium members</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3 text-gray-800 dark:text-gray-100">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <h3 className="font-semibold text-gray-800 dark:text-gray-100 mb-2">Quality Content</h3>
                <p className="text-sm">We prioritize well-researched, high-quality articles that provide real value to our readers.</p>
              </div>
              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <h3 className="font-semibold text-gray-800 dark:text-gray-100 mb-2">Community First</h3>
                <p className="text-sm">Our community is at the heart of everything we do. We listen, engage, and grow together.</p>
              </div>
              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <h3 className="font-semibold text-gray-800 dark:text-gray-100 mb-2">Innovation</h3>
                <p className="text-sm">We continuously evolve our platform to provide the best reading and writing experience.</p>
              </div>
              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <h3 className="font-semibold text-gray-800 dark:text-gray-100 mb-2">Transparency</h3>
                <p className="text-sm">We believe in being open, honest, and transparent with our readers and contributors.</p>
              </div>
            </div>
          </section>

          <section className="pt-6 border-t border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-semibold mb-3 text-gray-800 dark:text-gray-100">Join Our Community</h2>
            <p className="leading-relaxed">
              Whether you're a reader looking for insightful content or a writer with stories to share, we welcome you 
              to join our growing community. Sign up today to start your journey with us!
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default About;


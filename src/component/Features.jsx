import { motion } from 'framer-motion';
import { Banknote, ChartArea, ClipboardClock, FileLock, FilePenLine, FileText, Utensils } from 'lucide-react';
import React from 'react';



const Features = () => {
    return (
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        viewport={{ once: true, amount: 0.3 }}
        whileHover={{ scale: 1.02 }}
        className="my-5"
      >
        <section className="py-10 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="md:text-4xl text-2xl font-bold text-center md:mb-10 mb-5 font-poppins">
              <span className="text-primary">Why Choose</span> MealMaster?
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* কার্ড ১ */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow"
              >
                <div className=" w-20 h-20 rounded-lg flex items-center justify-center mb-6">
                  <ClipboardClock
                    size={208}
                    className="text-secondary"
                    strokeWidth={2.5}
                  />
                </div>
                <h3 className="text-xl font-bold mb-3">Easy Tracking</h3>
                <p className="text-gray-600 leading-relaxed">
                  Update daily meals with just a single click. Say goodbye to
                  manual paperwork!
                </p>
              </motion.div>

              {/* কার্ড 3 (বাকিগুলো এভাবে...) */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow"
              >
                <div className=" w-20 h-20 rounded-lg flex items-center justify-center mb-6">
                  <Banknote
                    size={208}
                    strokeWidth={2.5}
                    className="text-secondary"
                  />
                </div>
                <h3 className="text-xl font-bold mb-3">Cost Management</h3>
                <p className="text-gray-600 leading-relaxed">
                  Keep a record of every grocery expense and let the system
                  calculate the meal rate for you.
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow"
              >
                <div className=" w-20 h-20 rounded-lg flex items-center justify-center mb-6">
                  <FileText
                    size={208}
                    strokeWidth={2.5}
                    className="text-secondary"
                  />
                </div>
                <h3 className="text-xl font-bold mb-3">
                  Instant Monthly Reports
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Generate accurate monthly reports with a single tap. No more
                  manual calculation errors
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow"
              >
                <div className=" w-20 h-20 rounded-lg flex items-center justify-center mb-6">
                  <FilePenLine
                    className="text-secondary"
                    size={208}
                    strokeWidth={2.5}
                  />
                </div>
                <h3 className="text-xl font-bold mb-3">Real-time update</h3>
                <p className="text-gray-600 leading-relaxed">
                  Get instant alerts for expense updates or meal changes
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow"
              >
                <div className=" w-20 h-20 rounded-lg flex items-center justify-center mb-6">
                  <FileLock
                    className="text-secondary"
                    size={208}
                    strokeWidth={2.5}
                  />
                </div>
                <h3 className="text-xl font-bold mb-3">Role-based Access</h3>
                <p className="text-gray-600 leading-relaxed">
                  Secure access control with dedicated Manager and Member roles
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow"
              >
                <div className=" w-20 h-20 rounded-lg flex items-center justify-center mb-6">
                  <ChartArea
                    className="text-secondary"
                    size={208}
                    strokeWidth={2.5}
                  />
                </div>
                <h3 className="text-xl font-bold mb-3">Dashboard Analytics</h3>
                <p className="text-gray-600 leading-relaxed">
                  Visualize your mess trends with interactive charts and graphs
                </p>
              </motion.div>
            </div>
          </div>
        </section>
      </motion.div>
    );
};

export default Features;
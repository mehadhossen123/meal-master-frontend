import React from "react";
import { motion } from "framer-motion";
import img from '../assets/img2.jpeg'


const Works = () => {
  return (
    <div className="my-5">
      <motion.h1 initial={{opacity:0,y:30}} whileInView={{opacity:1,y:0}} transition={{duration:0.5,ease:'easeInOut'}} className="text-center text-2xl md:text-4xl py-5 font-bold">
        How It <span className="text-primary"> Works</span>
      </motion.h1>
      <section className="py-10 bg-white overflow-hidden">
        <div className="  flex flex-col md:flex-row items-center">
          {/* বাম পাশের ছবি (ফ্রেমে আসবে) */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
           
          >
            {/* এখানে আপনার সঠিক ইমেজ পাথ দিন */}
            <img
              src={img}
              alt="Working process"
              
            />
          </motion.div>

          {/* ডান পাশের টাইমলাইন স্টেপস */}
          <div className="md:w-1/2 relative border-l-2 border-dashed border-gray-200 ml-10 pl-10 space-y-12">
            {[
              {
                id: "01",
                title: "Create User Account ",
                desc: "Create a free account in seconds with your name, email",
              },
              {
                id: "02",
                title: "Update Daily ",
                desc: "Update your daily meal,cost ,expense",
              },
              {
                id: "03",
                title: "Get accurate monthly reports",
                desc: "Get accurate monthly reports and total meal , per meal rate ",
              },
            ].map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="relative"
              >
                <div className="absolute -left-[54px] top-0 bg-white border-2 border-pink-500 w-10 h-10 rounded-full flex items-center justify-center font-bold text-gray-700 shadow-sm">
                  {step.id}
                </div>
                <h3 className="text-2xl font-bold text-gray-800 font-poppins">
                  {step.title}
                </h3>
                <p className="text-gray-600 mt-2 leading-relaxed">
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Works;

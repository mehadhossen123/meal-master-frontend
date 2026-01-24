import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Users, Utensils } from "lucide-react";

const Stats = () => {
 const statsData = [
   {
     id: 1,
     title: "99.9% Accuracy",
     desc: "Eliminate manual calculation errors with our automated system.",
     icon: <ShieldCheck className="w-8 h-8 text-blue-500" />,
     count: "99.9%",
   },
   {
     id: 2,
     title: "Active Messes",
     desc: "Trusted by 100+ communities for seamless daily management.",
     icon: <Users className="w-8 h-8 text-green-500" />,
     count: "100+",
   },
   {
     id: 3,
     title: "Meals Served",
     desc: "Successfully tracked and managed 10,000+ meals nationwide.",
     icon: <Utensils className="w-8 h-8 text-orange-500" />,
     count: "10k+",
   },
 ];

  return (
    <section className="py-10 bg-slate-50">
      <div className="container mx-auto px-4 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="text-3xl md:text-4xl font-bold mb-12 text-gray-800"
        >
          Trusted by Modern <span className="text-primary">Mess Managers</span>
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {statsData.map((stat, index) => (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="bg-white p-8 rounded-2xl shadow-md border border-gray-100 flex flex-col items-center"
            >
              <div className="p-4 bg-gray-50 rounded-full mb-4">
                {stat.icon}
              </div>
              <h3 className="text-4xl font-extrabold text-gray-900 mb-2">
                {stat.count}
              </h3>
              <p className="text-lg font-semibold text-gray-700">
                {stat.title}
              </p>
              <p className="text-gray-500 text-sm mt-2">{stat.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;

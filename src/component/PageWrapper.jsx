import { motion } from "framer-motion";

const PageWrapper = ({ children }) => {
  return (
    <motion.div
      initial={{ y: "-100vh", opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: "100vh", opacity: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
};

export default PageWrapper;

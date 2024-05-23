import { motion } from "framer-motion";

const Loader = () => {
  return (
    <div className="animatedLoader">
      <motion.div
        style={{ width: 100, height: 3, backgroundColor: "blue" }}
        initial={{ scaleX: 0 }} 
        animate={{ scaleX: 1 }}
        transition={{ duration: .3, repeat: Infinity, repeatType: "reverse" }}
      />
    </div>
  );
};

export default Loader;

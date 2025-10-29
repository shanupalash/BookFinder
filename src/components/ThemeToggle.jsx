import { useEffect, useState } from "react";
import { MoonIcon, SunIcon } from "@heroicons/react/24/solid";
import { motion } from "framer-motion";

export default function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    if (dark) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, [dark]);

  return (
    <motion.button
      whileTap={{ scale: 0.9 }}
      onClick={() => setDark(!dark)}
      className="fixed top-6 right-6 z-50 p-3 rounded-full glass shadow-xl"
    >
      <motion.div
        initial={false}
        animate={{ rotate: dark ? 180 : 0 }}
        transition={{ duration: 0.4 }}
      >
        {dark ? (
          <SunIcon className="w-6 h-6 text-yellow-300" />
        ) : (
          <MoonIcon className="w-6 h-6 text-indigo-300" />
        )}
      </motion.div>
    </motion.button>
  );
}

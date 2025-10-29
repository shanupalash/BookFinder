import { motion } from "framer-motion";

export default function SearchBar({ query, setQuery }) {
  return (
    <motion.div
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="relative w-full max-w-2xl mx-auto mb-12"
    >
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search the universe of books..."
        className="glass w-full p-5 pr-12 text-lg rounded-full focus:outline-none focus:ring-4 focus:ring-purple-400/50 animate-pulseGlow"
      />
      <div className="absolute right-4 top-1/2 -translate-y-1/2 text-purple-600">
        <svg
          className="w-7 h-7"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>
    </motion.div>
  );
}

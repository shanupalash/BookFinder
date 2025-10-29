import { motion } from "framer-motion";

export default function LoadingSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full max-w-7xl mx-auto">
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.05 }}
          className="glass rounded-2xl overflow-hidden"
        >
          <div className="h-64 bg-gradient-to-br from-white/20 to-white/10 relative overflow-hidden">
            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer" />
          </div>
          <div className="p-4 space-y-3">
            <div className="h-5 bg-white/30 rounded w-4/5 animate-pulse"></div>
            <div className="h-4 bg-white/20 rounded w-3/5 animate-pulse"></div>
            <div className="h-3 bg-white/10 rounded w-1/3 animate-pulse"></div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

import { useState, useEffect, useRef } from "react";
import Masonry from "react-masonry-css";
import SearchBar from "./components/SearchBar";
import BookCard from "./components/BookCard";
import LoadingSkeleton from "./components/LoadingSkeleton";
import ThemeToggle from "./components/ThemeToggle";
import { ConfettiBurst } from "./utils/confetti.jsx";
import { searchBooks } from "./services/api";
import { motion, AnimatePresence } from "framer-motion";

export default function App() {
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const wasEmpty = useRef(true);

  useEffect(() => {
    const timer = setTimeout(async () => {
      if (!query.trim()) {
        setBooks([]);
        setError(null);
        wasEmpty.current = true;
        return;
      }

      setLoading(true);
      setError(null);
      try {
        const results = await searchBooks(query);
        setBooks(results);
        if (results.length === 0)
          setError("No books found – try another title!");
        else if (wasEmpty.current) {
          setShowConfetti(true);
          setTimeout(() => setShowConfetti(false), 4000);
        }
        wasEmpty.current = false;
      } catch (e) {
        setError("Network error – please try again.");
      } finally {
        setLoading(false);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [query]);

  const cols = { default: 4, 1100: 3, 700: 2, 500: 1 };

  return (
    <>
      <ConfettiBurst trigger={showConfetti} />
      <ThemeToggle />

      <div className="min-h-screen flex flex-col items-center p-6 relative overflow-hidden">
        <motion.header
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10 z-10"
        >
          <h1 className="text-6xl font-extrabold text-white drop-shadow-2xl">
            Book Finder
          </h1>
          <p className="mt-3 text-xl text-white/90">
            Discover stories from every corner of the universe.
          </p>
        </motion.header>

        <SearchBar query={query} setQuery={setQuery} />

        <AnimatePresence>
          {loading && <LoadingSkeleton />}
          {error && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-red-300 text-xl"
            >
              {error}
            </motion.p>
          )}
          {!loading && books.length > 0 && (
            <Masonry
              breakpointCols={cols}
              className="flex w-auto -ml-4"
              columnClassName="pl-4"
            >
              {books.map((b, i) => (
                <motion.div
                  key={b.key}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <BookCard book={b} />
                </motion.div>
              ))}
            </Masonry>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}

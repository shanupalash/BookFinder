import { motion } from "framer-motion";

export default function BookCard({ book }) {
  const cover = book.cover_i
    ? `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`
    : "https://via.placeholder.com/300x450/1a1a1a/ffffff?text=No+Cover";

  const backCover = book.cover_i
    ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
    : cover;

  const link = `https://openlibrary.org${book.key}`;

  return (
    <motion.a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="flip-container block h-full"
      whileHover={{ scale: 1.06 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <div className="flip-inner relative w-full h-full">
        {/* Front */}
        <div className="flip-front glass">
          <img
            src={cover}
            alt={book.title}
            className="w-full h-64 object-cover"
          />
          <div className="p-4">
            <h3 className="font-bold text-lg line-clamp-1 text-white drop-shadow">
              {book.title}
            </h3>
            <p className="text-sm text-white/90 drop-shadow">
              {book.author_name?.[0] || "Unknown"}
            </p>
            <p className="text-xs text-white/70">
              {book.first_publish_year || "—"}
            </p>
          </div>
        </div>

        {/* Back */}
        <div className="flip-back glass p-4 flex flex-col justify-center items-center text-center">
          <img
            src={backCover}
            alt="Back"
            className="w-20 h-28 object-cover rounded-lg mb-3 opacity-80"
          />
          <p className="text-xs leading-tight text-white/90 line-clamp-5">
            {book.first_sentence?.[0] || "No preview available."}
          </p>
        </div>
      </div>
    </motion.a>
  );
}

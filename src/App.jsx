return (
  <>
    <ConfettiBurst trigger={showConfetti} />
    <ThemeToggle />

    {/* Dynamic Gradient Background */}
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 dark:from-gray-900 dark:via-black dark:to-gray-900" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/30 via-transparent to-transparent opacity-60" />
      <div className="absolute top-0 left-0 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl translate-x-1/3 translate-y-1/3" />
    </div>

    <div className="min-h-screen flex flex-col items-center p-6 relative">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 120 }}
        className="text-center mb-12 z-10 max-w-4xl"
      >
        <h1 className="text-6xl md:text-7xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400 drop-shadow-lg">
          Book Finder
        </h1>
        <p className="mt-4 text-lg md:text-xl text-white/80 font-medium tracking-wide">
          Search millions of books — from forgotten classics to tomorrow’s
          bestsellers.
        </p>
      </motion.header>

      {/* Search Bar */}
      <div className="w-full max-w-2xl mb-10 z-10">
        <SearchBar query={query} setQuery={setQuery} />
      </div>

      {/* Results Container */}
      <div className="w-full max-w-7xl">
        <AnimatePresence mode="wait">
          {loading && (
            <motion.div
              key="skeleton"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-6"
            >
              <LoadingSkeleton count={8} />
            </motion.div>
          )}

          {error && (
            <motion.div
              key="error"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="text-center py-16"
            >
              <div className="inline-flex items-center gap-3 bg-red-500/10 backdrop-blur-sm border border-red-500/20 rounded-2xl px-8 py-5">
                <svg
                  className="w-6 h-6 text-red-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
                <p className="text-red-300 text-lg font-medium">{error}</p>
              </div>
            </motion.div>
          )}

          {!loading && books.length > 0 && (
            <motion.div
              key="results"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Masonry
                breakpointCols={cols}
                className="flex w-auto -ml-6"
                columnClassName="pl-6"
              >
                {books.map((b, i) => (
                  <motion.div
                    key={b.key}
                    initial={{ opacity: 0, scale: 0.9, y: 40 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{
                      delay: i * 0.05,
                      type: "spring",
                      stiffness: 120,
                      damping: 15,
                    }}
                    whileHover={{ y: -8 }}
                    className="mb-6"
                  >
                    <BookCard book={b} />
                  </motion.div>
                ))}
              </Masonry>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Empty State */}
      {!loading && !error && books.length === 0 && query && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-20"
        >
          <div className="inline-block p-10 bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10">
            <svg
              className="w-16 h-16 mx-auto mb-4 text-white/40"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5s3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              />
            </svg>
            <p className="text-white/70 text-lg">
              No books found. Try searching for something else!
            </p>
          </div>
        </motion.div>
      )}
    </div>
  </>
);

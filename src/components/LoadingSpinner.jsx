function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center mt-8">
      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
      <p className="ml-4 text-gray-600">Loading...</p>
    </div>
  );
}

export default LoadingSpinner;

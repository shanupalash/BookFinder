export async function searchBooks(query) {
  const url = `https://openlibrary.org/search.json?title=${encodeURIComponent(
    query
  )}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  const data = await response.json();
  return data.docs || [];
}

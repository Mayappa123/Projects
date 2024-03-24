document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("searchInput");

  searchInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
      performSearch();
    }
  });

  searchInput.addEventListener("input", () => {
    performSearch();
  });

  function performSearch() {
    const query = searchInput.value.trim();
    if (query.length === 0) {
      // Clear the search results or hide them
      return;
    }

    // Send AJAX request to server to fetch matching products
    fetch(`/search?query=${query}`)
      .then((response) => response.json())
      .then((data) => {
        // Update the UI to display the filtered products
        console.log(data); // Handle the response data as needed
      })
      .catch((error) => {
        console.error("Error fetching search results:", error);
      });
  }
});

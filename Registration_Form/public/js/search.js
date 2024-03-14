function highlightSearchText() {
  // Get the search query entered by the user
  var searchText = document.getElementById("searcBox").value.trim();

  // Check if search query is not empty
  if (searchText !== "") {
    // Create a regular expression to search for the entered text, case insensitive
    var regex = new RegExp(searchText, "gi");

    // Get all elements where the search will be performed
    var elementsToSearch = document.querySelectorAll("body *");

    // Loop through all elements
    elementsToSearch.forEach(function (element) {
      // Check if the element is a text node
      if (element.nodeType === Node.TEXT_NODE) {
        // Get the text content of the element
        var textContent = element.textContent;

        // Replace the search text with a highlighted version
        var highlightedText = textContent.replace(regex, function (match) {
          return "<span class='highlight'>" + match + "</span>";
        });

        // Update the element's HTML with the highlighted text
        element.innerHTML = highlightedText;
      }
    });
  } else {
    // If search query is empty, remove any existing highlights
    var highlightedElements = document.querySelectorAll(".highlight");
    highlightedElements.forEach(function (element) {
      element.outerHTML = element.innerHTML;
    });
  }
}

// Add event listener to the search input
document
  .getElementById("searcBox")
  .addEventListener("input", highlightSearchText);

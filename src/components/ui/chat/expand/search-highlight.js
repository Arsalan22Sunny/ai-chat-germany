/* eslint-disable no-useless-escape */

/**
 * Given a string of HTML and a search string, returns a new string of HTML with
 * the search terms highlighted. If the search string is empty, returns the
 * original HTML unchanged.
 *
 * @param {string} html - The HTML to search and highlight.
 * @param {string} searchInput - The search string.
 * @returns {string} The HTML with the search terms highlighted.
 */
const searchHighlight = (html, searchInput) => {
  if (!searchInput) {
    return html;
  }

  // Escape special regex characters in the search input
  const escapedInput = searchInput.replace(/[-\/\\^$.*+?()[\]{}|]/g, '\\$&');
  const regex = new RegExp(`(${escapedInput})`, "gi");

  const highlightedContent = html.replace(
    regex,
    (match) => `<span class="highlight">${match}</span>`
  );

  return highlightedContent;

  // // Add this effect if on useEffect
  // const firstMatch = document.querySelector(".highlight");
  // firstMatch?.scrollIntoView({
  //   behavior: "smooth",
  //   block: "center",
  // });
};

export default searchHighlight;

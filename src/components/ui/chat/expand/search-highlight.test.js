import searchHighlight from "./search-highlight.js";

// Test cases
const testCases = [
  {
    searchInput: "test",
    html: "This is a test string.",
    expected: 'This is a <span class="highlight">test</span> string.',
  },
  {
    searchInput: "html",
    html: "<div>This is a test HTML string.</div>",
    expected:
      '<div>This is a test <span class="highlight">HTML</span> string.</div>',
  },
  {
    searchInput: "notfound",
    html: "This string does not contain the search term.",
    expected: "This string does not contain the search term.",
  },
  {
    searchInput: "",
    html: "Empty search input.",
    expected: "Empty search input.",
  },
  {
    searchInput: "a",
    html: "<p>A quick brown fox jumps over a lazy dog.</p>",
    expected:
      '<p><span class="highlight">A</span> quick brown fox jumps over <span class="highlight">a</span> lazy dog.</p>',
  },
];

// Running the tests
testCases.forEach(({ searchInput, html, expected }, index) => {
  const result = searchHighlight(searchInput, html);
  console.log(
    `Test Case ${index + 1}:`,
    result === expected ? "Passed" : "Failed"
  );
  console.log("Expected:", expected);
  console.log("Result:", result);
  console.log("---");
});

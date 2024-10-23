import { useState } from "react";

const StreamingText = () => {
  const [data, setData] = useState("");
  const [query, setQuery] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);

  const fetchData = async () => {
    setIsStreaming(true);
    setData(""); // Clear previous data

    try {
      const response = await fetch("https://back.sanbjur.de/api/query", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: query }),
      });

      if (!response.ok) {
        console.error("Network response was not ok");
        return;
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder("utf-8");
      let done = false;

      while (!done) {
        const { done: streamDone, value } = await reader.read();
        done = streamDone;

        if (value) {
          const chunk = decoder.decode(value, { stream: true });
          console.log("Received chunk:", chunk); // Log the chunk to the console
          setData((prev) => prev + chunk); // Update state with the new chunk
        }
      }
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      setIsStreaming(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchData(); // Call the fetch function on form submit
  };

  return (
    <div>
      <h1>Streaming Text:</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter your query"
          disabled={isStreaming} // Disable input while streaming
        />
        <button type="submit" disabled={isStreaming}>
          Start Streaming
        </button>
      </form>
      <pre>{data}</pre>
    </div>
  );
};

export default StreamingText;

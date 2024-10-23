import { useState, useEffect, useRef } from "react";

const StreamingChat = () => {
  const [question, setQuestion] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [currentResponse, setCurrentResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatHistory, currentResponse]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setCurrentResponse("");

    const updatedChatHistory = [
      ...chatHistory,
      { role: "human", content: question },
    ];
    setChatHistory(updatedChatHistory);

    try {
      const response = await fetch("https://back.sanbjur.de/api/query", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question,
          chat_history: updatedChatHistory,
        }),
      });

      if (!response.ok) throw new Error("Network response was not ok");

      // Attempt to unlock the stream
      let responseBody = response.body;
      if (responseBody.locked) {
        console.log("Stream is locked, attempting to unlock...");

        // Attempt 1: Clone the response
        const clonedResponse = response.clone();
        responseBody = clonedResponse.body;

        // If still locked, fall back to reading the entire response
        if (responseBody.locked) {
          console.log("Stream still locked, reading entire response...");
          const fullResponse = await response.text();
          setCurrentResponse(fullResponse);
          setChatHistory((prev) => [
            ...prev,
            { role: "assistant", content: fullResponse },
          ]);
          return;
        }
      }

      // If we got here, the stream is unlocked
      const reader = responseBody.getReader();
      const decoder = new TextDecoder();

      let accumulatedResponse = "";

      while (true) {
        console.log("Arsooo Streaming not working");
        const { value, done } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        accumulatedResponse += chunk;
        setCurrentResponse(accumulatedResponse);
      }

      setChatHistory((prev) => [
        ...prev,
        { role: "assistant", content: accumulatedResponse },
      ]);
      setCurrentResponse("");
    } catch (error) {
      console.error("Error:", error);
      setCurrentResponse("An error occurred while fetching the response.");
    } finally {
      setIsLoading(false);
      setQuestion("");
    }
  };

  return (
    <div
      style={{
        maxWidth: "600px",
        margin: "0 auto",
        padding: "20px",
        backgroundColor: "white",
        color: "black",
      }}
    >
      <h1
        style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "20px" }}
      >
        Streaming Chat
      </h1>
      <div style={{ marginBottom: "20px" }}>
        {chatHistory.map((msg, index) => (
          <div
            key={index}
            style={{
              padding: "10px",
              borderRadius: "8px",
              marginBottom: "10px",
              backgroundColor: msg.role === "human" ? "#e3f2fd" : "#e8f5e9",
            }}
          >
            <strong>{msg.role === "human" ? "You: " : "Assistant: "}</strong>
            {msg.content}
          </div>
        ))}
        {currentResponse && (
          <div
            style={{
              padding: "10px",
              borderRadius: "8px",
              marginBottom: "10px",
              backgroundColor: "#e8f5e9",
            }}
          >
            <strong>Assistant: </strong>
            {currentResponse}
          </div>
        )}
        <div ref={chatEndRef} />
      </div>
      <form onSubmit={handleSubmit} style={{ display: "flex", gap: "10px" }}>
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Ask a question..."
          disabled={isLoading}
          style={{
            flexGrow: 1,
            padding: "10px",
            borderRadius: "4px",
            border: "1px solid #ccc",
          }}
        />
        <button
          type="submit"
          disabled={isLoading}
          style={{
            padding: "10px 20px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          {isLoading ? "Loading..." : "Send"}
        </button>
      </form>
    </div>
  );
};

export default StreamingChat;

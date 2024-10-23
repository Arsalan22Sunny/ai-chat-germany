## API Documentation

### 1. Endpoint: `/chats/`

**Description:** Retrieves a list of all chat objects associated with the user based on user ID or token.

- **Method:** `GET`
- **Request Parameters:** None

**Response Format:**

```json
[
  {
    "instance_id": "a750799c8c5234bbd8d4572715c67785",
    "instance_title": "Instance title 1",
    "created_at": "2024-01-01T00:00:00Z"
  },
  {
    "instance_id": "a750799c8c5234bbd8d4572715c67785",
    "instance_title": "Instance title 2",
    "created_at": "2024-01-02T00:00:00Z"
  }
]
```

### 2. Endpoint: `/chat/:id`

**Description:** Retrieves a single chat object based on the provided chat ID.

- **Method:** `GET`
- **Request Parameters:**

  - **Path Parameter:**
    - `id` (string): The unique identifier for the chat.

**Response Format:**

```json
{
  "instance_id": "a750799c8c5234bbd8d4572715c67785",
  "instance_title": "Instance title 1",
  "created_at": "2024-01-01T00:00:00Z",
  "messages": [
    {
      "id": "6ac9683d43685052ac81910f77beb559",
      "sender": "user",
      "timestamp": "2024-09-12T14:31:00Z",
      "text": "What is photosynthesis?",
      "context": ["Previous message about plant biology."]
    },
    {
      "id": "617f3ff04375758c8ea0796616a5ce22",
      "sender": "ai",
      "timestamp": "2024-09-12T14:32:00Z",
      "text": "Answer here",
      "response_details": {
        "response_length": 178,
        "tokens_used": 34,
        "confidence_score": 0.95,
        "response_time_ms": 150
      },
      "context": ["Previous message about plant biology."],
      "sources": [
        {
          "id": 1,
          "filename": "1.pdf",
          "content": "https://pdf.com/1.pdf",
          "size": "2MB",
          "created_at": "2024-01-15T08:30:00Z"
        },
        {
          "id": 2,
          "filename": "2.pdf",
          "content": "https://pdf.com/2.pdf",
          "size": "3MB",
          "created_at": "2024-02-20T10:00:00Z"
        }
      ],
      "parent_id": "6ac9683d43685052ac81910f77beb559"
    }
  ]
}
```

**Additional Notes:**

- **Versioning:** If the `/query` API endpoint is versioned, ensure it follows the same response structure for consistency across all endpoints.

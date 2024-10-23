# Message State

1. Initial

```json
{
  "question": "hi",
  "streams": [],
  "sources": []
}
```

2. Streaming

```json
{
  "question": "hi",
  "streams": [
    {
      "text": "Hello! How can I assist you today?"
    }
  ],
  "sources": []
}
```

3. Resources

```json
{
  "question": "hi",
  "streams": [
    {
      "text": "Hello! How can I assist you today?"
    }
  ],
  "sources": [
    {
      "type": "source",
      "content": {
        "document_id": "acd2c34e-61db-42f1-a905-098fce8d9c27",
        "score": 0.19447212999999997,
        "text": "Mai 2010 an der Universität Lüneburg den\nHochschulgrad Bachelor of Arts im Studiengang Betriebswirtschaftslehre erwarb, auch die in der \"Satzung zur Regelung der\nVergabe von Studienplätzen für den Masterstudiengang Management und Marketing des Fachbereichs",
        "page_label": "7",
        "filename": "VG Berlin, Beschluss vom 10.02.2011 - 3 L 408.10.pdf"
      }
    }
  ]
}
```

On rendering UI will depend on state index and keys of object

```javascript
import {useEffect} form 'react'

useEffect(()=>{

},[state.messages[0].streams[0]?.text])
```

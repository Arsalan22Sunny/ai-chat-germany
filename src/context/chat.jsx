/* eslint-disable no-unused-vars */
import { createContext } from "react";
import { useReducer } from "react";
import PropTypes from "prop-types";

export const message_response = [
  {
    type: "answer",
    content: {
      text: "Hello! How can I assist you today?",
    },
  },
  {
    type: "source",
    content: {
      document_id: "acd2c34e-61db-42f1-a905-098fce8d9c27",
      score: 0.19447212999999997,
      text: 'Mai 2010 an der Universität Lüneburg den\nHochschulgrad Bachelor of Arts im Studiengang Betriebswirtschaftslehre erwarb, auch die in der "Satzung zur Regelung der\nVergabe von Studienplätzen für den Masterstudiengang Management und Marketing des Fachbereichs',
      page_label: "7",
      filename: "VG Berlin, Beschluss vom 10.02.2011 - 3 L 408.10.pdf",
    },
  },
  {
    type: "question",
    content: {
      text: "hi",
    },
  },
];

export const message_object = {
  streams: [
    {
      text: "Hello! How can I assist you today?",
    },
  ],
  sources: [
    {
      type: "source",
      content: {
        document_id: "acd2c34e-61db-42f1-a905-098fce8d9c27",
        score: 0.19447212999999997,
        text: 'Mai 2010 an der Universität Lüneburg den\nHochschulgrad Bachelor of Arts im Studiengang Betriebswirtschaftslehre erwarb, auch die in der "Satzung zur Regelung der\nVergabe von Studienplätzen für den Masterstudiengang Management und Marketing des Fachbereichs',
        page_label: "7",
        filename: "VG Berlin, Beschluss vom 10.02.2011 - 3 L 408.10.pdf",
      },
    },
  ],
  question: "hi",
};

const initialState = {
  messages: [], // Multi dimensional array
  messages_v2: [], // Multi dimensional array
  lastMessageId: 0,
  isStreaming: false,
};

/**
 * Reducer for managing the state of the chat.
 *
 * @param {Object} state - The current state of the chat.
 * @param {Object} action - The action to take on the state.
 *
 * @returns {Object} The new state of the chat.
 */
const chatReducer = (state, action) => {
  switch (action.type) {
    case "addQuestion": {
      const question = action.message?.content?.text || "";
      return {
        ...state,
        messages: [...state.messages, [action.message]],
        messages_v2: [...state.messages_v2, { question }],
      };
    }
    case "addAnswer": {
      // To remember the schema
      const expected = message_response;

      const { messages } = state;
      const lastIndex = state.messages.length - 1;
      // replace the last message completely on state
      messages[lastIndex] = action.sources;
      return { ...state, messages };
    }
    case "addSources": {
      const { messages_v2 } = state;
      const lastIndex = messages_v2.length - 1;
      messages_v2[lastIndex].sources = action.sources;
      return {
        ...state,
        messages_v2: [...messages_v2],
      };
    }
    case "addStream": {
      const { messages_v2 } = state;
      const lastIndex = messages_v2.length - 1;
      messages_v2[lastIndex].stream = action.payload;
      return { ...state, messages_v2 };
    }
    case "startStreaming": {
      return { ...state, isStreaming: true };
    }
    case "stopStreaming": {
      return { ...state, isStreaming: false };
    }
    default: {
      return state;
    }
  }
};

const ContextChat = createContext(null);

const ChatProvider = ({ children }) => {
  const [state, dispatch] = useReducer(chatReducer, initialState);
  console.log(state);
  return (
    <ContextChat.Provider value={{ state, dispatch }}>
      {children}
    </ContextChat.Provider>
  );
};

ChatProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { ContextChat, ChatProvider };

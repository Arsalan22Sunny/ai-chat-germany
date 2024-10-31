/* eslint-disable react/prop-types */
import { useContext, useEffect, useRef, useState } from "react";
import BubbleAi from "./bubbles/Ai";
import BubbleUser from "./bubbles/User";
import { ContextChat } from "../../../../context/chat";
import { DefaultMessage } from "./ChatWelcome";
import ArrayValidator from "../../../common/ArrayValidator";
import { arrayValidator } from "../../../../utils/validator";

const ChatGroup = ({
  /**
   * @variables (Array) messages
   */
  messageGroup = [], // from reducer store
  handleSavedDocuments
}) => {
  const [expanded, setExpanded] = useState(false);

  if (!Array.isArray(messageGroup)) {
    console.error("Message group should be an array. ", messageGroup);
    return;
  } // Early return

  const { question, answer, sources } = messageGroup.reduce(
    (acc, message) => {
      if (message.type === "question") {
        acc.question = message;
      } else if (message.type === "answer") {
        acc.answer = message;
      } else {
        acc.sources.push(message);
      }
      return acc;
    },
    { question: {}, sources: [], answer: {} }
  );

  return (
    <>
      <BubbleUser message={question} />
      <BubbleAi
        answer={answer}
        sources={sources}
        expanded={expanded}
        toggle={() => {
          setExpanded(!expanded);
        }}
        handleSavedDocuments={handleSavedDocuments}
      />
    </>
  );
};

const ChatGroupV2 = ({
  messageGroup = {}, // from reducer store
  handleSavedDocuments,
  
}) => {
  const [expanded, setExpanded] = useState(false);
  const { question, sources, stream } = messageGroup;

  return (
    <>
      <BubbleUser message={{ content: { text: question } }} />
      <BubbleAi
        question={question}
        stream={stream || ""}
        sources={arrayValidator(sources)}
        expanded={expanded}
        toggle={() => {
          setExpanded(!expanded);
        }}
        handleSavedDocuments={handleSavedDocuments}
      />
    </>
  );
};

const ChatMain = () => {
  const {
    // Very important. Reduce redundant reducer updates
    // Do not control expand from reducer. Rather define state on each child when rendering list with .map()
    state,
  } = useContext(ContextChat);
  const scrollIntoViewRef = useRef(null);

  useEffect(() => {
    if (scrollIntoViewRef.current) {
      scrollIntoViewRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [
    state, // on state change it will start scrolling to bottom
  ]);


  const [savedDocuments,setSavedDocuments]=useState([])
  const handleSavedDocuments=(document_id)=>{
    if(!savedDocuments.includes(document_id)){
    console.log(document_id,"docid")
    setSavedDocuments([...savedDocuments,document_id])
    }
}

useEffect(()=>{
  localStorage.setItem('documentIds', JSON.stringify(savedDocuments));
},[savedDocuments])

  return (
    <div className="h-full w-full flex flex-col gap-6 px-4 overflow-y-auto modern-scrollbar pt-4 pb-6 lg:pl-[5rem]">
      <DefaultMessage />
      <ArrayValidator list={state?.messages}>
        {state.messages_v2.map((group, i) => {
          return <ChatGroupV2 key={i} messageGroup={group} handleSavedDocuments={handleSavedDocuments}/>;
        })}
      </ArrayValidator>
      <div ref={scrollIntoViewRef}></div>
    </div>
  );
};

export default ChatMain;

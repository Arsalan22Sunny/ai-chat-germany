/* eslint-disable react/prop-types */
import { Minus } from "iconsax-react";
import cn from "../../../../../utils/cn";
import ExpandButton from "./ExpandButton";
import SourceList from "./SourceList";
import { arrayValidator } from "../../../../../utils/validator";
import { useContext, useEffect, useState } from "react";
import FetchContext from "../../../../../context/fetch";
import { ContextChat } from "../../../../../context/chat";
import { Tooltip } from 'antd';

const StickyButton = ({ toggle }) => {
  const text= "Zuklappen"
  return (
    <div className="flex items-center shrink-0 sticky left-0 top-0 py-4">
      <Tooltip 
        placement="bottomLeft" 
        title={<span className="text-black">{text}</span>}  
        color="white" 
        >
        <button
        type="button"
        onClick={toggle}
        className={cn(
          "size-8 flex justify-center items-center text-main bg-slate-200 rounded-r-2xl"
        )}
        >
          <Minus className="size-5" />        
       </button>
      </Tooltip>
    </div>
  );
};

const Loading = () => {
  return (
    <svg
      className="size-4 animate-spin text-gray-500"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx={12}
        cy={12}
        r={10}
        stroke="currentColor"
        strokeWidth={4}
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );
};

const BubbleAi = ({ className, question, expanded, toggle, handleSavedDocuments }) => {
  const { requests } = useContext(FetchContext);
  const { dispatch } = useContext(ContextChat);
  const [stream, setStream] = useState("");
  const [sources, setSources] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!question) return;

    // Function to fetch sources based on the question
    const fetchSources = async () => {
      try {
        const response = await requests("sources", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ question, chat_history: [] }),
        });

        if (!response.ok) {
          throw new Error("Failed to fetch sources");
        }

        const sourcesList = await response.json();
        setSources(sourcesList);
      } catch (error) {
        console.error("Error fetching sources:", error);
      }
    };

    // Function to fetch streaming data based on the question
    const fetchStreaming = async () => {
      setIsLoading(true);
      try {
        const response = await requests("query", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ question, chat_history: [] }),
        });

        if (!response.ok) {
          throw new Error("Failed to fetch streaming data");
        }

        const reader = response.body.getReader();
        const decoder = new TextDecoder("utf-8");
        let isDone = false;

        while (!isDone) {
          const { done, value } = await reader.read();
          isDone = done;

          if (value) {
            const chunk = decoder.decode(value, { stream: true });
            setStream((prev) => prev + chunk); // Update state with the new chunk
          }
        }

        // Dispatch stop streaming action when done
        if (isDone == true) {
          await fetchSources();
          setIsLoading(false);
          dispatch({ type: "stopStreaming" });
        }
      } catch (error) {
        console.error("Error fetching streaming data:", error);
      }
    };

    fetchStreaming();
  }, [question]);

  if (!stream) return;

  return (
    <section
      className={cn("flex justify-start relative items-start", className)}
    >
      <div className="max-w-[90%] overflow-hidden">
        <main className="bg-slate-200 text-black rounded-xl p-2 sm:p-3 relative transition-all">
          <p>{stream}</p>
          {expanded && (
            <ul className="divide-y divide-gray-300 space-y-4">
              <SourceList sources={arrayValidator(sources)} handleSavedDocuments={handleSavedDocuments}/>
            </ul>
          )}
        </main>
        <aside className="flex justify-end px-4">
          <div className="flex items-center bg-slate-200 text-main rounded-b-2xl">
            {isLoading ? (
              <div className="size-8 flex justify-center items-center">
                <Loading />
              </div>
            ) : expanded ? null : (
              <ExpandButton state={expanded} onClick={toggle} />
            )}
          </div>
        </aside>
      </div>
      {expanded && <StickyButton toggle={toggle} />}
    </section>
  );
};

export default BubbleAi;

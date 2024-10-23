/* eslint-disable no-unused-vars */
import { useContext, useEffect, useRef, useState } from "react";
import paperPlan from "../../../assets/images/paper-plan.png";
import cn from "../../../utils/cn";
import FetchContext from "../../../context/fetch";
import { ContextChat } from "../../../context/chat";
import { AuthContext } from "../../../context/auth";
import NewChatButton from "./ChatNewButton";
import PropTypes from "prop-types";

const Sending = () => (
  <svg
    className="size-8 pointer-events-none"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M6.75 12C6.75 12.1989 6.67098 12.3897 6.53033 12.5303C6.38968 12.671 6.19891 12.75 6 12.75C5.80109 12.75 5.61032 12.671 5.46967 12.5303C5.32902 12.3897 5.25 12.1989 5.25 12C5.25 11.8011 5.32902 11.6103 5.46967 11.4697C5.61032 11.329 5.80109 11.25 6 11.25C6.19891 11.25 6.38968 11.329 6.53033 11.4697C6.67098 11.6103 6.75 11.8011 6.75 12ZM12.75 12C12.75 12.1989 12.671 12.3897 12.5303 12.5303C12.3897 12.671 12.1989 12.75 12 12.75C11.8011 12.75 11.6103 12.671 11.4697 12.5303C11.329 12.3897 11.25 12.1989 11.25 12C11.25 11.8011 11.329 11.6103 11.4697 11.4697C11.6103 11.329 11.8011 11.25 12 11.25C12.1989 11.25 12.3897 11.329 12.5303 11.4697C12.671 11.6103 12.75 11.8011 12.75 12ZM18.75 12C18.75 12.1989 18.671 12.3897 18.5303 12.5303C18.3897 12.671 18.1989 12.75 18 12.75C17.8011 12.75 17.6103 12.671 17.4697 12.5303C17.329 12.3897 17.25 12.1989 17.25 12C17.25 11.8011 17.329 11.6103 17.4697 11.4697C17.6103 11.329 17.8011 11.25 18 11.25C18.1989 11.25 18.3897 11.329 18.5303 11.4697C18.671 11.6103 18.75 11.8011 18.75 12Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const SubmitButton = ({ loading }) => {
  if (loading) return <Sending />;
  return (
    <button
      type="submit"
      className="hover:brightness-75 rounded-lg size-8 flex justify-center items-center"
    >
      <img
        src={paperPlan}
        alt="arrow"
        className={cn("w-full object-contain pointer-events-none", {
          "animate-bounce": loading,
        })}
      />
    </button>
  );
};

SubmitButton.propTypes = {
  loading: PropTypes.bool,
};

const ChatInput = () => {
  const [value, setValue] = useState("");
  const textareaRef = useRef(null);
  const { state, dispatch } = useContext(ContextChat);
  const [loading, setLoading] = useState(false);
  const { user } = useContext(AuthContext);

  // Function to resize the textarea
  const resizeTextarea = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"; // Reset height to auto to calculate the scrollHeight
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`; // Set height to scrollHeight
    }
  };

  useEffect(() => {
    resizeTextarea(); // Resize on initial render
  }, []); // Empty dependency array ensures this runs only once

  useEffect(() => {
    resizeTextarea(); // Resize whenever the value changes
  }, [value]); // Depend on value to trigger resize

  async function doSubmit(event) {
    event.preventDefault();

    const input = value.trim();
    if (!input) return;

    // Assign user input to reducer instantly before getting response back
    dispatch({
      type: "addQuestion",
      message: {
        type: "question",
        content: {
          text: input,
        },
      },
    });

    dispatch({ type: "startStreaming" });
    setValue("");
  }

  return (
    <div className="px-4 flex items-center gap-3 lg:gap-4">
      {user && <NewChatButton />}
      <form
        className={cn(
          "w-full min-h-[3.25rem] bg-gray-50 border rounded-[1.25rem] overflow-hidden px-2 py-1",
          "flex flex-wrap items-center flex-grow"
        )}
        onSubmit={doSubmit}
      >
        <textarea
          className="px-3 py-2 flex-grow focus:outline-none bg-transparent modern-scrollbar"
          rows={1}
          placeholder="Schreibe deine Frage"
          ref={textareaRef}
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
          }}
          style={{ boxSizing: "border-box", maxHeight: "6rem" }}
          required
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              doSubmit(e);
            }
          }}
        />
        <div className="px-2 flex-shrink-0 flex items-center justify-center">
          <SubmitButton loading={state.isStreaming} />
        </div>
      </form>
    </div>
  );
};

export default ChatInput;

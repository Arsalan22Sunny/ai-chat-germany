/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
import { useContext, useState } from "react";
import PropTypes from "prop-types";
import cn from "../../../../../utils/cn";
import ViewerContext from "../../../../../context/viewer";
import SaveChat from "./SaveChat";

const Source = ({ source, onClick }) => {
  const [visited, setVisited] = useState(false);

  if (!source.content?.filename) return;

  const style = {
    overflow: "hidden",
    textOverflow: "ellipsis",
    WebkitLineClamp: 1,
    WebkitBoxOrient: "vertical",
    display: "-webkit-box !important",
    width: "100%",
  };

  return (
    <li className="space-y-2 pt-3">
      <div className="flex justify-between items-center gap-4">
        <button
          type="button"
          className={cn(
            "font-semibold text-main underline hover:text-[#2c3b88] focus:text-[#3548a7] text-start pl-1 overflow-hidden flex",
            "whitespace-nowrap",
            { "text-[#3548a7] ": visited }
          )}
          onClick={() => {
            onClick();
            setVisited(true);
          }}
        >
          <div style={style}>
            {source.content?.filename.replace(".pdf", "")}
          </div>
          <div>.bendjur</div>
        </button>
        <SaveChat content={source} />
      </div>
      <div
        className="bg-white px-2 lg:px-3 py-1 lg:py-2 overflow-hidden"
        dangerouslySetInnerHTML={{ __html: source.content?.text }}
        style={{
          overflowWrap: "break-word",
          wordWrap: "break-word",
        }}
      />
    </li>
  );
};

Source.propTypes = {
  source: PropTypes.object,
  onClick: PropTypes.func,
};

const SourceList = ({ sources }) => {
  if (!Array.isArray(sources)) return;
  const { PDF, viewPDF } = useContext(ViewerContext);

  return sources.map((source, index) => {
    if (!source?.content?.text) return; // Early return
    return (
      <Source
        key={index}
        source={source}
        onClick={() => {
          viewPDF(source.content);
        }}
      />
    );
  });
};

export default SourceList;

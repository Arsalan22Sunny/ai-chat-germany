/* eslint-disable react/prop-types */
import { useContext, useEffect, useState } from "react";
import CloserButton from "./CloseButton";
import FetchContext from "../../../../context/fetch";
import Loading from "../../../common/Loading";
import ArrowButton from "./ArrowButton";
import searchHighlight from "./search-highlight";
import SearchForm from "./SearchForm";
import Found from "./search/Found";
import PropTypes from "prop-types";
import cn from "../../../../utils/cn";
// import initialHTML from "./dummy";

const ChatExpanded = ({ pdf, hidePDFViewer }) => {
  const { requests } = useContext(FetchContext);
  const [html, setHtml] = useState(""); // initialHTML
  const [loading, setLoading] = useState(false);
  const [neddleIndex, setNeddleIndex] = useState(0); // Will track the founded words list by .highlight className // int
  const [totalFound, setTotalFound] = useState(0);
  const [query, setQuery] = useState("");

  const finder = ".highlight";
  const lastIndex = totalFound - 1;

  const RenderHTML = ({ html }) => {
    if (!html) {
      return <p className="p-4 text-center w-full">Kein Inhalt gefunden</p>;
    }
    return (
      <>
        <div
          className="px-3 py-2 bg-white"
          dangerouslySetInnerHTML={{
            __html: searchHighlight(html, query)
          }}
          style={{
            overflowWrap: "break-word",
            wordWrap: "break-word"
          }}
        />
        <div className="py-4"></div>
      </>
    );
  };

  /**
   * Fetches the PDF content and assigns it to the state
   * @return {Promise<void>}
   */
  function fetchAssign() {
    if (!pdf.filename) return;
    setLoading(true);
    requests(`pdf_content/`,{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({file_name: pdf.filename})
    })
      .then((res) => res.json())
      .then((data) => {
        if (!data) return;
        setHtml(data.content);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }
  useEffect(fetchAssign, [pdf, requests]);

  useEffect(() => {
    if (!query) return;
    // Scroll to first match
    const firstMatch = document.querySelector(finder);
    firstMatch?.scrollIntoView({ behavior: "smooth", block: "center" });

    setTotalFound(document.querySelectorAll(finder).length);
  }, [query]);

  useEffect(() => {
    const neddleList = document.querySelectorAll(finder);
    if (!neddleList.length) return;

    const element = neddleList[neddleIndex];
    element?.scrollIntoView({ behavior: "smooth", block: "center" });
  }, [neddleIndex]);

  return (
    <div
      className={cn(
        "fixed left-0 top-0 w-full overflow-hidden flex-grow h-full flex justify-center bg-white backdrop-blur-sm z-10 p-1 text-sm",
        "lg:relative lg:h-[94%] lg:border lg:rounded-2xl lg:max-w-screen-sm lg:bg-slate-200"
      )}
    >
      <div className="h-full w-full rounded-xl bg-white overflow-y-auto modern-scrollbar">
        <div className="flex justify-between items-center gap-4 px-3 py-2 sticky bg-white top-0 left-0">
          <div className="flex items-center gap-4 flex-grow">
            {totalFound ? (
              <div className="flex gap-1 items-center">
                <ArrowButton
                  up={true}
                  onClick={() =>
                    setNeddleIndex((prev) => (0 < prev ? prev - 1 : lastIndex))
                  }
                />
                <ArrowButton
                  onClick={() =>
                    setNeddleIndex((prev) => (prev < lastIndex ? prev + 1 : 0))
                  }
                />
              </div>
            ) : null}
            <SearchForm
              onSearch={(needle) => {
                setQuery(needle);
                setNeddleIndex(0);
              }}
            />
            <Found neddleIndex={neddleIndex} totalFound={totalFound} />
          </div>
          <CloserButton doCollapse={hidePDFViewer} />
        </div>
        {loading ? <Loading /> : <RenderHTML html={html} />}
      </div>
    </div>
  );
};

ChatExpanded.propTypes = {
  pdf: PropTypes.object,
  togglePDFViewer: PropTypes.func
};

export default ChatExpanded;

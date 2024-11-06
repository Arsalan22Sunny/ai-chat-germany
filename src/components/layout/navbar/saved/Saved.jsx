/* eslint-disable react/prop-types */
import { useContext, useEffect, useState } from "react";
import { Paperclip, ArchiveAdd } from "iconsax-react";
import { Link } from "react-router-dom";
import FetchContext from "../../../../context/fetch";
import CloserButton from "../../../common/CloseButton";
import Loading from "../../../common/Loading";
import { createPortal } from "react-dom";
import SearchForm from "../../../ui/chat/expand/SearchForm";

const PDFObject = {
  id: "",
  document_id: "",
  filename: "",
  text: "",
  page_label: "",
  pagelabel: "",
};

const NavLink = ({ item = PDFObject }) => {
  if (!item) return;
  return (
    <Link
      href={`/saved/${item.filename}`}
      className="px-4 py-2.5 hover:bg-gray-100 flex "
      style={{
        display: "-webkit-box",
        WebkitBoxOrient: "vertical",
        WebkitLineClamp: 1,
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
      }}
    >
      {item.filename.replace(".pdf", ".benjur")}
    </Link>
  );
};

function Dropdowns({ toggle = () => {} }) {
  const [saved, setSaved] = useState(null);
  const { requests } = useContext(FetchContext);
  const [searchQuery,setSearchQuery] = useState("")

  function fetch_pdfs() {
    requests("get-pdfs")
      .then((response) => response.json())
      .then((data) => {
        if (!data?.pdfs) return;
        setSaved(data.pdfs);
      })
      .catch(console.error);
  }
  useEffect(fetch_pdfs, [requests]);

  const sortArray=(data)=>{
    data?.sort((a,b)=> new Date(b.created_at) - new Date(a.created_at))
    return data;
  }

  const handleSearch=(value)=>{
    setSearchQuery(value)
  }

  const handleSearchSubmit = async(e) => {
    e.preventDefault();
    const data={
      search_term: searchQuery
    }
    const accessToken = localStorage.getItem("accessToken");  
    try {
      const response = await fetch(`https://back.sanbjur.de/api/search-pdf`, {
        method: "POST",
        headers: { 'Authorization': `Bearer ${accessToken}`,"Content-Type": "application/json",},
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to save note");
      }
      const savedPdfList = await response.json();
      console.log(savedPdfList,"response")
      setSaved(savedPdfList)
      setSearchQuery("")

    } catch (error) {
      console.error("Error fetching sources:", error);
    }
  };
  
  return (
    <div className="fixed left-0 top-0 inset-0 w-screen h-[100svh] z-[11] bg-white overflow-hidden py-4">
      <div className="h-full flex justify-center overflow-y-auto">
        {saved ? (
          <div className="p-4 bg-white w-full max-h-[100%] space-y-4 max-w-screen-xl mx-auto">
            <div className="flex fixed items-center w-full justify-between max-w-screen-xl bg-white z-60 h-16 top-0 py-8 px-2 left-0 xl:left-auto xl:right-auto 2xl:left-auto 2xl:right-auto xl:pr-9 xl:pl-0 2xl:pr-9 2xl:pl-0">
              <h2 className="text-2xl lg:text-3xl font-bold">
                Gespeicherte Entscheidungen
              </h2>
              <CloserButton doCollapse={toggle} />
            </div>
            <div className="overflow-x-auto !mt-8">
              {Array.isArray(saved) && saved.length > 0 ? (
                <table
                  className="w-full table-fixed"
                  style={{ tableLayout: "fixed !important" }}
                >
                  <thead className="fixed w-fit left-0 xl:left-auto 2xl:left-auto">
                    <tr>
                      <th className="text-start w-1/2	 bg-slate-100 p-3">
                       <SearchForm onSearch={handleSearch} handleSearchSubmit={handleSearchSubmit}/>
                      </th>
                      <th className="text-start w-3/12 bg-slate-100 p-3">
                        Kommentare
                      </th>
                      <th className="text-start w-1/6 bg-slate-100 p-3">
                        Datum der Speicherung
                      </th>
                      <th className="text-start w-1/12 bg-slate-100 p-3">
                        Aktion
                      </th>
                    </tr>
                  </thead>
                  <tbody className="flex !flex-col w-full " style={{marginTop: "74px"}}>
                    {sortArray(saved)?.map((item, index) => (
                      <tr key={index}>
                        <td className="py-4 w-1/2">
                          <div className="bg-slate-100 p-3 rounded-lg space-y-2 w-full">
                            <h5 className="font-semibold">{item.filename}</h5>
                            <p>{item.text}</p>
                          </div>
                        </td>
                        <td className="p-3 w-3/12"><div className="w-full">{item.notes}</div></td>
                        <td className="p-3 w-1/6 text-start">{item.created_at}</td>
                        <td className="p-3 w-1/12	text-center">
                          <button
                            type="button"
                            className="p-1 rounded-lg text-red-800"
                            onClick={function () {
                              const id = item.id;
                              if (typeof id != "string" || !id) {
                                console.error(`id not exists on `, item);
                                return;
                              }
                              if (!requests) return;
                              // `remove/${item.id}`
                              requests(`remove`, {
                                method: "DELETE",
                                headers: {
                                  "Content-Type": "application/json",
                                },
                                body: JSON.stringify({
                                  document_id: item.document_id,
                                }),
                              })
                                .then((res) => {
                                  return res.json();
                                })
                                .then((data) => {
                                  console.log(data);
                                  if (!data) {
                                    return;
                                  }
                                  fetch_pdfs();
                                });
                            }}
                          >
                            🗑️
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p className="text-center p-4" data-title="No records found">
                  Keine Einträge gefunden
                </p>
              )}
            </div>
          </div>
        ) : (
          <Loading />
        )}
      </div>
    </div>
  );
}

const Saved = () => {
  const [state, setState] = useState(false);
  const toggle = () => setState((prev) => !prev);
  return (
    <div className="relative">
      <button
        onClick={toggle}
        className="size-9 flex justify-center items-center hover:bg-main/10 rounded-lg"
        title={"Gespeicherte \n Entscheidungen"}
      >
        <ArchiveAdd size="24" color="#192245" variant="Bold"/>
      </button>
      {state
        ? createPortal(<Dropdowns toggle={toggle} />, document.body)
        : null}
    </div>
  );
};

export { NavLink };
export default Saved;

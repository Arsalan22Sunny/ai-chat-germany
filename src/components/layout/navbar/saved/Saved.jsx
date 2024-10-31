/* eslint-disable react/prop-types */
import { useContext, useEffect, useState } from "react";
import { Paperclip, ArchiveAdd } from "iconsax-react";
import { Link } from "react-router-dom";
import FetchContext from "../../../../context/fetch";
import CloserButton from "../../../common/CloseButton";
import Loading from "../../../common/Loading";
import IconBookmark from "../../../icon/IconBookmark";
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
  return (
    <div className="fixed left-0 top-0 inset-0 w-screen h-[100svh] z-[11] bg-white overflow-hidden py-4">
      <div className="h-full flex items-center justify-center overflow-y-auto">
        {saved ? (
          <div className="p-4 bg-white max-h-[100%] space-y-4 max-w-screen-xl mx-auto">
            <div className="relative">
            <div className="flex fixed items-center justify-between bg-white z-60 h-16 top-0 py-8">
              <h2 className="text-2xl lg:text-3xl font-bold">
                Gespeicherte Entscheidungen
              </h2>
              <CloserButton doCollapse={toggle} />
            </div>
            </div>
            <div className="overflow-x-auto !mt-8">
              {Array.isArray(saved) && saved.length > 0 ? (
                <table
                  className="w-full overflow-x-auto"
                  style={{ tableLayout: "auto" }}
                >
                  <thead className="fixed w-fit">
                    <tr>
                      <th className="text-start w-3/6 bg-slate-100 p-3">
                       <SearchForm/>
                      </th>
                      <th className="text-start w-1.5/6 bg-slate-100 p-3">
                        Kommentare
                      </th>
                      <th className="text-start w-1/6 bg-slate-100 p-3">
                        Datum der Speicherung
                      </th>
                      <th className="text-start w-0.5/6 bg-slate-100 p-3">
                        Aktion
                      </th>
                    </tr>
                  </thead>
                  <tbody className="flex !flex-col" style={{marginTop: "74px"}}>
                    {saved.map((item, index) => (
                      <tr key={index}>
                        <td className="py-4 w-3/6">
                          <div className="bg-slate-100 p-3 rounded-lg space-y-2">
                            <h5 className="font-semibold">{item.filename}</h5>
                            <p>{item.text}</p>
                          </div>
                        </td>
                        <td className="p-3 w-1.5/6">notes</td>
                        <td className="p-3 w-1/6">N/A</td>
                        <td className="p-3 w-0.5/6">
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

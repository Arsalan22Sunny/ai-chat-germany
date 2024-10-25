/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useContext, useState } from "react";
import IconBookmark from "../../../../icon/IconBookmark";
import cn from "../../../../../utils/cn";
import FetchContext from "../../../../../context/fetch";
import { ArchiveAdd } from "iconsax-react";

const SaveChat = ({ content, ...rest }) => {
  const [saved, setSaved] = useState(false);
  const { requests } = useContext(FetchContext);
  const [bookmarked, setBookmarked] = useState([]);


  async function saveChat({ content }) {
    const response = await requests(`save-chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...content, pagelabel: content.page_label }),
    });
    return response.json();
  }

  async function onClick() {
    if (!content) {
      console.error(`Can not defined both content and username`, content);
      return;
    }

    // When username and content are defined
    try {
      const response = await saveChat(content);
      if (response.message) {
        console.log(content,"content")
        setSaved(true);
        const timeout = setTimeout(() => {
          setSaved(false);
          clearTimeout(timeout);
        }, 2000);
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "size-4 shrink-0 flex justify-center items-center text-main",
        saved ? "!w-auto transition-all" : ""
      )}
      {...rest}
    >
      {saved ? <ArchiveAdd size="24" color="#192245" variant="Bold"/> :<IconBookmark className={"w-full h-full"} />}
      {saved ? <small className="px-2">Gespeichert</small> : ""}
    </button>
  );
};

export default SaveChat;

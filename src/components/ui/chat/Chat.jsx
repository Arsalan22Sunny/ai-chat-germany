import { useState } from "react";
import cn from "../../../utils/cn";
import ChatInput from "./ChatInput";
import ChatMain from "./main/ChatMain";
import ChatExpanded from "./expand/ChatExpanded";
import ViewerContext from '../../../context/viewer';

const UIChat = () => {
  const [PDF, setPDF] = useState(null)
  const [expand, setExpand] = useState(false)

  return (
    <ViewerContext.Provider value={{
      PDF,
      viewPDF(content) {
        setPDF(content)
      },
      expand,
      toggleChatExpand() {
        setExpand(prev => !prev)
      },
    }}>
      <div
        className={cn("mx-auto w-full h-full", "flex justify-center gap-4 bg-white text-sm")}
      >
        <div className="max-w-screen-md w-full h-full overflow-hidden flex-grow flex flex-col">
          <ChatMain />
          <ChatInput />
        </div>
        {PDF && <ChatExpanded hidePDFViewer={() => { setPDF(null); }} pdf={PDF} />}
      </div>
    </ViewerContext.Provider>
  );
};

export default UIChat;

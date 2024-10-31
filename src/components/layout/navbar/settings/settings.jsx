import IconBookmark from "../../../icon/IconBookmark";
import { Setting2 } from "iconsax-react";
import { Dropdown } from 'antd';


const Settings = () => {

    const items = [
        {
          key: '1',
          label: (
            <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
              1st menu item
            </a>
          ),
        },
        {
          key: '2',
          label: (
            <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
              2nd menu item
            </a>
          ),
        },
        {
          key: '3',
          label: (
            <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
              3rd menu item
            </a>
          ),
        },
      ];
   
    return (
      <div className="relative">
        <Dropdown menu={{ items }} placement="bottom">
        <button
          onClick={()=>{}}
          className="size-9 flex justify-center items-center hover:bg-main/10 rounded-lg"
          title={"Gespeicherte \n Entscheidungen"}
        >
         <div className="relative flex items-center justify-center">
            <div className="absolute">
              <IconBookmark color={"#666666"} stroke={"white"} className={" h-6 w-8 z-10"}/>
            </div>
            <div className="flex items-center -rotate-45 mb-1">  
              <Setting2 size="6" color="white" variant="Bold"/> 
              <Setting2 size="6" color="white" variant="Bold"/>
            </div>
          </div>
        </button>
        </Dropdown>
      </div>
    );
  };
  export default Settings
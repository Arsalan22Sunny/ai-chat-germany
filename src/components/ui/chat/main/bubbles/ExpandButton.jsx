/* eslint-disable react/prop-types */
import { AddCircle, Minus } from "iconsax-react";
import cn from "../../../../../utils/cn";
import { Tooltip } from 'antd';

const ExpandButton = ({ state, className, onClick, ...rest }) => {
  const addText= "Aufklappen"
  const minusText= "Zuklappen"
  return (
    <Tooltip 
    placement="bottomLeft" 
    title={<span className="text-black">{state?minusText:addText}</span>}  
    color="white" 
    >
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "size-8 shrink-0 flex justify-center items-center",
        className
      )}
      {...rest}
    >
      {state ? <Minus className="size-5" /> : <AddCircle className="size-4" />}
    </button>
    </Tooltip>
  );
};

export default ExpandButton;

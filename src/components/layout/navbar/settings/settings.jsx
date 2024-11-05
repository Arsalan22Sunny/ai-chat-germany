import { useState } from "react";
import IconBookmark from "../../../icon/IconBookmark";
import { Setting2 } from "iconsax-react";
import { Dropdown, Menu, Radio, Button, Divider } from 'antd';

const Settings = () => {

  const currentYear = new Date().getFullYear();
  const yearsRange = Array.from({ length: currentYear - 1980 + 1 }, (_, i) => currentYear - i);
  const years = ["All", ...yearsRange, "older"];
  const [reference, setReference] = useState(10)
  const [selectedYear, setSelectedYear] = useState('All')
  const [selectedCourt, setSelectedCourt] = useState('All')

  const courtTypes = [
      ["AG", "LG", "OLG", "BGH"],
      ["ArbG", "LAG", "BAG"],
      ["VG", "OVG", "VGH", "BVerwG"],
      ["SG", "LSG", "BSG"],
      ["FG", "BFH"],
      ["EuGH", "BVerfG", "VerfGH", "StGH", "VerfG"],
      ["BPatG"],
      ["BDG"]
    ];

  const dropdownContent = (
    <div style={{ padding: '10px', 
               width: '130px', 
               backgroundColor: "white",  
               border: '1px solid #d9d9d9',
               boxSizing: 'border-box',
               boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
               borderRadius: '8px',
               whiteSpace: 'normal',
      wordWrap: 'break-word',
      overflow: 'hidden' }}>
      {/* Ergebnisse pro Antwort Section */}
      <div>
        <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>Ergebnisse pro Antwort</div>
        <Radio.Group defaultValue={reference} style={{ display: 'block', paddingLeft: 10, maxHeight: '150px', overflowY: 'scroll' }} onChange={(e)=>setReference(e.target.value)}>
          <Radio value={10}>10</Radio>
          <Radio value={20}>20</Radio>
          <Radio value={30}>30</Radio>
          <Radio value={40}>40</Radio>
          <Radio value={50}>50</Radio>
        </Radio.Group>
      </div>

      <Divider style={{ margin: '10px 0', height: '2px', backgroundColor: '#b0b0b0' }} />

      {/* Erscheinungsjahr Section */}
      <div>
        <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>Erscheinungsjahr</div>
        <Radio.Group defaultValue={selectedYear} style={{ display: 'block', paddingLeft: 10, maxHeight: '100px', overflowY: 'scroll' }} onChange={(e)=>setSelectedYear(e.target.value)}>
        {years.map((year, index) => (
            <Radio key={index} value={year}>
              {year}
            </Radio>
        ))} 
        </Radio.Group>
      </div>

      <Divider style={{ margin: '10px 0', height: '2px', backgroundColor: '#b0b0b0' }} />

      {/* Gericht Section */}
      <div>
        <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>Gericht</div>
        <Radio.Group defaultValue={selectedCourt} style={{ display: 'block', paddingLeft: 10, maxHeight: '150px', overflowY: 'scroll' }}  onChange={(e)=>setSelectedCourt(e.target.value)}>
        <Radio value="All" className="mb-4">All</Radio>
        {courtTypes.map((group, index) => (
            <div key={index} style={{ marginBottom: index < courtTypes.length - 1 ? '15px' : '0' }}>
              {group.map((court, idx) => (
                <Radio key={idx} value={court} style={{ display: 'block'}}>
                  {court}
                </Radio>
              ))}
            </div>
          ))}
        </Radio.Group>
      </div>
    </div>
  );
   
  console.log(reference,selectedCourt,selectedYear,"lll")
    return (
      <div className="relative">
        <Dropdown dropdownRender={()=>dropdownContent} placement="bottom" trigger={['click']}>
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
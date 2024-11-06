import { useState } from "react";
import IconBookmark from "../../../icon/IconBookmark";
import { Setting2 } from "iconsax-react";
import { Dropdown, Radio, Button, Divider } from 'antd';

const Settings = () => {

  const currentYear = new Date().getFullYear();
  const yearsRange = Array.from({ length: currentYear - 1980 + 1 }, (_, i) => currentYear - i);
  const years = ["All", ...yearsRange, "older"];
  const [reference, setReference] = useState(10)
  const [selectedYear, setSelectedYear] = useState('All')
  const [selectedCourt, setSelectedCourt] = useState('All')
  const [open,setOpen] = useState(false)

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

  const handleFilter=async()=>{

    const data={
      year: selectedYear.toString(),
      court: selectedCourt,
      sources:[reference.toString()]
     }
     const accessToken = localStorage.getItem("accessToken");  
      try {
        const response = await fetch(`https://back.sanbjur.de/api/filters`, {
          method: "POST",
          headers: { 'Authorization': `Bearer ${accessToken}`,"Content-Type": "application/json",},
          body: JSON.stringify(data),
        });
  
        if (!response.ok) {
          throw new Error("Action Failed");
        }
        setOpen(false)
      } catch (error) {
        console.error("Error fetching sources:", error);
      }
  }

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

      <div className="flex justify-end">
        <Button type="primary" className="primary-button mt-3" onClick={handleFilter}>Ok</Button>
      </div>
    </div> 
  );
   
  console.log(reference,selectedCourt,selectedYear,"lll")
    return (
      <div className="relative">
        <Dropdown dropdownRender={()=>dropdownContent} open={open} placement="bottom" trigger={['click']}>
        <button
          onClick={()=>{setOpen(true)}}
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
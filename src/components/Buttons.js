import { useState } from "react";

export default function (props) {
  // const [selectedButton, setSelectedButton] = useState(null);

  return (
    <>
      <button style={{background:"#36a2eb"}} onClick={()=>{props.handleDateChange("increase")}}>+</button>
      <p> {new Date(props.currentDate).toDateString()} </p>
      <button style={{background:"#ff6384"}} onClick={()=>{props.handleDateChange("decrease")}}>-</button>
    </>
  );
}

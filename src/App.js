{/*
  PLEASE BEGIN THIS BY READING THE README.md FILE
*/}
import "./styles.css";
import PieChart from "./components/PieChart";
import StyledTable from "./components/Table";
import Buttons from "./components/Buttons";
import React, { useEffect, useState } from "react";

const reducer = (state, action) => {
  return state;
};

export default function App() {

  const [currentDate, setCurrentDate] = useState(null);
  const [vaccinationData, setVaccinationData] = useState([]);
  const [vaccinatedArr, setVaccinatedArr] = useState([]);
  const [pendingArr, setPendingArr] = useState([]);

  const [state, dispatch] = React.useReducer(reducer, {
    currentDate: new Date(),
    personInfo: []
  });

  useEffect(() => {
    fetch("./data/vaccine_dates.json",
      {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }

      }
    )
      .then((response) => {
        // console.log(response)
        return response.json();
      })
      .then(data => {
        setVaccinationData(data);
      })

    fetch("./data/current_date.json",
      {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }

      }
    )
      .then((response) => {
        // console.log(response)
        return response.json();
      })
      .then(data => {
        setCurrentDate(data.current_date);
      })

  }, [])

  useEffect(() => {
    let vaccinatedArr = [];
    let pendingArr = [];

    vaccinatedArr = vaccinationData.filter(info => {
      return Date.parse(info.vaccination_date) <= Date.parse(currentDate);
    })

    pendingArr = vaccinationData.filter(info => {
      return Date.parse(info.vaccination_date) > Date.parse(currentDate)
    })

    setVaccinatedArr(vaccinatedArr);
    setPendingArr(pendingArr);

  }, [currentDate])

  function handleDateChange(operation) {
    let date = new Date(currentDate);
    if (operation === "increase") {
      date.setDate(date.getDate() + 1);
    } else {
      date.setDate(date.getDate() - 1);
    }
    setCurrentDate(date);
  }

  return (
    <div className="App">
      <div className="chart">
        <PieChart data={[vaccinatedArr.length, pendingArr.length]} />
      </div>
      <div className="buttons">
        <Buttons currentDate={currentDate} handleDateChange={handleDateChange} />
      </div>
      <b style={{ textAlign: "center" }}>
        {vaccinatedArr.length} out of Y {vaccinationData.length}  persons have been vaccinated.
      </b>
      <div className="table">
        <StyledTable vaccinatedArr={vaccinatedArr} pendingArr={pendingArr} />
      </div>
    </div>
  );
}

import Chart from "react-apexcharts"
import { useState } from "react";

export const StockChart = ({ chartData, symbol }) => {
  const [dateFormat, setDateFormat] = useState("24h")
  const { day, week, year } = chartData;
  

  const determineTimeFormat = () => {
    switch(dateFormat) {
      case "24h":
        return day
      case "7d":
        return week
      case "1y":
        return year
      default:
        return day
    }
  }
  
  // const color = determineTimeFormat()[determineTimeFormat().length - 1].y - determineTimeFormat()[0].y > 0 ? '#26c281' : '#ed3419' (Esto esta comentado para ver al menos la pagina del grafico y la informacion de la empresa, que si me permite la pagina de finnHub. El grafico no se ve, porque esos datos ahora son para PREMIUM solo y al momento del video eran gratuitos, asi que no datos for me.)


  const color = 'white'; // Esto es porque lo otro esta comentado, para ver algo al menos.

  const options = {
    colors: [color],
    title: {
      text: symbol,
      align: "center",
      style: {
        fontSize: "24px"
      }
    },
    chart: {
      id: "stock data",
      animations: {
        speed: 1300
      }
    },
    xaxis: {
      type: "datetime",
      labels: {
        datetimeUTC: false
      }
    },
    tooltip: {
      x: {
        format: "MMM dd HH:MM"
      }
    }
  }

  const series = [{
    name: symbol,
    data: determineTimeFormat()
  }]

  const renderButtonSelect = (button) => {
    const classes = "btn m-1 "
    if (button === dateFormat) {
      return classes + "btn-primary"
    } else {
      return classes + "btn-outline-primary"
    }
  }

  return <div className="mt-5 p-4 shadow-sm bg-white">
    <Chart options={options} series={series} type="area" width="100%" 
      height= "500px"/>
    <div>
      <button className={renderButtonSelect("24h")} onClick={() => setDateFormat("24h")}>24h</button>
      <button className={renderButtonSelect("7d")} onClick={() => setDateFormat("7d")}>7d</button>
      <button className={renderButtonSelect("1y")} onClick={() => setDateFormat("1y")}>1y</button>
    </div>
  </div>
}
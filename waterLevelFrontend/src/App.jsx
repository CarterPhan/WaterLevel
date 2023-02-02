import React, { useState, useEffect } from 'react';
import './App.css';
import useAsyncFetch from './useAsyncFetch'; // a custom hook
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import MonthPicker from './MonthPicker';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
);

function App() {
	
  const [buttonPushed, updateButtonPushed] = useState(false);
  // button just resets the state variable
  // since component is re-rendered when state or props change, 
  // this will re-render
  function buttonAction() {
		if (buttonPushed) {
    	updateButtonPushed(false)
		}
		else {
			updateButtonPushed(true)
		}
  }
	  if (buttonPushed) {
	    return (
				
			<main>
	      <header>
	        <div className = "headerTile">
	          <div className="headerElement" id="bigLogo">Water storage in California reservoirs</div>
	        </div>
	      </header>
	      <div className="bigBox">
	        <div className="bodyTile">
	          <div className="body_element" id="p1">
	            California's reservoirs are part of a <a href="https://www.ppic.org/wp-content/uploads/californias-water-storing-water-november-2018.pdf">complex water storage system</a>.  The State has very variable weather, both seasonally and from year-to-year, so storage and water management is essential.  Natural features - the Sierra snowpack and vast underground aquifers - provide more storage capacity,  but reservoirs are the part of the system that people control on a day-to-day basis.  Managing the flow of surface water through rivers and aqueducts, mostly from North to South, reduces flooding and attempts to provide a steady flow of water to cities and farms, and to maintain natural riparian habitats.  Ideally, it also transfers some water from the seasonal snowpack into long-term underground storage.  Finally, hydro-power from the many dams provides carbon-free electricity. 
	          </div>
	          <div className="body_element" id="p2">
	            California's water managers monitor the reservoirs carefully, and the state publishes daily data on reservoir storage.
	            </div>
	  		    <div className="buttonHolder">
	            <button id="seeButton" onClick={buttonAction}>
	              See Less
	            </button>
	          </div>
	        </div>
	        <div className="bodyTile2">
	          <div className="body_element" id="waterIMG">
	            <img src="https://cdn.theatlantic.com/thumbor/HYdYHLTb9lHl5ds-IB0URvpSut0=/900x583/media/img/photo/2014/09/dramatic-photos-of-californias-historic-drought/c01_53834006/original.jpg
	  "/>
	          </div>
	          <div className="body_element" id="p3">
	  Lake Oroville in the 2012-2014 drought. Image credit Justin Sullivan, from The Atlatic article Dramatic Photos of California's Historic Drought.
	          </div>
	        </div>
	      </div>
	      <DataDisplay />
	    </main>
				
	    )
  }
  else return (
    <main>
      <header>
        <div className = "headerTile">
          <div className="headerElement" id="bigLogo">Water storage in California reservoirs</div>
        </div>
      </header>
      <div className="bigBox">
        <div className="bodyTile">
          <div className="body_element" id="p1">
            California's reservoirs are part of a <a href="https://www.ppic.org/wp-content/uploads/californias-water-storing-water-november-2018.pdf">complex water storage system</a>.  The State has very variable weather, both seasonally and from year-to-year, so storage and water management is essential.  Natural features - the Sierra snowpack and vast underground aquifers - provide more storage capacity,  but reservoirs are the part of the system that people control on a day-to-day basis.  Managing the flow of surface water through rivers and aqueducts, mostly from North to South, reduces flooding and attempts to provide a steady flow of water to cities and farms, and to maintain natural riparian habitats.  Ideally, it also transfers some water from the seasonal snowpack into long-term underground storage.  Finally, hydro-power from the many dams provides carbon-free electricity. 
          </div>
          <div className="body_element" id="p2">
            California's water managers monitor the reservoirs carefully, and the state publishes daily data on reservoir storage.
            </div>
  		    <div className="buttonHolder">
            <button id="seeButton" onClick={buttonAction}>
              See More
            </button>
          </div>
        </div>
        <div className="bodyTile2">
          <div className="body_element" id="waterIMG">
            <img src="https://cdn.theatlantic.com/thumbor/HYdYHLTb9lHl5ds-IB0URvpSut0=/900x583/media/img/photo/2014/09/dramatic-photos-of-californias-historic-drought/c01_53834006/original.jpg
  "/>
          </div>
          <div className="body_element" id="p3">
  Lake Oroville in the 2012-2014 drought. Image credit Justin Sullivan, from The Atlatic article Dramatic Photos of California's Historic Drought.
          </div>
        </div>
      </div>
			
    </main>
  );
}

function DataDisplay() {
	const [date, setDate] = useState({month: 4, year: 2022 });
	const [dixieCup, setDixie] = useState([]);
	
  function yearChange(newYear) {
      let m = date.month;
      setDate({year: newYear, month: m });
    }

  function monthChange(newMonth){
      let y = date.year;
      setDate({month: newMonth, year: y});
    }

  function thenFun (result) {
    setDixie(result);
    // render the list once we have it
  }
  function catchFun (error) {
    console.log(error);
  }
	  // call the custom fetch hook, passing it the callback functions that it can use
  useAsyncFetch("query/Dixie", date, thenFun, catchFun);
	let dixieGraph = [dixieCup.Shasta, dixieCup.Oroville, dixieCup.Trinity, dixieCup.Melones, dixieCup.Luis, dixieCup.Pedro, dixieCup.Berryessa];

	return(
		<div className="bodyTile3">
			<div className="body2_element" id="bar1">
				<GraphDixie dixieGraphz = {dixieGraph}> </GraphDixie>
			</div>
			<div className = "bodyTile4">
				<div className="body3_element" id="p4">
				Here's a quick look at some of the data on reservoirs from the <a href="https://cdec.water.ca.gov/index.html">California Data Exchange Center</a>, which consolidates climate and water data from multiple federal and state government agencies, and  electric utilities.  Select a month and year to see storage levels in the eleven largest in-state reservoirs.
				</div>
				<div className="body3_element" id="month">
					Change month:
				<div className="body3_element" id="monthPick">
					<MonthPicker  
					// props 
					date = {date}
					yearFun = {yearChange}
					monthFun = {monthChange}
					/>
				</div>
				</div>
			</div>
		</div>
	)

}



function GraphDixie (props) {
	var ShaMax = 4552000;
	var OroMax = 3537577;
	var TrinMax = 2447650;
	var MelMax = 2400000;
	var LuisMax = 2041000;
	var DonMax = 2030000;
	var BerMax = 1602000;
	var dixieRemainder = [ShaMax - props.dixieGraphz[0], OroMax - props.dixieGraphz[1], TrinMax - props.dixieGraphz[2], MelMax - props.dixieGraphz[3], LuisMax - props.dixieGraphz[4], DonMax - props.dixieGraphz[5], BerMax - props.dixieGraphz[6]];
	console.log(dixieRemainder);
	const options = {
	  plugins: {
	    title: {
	      display: true,
	      text: 'Chart.js Bar Chart - Stacked',
	    },
	  },
	  responsive: true,
	  scales: {
	    x: {
	      stacked: true,
	    },
	    y: {
	      stacked: true,

	    },
	  },
	};
	
	const labels = ['Shasta', 'Oroville', 'Trinity Lake', 'New Melones', 'San Luis', 'Don Pedro', 'Berryessa'];
	
	const data = {
	  labels,
	  datasets: [
	    {
	      label: 'Used Storage',
	      data: props.dixieGraphz,
	      backgroundColor: 'rgb(66, 145, 152)',
	    },
			{
				label: "Remaining Storage",
				data: dixieRemainder,
				backgroundColor: 'rgb(120, 199, 227)',
			}
	  ],
	};
	return (
		<Bar options={options} data={data} />
	)
}


export default App;
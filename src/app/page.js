'use client'
import { useState ,useEffect } from "react";
import Navbar from "./components/Navbar/Navbar";
import {AsyncPaginate} from "react-select-async-paginate"
import { geoApiOptions, GEO_API_URL } from "./api";
import { useGeolocated } from "react-geolocated";

export default function Home() {
  const [city , setCity] = useState(null);
  const [lat , setLat] = useState("");
  const [lon , setLon] =  useState("");

  const geoLocater = useGeolocated({
    positionOptions: {
        enableHighAccuracy: false,
    },
    userDecisionTimeout: 5000,
});

  const loadOptions = (search) => {
    return fetch(
      `${GEO_API_URL}/cities?minPopulation=100000&namePrefix=${search}`,
      geoApiOptions
    )
      .then((response) => response.json())
      .then((response) => {
        return {
          options: response.data.map((city) => {
            setLat(`${city.latitude}`);
            setLon(`${city.longitude}`);
            return {
              label: `${city.name}, ${city.country}` , 
            };
          })
        };
      });
  };
  

  const handleOnChange = (input) => {
    setCity(input);
    
  };
  

  const handleSubmit = () =>{
    console.log(city , lat , lon)


    setCity(null);

    
  }

  const getGeoLoc = ()=>{
    const { coords, isGeolocationAvailable, isGeolocationEnabled } = geoLocater;
    
    setLat(`${coords.latitude}`);
    setLon(`${coords.longitude}`);

    console.log(lat , lon)

    
  }


  
  
  
  return (
    <div>
    <Navbar/>

    <div>
    <button type="button" onClick={getGeoLoc} className="text-white block bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5  dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 mx-auto">
      <img />
      Use your Location
      
      </button>
      <form className="m-20">   
        <div className="ssjustify-around m-auto">
            
            <AsyncPaginate
              placeholder="Search for city"
              debounceTimeout={600}
              
              onChange={handleOnChange}
              loadOptions={loadOptions}
              required
              />
            <button type="button" onClick={handleSubmit} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 ">Search</button>
        </div>
    </form>
   
      

      
      
      
    

    </div>
    </div>
  );
}

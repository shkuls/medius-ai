"use client";
import { useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import { AsyncPaginate } from "react-select-async-paginate";
import { geoDB} from "./geoDB";
import { useGeolocated } from "react-geolocated";
import Weather from "./components/weather/Weather";
import { Player } from '@lottiefiles/react-lottie-player';

export default function Home() {
  const [city, setCity] = useState(null);
  const [lat, setLat] = useState("");
  const [lon, setLon] = useState("");
  const [weather, setWeather] = useState(null);
  const [modalState , setModalState] = useState(false)

  const getWeather = () => {
    async function getData() {
      const res = await fetch(
        `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&appid=f06c8cb328265ee77dc827183ed73a45`
      );
      const data = await res.json();
      // localStorage.setItem("weatherData" , JSON.stringify(data.current))
      setWeather(data.current)
    }
    getData();
  };

  const geoLocater = useGeolocated({
    positionOptions: {
      enableHighAccuracy: false,
    },
    userDecisionTimeout: 5000,
  });

  const loadOptions = (search) => {
    return fetch(
      `https://wft-geo-db.p.rapidapi.com/v1/geo/cities?minPopulation=100000&namePrefix=${search}`,
      geoDB
    )
      .then((response) => response.json())
      .then((response) => {
        return {
          options: response.data.map((city) => {
            setLat(`${city.latitude}`);
            setLon(`${city.longitude}`);
            return {
              label: `${city.name}, ${city.countryCode}`,
            };
          }),
        };
      });
  };

  const handleOnChange = (input) => {
    setCity(input);
  };

  const handleSubmit = () => {
    getWeather();
    
    
    setTimeout(() =>{
      if(city)
      setModalState(true)
      
      
    }, 1000)
  };

  // const getGeoLoc = () => {
  //   const { coords, isGeolocationAvailable, isGeolocationEnabled } = geoLocater;

  //   if (isGeolocationAvailable) {
  //     setLat(`${coords.latitude}`);
  //     setLon(`${coords.longitude}`);
  //     async function getCity() {
  //       const res = await fetch(
  //         `http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=f06c8cb328265ee77dc827183ed73a45`
  //       );
  //       const data = await res.json();
  //       setCity(data[0].name);
  //     }
  //     getCity();
  //   }

  //   getWeather();
    

  // };

  return (
    <div className="bg-gradient-to-r from-violet-600 to-indigo-600 h-screen">
      <Navbar/>

      <div className={`flex md:flex-row-reverse flex-col-reverse ${modalState?"hidden":"visible"}`}>
        <div className="m-auto w-3/4">


        {/* <button
          type="button"
          onClick={getGeoLoc}
          className="text-white block bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5  dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 mx-auto"
        >
          <img />
          Use your Location
        </button>
        <p className="text-center">
          OR
        </p> */}
        <span>

<p className='ml-16 font-poppins md:text-[60px] tracking-wider text-[20px] font-[700] text-white'>Don&apos;t let the weather surprise you.</p>
<p className='ml-16 font-poppins md:text-[60px] tracking-wider text-[20px] font-[700] text-white'>Get informed.</p>
</span>
        <form className="m-20">
          <div className="justify-around m-auto">
            <AsyncPaginate
              placeholder="Search for city"
              debounceTimeout={600}
              onChange={handleOnChange}
              loadOptions={loadOptions}
              required
              className="max-w-[500px] "
              
            />
            <button
              type="button"
              onClick={handleSubmit}
              className="text-white mx-auto my-5 w-40 inline bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 "
            >
              Search
            </button>
          </div>
        </form>
      </div> 
      <div>
        <Player src="/lottie/Hero.json"
        autoplay
        loop
        className="w-96"/>
      </div>


      </div>
      <div className={`w-full ${modalState?"h-screen top-0":" h-0 top-[1000px]"} transition-all duration-500 absolute  bg-[#4477CE]`}>
      <Weather input={{inputCity : city , inputWeather : weather}} />
        </div>
    </div>

  );
}

'use client'
import React from 'react'
import Image from 'next/image';
import "./styles.css"

export default function Weather(input) {

  const weather = input.input.inputWeather
  const city = input.input.inputCity

  
  
  if(weather!=null)
  {
  const today = new Date();
  const month = today.getMonth()+1;
const year = today.getFullYear();
const date = today. getDate();
const currentDate = month + "/" + date + "/" + year;
const sunriseDate = new Date(weather.sunrise * 1000);
const sunsetDate = new Date(weather.sunset * 1000);
const image = "/icons/"+weather.weather[0].icon+".png";
  return (
    
<div className="flex flex-col md:flex-row justify-center m-10 p-20 px-5 size-contain ">
    <div className='w-3/4 m-auto'>


<div className=' flex flex-row justify-center'>

    <div className="text-center sm:w-72 w-50 col-span-2 row-span-5 card py-1 my-5">
      <div className="w-3/4 my-10  mx-auto">


      <p className='font-bold'>{currentDate}</p>
      <p className='text-2xl font-bold'>{city.label}</p>
      <Image src={image} width={300}
       height={300} alt="weather" />
      <p className='w-20 p-2 mx-auto my-5 card2 font-semibold'>{weather.weather[0].main}</p>
      <p className='text-center mb-5 text-4xl font-extrabold'>Current</p>
      <p className='text-center mb-5 text-4xl font-extrabold'>{Math.round(weather.temp - 273.15) + "°C"}</p>
      <p className='font-semibold text-xl italic'>{"Feels Like " + Math.round(weather.feels_like - 273.15)  + "°C"}</p>
      </div>


    </div>
    </div>



   <div className='flex flex-col font-semibold m-auto'> 


      <p className='text-center mb-5 text-4xl font-extrabold'>
        TODAY
      </p>
    <div className="m-3 p-5 row-span-2 col-start-3 card">
      <p>Sunrise{" "+ sunriseDate.toLocaleTimeString() + " IST"}</p>
      <p>Sunset{" "+ sunsetDate.toLocaleTimeString() + " IST"}</p>
    </div>
    <div className=" m-3 p-5 row-span-2 card col-start-4">
      <p>Humidity{" "+ weather.humidity + "%"}</p>
      <p>Pressure{" "+ weather.pressure + "mb"}</p>
    </div>
    <div className="m-3 p-5 row-span-2 card col-start-3 row-start-3">
      <p>Wind Speed{" "+ weather.wind_speed + "km/h"}</p>
      <p>Wind Direction{" "+ weather.wind_deg + "°"}</p>
    </div>
    <div className="row-span-2  col-start-4 row-start-3">

    </div>
    </div> 
    </div>
    

    

</div>
  )
}
  else
  return(
<>
</>)
  
}

'use client'
import { useState } from "react";
import Image from "next/image"

const items = [{
    title : "Home" , 
    link : '/'
} ,
{
    title : "About" , 
    link : '/about'
},
{
    title : "Services" , 
    link : '/services'
},
{
    title : "Contact" , 
    link : '/contact'
},]


export default function Navbar() {
    const [open  , setOpen] = useState(true)
  return (<>
    <div className=" mb-10 h-20 justify-around bg-[#35155D] sticky top-0 font-poppins z-10 sm:flex hidden">

        {items.map((item , index)=>
            <a key={index} href={item.link} className=" text-[#fff] m-auto text-2xl text-center font-bold hover:  transition-all">{item.title}</a>
        )}
      
    </div>
    <div className="mb-10 h-20  justify-around bg-[#35155D] sticky top-0 font-poppins z-10 sm:hidden">
            <div onClick={()=>setOpen(!open)} className={`h-16 p-5 mx-5`} >
            <Image src="/icons/menu.png" width={40} 
       height={40} alt="weather"/>


            </div>
            <div className={`flex flex-col w-full bg-[#35155D] transiton-all duration-300 ${open?"h-0":"h-60"}`}>
                
        {items.map((item , index)=>
            <a key={index} onClick={()=>setOpen(!open)} href={item.link} className={`text-[#fff]  m-auto  text-center font-semibold hover: {tracking-widest}  ${open?"text-[0px]":"text-3xl"} transition-all`}>{item.title}</a>
        )}
            </div>
      
    </div>
  
  
  
  </>
  )
}
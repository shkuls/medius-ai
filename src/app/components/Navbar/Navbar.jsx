'use client'
import { useState } from "react";

import menu from "../../../../public/assets/menu.svg"

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
    <div className=" mb-10 h-20 justify-around bg-[#5580E9] sticky top-0 font-poppins z-10 sm:flex hidden">

        {items.map((item , index)=>
            <a key={index} href={item.link} className=" text-[#010101] m-auto text-2xl text-center font-bold hover:  transition-all">{item.title}</a>
        )}
      
    </div>
    <div className="mb-10 h-20  justify-around bg-[#5580E9] sticky top-0 font-poppins z-10 sm:hidden">
            <img onClick={()=>setOpen(!open)} src={menu} className={`h-16 mx-5 ${open?"rotate-0":""}`} />

            <div className={`flex flex-col w-full bg-[#5580E9] transiton-all duration-300 ${open?"h-0":"h-60"}`}>
                
        {items.map((item , index)=>
            <a key={index} onClick={()=>setOpen(!open)} href={item.link} className={`text-[#010101]  m-auto  text-center font-semibold hover: {tracking-widest}  ${open?"text-[0px]":"text-3xl"} transition-all`}>{item.title}</a>
        )}
            </div>
      
    </div>
  
  
  
  </>
  )
}
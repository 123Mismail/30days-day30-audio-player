
"use client"
import React, { useEffect, useRef, useState } from 'react'

const StopWatch = () => {
       const [isStart , setStart] =useState(false)
       const [ellapseTime , setEllapseTime] =useState<number>(0)
       const intervalIdRef= useRef<any>(null);
       const startTimeRef=useRef(0)

     useEffect(()=>{
      if(isStart)
       intervalIdRef.current= setInterval(()=>{
          setEllapseTime(Date.now() -startTimeRef.current);
      },10)

      return ()=>clearInterval(intervalIdRef.current)
     })
    
   const startTime=()=>{
    setStart(true)
    startTimeRef.current= Date.now() - ellapseTime;
   }

   const stopTime=()=>{
    setStart(false)
   };
   const resetTime=()=>{
    setEllapseTime(0);
    setStart(false)
   }
     console.log(startTimeRef.current/1000  ,"finding value of start time ref value")
  //  console.log(startTime(),"time is starting our here")
  return (
    <div className='flex absolute justify-center h-screen items-center z-0'>
      <div className='min-h-[200px] max-w-[500px] w-full  rounded-full'>
        <h1 className='text-center p-2 text-4xl font-semibold'> Stop Watch</h1>
        
        <div className='mx-auto text-center text-4xl pt-2 pb-2 font-extrabold'>
          <span>{Math.floor(ellapseTime/(1000 * 60)%60 )} :</span>
          <span>{Math.floor(ellapseTime/(1000) %60)} :</span>
          <span>{Math.floor(ellapseTime/(100) %1000 )}</span>
          
          
        </div>
        <div className='text-center space-x-2 p-2 text-base font-medium'>
          <span><button className='px-4 py-2 rounded-xl bg-green-600 text-white'
           onClick={startTime}
          >start</button></span>
          <span><button className='px-4 py-2 rounded-xl bg-red-600 text-white'
          onClick={stopTime}
    
          >stop</button></span>
          <span><button className='px-4 py-2 rounded-xl bg-blue-600 text-white'  
          onClick={resetTime}
          >reset</button></span>
          
         
        </div>
         
        <div>

        </div>
      </div>
    </div>
  )
}

export default StopWatch
import React from "react";
import StopWatch from "./StopWatch";

const CircularShapes = () => {
  return (
    <div className='relative  flex justify-center h-screen items-center'>
    <div className='relative flex justify-center items-center h-[450px] w-[450px]     rounded-full overflow-hidden'>
        {/* Main Circle */}
        {/* <div className='h-40 w-40 rounded-full bg-indigo-500'></div> */}
        
        {/* Smaller Circles */}
        <div className='absolute rotate animate-spin-slow   '>
            {[...Array(20)].map((_, index) => (
                <div
                    key={index}
                    className='h-10 w-10 rounded-full space-x-6  bg-indigo-500 absolute'
                    style={{
                        transform: `rotate(${index * 30}deg) translate(174px)`,
                        transformOrigin: '0 0'
                    }}
                ></div>
            ))}
        </div>
        <StopWatch/>
    </div>
  
</div>

  );
};

export default CircularShapes;

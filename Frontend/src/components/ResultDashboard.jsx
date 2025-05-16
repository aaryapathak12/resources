import React from 'react'
import { LineChart } from '@mui/x-charts/LineChart';
import { useParams } from 'react-router-dom';
import { wpm as findWPM } from '../utils/calculateScore';
function ResultDashboard() {
    const {nWords,Chars,nChars,nTime}=useParams();
    const nw=parseInt(nWords);
    console.log(nWords);
    const nc=parseInt(nChars,10);
    const nt=parseInt(nTime,10);
    console.log(nTime);
    const wpm=findWPM(nw,nt);
  return (
    <>
        <div className='h-full w-full flex font-mono sm:text-2xl text-yellow-500'>
           <div className='w-[30%] h-full ml-[2%]'>
             <div className='h-3/9 w-full  flex items-center text-5xl font-semibold'>
                <span>WPM:{wpm}</span>
            </div>
            <div className='h-3/9 w-full  flex items-center  text-5xl font-semibold'>
                <span>Accuracy:{nChars}</span>
            </div>
            <div className='h-3/9 w-full  flex items-center  text-5xl font-semibold '>
                <span>Consistency:{nTime}</span>
            </div>
           </div>
            <div className='h-full w-[70%]'>
                <div id="graph" className='h-6/9 w-full flex justify-center'>
                <LineChart
  xAxis={[{ data: [1, 2, 3, 5, 8, 10] 
    ,
  }]}
  series={[
    {
      data: [2, 5.5, 2, 8.5, 1.5, 5],
      area:true,
      color: '#ff7f0e',
    },
    
  ]
}
  grid={{ vertical: true, horizontal: true }}
  height={300}
/>
                </div>
                <div className='w-full h-3/9  flex'>
                    <div className='h-full w-3/9 flex items-center justify-center text-3xl font-mono'>
                        <span>Total time:{nTime}s</span>
                    </div>
                    <div className='h-full w-3/9 flex items-center justify-center text-3xl font-mono'>
                        <span>Total Characters:{Chars}/{nChars}</span>
                    </div>
                    <div className='h-full w-3/9 flex items-center justify-center text-3xl font-mono'>
                        <span>Total time</span>
                    </div>
                </div>
           </div>
        </div>
    </>
  )
}

export default ResultDashboard
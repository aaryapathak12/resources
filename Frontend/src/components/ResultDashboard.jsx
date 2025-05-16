import React from 'react'
import { LineChart } from '@mui/x-charts/LineChart';
import { VscDebugRestart } from "react-icons/vsc";
import { useNavigate, useParams } from 'react-router-dom';
import { accuracy, wpm as findWPM } from '../utils/calculateScore';
function ResultDashboard() {
    const {nWords,Chars,nChars,correct,nTime}=useParams();
    const nw=parseInt(nWords);
    console.log(nWords);
    const nc=parseInt(Chars,10);
    const nt=parseInt(nTime,10);
    const ncorrect=parseInt(correct,10);
    console.log(nTime);
    const wpm=findWPM(nw,nt);
    const acc=accuracy(ncorrect,nc);
    const nav=useNavigate();
    const reset=()=>
    {
      nav(`/`);
    }
  return (
    <>
        <div className='h-full w-full flex font-mono sm:text-2xl text-yellow-500'>
           <div className='w-[30%] h-full ml-[2%]  text-4xl'>
             <div className='h-3/9 w-full  flex items-center  font-semibold'>
                <span>WPM:{wpm}</span>
            </div>
            <div className='h-3/9 w-full  flex items-center   font-semibold'>
                <span>Accuracy:{acc}%</span>
            </div>
            <div className='h-3/9 w-full  flex items-center  font-semibold '>
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
                <div className='w-full h-3/9 text-2xl flex'>
                    <div className='h-full w-3/9 flex items-center justify-center font-mono'>
                        <span>Total time:{nTime}s</span>
                    </div>
                    <div className='h-full w-3/9 flex items-center justify-center font-mono'>
                        <span>Total Characters:{nChars}/{Chars}</span>
                    </div>
                    <div className='h-full w-3/9 flex items-center justify-center font-mono'>
                      <label>
                        restart
                      </label>
                        <button className='btn bg-transparent border-none w-17 shadow-none lg:tooltip' data-tip="restart" onClick={reset} >
                                  <VscDebugRestart className='h-2/3 w-2/3 hover:-rotate-180 duration-150' />
                        </button>
                    </div>
                </div>
           </div>
        </div>
    </>
  )
}

export default ResultDashboard
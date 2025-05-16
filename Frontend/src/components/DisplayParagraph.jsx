import React, { useEffect, useRef, useState } from 'react';
import { VscDebugRestart } from "react-icons/vsc";
import { useNavigate } from 'react-router-dom';
import { paraSelector } from '../utils/paragraph_selector';

function DisplayParagraph() {
  const [paragraph, setParagraph] = useState(paraSelector(1, 0, 0, 0));
  const para = paragraph.split("");
  const [typedInput, setTypedInput] = useState("");
  const [stopwatch, setStopWatch] = useState(30);
  const [timeflag, setFlag] = useState(false);
  const punctuation = useRef(false);
  const number = useRef(false);
  const correct = useRef(0);
  const nWords = useRef(0);
  const nChars = useRef(0);
  const totalChar = useRef(paragraph.replace(/\s+/g, '').length);
  const nav = useNavigate();
  const scrollRef = useRef(null);

  const reset = () => {
    setFlag(false);
    setStopWatch(30);
    setTypedInput("");
    correct.current = 0;
    nWords.current = 0;
    nChars.current = 0;
    updateParagraph();
  };

  const handlePunctuationToggle = (e) => {
    punctuation.current = e.target.checked;
    updateParagraph();
  };

  const handleNumberToggle = (e) => {
    number.current = e.target.checked;
    updateParagraph();
  };

  const updateParagraph = () => {
    const newParagraph = paraSelector(
      !punctuation.current && !number.current ? 1 : 0,
      number.current && !punctuation.current ? 1 : 0,
      punctuation.current && !number.current ? 1 : 0,
      punctuation.current && number.current ? 1 : 0
    );
    setParagraph(newParagraph);
    totalChar.current = newParagraph.replace(/\s+/g, '').length;
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (!timeflag) return;
      setStopWatch(prev => {
        if (prev <= 0.1) {
          clearInterval(interval);
          return 0;
        }
        return +(prev - 0.1).toFixed(1);
      });
    }, 100);
    return () => clearInterval(interval);
  }, [timeflag]);

  const handleKeydown = (e) => {
    setFlag(true);
    if (e.key === "Backspace") {
      setTypedInput(prev => prev.slice(0, -1));
    } else if (e.key.length === 1) {
      setTypedInput(prev => prev + e.key);
    }
  };

  useEffect(() => {
    const typed = typedInput.split("");
    let wordCount = 0;
    let charCount = 0;
    correct.current = 0;

    typed.forEach((char, index) => {
      if (char === " ") wordCount++;
      if (para[index] === char) {
        charCount++;
        correct.current++;
      }
    });

    nWords.current = wordCount;
    nChars.current = charCount;

    // Scroll when new lines are reached
    if (scrollRef.current) {
      const lineHeight = 48; // Tailwind's text-4xl ~ 3rem (48px)
      const currentLine = Math.floor(typed.length / 50); // assuming ~50 chars per line
      scrollRef.current.scrollTop = currentLine * lineHeight;
    }
  }, [typedInput, paragraph]);

  useEffect(() => {
    if (stopwatch === 0) {
      nav(`/result/${nWords.current}/${totalChar.current}/${nChars.current}/${correct.current}/${30}`);
    }
  }, [stopwatch, nav]);

  useEffect(() => {
    window.addEventListener("keydown", handleKeydown);
    return () => window.removeEventListener("keydown", handleKeydown);
  }, []);

  return (
    <>
      <div className='flex justify-center h-30'>
        <span className='text-yellow-500 text-5xl'>{stopwatch.toFixed(1)}</span>
      </div>

      {/* Scrollable Paragraph Display */}
      <div
        className="relative px-4 overflow-hidden"
        style={{ height: "192px" }} // 4 lines * 48px
        ref={scrollRef}
      >
        {/* Colored Characters Layer */}
        <div className="absolute flex flex-wrap gap-x-0.5 gap-y-2 text-4xl font-mono w-full">
          {para.map((char, index) => {
            const typedChar = typedInput[index];
            let className = "text-gray-400";
            if (typedChar !== undefined) {
              className = typedChar === char ? "text-green-500" : "text-red-500";
            }
            return (
              <span key={index} className={className}>
                {char === " " ? '\u00A0' : char}
              </span>
            );
          })}
        </div>

        {/* Cursor Layer */}
        <div className="absolute flex flex-wrap gap-x-0.5 gap-y-2 text-4xl font-mono w-full">
          {para.map((char, index) => {
            if (index === typedInput.length) {
              return (
                <span key="cursor" id="blink" className="text-yellow-400">_</span>
              );
            }
            return <span key={index} className="invisible">{char === " " ? '\u00A0' : char}</span>;
          })}
        </div>
      </div>

      {/* Controls */}
      <div className='w-full h-20 mt-[10%] flex bg-gray-600 rounded-2xl font-mono'>
        <div className='h-full w-1/3 flex items-center justify-center gap-5 mx-3'>
          <label><input type="radio" name="radio-8" value={30} onChange={() => setStopWatch(30)} className="radio radio-warning" defaultChecked /> 30 sec</label>
          <label><input type="radio" name="radio-8" value={60} onChange={() => setStopWatch(60)} className="radio radio-warning" /> 1 min</label>
          <label><input type="radio" name="radio-8" value={120} onChange={() => setStopWatch(120)} className="radio radio-warning" /> 2 min</label>
        </div>

        <div className="text-yellow-400 text-6xl my-2">|</div>

        <div className='flex items-center h-full mx-20'>
          <button className='btn bg-transparent border-none w-17 shadow-none lg:tooltip' data-tip="restart" onClick={reset}>
            <VscDebugRestart className='h-2/3 w-2/3 hover:-rotate-180 duration-150' />
          </button>
        </div>

        <div className="text-yellow-400 text-6xl my-2">|</div>

        <div className='h-full w-1/3 flex items-center justify-center gap-5 mx-3'>
          <label><input type="checkbox" className="checkbox checkbox-warning" onChange={handlePunctuationToggle} /> Punctuation</label>
          <label><input type="checkbox" className="checkbox checkbox-warning" onChange={handleNumberToggle} /> Numbers</label>
        </div>
      </div>
    </>
  );
}

export default DisplayParagraph;

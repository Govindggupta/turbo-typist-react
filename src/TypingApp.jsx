import React, { useState, useEffect, useRef } from "react";
import "./App.css";

const TypingApp = () => {
  const paragraphs = [
    "The quick brown fox jumps over the lazy dog in the quiet, moonlit park, its shadow dancing on the ground as it moves with grace and agility, disappearing into the underbrush.",
    "She sells seashells by the seashore, where the salty waves kiss the golden sand, and the seagulls cry above, creating a symphony of nature's beauty and harmony that echoes along the coast.",
    // ... (other paragraphs)
  ];

  const [text, setText] = useState("");
  const [charIndex, setCharIndex] = useState(0);
  const [mistakes, setMistakes] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [isTyping, setIsTyping] = useState(false);
  const [typedText, setTypedText] = useState("");
  const [finalWPM, setFinalWPM] = useState(0);
  const [finalCPM, setFinalCPM] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const inputRef = useRef(null);
  const timerRef = useRef(null);

  useEffect(() => {
    loadParagraph();
  }, []);

  useEffect(() => {
    if (isTyping && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      clearInterval(timerRef.current);
      calculateResults();
      setIsTyping(false);
    }

    return () => clearInterval(timerRef.current);
  }, [isTyping, timeLeft]);

  const loadParagraph = () => {
    const randomIndex = Math.floor(Math.random() * paragraphs.length);
    setText(paragraphs[randomIndex]);
    resetGameState();
  };

  const resetGameState = () => {
    setCharIndex(0);
    setMistakes(0);
    setTimeLeft(60);
    setIsTyping(false);
    setTypedText("");
    setFinalWPM(0);
    setFinalCPM(0);
    setAccuracy(100);
    if (timerRef.current) clearInterval(timerRef.current);
  };

  const calculateResults = () => {
    const correctChars = charIndex - mistakes;
    setFinalWPM(Math.round((correctChars / 5) * (60 / 60)));
    setFinalCPM(correctChars);
    setAccuracy(Math.round((correctChars / charIndex) * 100));
  };

  const handleTyping = (e) => {
    if (timeLeft === 0) return;

    const value = e.target.value;
    const lastChar = value.charAt(value.length - 1);
    const currentChar = text.charAt(charIndex);

    if (!isTyping) {
      setIsTyping(true);
    }

    if (e.nativeEvent.inputType === "deleteContentBackward") {
      if (charIndex > 0) {
        const newIndex = charIndex - 1;
        setCharIndex(newIndex);
        setMistakes((prev) => typedText.charAt(newIndex) !== text.charAt(newIndex) ? prev - 1 : prev);
      }
    } else {
      setCharIndex(charIndex + 1);
      if (currentChar !== lastChar) {
        setMistakes((prev) => prev + 1);
      }
    }

    setTypedText(value);
    if (charIndex > 0) {
      setAccuracy(Math.round(((charIndex - mistakes) / charIndex) * 100));
    }
  };

  const resetGame = () => {
    loadParagraph();
    if (inputRef.current) {
      inputRef.current.value = "";
      inputRef.current.focus();
    }
  };

  const wpm = timeLeft > 0 ? Math.round(((charIndex - mistakes) / 5 / (60 - timeLeft)) * 60) : finalWPM;
  const cpm = timeLeft > 0 ? charIndex - mistakes : finalCPM;

  return (
    <div className="min-h-screen bg-[#2b2b2b] flex flex-col items-center justify-center text-white">
      {timeLeft > 0 && (
        <input
          type="text"
          className="input-field opacity-0 absolute z-[-99]"
          ref={inputRef}
          onInput={handleTyping}
          autoFocus
          value={typedText}
          disabled={timeLeft === 0}
        />
      )}
      <div className="text-center">
        <div className="flex items-center gap-3 mb-5 sm:mb-10 justify-center">
          <div className="w-10"><img src="./src/assets/logo.svg" alt="" /></div>
          <h1 className="text-white font-semibold text-2xl sm:text-4xl" style={{ fontFamily: 'Ubuntu Mono' }}>Turbo-Typist</h1>
        </div>
        <div className="content-box">
          <div className="typing-text">
            <div className="paragraph-text text-center p-4 mt-8 sm:mt-16 m-auto sm:text-3xl sm:w-[70%] text-[#878787]">
              {text.split("").map((char, index) => {
                let className = "relative";
                if (index === charIndex) className += " cursor";
                if (index < charIndex) {
                  className += typedText.charAt(index) === char ? " correct text-white" : " incorrect text-red-600";
                }
                return (
                  <span key={index} className={className}>
                    {char}
                  </span>
                );
              })}
            </div>
          </div>
          <div className="result-details flex justify-evenly px-4 text-center mt-10">
            <li className="time text-xl sm:text-4xl text-[#f5ed00]">
              <span><b>{timeLeft}</b>s</span>
            </li>
            <span className="font-mono flex justify-center gap-9 mt-5 sm:text-2xl">
              <li className="mistake flex">
                <p>Mistakes:</p>
                <span className="ml-1 text-[#f5ed00]">{mistakes}</span>
              </li>
              <li className="wpm flex">
                <p>WPM:</p>
                <span className="ml-1 text-[#f5ed00]">{wpm}</span>
              </li>
              <li className="cpm flex">
                <p>CPM:</p>
                <span className="ml-1 text-[#f5ed00]">{cpm}</span>
              </li>
              <li className="accuracy flex">
                <p>Accuracy:</p>
                <span className="ml-1 text-[#f5ed00]">{accuracy}%</span>
              </li>
            </span>
          </div>
          <div className="m-3 flex justify-center sm:text-2xl sm:m-7">
            <button
              className="text-[#f5ed00] border-2 border-[#f5ed00] rounded-lg p-1.5 font-semibold"
              onClick={resetGame}
            >
              TRY AGAIN
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TypingApp;

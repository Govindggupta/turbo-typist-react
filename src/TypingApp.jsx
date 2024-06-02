import React, { useState, useEffect, useRef } from "react";
import "./App.css";

const TypingApp = () => {
  const paragraphs = [
    "The quick brown fox jumps over the lazy dog in the quiet, moonlit park, its shadow dancing on the ground as it moves with grace and agility, disappearing into the underbrush.",
    "She sells seashells by the seashore, where the salty waves kiss the golden sand, and the seagulls cry above, creating a symphony of nature's beauty and harmony that echoes along the coast.",
    "Under the twinkling stars, they danced together, lost in the rhythm of the night, their hearts beating in unison, as if time itself had paused to witness their love story unfold beneath the celestial canopy.",
    "The ancient castle stood tall, its walls whispering stories of forgotten heroes and battles, with ivy crawling up its stone facade and the echoes of history reverberating through its empty halls.",
    "A gentle breeze carried the sweet scent of blooming flowers across the open meadow, where butterflies flitted from blossom to blossom, creating a tapestry of color and life that enchanted all who passed by.",
    "The bustling city never slept, its streets alive with endless energy and vibrant lights, as people from all walks of life hurried to and fro, creating a mosaic of stories and dreams in constant motion.",
    "In the deep forest, the old oak tree was a silent witness to centuries of history, its gnarled branches reaching towards the sky, and its roots firmly anchored in the rich, ancient soil that held secrets of the past.",
    "The crystal-clear lake mirrored the majestic mountains, creating a breathtaking scene where nature's grandeur was reflected in perfect symmetry, offering a moment of peace and contemplation to all who gazed upon it.",
    "Every morning, the sun's warm rays gently woke the sleepy village from its slumber, casting a golden glow over the rooftops and filling the air with the promise of a new day filled with possibilities and hope.",
    "The curious kitten explored every corner of the house, discovering new wonders each day, its playful antics bringing joy and laughter to the family, as it bounded from room to room with boundless energy.",
    "Beneath the surface of the ocean, a hidden world of colorful coral and exotic fish thrived, their vibrant hues and intricate patterns weaving a mesmerizing underwater tapestry that captivated the imagination of all who ventured below.",
    "The snow-covered landscape sparkled under the winter sun, a pristine blanket of white that stretched as far as the eye could see, inviting adventurers to carve their paths through its untouched beauty.",
    "With each stroke of the brush, the artist brought a vivid dream to life on the canvas, capturing moments of wonder and emotion that spoke to the soul, transcending the boundaries of time and space.",
    "The old library was a treasure trove of knowledge, filled with dusty books and ancient scrolls, each one a portal to a different world, waiting to be discovered by those who sought wisdom and adventure.",
    "The smell of freshly baked bread wafted through the air, inviting everyone to the cozy bakery, where warmth and comfort were served alongside delicious pastries and friendly smiles, making it a beloved community hub.",
    "High above, the eagle soared, its keen eyes scanning the land for any sign of movement, a symbol of freedom and strength, effortlessly riding the thermals that carried it to the highest peaks.",
    "The little boy's laughter echoed through the playground, a sound of pure joy and innocence that brightened the day of everyone who heard it, reminding them of the simple pleasures of childhood.",
    "At the carnival, the bright lights and cheerful music created an atmosphere of festive excitement, where families and friends came together to enjoy rides, games, and the magic of shared experiences.",
    "The mysterious figure in the cloak moved silently through the shadows, unseen by the crowd, its presence a whisper of intrigue and danger that sent shivers down the spines of those who sensed it.",
    "As the ship sailed into the horizon, the crew felt a mix of anticipation and adventure, each wave carrying them closer to the unknown, where dreams and destinies awaited in the vast expanse of the ocean.",
    "In the heart of the city, a hidden garden flourished, providing a serene escape from the urban chaos, where flowers bloomed in riotous colors and birds sang sweet melodies, offering solace to weary souls.",
    "The long, winding road led them through picturesque villages, each with its unique charm and history, where cobblestone streets and quaint cottages painted a picture of timeless beauty and tranquility.",
    "From the top of the mountain, the view was breathtaking, stretching as far as the eye could see, with valleys, rivers, and forests blending into a majestic panorama that filled the heart with awe and wonder.",
    "In the quiet of the early morning, the birds sang a harmonious melody that greeted the new day, their songs weaving a tapestry of sound that welcomed the dawn with a promise of hope and renewal.",
    "The old man sat on the porch, recounting tales of his youth to his wide-eyed grandchildren, his voice a gentle reminder of the past and the lessons learned through a lifetime of experiences.",
    "The enchanted forest was home to many mystical creatures, each with their own magical powers, creating a realm of wonder and mystery that beckoned adventurers to explore its hidden depths.",
    "Under the glowing moonlight, the couple shared a dance, lost in their love and the beauty of the night, their hearts beating as one in a moment of pure, unspoken connection that transcended words.",
    "The abandoned house at the edge of town was said to be haunted, filled with ghostly whispers and eerie shadows, its dark history a source of endless fascination and fear for the townsfolk.",
    "The market was a bustling hub of activity, filled with vibrant colors and enticing aromas, where merchants hawked their wares and shoppers haggled for the best deals, creating a lively tapestry of human interaction.",
    "Through the dense fog, the lighthouse's beam guided the weary sailors safely to shore, its steady light a beacon of hope and safety in the midst of the stormy seas that threatened to engulf them.",
    "The wise old owl perched on the tree, watching over the forest with its all-knowing eyes, a silent guardian of the night, whose presence inspired reverence and respect among the woodland creatures.",
    "As the rain poured down, the children splashed in puddles, their laughter echoing through the streets, a joyful reminder of the simple pleasures that can be found even in the midst of a storm.",
    "The grand ballroom was decorated with sparkling chandeliers and elegant tapestries, ready for the gala, where guests in their finest attire would dance the night away in a celebration of beauty and grace.",
    "In the distance, the sound of thunder rumbled, signaling the approach of a mighty storm, its ominous presence a reminder of nature's power and the unpredictable forces that shape our world.",
    "The scientist worked late into the night, determined to solve the complex equation before dawn, her mind racing with possibilities and the thrill of discovery, driven by a passion for knowledge.",
    "Amidst the chaos of the battlefield, a sense of camaraderie and brotherhood held the soldiers together, their shared experiences forging bonds that would last a lifetime, even in the face of adversity.",
    "The young artist found inspiration in the city's vibrant street art, incorporating it into her own work, creating pieces that spoke to the soul and reflected the diverse and dynamic spirit of urban life.",
    "With a determined spirit, she climbed the steep hill, each step bringing her closer to her goal, her heart filled with a sense of purpose and the promise of achievement at the journey's end.",
    "In the tranquil garden, the gentle hum of bees and the fragrance of roses created a peaceful retreat, a sanctuary where the worries of the world could melt away in the embrace of nature's beauty.",
    "The ancient manuscript held secrets of a bygone era, its fragile pages filled with cryptic symbols and faded illustrations, a testament to the wisdom and mysteries of a civilization long forgotten."
];

  const [text, setText] = useState("");
  const [charIndex, setCharIndex] = useState(0);
  const [mistakes, setMistakes] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [isTyping, setIsTyping] = useState(false);
  const [typedText, setTypedText] = useState("");
  const [finalWPM, setFinalWPM] = useState(0);
  const [finalCPM, setFinalCPM] = useState(0);
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
      return () => clearInterval(timerRef.current);
    } else if (timeLeft === 0) {
      clearInterval(timerRef.current);
      setIsTyping(false);
      // Calculate and set final WPM and CPM when time is up
      setFinalWPM(Math.round(((charIndex - mistakes) / 5) * (60 / 60)));
      setFinalCPM(charIndex - mistakes);
    }
  }, [isTyping, timeLeft]);

  const loadParagraph = () => {
    const randomIndex = Math.floor(Math.random() * paragraphs.length);
    setText(paragraphs[randomIndex]);
    setCharIndex(0);
    setMistakes(0);
    setTimeLeft(60);
    setIsTyping(false);
    setTypedText("");
    setFinalWPM(0);
    setFinalCPM(0);
    if (timerRef.current) clearInterval(timerRef.current);
  };

  const handleTyping = (e) => {
    if (timeLeft === 0) return; // Prevent typing when time is over

    const charArray = text.split("");
    const value = e.target.value;
    const typedChar = value.charAt(value.length - 1);

    if (!isTyping) {
      setIsTyping(true);
    }

    if (e.nativeEvent.inputType === "deleteContentBackward") {
      if (charIndex > 0) {
        const newIndex = charIndex - 1;
        setCharIndex(newIndex);
        if (typedText.charAt(newIndex) !== charArray[newIndex]) {
          setMistakes((prevMistakes) => prevMistakes - 1);
        }
      }
    } else {
      if (charIndex < charArray.length) {
        if (charArray[charIndex] === typedChar) {
          setCharIndex((prevIndex) => prevIndex + 1);
        } else {
          setMistakes((prevMistakes) => prevMistakes + 1);
          setCharIndex((prevIndex) => prevIndex + 1);
        }
      }
    }

    setTypedText(value);

    if (charIndex >= charArray.length - 1) {
      clearInterval(timerRef.current);
      setIsTyping(false);
    }
  };

  const resetGame = () => {
    loadParagraph();
    if (inputRef.current) {
      inputRef.current.value = "";
      inputRef.current.focus();
    }
    setIsTyping(false);
    setTimeLeft(60); // Reset the timer
  };

  // Calculate ongoing WPM and CPM or use final values if the timer is up
  const wpm = timeLeft > 0 ? Math.round(((charIndex - mistakes) / 5 / (60 - timeLeft)) * 60) : finalWPM;
  const cpm = timeLeft > 0 ? charIndex - mistakes : finalCPM;

  return (
    <div className="min-h-screen bg-[#2b2b2b] flex flex-col items-center justify-center text-white">
      <input
        type="text"
        className="input-field opacity-0 absolute z-[-99]"
        ref={inputRef}
        onInput={handleTyping}
        autoFocus
        value={typedText}
        disabled={timeLeft === 0} // Disable input when time is over
      />
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

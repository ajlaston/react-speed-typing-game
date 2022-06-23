import './App.css';
import React from "react";

function App() {
  const time = 10;
  const [timeRemaining, setTimeRemaining] = React.useState(time);

  const [count, setCount] = React.useState(false);

  const txtAreaRef = React.useRef(null);
  const startBtnRef = React.useRef(null);

  const text = "Press Start to begin typing";
  const [txt, setTxt] = React.useState(text);

  const [wordCount, setWordCount] = React.useState(0);

  const handleChange = (e) => {
    setTxt(e.target.value);
  }
  
  const onStart = () => {
    startBtnRef.current.disabled = true;
    txtAreaRef.current.style.background = "rgb(27, 198, 27)";
    txtAreaRef.current.disabled = false;
    setTxt("");
    setWordCount(0);
    setCount(true);
  }
  
  const calculateWords = () => {
    const arr = txt.split(" ");
    const filteredArr = arr.filter(word=> {
      return word.trim() !== "";
    })
    setWordCount(filteredArr.length);
  }

  React.useEffect(()=>{
    txtAreaRef.current.disabled = true;
  }, [])

  React.useEffect(()=>{

    if(count && timeRemaining > 0){
      txtAreaRef.current.focus();

      setTimeout(()=>{
        setTimeRemaining(prev=> prev-1);
      }, 1000);
    }
   
    if(timeRemaining === 0){
      startBtnRef.current.disabled = false;
      setTimeRemaining(time);
      setCount(false);
      txtAreaRef.current.style.background = "rgb(206, 206, 206)";
      txtAreaRef.current.disabled = true;
      calculateWords()
      setTxt(text);
    }

  }, [timeRemaining, count])

  return (
    <div className="app">

      <div className='app-container'>

        <header>
          <h3>How Fast Do You Type?</h3>
        </header>

        <main>
          <div className='body'>
            <textarea ref={txtAreaRef} className='typing-box' onChange={handleChange} value={txt} />

            <div className='time-remaining'>
              <h2>Time remaining: {timeRemaining}</h2>
            </div>

            <div className='start-container'>
             <button ref={startBtnRef} className='start-btn' onClick={onStart}>{ wordCount > 0 ? "PLAY AGAIN" : "START"}</button>
            </div>

            <div className='word-count'>
             {wordCount > 0 ? <h2>Word Count: {wordCount}</h2> : ""}
            </div>
            
          </div>
        </main>

      </div>
    </div>
  );
}

export default App;

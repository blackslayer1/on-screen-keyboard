import './App.scss';
import { MouseEvent, useState, useEffect, ChangeEvent } from 'react';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';

function App() {
  const [shiftOn, setShiftOn] = useState<boolean>(false);
  const [text, setText] = useState<string>('');

  const typeKey = (e: MouseEvent) => {
      const textarea = Array.from(document.getElementsByTagName('textarea'))[0];
        textarea.value += (e.target as HTMLDivElement).innerHTML;
        textarea.focus();
  }
  const functionKey = (e: MouseEvent) => {
    const textarea = Array.from(document.getElementsByTagName('textarea'))[0];
    const key = e.target as HTMLDivElement;
    if(key.classList.contains('backspace')){
      textarea.value = (textarea.value.slice(0,-1) + '');
    } else if (key.classList.contains('space')){
      textarea.value += " ";
    } else if (key.classList.contains('shift')){
      if(shiftOn === false){
        setShiftOn(true);
      } else {
        setShiftOn(false);
      }
    } else if(key.classList.contains('enter')){
      textarea.value += "\n";
    } else if(key.classList.contains('tab')){
      textarea.value += "\t";
    }
    textarea.focus();
  }

  const toggle = () => {
    const list = document.getElementsByClassName('list')[0] as HTMLUListElement;
    const arrow = document.getElementsByClassName('dropDown')[0] as HTMLDivElement;
    if(list.style.display==="none"){
      list.style.display="block";
      arrow.style.transform="rotate(-180deg)";
    } else {
      list.style.display="none";
      arrow.style.transform="rotate(0)";
    }
  }

  useEffect(()=>{
    const keys = Array.from(document.getElementsByClassName('letter'));
    const shift = document.getElementsByClassName('shift')[0] as HTMLDivElement;

    if(shiftOn){
      keys.map((key)=>{
        key.innerHTML=(key.innerHTML).toUpperCase();
      })
      shift.style.background="white";
    } else {
      keys.map((key)=>{
        key.innerHTML=(key.innerHTML).toLowerCase();
      })
      shift.style.background="darkgray";
    }
  }, [shiftOn])

  useEffect(() => {
    const keys = Array.from(document.getElementsByClassName('key'));
    function handleKeyDown(e: any) {
      keys.map((key)=>{
        
        if((key.innerHTML).toUpperCase() === (e.key).toUpperCase()){
          (key as HTMLDivElement).style.background="darkgray";
          setTimeout(()=>{
            (key as HTMLDivElement).style.background="white";
          }, 200)
        }
      })
    }

    document.addEventListener('keydown', handleKeyDown);

    // Don't forget to clean up
    return function cleanup() {
      document.removeEventListener('keydown', handleKeyDown);
    }
  }, []);

  return (
    <div className="App">
      <div className="content">
        <header>
          <button className="toggle" onClick={toggle}>Search <KeyboardArrowDown className="dropDown" /></button>
        </header>
        <textarea onChange={(e: ChangeEvent<HTMLTextAreaElement>)=>{setText(e.target.value)}}></textarea>
        <div className="keyboard">
          <div className="keyboardContent">
          <div className="key" onClick={typeKey}>`</div>
          <div className="key" onClick={typeKey}>1</div>
          <div className="key" onClick={typeKey}>2</div>
          <div className="key" onClick={typeKey}>3</div>
          <div className="key" onClick={typeKey}>4</div>
          <div className="key" onClick={typeKey}>5</div>
          <div className="key" onClick={typeKey}>6</div>
          <div className="key" onClick={typeKey}>7</div>
          <div className="key" onClick={typeKey}>8</div>
          <div className="key" onClick={typeKey}>9</div>
          <div className="key" onClick={typeKey}>0</div>
          <div className="key" onClick={typeKey}>-</div>
          <div className="key" onClick={typeKey}>=</div>
          <div className="key backspace" onClick={functionKey} style={{background: "rgb(165, 165, 165)"}}>del</div>
          <div className="key tab" onClick={functionKey} style={{background: "rgb(165, 165, 165)"}}>tab</div>
          <div className="key letter" onClick={typeKey}>a</div>
          <div className="key letter" onClick={typeKey}>s</div>
          <div className="key letter" onClick={typeKey}>d</div>
          <div className="key letter" onClick={typeKey}>f</div>
          <div className="key letter" onClick={typeKey}>g</div>
          <div className="key letter" onClick={typeKey}>h</div>
          <div className="key letter" onClick={typeKey}>j</div>
          <div className="key letter" onClick={typeKey}>k</div>
          <div className="key letter" onClick={typeKey}>l</div>
          <div className="key" onClick={typeKey}>;</div>
          <div className="key" onClick={typeKey}>'</div>
          <div className="key enter" onClick={functionKey} style={{background: "rgb(165, 165, 165)"}}>enter</div>
          <div className="key shift" onClick={functionKey}>shift</div>
          <div className="key letter" onClick={typeKey}>z</div>
          <div className="key letter" onClick={typeKey}>x</div>
          <div className="key letter" onClick={typeKey}>c</div>
          <div className="key letter" onClick={typeKey}>v</div>
          <div className="key letter" onClick={typeKey}>b</div>
          <div className="key letter" onClick={typeKey}>n</div>
          <div className="key letter" onClick={typeKey}>m</div>
          <div className="key" onClick={typeKey}>,</div>
          <div className="key" onClick={typeKey}>.</div>
          <div className="key" onClick={typeKey}>/</div>
          <div className="key" style={{width: "100px", background: "rgb(165, 165, 165)"}}>Ctrl</div>
          <div className="key alt" style={{width: "100px", background: "rgb(165, 165, 165)"}}>alt</div>
          <div className="key space" onClick={functionKey}>space</div>
        </div>
        </div>
        <ul className="list">
          <li className="list-item"><a href={"https://www.google.com/search?q=" + text}>Google</a></li>
          <li className="list-item"><a href="#">Youtube</a></li>
          <li className="list-item"><a href="#">Wikipedia</a></li>
        </ul>
      </div>
    </div>
  );
}

export default App;
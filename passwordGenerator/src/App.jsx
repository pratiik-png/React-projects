import { useState, useCallback,useEffect,useRef } from 'react'


import './App.css'

function App() {
  const [length, setLength] = useState(8)
  const[NumberAllowed, setNumberAllowed]=useState(false);
  const[charAllowed, setCharAllowed]=useState(false)
  const[password, setPassword]= useState(" ")

  //useRef hook
  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(() => {
    let pass=""
    let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(NumberAllowed) str += "0123456789";
    if(charAllowed) str += "!@#$%&*";
    
    for (let i = 0; i < length; i++) {
      let char=Math.floor(Math.random() * str.length )
      
      pass +=str.charAt(char)
    }
    
    setPassword(pass)


  },[length, NumberAllowed,charAllowed, setPassword] )

  const copyPasswordToClipboard= useCallback(() => {
    window.navigator.clipboard.writeText(password)
  },[password])

  useEffect(() => {passwordGenerator()},[length,NumberAllowed,charAllowed,passwordGenerator])

  return (
        
    <div className= ' w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-orange-500 bg-gray-800 '
    > <h1 className ='text- yellow text-center my-3 '>Password Generator</h1>
    <div className= 'flex shadow rounde-lg overflow-hidden mb-4' >
        <input type="text"
        value={password}
        className='outline-none w-full py-1 px-3'
        placeholder='password'
        readOnly
        ref={passwordRef}

        
        />
        <button 
        onClick={copyPasswordToClipboard}
        className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'
        >copy</button>

      </div>
      <div className='flex text-sm gap-x-2'
      >
        <div className ='flex items-center gap-x-1'
        
        >
          <input type="range"
          min={6}
          max={100}
          value={length}
          className="cursor-pointer"
          onChange={(e) => setLength(Number(e.target.value))}
          />
          <label >Length: {length}</label>
        </div>
        <div className="flex items-center gap-x-1">
          <input type="checkbox" 
          defaultChecked={NumberAllowed}
          id="numberInput"
          onChange={() => {
            setNumberAllowed((prev) => !prev);  
          }}
          />
          <label htmlFor="numberInput">Numbers</label>
        </div>
        <div className="flex items-center gap-x-1">
          <input type="checkbox" 
          defaultChecked={charAllowed}
          id="characterInput"
          onChange={() => {
            setCharAllowed((prev) => !prev);  
          }}
          />
          <label htmlFor="characterInput">Characters</label>
      </div>

     </div>
    </div>
        
       
  );
}

export default App;

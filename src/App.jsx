import { useState, useCallback, useEffect, useRef } from 'react'


function App() {
  // this hook is used to set initial value of password length and update it in case slider is moved
  let [length, setLength] = useState(8) 
  // this hook is used to check whether numbers is checked or not and to update in generator function 
  const [numAllowed, setNumAllowed] = useState(true)
  // this hook is used to check whether characters is checked or not and to update in generator function 
  const [charAllowed, setCharAllowed] = useState(false)
  // this hook is used to set password and to update in generator function 
  let [password, setPassword] = useState('')
  // HoOk for small alphabets
  let [lowerCaseAlpha, setLowerCaseAlpha] = useState(false)
  // HoOk for Big Alphabets
  let [upperCaseAlpha, setUpperCaseAlpha] = useState(false)

  // useRef Hook
  const passwordRef = useRef(null)

  // function to copy generated password 
  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select(); // select password and highlight
    passwordRef.current?.setSelectionRange(0,length); //select range of password
    window.navigator.clipboard.writeText(password)
  }, [password])
  
// function defination for Password Generator, also to define dependencies
  const passwordGenerator = useCallback(() => {
    let str = '';
    let pass = ''

    if(numAllowed) str += "0123456789"
    if(charAllowed) str += "!#$%&*+-.:;<=>?@^_`|~"
    if(lowerCaseAlpha) str += "abcdefghijklmnopqrstuvwxyz"
    if(upperCaseAlpha) str += "ABCDEFGHIJKLMNOPQRSTUVWXYZ"

    for (let i = 1; i <= length; i++) {
      
      // Generate a random index between 0 and i (inclusive)
      const randomIndex = Math.floor(Math.random() * str.length + 1);
      // Storing each character of array to form a single string
      pass += str.charAt(randomIndex)
    }
      
  setPassword(pass)

  }, [length, numAllowed,charAllowed,lowerCaseAlpha,upperCaseAlpha, setPassword,])

// hook to run Password Generator, also to define dependencies
  useEffect(() => {
      passwordGenerator()
  }, [length, numAllowed, charAllowed, lowerCaseAlpha, upperCaseAlpha, passwordGenerator])

  return (
    <>
      <div className='relative w-full max-w-[600px] h-[220px] text-center mx-auto shadow-md rounded-lg px-4 my-52 text-orange-500 bg-gray-800 font-[Poppins]'>
        <p className='text-white text-[25px] text-center pt-4 my-3 font-semibold'>Password Generator</p>
        {/* Password field and Copy button */}
        <div className='flex shadow rounded-lg overflow-hidden '>
            <input
              type='text'
              value={password}
              className='outline-none w-full py-1 px-3 '
              placeholder='Password'
              readOnly
              ref={passwordRef}  
            />
            <button
            onClick={copyPasswordToClipboard}
              className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'
              >Copy</button>
              
        </div>
        {/* Length Slider, Number, Alphabets & Character Checkboxes */}
        <div className='flex text-sm gap-x-4 my-4'>
          <div className='flex flex-col items-center gap-x-2'>
            <input
              type='range'
              min={4}
              max={50}
              value={length}
              className='cursor-pointer'
              onChange={(e) => {setLength(e.target.value)}} // on moving slider, updates length value
            />
            <label>Length: {length}</label>
          </div>
          {/* Checkbox for Numbers */}
          <div className='flex items-center gap-x-1'>
          <input
              type='checkbox'
              defaultChecked={numAllowed}
              id='numberInput'
              onChange={() => {
                  setNumAllowed((prev) => !prev)
              }}
          />
          <label htmlFor='numberInput'>Numbers</label>
          </div>
          {/* Checkbox for Characters */}
          <div className='flex items-center gap-x-1'>
          <input
              type='checkbox'
              defaultChecked={charAllowed}
              id='charInput'
              onChange={() => {
                  setCharAllowed((prev) => !prev)
              }}
          />
          <label htmlFor='charInput'>Characters</label>
          </div>
          {/* Checkbox for Lowercase Alphabets */}
          <div className='flex items-center gap-x-1'>
          <input
              type='checkbox'
              defaultChecked={lowerCaseAlpha}
              id='lowercaseAlphaInput'
              onChange={() => {
                  setLowerCaseAlpha((prev) => !prev)
              }}
          />
          <label htmlFor='lowercaseAlphaInput'>Lowercase</label>
          </div>
          {/* Checkbox for Uppercase Alphabets */}
          <div className='flex items-center gap-x-1'>
          <input
              type='checkbox'
              defaultChecked={upperCaseAlpha}
              id='uppercaseAlphaInput'
              onChange={() => {
                  setUpperCaseAlpha((prev) => !prev)
              }}
          />
          <label htmlFor='uppercaseAlphaInput'>Uppercase</label>
          </div>
        </div>
        {/* Generate button */}
        <div>
          <button
            className='text-xl font-bold bg-slate-300 px-3 rounded-full shadow-xl hover:bg-green-800 transition-all
            duration-300 hover:text-white hover:border hover:border-white'
            onClick={passwordGenerator}
            >Generate Password</button>
        </div>
      </div>
    </>
  )
}

export default App

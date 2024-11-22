import { useContext, useEffect, useState } from 'react'
import axios from "axios"
import correctIcon from "/correctIcon.svg"
import wrongIcon from "/wrongIcon.svg"
import skipIcon from "/skipIcon.svg"
import { Coin } from 'iconsax-react';
import { Toaster,toast } from 'sonner'
import { useNavigate } from 'react-router-dom'
import { useDarkMode } from '../context/DarkModeContext'
function Home() {
    const [captcha,setCaptcha] = useState("")
    const [messege,setMessege] = useState("")
    const [input,setInput] = useState("")
    const [coinBalance,setCoinBalance] = useState(0)
    const [timer,setTimer] = useState(15)
    const [skipped,setSkipped] = useState(0)
    const [correct,seCorrect] = useState(0)
    const [wrong,setWrong] = useState(0)
    const navigate = useNavigate()
    const sound = new Audio("/coin.mp3")
    const {DarkMode,toggleDarkMode} = useDarkMode()
    const getCaptcha = async ()=>{
      try {
          const response = await axios.get(`${import.meta.env.VITE_BACKEND_URI}/api/v1/captcha`)
          if(response.data.success){
            setCaptcha(response.data.captcha)
            setTimer(15)
          }
      } catch (error) {
          setMessege("error fetching Captcha")
      }
    }
    useEffect(()=>{
      getCaptcha()
    },[])
    const handleSkip = () => {
      getCaptcha();
      setSkipped(skipped+1)
    };

    const handleSubmit = async ()=>{
      if(!input){
        setMessege("please enter captcha")
        return }

      try {
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URI}/api/v1/verify`,{
          input,captcha
        })
        if(response.data.success){
          setCoinBalance(response.data.coinBalance)
          toast.success("Correct! Coins earned: +1",{duration:1000})
          sound.play()
          setInput("")
          seCorrect(correct+1)
          getCaptcha()
        }
        else{
          setMessege("incorrect captcha")
          setWrong(wrong+1)
        }
      } catch (error) {
        toast.error("something went wrong")
        
      }
    }

    useEffect(()=>{
        if(timer===0){
          handleSkip()
          setSkipped(skipped+1)
        }
        const interval = setInterval(()=>{
          setTimer((i)=>(i>0?i-1:0))
        },1000)
        return ()=> clearInterval(interval)
    },[timer])
  

    const getBalance = async ()=>{
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URI}/api/v1/balance`)
      if(response.data.success){
        setCoinBalance(response.data.coinBalance)
      }
    }
    useEffect(()=>{
       getBalance()
    },[])

    
    const handlePaste = (e) => {
      e.preventDefault();
    };
  
  return (
    <div>
    <Toaster richColors position='bottom-center' />
    <div className='bg-slate-200 dark:bg-gray-700 h-screen flex justify-center items-center'>
        <div className='rounded-lg  shadow-md w-80 lg:w-96 md:w-96 text-center  px-4 py-2 mx-auto bg-gray-100 dark:bg-slate-600'>

          <div className='flex justify-between items-center '>
                    <button onClick={toggleDarkMode} className="inline-flex items-center justify-center  bg-transparent text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 text-primary-foreground h-8 w-8 group rounded-lg border-none  shadow-lg hover:bg-sky-900/5 m-4"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-moon absolute size-6 rotate-90 scale-0 transition-all group-hover:text-sky-700  dark:rotate-0 dark:scale-100 dark:text-sky-500"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path></svg><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-sun size-6 rotate-0 scale-100 text-black transition-all group-hover:text-sky-500 dark:-rotate-90 dark:scale-0"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2"></path><path d="M12 20v2"></path><path d="m4.93 4.93 1.41 1.41"></path><path d="m17.66 17.66 1.41 1.41"></path><path d="M2 12h2"></path><path d="M20 12h2"></path><path d="m6.34 17.66-1.41 1.41"></path><path d="m19.07 4.93-1.41 1.41"></path></svg><span className="sr-only">DarkMode Toggle</span></button>
  <button class="relative border hover:border-sky-600 duration-500 group cursor-pointer text-sky-50  overflow-hidden h-8 w-8 rounded-full bg-sky-800 border-none flex justify-center items-center  text-xs font-bold">
  <div class="absolute z-12 w-2 h-3 rounded-full group-hover:scale-150 transition-all  duration-500 ease-in-out bg-sky-900 delay-150 group-hover:delay-75"></div>
  <div class="absolute z-8 w-8 h-8 rounded-full group-hover:scale-150 transition-all  duration-500 ease-in-out bg-sky-700 delay-150 group-hover:delay-150"></div>
  <div class="absolute z-6 w-6 h-6 rounded-full group-hover:scale-150 transition-all  duration-500 ease-in-out bg-sky-600 delay-150 group-hover:delay-200"></div>
  <div class="absolute z-2 w-4 h-4 rounded-full group-hover:scale-150 transition-all  duration-500 ease-in-out bg-sky-500 delay-150 group-hover:delay-300"></div>
  <p class="z-10">{coinBalance}</p>
</button>
                </div>
            <div className="bg-white-300  dark:bg-slate-500 shadow-md py-4 rounded-xl m-4">
              <span className="text-4xl  text-gray-800 ">
                {captcha}
              </span>
          </div>
                <div className='flex justify-end mt-1 mb-3'>
                <button
    class="text-white bg-gradient-to-r from-red-600 via-red-700 to-red-900 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-900 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-normal rounded-full text-xs p-0 px-1 py- text-center mr-1 mb-1"
    type="button"
  >
    {timer}
  </button>                </div>
              <div className='flex justify-between mt-2 w-full px-2  py-4 border rounded-2xl bg-[#F6F8FE] dark:bg-slate-500 dark:border-slate-600 shadow-lg'>
                <input onChange = {(e)=>{setInput(e.target.value),setMessege("")}} onPaste={handlePaste}
                  type="text" placeholder='Enter Captcha' className='bg-[#F6F8FE] dark:bg-slate-500 dark:border-slate-600 focus:outline-none text-sm  dark:text-bg-slate oncopy=return false'  />

                <div onClick={handleSkip} class="flex justify-center items-center">
  <div
    class="bg-gradient-to-b from-stone-300/40 to-transparent text-xs p-[1px] rounded-[16px]"
  >
    <button
      class="group p-[2px] rounded-[12px] bg-gradient-to-b from-white to-stone-200/40 shadow-[0_1px_3px_rgba(0,0,0,0.5)] active:shadow-[0_0px_1px_rgba(0,0,0,0.5)] active:scale-[0.995]"
    >
      <div
        class="bg-gradient-to-b from-stone-00/30 to-white/80 rounded-[8px] px-2 py-1"
      >
        <div class="flex  items-center">
          <span class="font-extralight">skip</span>
        </div>
      </div>
    </button>
  </div>
</div>

              </div >
                <button  onClick={handleSubmit}  class="submit">
                    <div>
                        <div class="pencil"></div>
                        <div class="folder">
                            <div class="paper"></div>
                        </div>
                    </div>
                    submit
                </button>
              <p className='text-red-600 dark:text-red-900 text-sm my-4'>{messege}</p>

              <div className='flex justify-evenly  my-4'>
                <div className='bg-slate-100 dark:bg-slate-700 rounded-md shadow-xl px-3 py-1 flex justify items-center gap-1'><img src={skipIcon}/><span className='text-xs flex items-center '>{skipped}</span></div>
                <div className='bg-slate-100 dark:bg-slate-700 rounded-md shadow-xl px-3 py-1 flex justify items-center gap-1'><img src={wrongIcon}/><span className='text-xs flex items-center '>{wrong}</span></div>
                <div className='bg-slate-100 dark:bg-slate-700 rounded-md shadow-xl px-3 py-1 flex justify items-center gap-1'><img src={correctIcon}/><span className='text-xs flex items-center '>{correct}</span></div>
              </div>
              <button onClick={()=>navigate("/refer")} class="button type1"></button>

        </div>
      </div>
    </div>
  )
}

export default Home

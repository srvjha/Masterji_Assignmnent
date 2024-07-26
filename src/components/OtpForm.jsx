import React, { useState,useRef, useEffect } from 'react'
import { Link } from 'react-router-dom';

const OtpForm = ({length=4}) => {
    let otpArray = new Array(length).fill("");
    const [otp,setOtp]  = useState(otpArray);
    const [verification,setVerification] = useState("Verify Account");
    const [messageColor,setMessageColor] = useState("#182c4c");
    const [submit,setSubmit] = useState(false)
    const [outline,setOutline] = useState('none')
    const inputRef = useRef([]);
    let validOTP = "1234"
    useEffect(()=>{
        if(inputRef.current[0]){
          inputRef.current[0].focus()
        }
     
    },[])

    const handleChange = (index,e)=>{
      const inputValue = e.target.value;
      if(isNaN(inputValue)) return;
      const newOTP = [...otp];
      
      newOTP[index] = inputValue.substring(inputValue.length-1);
      setOtp(newOTP)
      const combinedOTP = newOTP.join("");
      console.log("CombinedOTP: ",combinedOTP)
      if(combinedOTP === validOTP){
           setSubmit(true)
      }
      else{
        setSubmit(false)
      }

      // For moving next field
      if(inputValue && index<length-1 && inputRef.current[index+1]){
        inputRef.current[index + 1].focus();
      
      }      
      
    }

    const handleSubmit = (e)=>{
      e.preventDefault();

      if(submit){
        setVerification("Verified");
        setMessageColor("#23CF9B");
        setOutline('1px solid #23CF9B')
      }
      else{
        setVerification("Verification Failed");
        setMessageColor("#EB2D5B");
        setOutline('1px solid #EB2D5B')
      }
    }
   
    const handleClick = (index)=>{
      inputRef.current[index].setSelectionRange(1,1)

      // handling if previous is empty then go to that field
      if(index>0 && !otp[index-1]){
        inputRef.current[otp.indexOf("")].focus()
      }

    }

    const handleKeyDown = (index,e)=>{
      if(e.key === "Backspace" && index>0 && !otp[index] && inputRef.current[index - 1]){
        inputRef.current[index - 1].focus();
      }

    }

    

  return (
    <div className=" bg-[#3F72AF] p-2 h-screen w-screen">
     <div className='ml-[480px] mt-[20px] h-[97px] w-[553px] text-white text-[80px] font-inter font-semibold '>
      Chai aur Code
    </div>       

    <div className=' bg-[#F9F7F7] absolute mt-[75px] h-[440px] ml-[366px] w-[726px] gap-0 rounded-[18px]'>
    <div>
        <div className=' font-bold font-dm-sans text-[40px] ml-[139px] mt-[20px]'>
        Mobile Phone Verfication    
        </div>  
        <div className=' font-dm-sans text-[#BFBFBF] font-[400] ml-[95px] h-[66px] w-[575px] text-center align-center text-[23px] '>
        Enter the 4-digit verification code that was sent to your phone number.
        </div>
        <div className=' ml-[200px]'>
       {
        otp.map((value,index)=>{
            return <input
            key={index}
            ref={(input)=>(inputRef.current[index]=input)}
            type="text"
            style={{ 
              backgroundColor:"#DBE2EF",
              outline:`${outline}`,
              width:"80px",
              height:"90px",
              borderRadius:"12px",
              margin:"27px 15px 0px 0px",
              textAlign:"center"

             }}
            value={value}
            onChange={(e)=>handleChange(index,e)}
            onClick={()=> handleClick(index)}
            onKeyDown={(e)=>handleKeyDown(index,e)}
            />
           
        })
       }
        </div>
        <button
      style={{
        backgroundColor: messageColor,
        outline: outline,
        width: '366px',
        height: '55px',
        fontSize: '20px',
        borderRadius: '7px',
        marginTop: '20px',
        marginLeft: '196px',
        color: 'white',
      }}
      onClick={(e) => handleSubmit(e)}
    >
      {verification}
    </button>
        <div className=' text-[#BFBFBF] font-inter ml-[230px] font-[400] text-[19px] mt-[16px]'>Didn’t receive code? <span className='text-[#182c4c]'>Resend</span> </div>
    </div>
    

    </div>
    <div>
    <a href="https://chaicode.com/" target="_blank" rel="noopener noreferrer">
  <img src="chai.png" className="mt-[450px] ml-[1300px]" alt="Chai Image" />
  </a>
    </div>
    </div>
   
  )
}

export default OtpForm

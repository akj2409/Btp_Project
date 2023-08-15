import {useState} from 'react'
import {TextField} from "@mui/material";
import useModal from "../../../hooks/useModal";

declare global {
    interface Window {
      Email: {
        send: (params: any) => void;
      };
    }
  }

interface emailform{
    email : string,
    subject: string,
    body:string
}

const Emailform = () => {

    const modal = useModal();
    const [formData,setformData] = useState<emailform>({email:"",subject:"", body:""});

    const handlechange = (e : any) =>{
        setformData({...formData, [e.target.name]: e.target.value})
      }

      const submitHandler = (e: { preventDefault: () => void }) => {
        e.preventDefault();
        console.log("before email")
        const config = {
          Host: "smtp.elasticemail.com",
          Username: "moniskhandx@gmail.com",
          Password: "DDCEAAA42E295A3466AA91CA4E03262E8451",
        //   SecureToken: "13b6db1a-7c08-49ca-b3cf-13c5f116ed6a",
          To: "stalvishsandhu@gmail.com",
          From: "moniskhandx@gmail.com",
          Subject: formData.subject,
          Body: formData.body
        };
        if (window.Email) {
          console.log()
          window.Email.send(config);
        }
        console.log("afer email")
       
      };  

     

  return (
    <div className=' bg-foreground flex justify-between items-center flex-col gap-10  rounded-lg mt-4 p-5 w-[700px]  shadow-[0px_1px_20px_rgba(14,30,37,0.12)] s:w-[300px] s:p-2.5 sm:w-[400px]'>
      <div className="flex flex-col justify-center items-center text-xl font-manrope font-semibold">
        <img className="w-[100px] h-[62px]" src="/images/Gmail-Logo.jpg" alt="lock" />
      </div>
    <form className="  flex w-full flex-col gap-5 justify-evenly s:w-full vm:w-full" onSubmit={submitHandler} >
    <div>
          <h1 className="font-manrope font-bold text-black text-base mb-2">
            Enter your email
          </h1>
          <TextField
            id="email"
            name="email"
            variant="outlined"
            label="Email"
            type="email"
            onChange={handlechange}
            value={formData.email}
            required
            fullWidth
          />
        </div>
        <div>
          <h1 className="font-manrope font-bold text-black text-base mb-2">
            Enter Subject
          </h1>
          <TextField
            id="text"
            name="subject"
            variant="outlined"
            label="Subject"
            type="text"
            onChange={handlechange}
            value={formData.subject}
            required
            fullWidth
          />
        </div>
        <div>
          <h1 className="font-manrope font-bold text-black text-base mb-2">
            Enter Body
          </h1>
          <TextField
            id="body"
            variant="outlined"
            label="Body"
            type="text"
            onChange={handlechange}
            value={formData.body}
            required
            multiline
            rows={4}
            fullWidth
            name="body"
            />
        </div>
        
        <div className="flex flex-row justify-between my-4">
         <button  onClick={() => modal.hide()} className="btn-3 " >Back</button>
         <button   className="btn-3 " type="submit">Send</button>
         
        </div>   
    </form>
    </div>
   
  )
}

export default Emailform
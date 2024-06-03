import  { useState } from 'react'

import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import BASE_URL from '../config';
import InputBox from './InputBox';
import Button from './Button';
import Spinner from './Spinner';



const SignupInputs = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [postInputs, setPostInputs] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: ""
    });
    async function handleSignup(){
        try {
            setIsLoading(true);
            const res = await axios.post(`${BASE_URL}/user/signup`, {
            firstName: postInputs.firstName,
            lastName: postInputs.lastName,
            email: postInputs.email,
            password: postInputs.password
        })
        if(res.status===201){
            console.log(res.data)
            navigate("/signin") 
        }
       
        } catch (error) {
            alert("Error while signing up")
            // console.log(error)
        }finally {
            // Set loading to false after the request is completed (success or failure)
            setIsLoading(false);
        }
    }

  return (
    <div>
        <div>
            <InputBox label="Firstname" placeholder="John" onChange={(e:any)=> {
                        setPostInputs(c => ({
                            ...c,
                            firstNamename: e.target.value
                        }))
            }}/>
                   
        </div>
        <div>
            <InputBox label="Lastname" placeholder="Doe" onChange={(e:any)=> {
                        setPostInputs(c => ({
                            ...c,
                            lastNamename: e.target.value
                        }))
            }}/>
                   
        </div>
        <div>
            <InputBox label="Email" placeholder="johndoe@gmail.com" onChange={(e:any)=> {
                setPostInputs(c => ({
                    ...c,
                    email: e.target.value
                }))
            }}/>
        </div>
        <div>
            <InputBox label="password" placeholder="&#x2022;&#x2022;&#x2022;&#x2022;&#x2022;&#x2022;" type="password" onChange={(e:any)=> {
                setPostInputs(c => ({
                    ...c,
                    password: e.target.value
                }))
            }}/>
        </div>
        <div>
            <Button label={isLoading?<Spinner/>:"Sign up"} onClick={handleSignup}/>
        </div>
    </div>

        
    
  )
}

export default SignupInputs

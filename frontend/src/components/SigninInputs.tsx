import { useState } from 'react'
import InputBox from './InputBox';
import Button from './Button';
import axios from 'axios';
import Spinner from './Spinner';
import { useNavigate } from 'react-router-dom';
import BASE_URL from '../config';

const SigninInputs = () => {
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false);
    const [postInputs, setPostInputs] = useState({
        email: "",
        password: ""
    });

    async function handleSignin(){
        try {
            setIsLoading(true);
        const res = await axios.post(`${BASE_URL}/user/signin`,{
            email: postInputs.email,
            password: postInputs.password
        })
        if(res.status===200){
            localStorage.setItem("token",res.data.token)
            navigate("/products")
        }
        } catch (error) {
            alert("Error while signing in")
            console.log(error)
        }
        finally{
            setIsLoading(false)
        }
    }
    return (
    <div>
        <div>
            <InputBox label="Email" placeholder="johndoe@gmail.com" onChange={(e:any)=> {
                setPostInputs(c => ({
                    ...c,
                    email: e.target.value
                }))
            }}/>
        </div>
        <div>
            <InputBox label="password" placeholder="" type="password" onChange={(e:any)=> {
                setPostInputs(c => ({
                    ...c,
                    password: e.target.value
                }))
            }}/>
        </div>
        <div>
            <Button label={isLoading?<Spinner/>:"Sign in"} onClick={handleSignin}/>
        </div>
    </div>
  )
}

export default SigninInputs

import Header from "./Header"
import SignupInputs from "./SignupInputs"


const Auth = ({type}:{type:"signup"|"signin"}) => {
  return (
    <div className="h-screen flex justify-center flex-col">
      <div className="flex justify-center">
        <div>
            <Header type={type}/>
            {type==="signup"?<SignupInputs/>:null}
        </div>
      </div>
    </div>
  )
}

export default Auth

import React ,{useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
const Spinner = () => {

    const navigate = useNavigate();
    const [count,setCount] = useState(3);

    useEffect(() => {
        const interval = setInterval(()=>{
            setCount(prevValue => --prevValue)
        },1000)
        count ===0 && navigate("/login")
        return ()=>clearInterval(interval)
    },[count,navigate])
  return (
    <>
      <div className="d-flex justify-content-center align-item-center"
      style={{ height : '100vh'}}
      >
        <h1>Redirecting u in {count } seconds</h1>
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    </>
  );
};

export default Spinner;


import { useState } from "react";

const App=()=>{
   const[count,setCount]=useState(0);
  return(
     <>
       <h1>hello { count}</h1>
       <button onClick={()=>setCount((count)=> count+1)}> click</button>
       
     </>
  )  
}

export default App;
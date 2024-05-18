import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function Protected({children,authentication}) {
    const [loader,setLoader]=useState(true);
    const status=useSelector(state=>state.authstore.status)
    const navigator=useNavigate();
    useEffect(()=>{
   
        if(authentication && authentication!==status)
            navigator("/login")
        else if(!authentication && authentication!==status)
            navigator("/");

        setLoader(false);
        

    },[navigator,authentication,status])
  return (
    loader?<h1>Loading....</h1>:<>{children}</>
  )
}

export default Protected

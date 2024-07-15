import React,{useEffect} from 'react'
import { useSelector } from 'react-redux'
import {LoginPopUp} from '../components'
import { useNavigate } from 'react-router-dom'

export const AuthLayot = ({children,authentication=true}) => {
    const navigate=useNavigate();
    const authStatus=useSelector((state)=>state.auth.status)

    useEffect(()=>{
        if(!authentication && authStatus!==authentication){
            return
        }
    },[authStatus,authentication,navigate])

    if(authentication && authStatus!==authentication){
        return <LoginPopUp/>
    }

    return children;
}

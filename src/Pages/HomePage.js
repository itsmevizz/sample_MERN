import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Home  from '../Components/Home/Home'
import NavbarBrand from '../Components/Nav/Navbar'
function HomePage() {
  const navigation = useNavigate()
  const userData = localStorage.getItem('usedData')
  const data = JSON.parse(userData)
  useEffect(()=>{
    if(!userData){
      navigation('/login')
    }
  },[])

  return (
    <div>
        <NavbarBrand/>
        <Home/> 
    </div>
  )
}

export default HomePage
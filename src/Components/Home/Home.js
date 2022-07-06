import React, { useContext, useEffect } from 'react'
import './Home.css'
import { useNavigate } from 'react-router-dom'
import Login from '../Login/Login'


function Home() {
  useEffect(()=>{
    document.title = "Home"
  })
  const navigation = useNavigate()
  const userData = localStorage.getItem('usedData')
  const data = JSON.parse(userData)
  return (
    <div>
      <section id="hero">
        <div className="hero-container">
          <span className="hero-logo" ><img src="assets/img/hero-logo.png" alt=""/></span>
          <h1 className='username'>Hi {data? data.name:''}</h1>
          <h1 >Welcome To Home Page</h1>
          {/* <h2>This is a sample website created in react</h2> */}
          <a data-aos-delay="200" onClick={()=>{
            localStorage.clear()
            navigation('/login')
            }} className="btn btn-get-started scrollto">Logout</a>
        </div>
      </section>
    </div>
  )
}

export default Home
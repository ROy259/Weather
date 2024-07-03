import React, { useEffect, useRef, useState } from 'react'

const Weatherapp = () => {

const inputref=useRef()

const [weatherdata,setWeaherdata]=useState(false)


  const search = async (city) => {

    if(city===""){
      alert("Enter a City Name")
      return
    }
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${process.env.REACT_APP_API_KEY}`;
  
      const response = await fetch(url);
  
      if (!response.ok) {
        throw new Error(`Error fetching data: ${response.status}`);
      }
  
      const data = await response.json();
  
      console.log(data);
      setWeaherdata({
        humidity:data.main.humidity,
        windspeed:data.wind.speed,
        temp:Math.floor(data.main.temp),
        location:data.name,
      icon:data.weather.icon
      })
  
    } catch (error) {
      console.error(`Error fetching data: ${error}`);
    }
  }

  useEffect(()=>{
    search('Mumbai')
  },[])

 
  
  return (


    <div className='container min-h-[80vh] flex justify-center items-center '>

    <div className='bg-image h-[500px] w-[450px] rounded-lg ' >

      <div className='search-bar flex justify-center items-center'>
        <input  ref={inputref} type='text' placeholder='Enter a city name' className='pl-3 mt-10 ml-10 rounded-lg outline-none h-8'></input>
        <i onClick={()=>search(inputref.current.value)} className="fa-solid fa-magnifying-glass ml-3 text-3xl cursor-pointer mt-10 hover:text-4xl"></i>
      </div>

      <div className='weather-image  flex justify-center'>
       <img  className='h-28 w-28 mt-6 outline-none'  src='https://th.bing.com/th/id/R.770b805d5c99c7931366c2e84e88f251?rik=khgO%2bY1Hh3BT9w&riu=http%3a%2f%2fpurepng.com%2fpublic%2fuploads%2flarge%2fpurepng.com-weather-iconsymbolsiconsapple-iosiosios-8-iconsios-8-721522596142qx4ep.png&ehk=6msbAydV7X6D4bO8zvLC664aXwKOdBU17dwrHcKxaAg%3d&risl=&pid=ImgRaw&r=0' alt=''></img>
      </div>

      <p className='text-center mt-3 text-5xl font-medium'>{weatherdata.temp}°C</p>
      <p className='text-center  mt-3 text-xl font-medium'>{weatherdata.location}</p>

      <div className="weather-data flex justify-around">

        <div className='col  '>
        <i className=" text-4xl mb-2 text-white fa-solid fa-smog"></i>
        <div>
          <p className='text-3xl'>{weatherdata.humidity}%</p>
          <span className='text-xl'>Humidity</span>
        </div>

        </div>
        <div className='col'>
        <i className="  text-4xl mb-2 text-white fa-solid fa-wind"></i>
        <div>
          <p className='text-3xl' >{weatherdata.windspeed} km/h</p>
          <span className='text-xl'>wind</span>
        </div>

        </div>

      </div>
      
    </div>

    </div>
  )
}

export default Weatherapp

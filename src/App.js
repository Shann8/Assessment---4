
import React, { useState, useEffect } from 'react';
const api = {
  key: "6a66d43ca0591de9cf4abe8c1c845164",
  base: "https://api.openweathermap.org/data/2.5/"
}

function App() {
  const [query, setQuery] = useState('');
  const [time, setTime] = useState('');
  const [weather, setWeather] = useState({});

  const search = evt => {
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(res => res.json())
        .then(result => {
          setWeather(result);
          setQuery('');
          console.log(result);
        });
    }
  }

  const dateBuilder = (d) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`
  }

  const updateTime = () => {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    console.log(`Current Time: ${formattedHours}:${formattedMinutes} ${ampm}`); // Added console log for debugging
    setTime(`${formattedHours}:${formattedMinutes} ${ampm}`);
    return `${formattedHours}:${formattedMinutes} ${ampm}`;
  }

  useEffect(() => {
    updateTime();
    const intervalID = setInterval(updateTime, 1000);
    return () => clearInterval(intervalID);
  }, []);



  return (
    <div className='Iphone'>
      <div className='Iphonescreen'>
        <div className={(typeof weather.main != "undefined") ? ((weather.main.temp > 16) ? 'app warm' : 'app cold') : 'app'}>
          <main>
            <div className="time">{time}</div>
            <div className="search-box">
              <input
                type="text"
                className="search-bar"
                placeholder="Search..."
                onChange={e => setQuery(e.target.value)}
                value={query}
                onKeyPress={search}
              />
              <div className='homeline'></div>
            </div>
            {(typeof weather.main != "undefined") ? (
              <div className="outer">
                <div className="location-box">
                  <div className="location">{weather.name}, {weather.sys.country}</div>
                  <div className="date">{dateBuilder(new Date())}</div>
                </div>
                <div className="weather-box">
                  <div className="temp">
                    {Math.round(weather.main.temp)}°c
                  </div>
                  <div className="weather">{weather.weather[0].main}</div>
                </div>
                <div className='homeline'></div>
              </div>
            ) : ('')}
          </main>
        </div>
      </div>
    </div>
  );
}

export default App;

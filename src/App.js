import React, { Component } from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css'
import Spinner from './components/Spinner'
import Box from './components/Box'
const apiKey = process.env.REACT_APP_API_KEY


export default class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            weather: null,
            forecast: null,
            isLoading: true,
            city: '',
        }
    }
    componentDidMount() {
        console.log('*--- componentDidMount ---*')
        this.getLocation()
    }

    callWeather = async (city) => {
        console.log('*--- Call Wearther ---*')
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
        let data = await fetch(url)
        let result = await data.json();
        console.log('result:', result)
        this.setState({ weather: result })
        url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`
        data = await fetch(url)
        result = await data.json();
        console.log('result:', result)
        this.setState({ forecast: result })
    }

    callCurrentPositionWeather = async (latitude, longitude) => {
        let url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`
        let data = await fetch(url)
        let result = await data.json();
        console.log('result:', result)
        this.setState({ weather: result })
        url = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`
        data = await fetch(url)
        result = await data.json();
        console.log('result:', result)
        this.setState({ forecast: result })
        this.setState({ isLoading: false })
    }

    getLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((post) => {
                this.callCurrentPositionWeather(post.coords.latitude, post.coords.longitude)
            })
        } else {
            alert("Sorry, browser does not support geolocation!")
        }
    }

    onSearch = (city) => {
        // let city = document.getElementById('txtSearch').value
        this.callWeather(city)
    }

    myChangeHandler = (event) => {
        this.setState({ city: event.target.value })
    }

    handleKey = (event) => {
        if (event.key === 'Enter') {
            this.onSearch(this.state.city)
        }
    }

    render() {
        if (this.state.isLoading) {
            return <div><Spinner></Spinner></div>
        }
        return (
            <div className="container-fluid text-white my-auto">
                <div className="row search-area justify-content-center">
                    <label>City Name </label>
                    <input id='txtSearch' type='text' onChange={this.myChangeHandler} onKeyPress={this.handleKey} />
                    <input id='btnSearch' type='submit' value='Seach' onClick={() => this.onSearch(this.state.city)} />
                </div>
                <div className="container mx-auto my-4 py-4">
                    <div className="row justify-content-center text-center">
                        <h1 className="col-12 display-4 my-2 py-3 text-success">Weather App</h1>
                        <h2 className="col-12">{this.state.weather.name}</h2>
                        <h3 className="col-12 text-danger">{this.state.weather.main.temp}°C</h3>
                        <h3 className="col-12">{this.state.weather.weather[0].description}</h3>
                    </div>
                </div>
                <div className="mx-auto my-4 py-4">
                    <div className="row">
                        <Box date={this.state.forecast.list[0].dt_txt} temp={this.state.forecast.list[0].main.temp} descript={this.state.forecast.list[0].weather[0].description}></Box>
                        <Box date={this.state.forecast.list[8].dt_txt} temp={this.state.forecast.list[1].main.temp} descript={this.state.forecast.list[1].weather[0].description}></Box>
                        <Box date={this.state.forecast.list[16].dt_txt} temp={this.state.forecast.list[2].main.temp} descript={this.state.forecast.list[2].weather[0].description}></Box>
                        <Box date={this.state.forecast.list[32].dt_txt} temp={this.state.forecast.list[3].main.temp} descript={this.state.forecast.list[3].weather[0].description}></Box>
                    </div>
                </div>
            </div>
        )
    }
}

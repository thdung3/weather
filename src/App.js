import React, { Component } from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css'
import Spinner from './components/Spinner'
const apiKey = process.env.REACT_APP_API_KEY


export default class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            weather: null,
            isLoading: true
        }
    }
    componentDidMount() {
        console.log('*--- componentDidMount ---*')
        // this.callWeather()
        this.getLocation()
    }

    callWeather = async () => {
        console.log('*--- Call Wearther ---*')
        console.log('apiKey:', apiKey)
        let url = `https://api.openweathermap.org/data/2.5/weather?q=hanoi&appid=${apiKey}&units=metric`
        let data = await fetch(url)
        let result = await data.json();
        console.log('result:', result)
        this.setState({ weather: result })
    }

    callCurrentPositionWeather = async (latitude, longitude) => {
        console.log('*--- Call Current Wearther ---*')
        // this.getLocation();
        let url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`
        let data = await fetch(url)
        let result = await data.json();
        console.log('result-current:', result)
        this.setState({ weather: result })
        this.setState({ isLoading: false })
    }

    getLocation = () => {
        console.log('*--- getLocation ---*')
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((post) => {
                console.log('post:', post)
                this.callCurrentPositionWeather(post.coords.latitude, post.coords.longitude)
            })
        } else {
            alert("Sorry, browser does not support geolocation!");
        }
    }


    render() {
        if (this.state.isLoading) {
            return <div><Spinner></Spinner></div>
        }
        return (
            <div className="container-fluid text-white my-auto">
                <div className="container mx-auto my-4 py-4">
                    <div className="row justify-content-center text-center">
                        <h1 className="col-12 display-4 my-2 py-3 text-success">Awesome Weather App</h1>
                        <h2 className="col-12">{this.state.weather.name}</h2>
                        <h3 className="col-12 text-danger">{this.state.weather.main.temp}C</h3>
                        <h3 className="col-12">{this.state.weather.weather[0].description}</h3>
                    </div>
                </div>
            </div>
        )
    }
}

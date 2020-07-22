import React, { Component } from 'react'

export default class Box extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="col-md-3 forecast-box">
                <h4 className="forecast-box-date">{this.props.date.split(' ')[0]}</h4>
                <h4 className="forecast-box-time">{this.props.date.split(' ')[1]}</h4>
                <h5 className="forecast-box-temp">{this.props.temp}°C</h5>
                <h5 className="forecast-box-des">{this.props.descript}</h5>
            </div>
        )
    }
}

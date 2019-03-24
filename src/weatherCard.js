import React, { Component } from 'react';

class WeatherCard extends Component {

    render() {
        const { temperature, humidity, pressure, icon, summary, visibility, windSpeed } = this.props.weather.currently;
        let str=this.props.city;
        let style={
            fontSize: "70px"
        }
        if(str.length>10){
            style.fontSize="50px";
        }
        else{
            style.lenght="70px";
        }
        return (
            <React.Fragment>
                <div id="whead"><span style={style} id="wtitle">{this.props.city}</span>  <span>{this.props.country}</span></div>
                <div id="wdata">
                    <div id="data">
                        <h3><span>{temperature}</span>&deg;C</h3>
                        <p>Humidity :  &nbsp;&nbsp;&nbsp; <span>{Math.round(humidity * 100)}</span>%</p>
                        <p>Pressure:   &nbsp;&nbsp;&nbsp;&nbsp;<span>{pressure}</span> pa</p>
                        <p>Visibility:  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>{visibility}</span></p>
                        <p>Wind Speed:   &nbsp;&nbsp;<span>{windSpeed}</span> m/s</p>
                    </div>
                    <div id="iconsec">
                        <img src={require("./images/"+icon+".png")} alt="icon" height={130} widht={130}/>
                        <p>{summary}</p>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}
export default WeatherCard;
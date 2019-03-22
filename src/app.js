import React, { Component } from 'react';
import Navbar from './navbar';
class App extends Component {
    constructor() {
        super();
        this.state = {
            weather_data: {},
            isloading: true,
            located:false,
            currLat: 28.7041,
            currLong: 77.1025,
            geocoding:{},
            isCordFetched: false
        }

        this.geoLocate = this.geoLocate.bind(this);
        this.geo_success = this.geo_success.bind(this);
        this.handelClick = this.handelClick.bind(this);
        this.handelGps = this.handelGps.bind(this);
    }


    geo_success(position) {
        this.setState({
            currLat: position.coords.latitude,
            currLong: position.coords.longitude,
            located:true
        }
        )
        //console.log(this.state.currLat, this.state.currLong);
    }
    geo_error() {
        alert("Sorry, no position available.");
    }

    geoLocate() {
        navigator.geolocation.getCurrentPosition(this.geo_success, this.geo_error);
    }


    componentDidMount() {
        this.geoLocate();
        fetch("https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/fe6566accbf48f70b39fb83f2a68a219/" + this.state.currLat + "," + this.state.currLong + "/?units=si")
            .then(res => res.json())
            .then(data => {
                console.log(data);
                this.setState({ weather_data: data, isloading: false })
            })
    }

    getWeather() {
        fetch("https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/fe6566accbf48f70b39fb83f2a68a219/" + this.state.currLat + "," + this.state.currLong + "/?units=si")
            .then(res => res.json())
            .then(data => {
                console.log(data);
                this.setState({ weather_data: data, isloading: false })
            })
    }

    handelClick(city, country) {
        this.setState({ isCordFetched: false });
        fetch("https://maps.googleapis.com/maps/api/geocode/json?address=" + city + "," + country + "&key=AIzaSyCf0HtJT5cs0kv7IKcMgGTfEidQ-BnN8qo")
            .then(res => res.json())
            .then(data => {
                console.log(data);
                this.setState({
                    geocoding:data,
                    currLat: data.results[0].geometry.location.lat,
                    currLong: data.results[0].geometry.location.lng,
                    isCordFetched: true
                })
                if (this.state.isCordFetched === true) {
                    this.getWeather();
                }
            })
    }
    handelGps() {
        this.geoLocate();
        setTimeout(() => this.getWeather(), 2500);
    }
    render() {
        return (
            <React.Fragment>
                <Navbar handelClick={this.handelClick} handelGps={this.handelGps} />
                <div id="content">

                </div>
            </React.Fragment>
        )
    }
}
export default App;
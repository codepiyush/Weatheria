import React, { Component } from 'react';
import Navbar from './navbar';
import WeatherCard from './weatherCard';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"
import Forecast1 from './forecast';
import Forecast2 from './forecast2';

const MyMapComponent = withScriptjs(withGoogleMap((props) =>
    <GoogleMap
        defaultZoom={11}
        center={{ lat: props.lat, lng: props.long }}
        mapTypeId='hybrid'
        labels="true"
    >
        {props.isMarkerShown && <Marker position={{ lat: props.lat, lng: props.long }} />}
    </GoogleMap>
))

class App extends Component {
    constructor() {
        super();
        this.state = {
            weather_data: {},
            isloading: true,
            located: false,
            currLat: 28.7041,
            currLong: 77.1025,
            geocoding: {},
            isCordFetched: false,
            city: "",
            country: "",
            currforecast: {},
            forecastButtonValue: 1
        }

        this.geoLocate = this.geoLocate.bind(this);
        this.geo_success = this.geo_success.bind(this);
        this.handelClick = this.handelClick.bind(this);
        this.handelGps = this.handelGps.bind(this);
        this.getadd = this.getadd.bind(this);
        this.handleforecast = this.handleforecast.bind(this);
        this.renderCard1 = this.renderCard1.bind(this);
        this.renderCard2 = this.renderCard2.bind(this);


    }

    getadd() {
        fetch("https://maps.googleapis.com/maps/api/geocode/json?latlng=" + this.state.currLat + "," + this.state.currLong + "&key=AIzaSyCf0HtJT5cs0kv7IKcMgGTfEidQ-BnN8qo")
            .then(res => res.json())
            .then(data => {
                this.setState({ city: data.results[data.results.length - 3].address_components[0].long_name, country: data.results[data.results.length - 3].address_components[2].long_name })
                //console.log(data);
            })
    }

    geo_success(position) {
        this.setState({
            currLat: position.coords.latitude,
            currLong: position.coords.longitude,
            located: true
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
        this.getadd();
        fetch("https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/fe6566accbf48f70b39fb83f2a68a219/" + this.state.currLat + "," + this.state.currLong + "/?units=si")
            .then(res => res.json())
            .then(wdata => {
                console.log(wdata);
                this.setState({
                    weather_data: wdata,
                    isloading: false,
                    currforecast: wdata.daily.data
                })
            })
    }

    getWeather() {
        fetch("https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/fe6566accbf48f70b39fb83f2a68a219/" + this.state.currLat + "," + this.state.currLong + "/?units=si")
            .then(res => res.json())
            .then(data => {
                //console.log(data);
                this.setState({ weather_data: data, isloading: false })
            })
    }

    handelClick(city, country) {
        this.setState({ isCordFetched: false, isloading: true });
        fetch("https://maps.googleapis.com/maps/api/geocode/json?address=" + city + "," + country + "&key=AIzaSyCf0HtJT5cs0kv7IKcMgGTfEidQ-BnN8qo")
            .then(res => res.json())
            .then(data => {
                console.log(data);
                this.setState({
                    geocoding: data,
                    currLat: data.results[0].geometry.location.lat,
                    currLong: data.results[0].geometry.location.lng,
                    city: data.results[0].address_components[0].long_name,
                    country: data.results[0].address_components[data.results[0].address_components.length - 1].long_name,
                    isCordFetched: true
                })
                if (this.state.isCordFetched === true) {
                    this.getWeather();
                }
            })
    }
    handelGps() {
        this.geoLocate();
        setTimeout(() => [this.getWeather(), this.getadd()], 2500);
    }

    handleforecast(e) {
        if (e === 1) {
            this.setState({ currforecast: this.state.weather_data.daily.data,forecastButtonValue:1 })
            //console.log(this.state.currforecast);
        }
        else if (e === 2) {
            this.setState({ currforecast: this.state.weather_data.hourly.data,forecastButtonValue: 2 })
            //console.log(this.state.currforecast);
        }
    }
    renderCard1() {
        if (this.state.isloading === false) {
            console.log(this.state.currforecast);
            return (
                this.state.currforecast.map((data, index) => {
                    if (index < 8) {
                        return (
                            <Forecast1 key={index} data={data} />
                        )
                    }
                    else{
                        return(
                            null
                        )
                    }
                })
            )
        }
    }
    renderCard2() {
        if (this.state.isloading === false) {
            console.log(this.state.currforecast);
            return (
                this.state.currforecast.map((data, index) => {
                    if (index < 8) {
                        return (
                            <Forecast2 key={index} data={data} />
                        )
                    }
                    else{
                        return(
                            null
                        )
                    }
                })
            )
        }
    }

    render() {
        return (
            <React.Fragment>
                <Navbar handelClick={this.handelClick} handelGps={this.handelGps} />
                <div id="container">
                    <div id="content">
                        <div id="wcard">
                            {this.state.isloading === true ? <div className="spinner">
                                <div className="rect1"></div>
                                <div className="rect2"></div>
                                <div className="rect3"></div>
                                <div className="rect4"></div>
                                <div className="rect5"></div>
                            </div>
                                : <WeatherCard weather={this.state.weather_data} city={this.state.city} country={this.state.country} />}
                        </div>
                        <div id="mapsec">
                            <MyMapComponent
                                isMarkerShown
                                googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyCf0HtJT5cs0kv7IKcMgGTfEidQ-BnN8qo"
                                loadingElement={<div style={{ height: `100%` }} />}
                                containerElement={<div style={{ height: `100%` }} />}
                                mapElement={<div style={{ height: `100%` }} />}
                                lat={this.state.currLat}
                                long={this.state.currLong}
                            />
                        </div>
                    </div>
                    <div id="fbuttons">
                        <button value={1} onClick={() => this.handleforecast(1)}>Daily</button>
                        <button value={2} onClick={() => this.handleforecast(2)}>Hourly</button>
                    </div>
                    <div id="forecastsec">
                        {this.state.forecastButtonValue===1?this.renderCard1():this.renderCard2()}
                    </div>
                </div>
            </React.Fragment>
        )
    }
}
export default App;
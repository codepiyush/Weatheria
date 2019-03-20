import React, { Component } from 'react';

class App extends Component {
    constructor() {
        super();
        this.state = {
            weather_data: {},
            isloading: true,
            currLat: 28.7041,
            currLong: 77.1025
        }

        this.geoLocate = this.geoLocate.bind(this);
        this.geo_success = this.geo_success.bind(this);
    }
    geo_success(position) {
        this.setState({
            currLat: position.coords.latitude,
            currLong: position.coords.longitude
        }
        )
        console.log(this.state.currLat, this.state.currLong);
    }
    geo_error() {
        alert("Sorry, no position available.");
    }

    geoLocate() {
        navigator.geolocation.getCurrentPosition(this.geo_success, this.geo_error);
    }


    componentDidMount() {
        this.geoLocate();
        fetch("https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/fe6566accbf48f70b39fb83f2a68a219/"+this.state.currLat+","+this.state.currLong+"/?units=si")
            .then(res => res.json())
            .then(data => {
                //console.log(data);
                this.setState({ weather_data: data, isloading: false })
            })
            

    }


    loaded() {
        console.log("conditional rendered");
    }
    render() {


        if (this.state.isloading === false) {
            console.log(this.state.weather_data)
        }
        else {
            console.log("loading...")
        }
        return (
            <p>{this.state.isloading === false ? this.state.weather_data.currently.time : "loading..."}</p>
        )
    }
}
export default App;
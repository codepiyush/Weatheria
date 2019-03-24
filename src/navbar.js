import React from 'react';

class Navbar extends React.Component {
    constructor() {
        super();
        this.state= {
            city: "",
            country: ""
        }
        this.handelChange=this.handelChange.bind(this);
    }

    handelChange(event){
        this.setState( {
                    [event.target.name]:event.target.value
        })
    }


    render() {
        return (
            <div id="navbar">
                <div id="logosec">
                <div id="logo_img">
                   <img src={require("./images/logo.png")} alt="logo" width= {70} height= {70}/>
                </div>
                <div id="title">
                    Weatheria
                </div>
                </div>  
                <div id="inputfield">
                    <input type="text" name="city" placeholder='City' onChange={this.handelChange}/>
                    <input type="text" name="country" placeholder='Country' onChange={this.handelChange}/>
                    <button id="search" onClick={() => this.props.handelClick(this.state.city, this.state.country)}>Search</button>
                    <button id="gps" onClick={this.props.handelGps}><img src={require("./images/gps.png")} alt="gps" height={40} ></img></button>
                </div>
            </div>
        )
    }
}
export default Navbar;  
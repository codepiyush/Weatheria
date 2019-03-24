import React from 'react';

class Forecast2 extends React.Component {

    render() {
        const { temperature, humidity, pressure, icon, summary, visibility, windSpeed } = this.props.data;
        let date = new Date(this.props.data.time * 1000);
        let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        let year = date.getFullYear();
        let month = months[date.getMonth()];
        let day = date.getDate();
        let hour = date.getHours();
        let time = "";
        if (hour > 12) {
            time = (hour - 12) + " pm";
        }
        else if (hour === 0) {
            time = "12 am";
        }
        else {
            time = hour + " am";
        }
        console.log(year, month, day, hour)

        return (
            <div id="fcard">
                <div className="flex">
                    <div>
                        {day} {month}
                    </div>
                    <div>
                        {time}
                    </div>
                </div>
                <hr />
                <div>
                    <h3>{temperature}&deg;C</h3>
                    <img src={require("./images/" + icon + ".png")} alt="icon" height={30} widht={30} />
                    <p>Humidity :  <span>{Math.round(humidity * 100)}</span>%</p>
                    <p>Pressure:   <span>{pressure}</span> pa</p>
                    <p>Visibility: <span>{visibility}</span></p>
                    <p>Wind Speed:   <span>{windSpeed}</span> m/s</p>
                </div>
                <hr/>
                {summary}
            </div>
        )
    }
}

export default Forecast2;
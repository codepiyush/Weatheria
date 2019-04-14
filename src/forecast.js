import React from 'react';

class Forecast1 extends React.Component {

    render() {
        const { temperatureHigh, temperatureLow, humidity, pressure, icon, summary, visibility, windSpeed } = this.props.data;
        let date = new Date(this.props.data.time * 1000);
        let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
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
                <div >
                    <div className="flex" id="temp">
                        <div>
                            <p>High</p><p>{temperatureHigh}&deg;C</p>
                        </div>
                        <div id="ficon">
                            <img src={require("./images/" + icon + ".png")} alt="icon" height={35} widht={35} />
                        </div>
                        <div>
                            <p>Low</p><p>{temperatureLow}&deg;C</p>
                        </div>
                    </div >
                    <p>Humidity :  <span>{Math.round(humidity * 100)}</span>%</p>
                    <p>Pressure:   <span>{pressure}</span> pa</p>
                    <p>Visibility: <span>{visibility}</span></p>
                    <p>Wind Speed:   <span>{windSpeed}</span> m/s</p>
                </div>
                <hr />
                {summary}
            </div>
        )
    }
}

export default Forecast1;
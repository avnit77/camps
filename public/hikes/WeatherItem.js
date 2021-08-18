import Component from '../Component.js';

class WeatherItem extends Component {

    renderHTML() {
        const { day } = this.props;

        const dayDisplay = new Date(day.time * 1000).toDateString().slice(0, 10);
        const percentPrecip = (day.precipProbability * 100).toFixed(0) + '%';
        const sunriseTime = String(new Date(day.sunriseTime * 1000)).slice(16, 21);
        const sunsetTime = String(new Date(day.sunsetTime * 1000)).slice(16, 21);

        return /*html*/ `
        <div class="weather-item">
            <p class="weather-day">${dayDisplay}</p>
            <p class="weather-summary">${day.summary}</p>
            <p class="high"><span class="bold">High:</span> ${(day.temperatureHigh).toFixed(0)}°<sup>F</sup></p>
            <p class="low"><span class="bold">Low:</span> ${(day.temperatureLow).toFixed(0)}°<sup>F</sup></p>
            <p class="precip"><span class="bold">Precip:</span> ${percentPrecip}</p>
            <p class="sunrise"><span class="bold">Sunrise:</span> ${sunriseTime}</p>
            <p class="sunset"><span class="bold">Sunset:</span> ${sunsetTime}</p>
        </div>
        `;
    }
}

export default WeatherItem;
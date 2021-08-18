import Component from '../Component.js';
import WeatherItem from './WeatherItem.js';
import CampgroundItem from './CampgroundItem.js';
import Directions from './Directions.js';

class Modal extends Component {

    onRender(modal) {
        const { campgrounds, weather } = this.props;
        const closeButton = modal.querySelector('.close-button');
        const directionsSection = modal.querySelector('.directions-section');
        const weatherSection = modal.querySelector('.weather-section');
        const campgroundSection = modal.querySelector('.campground-section');

        const hideModal = () => { modal.hidden = true; };

        closeButton.addEventListener('click', hideModal);

        window.onclick = function (event) {
            if (event.target === modal) { // nice!
                hideModal();
            }
        };

        if (weather) {
            weather.forEach(day => {
                const weatherItem = new WeatherItem({ day });
                weatherSection.appendChild(weatherItem.renderDOM());
            });
        }

        if (campgrounds) {
            campgrounds.forEach(campground => {
                const campgroundItem = new CampgroundItem({ campground });
                campgroundSection.appendChild(campgroundItem.renderDOM());
            });
        }
        const { modalHike } = this.props;
        const directions = new Directions({ modalHike });
        directionsSection.appendChild(directions.renderDOM());
    }

    renderHTML() {

        const { modalHike } = this.props;
        let timeString;
        let conditionTime;

        if (modalHike.conditionDate) {
            timeString = modalHike.conditionDate.slice(0, 10);

            conditionTime = modalHike.conditionDate === '1970-01-01 00:00:00' ? 'Condition information unavailable' : `Trail conditions as of ${timeString}`;

            if (modalHike.conditionStatus === 'Unknown') { // wow, nice job working around this API data weirdness
                modalHike.conditionStatus = 'Sorry, trail status unknown';
            }

            if (modalHike.conditionDetails === null) {
                modalHike.conditionDetails = 'Sorry, condition details unknown';
            }
        }

        // seems like you could import this map from HikeItem.js
        const difficultyValues = {
            'any': 'All Levels',
            'green': 'Easiest',
            'greenBlue': 'Easy',
            'blue': 'Medium',
            'blueBlack': 'Hard',
            'black': 'Hardest'
        };
        let stars = '';
        for (let i = 0; i < Math.round(modalHike.stars); i++) {
            stars += '⭐';
        }


        return /*html*/ `
            <div class="modal" hidden>
                <div class="modal-content">
                    <span class="close-button">&times;</span>
                    <p class="modal-hike-name">${modalHike.name}</p>
                    <p class="modal-hike-location">${modalHike.location}</p>
                    <img class="modal-hike-picture" src="${modalHike.imgMedium}" onerror="this.onerror=null;this.src='/assets/placeholder-image.png';" alt="${modalHike.name}">
                    <div class="modal-stars-votes-difficulty">
                        <span class="modal-num-stars">Rating: ${stars}</span><span class="modal-num-votes">Votes: ${modalHike.starVotes}</span><span class="modal-difficulty">Difficulty: ${difficultyValues[modalHike.difficulty]}</span>
                    </div>
                    <p class="summary-decl">HIKE SUMMARY:</p>
                    <p class="modal-hike-summary">${modalHike.summary}</p>
                    <div class="modal-length-ascent-descent">
                        <span class="modal-length"><span class="bold-please">Length:</span> ${modalHike.length} miles</span><span class="modal-ascent"><span class="bold-please">Vertical ascent:</span> ${modalHike.ascent} feet</span><span class="modal-descent"><span class="bold-please">Vertical descent:</span> ${modalHike.descent} feet</span>
                    </div>
                    <div class="modal-high-low">
                        <span class="modal-high"><span class="bold-please">Max elevation:</span> ${modalHike.high} feet</span><span class="modal-low"><span class="bold-please">Minimum elevation:</span> ${modalHike.low} feet</span>
                    </div>
                    <fieldset class="modal-trail-status">
                        <legend>${conditionTime}</legend>
                        <p class="modal-condition-status"><span class="bold-please">Trail status:</span> ${modalHike.conditionStatus}<p>
                        <p class="modal-condition-details"><span class="bold-please">Condition details:</span> ${modalHike.conditionDetails}</p>
                    </fieldset>
                    <a class="modal-website-link" href="${modalHike.url}" target="_blank">Trail Website</a>
                    <section class="directions-section">
                    </section>
                    <p class="weather-decl">Upcoming weather:</p>    
                    <section class="weather-section">
                    </section>
                    <p class="camping-decl">Camping nearby:</p>
                    <section class="campground-section">
                        
                    </section>
                </div>
            </div>
            `;
    }
}


export default Modal;
import Component from '../Component.js';

class Directions extends Component {

    renderHTML() {
        let directionsHtml = '';
        if (localStorage.getItem('LAT')) {
            const { modalHike } = this.props;
            const latOrigin = JSON.parse(localStorage.getItem('LAT'));
            const lonOrigin = JSON.parse(localStorage.getItem('LON'));

            directionsHtml = /* for syntax highlighting */ /*html*/`
                <p class="directions-decl">Get there by: </p>
                <a class="car" href="https://www.google.com/maps/dir/?api=1&origin=${latOrigin},${lonOrigin}&destination=${modalHike.latitude},${modalHike.longitude}" target="_blank">Car</a>
                <a class="transit" href="https://www.google.com/maps/dir/?api=1&origin=${latOrigin},${lonOrigin}&destination=${modalHike.latitude},${modalHike.longitude}&travelmode=transit" target="_blank">Transit</a>
                <a class="human" href="https://www.google.com/maps/dir/?api=1&origin=${latOrigin},${lonOrigin}&destination=${modalHike.latitude},${modalHike.longitude}&travelmode=walking" target="_blank">Human</a>
                `;
        }
        return /*html*/`
            <div class="directions-div">
                ${directionsHtml}
            </div>
            `;
    }
}

export default Directions;
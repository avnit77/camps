import Component from '../Component.js';

class CampgroundItem extends Component {

    renderHTML() {
        const { campground } = this.props;

        return /*html*/ `
            <div class="campground-item">
                <p class="campground-name">${campground.name}</p>
                <img class="campground-img" src="${campground.imgUrl}" onerror="this.onerror=null;this.src='/assets/placeholder-image.png';" alt="${campground.name} image">
                <a class="campground-website" href="${campground.url}" target="_blank">Visit campground website!</a>
            </div>
        `;
    }
}

export default CampgroundItem;
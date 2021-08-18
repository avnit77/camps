import Component from '../Component.js';
import HikeItem from './HikeItem.js';
import Search from './SearchSort.js';

class HikesList extends Component {

    onRender(dom) {

        const {
            hikes,
            onSearchSubmit,
            renderModal,
            removeUnFavorites,
        } = this.props;
        const optionsSection = dom.querySelector('.options-section');
        const search = new Search({
            hikes,
            onSearchSubmit,
        });
        optionsSection.appendChild(search.renderDOM());

        hikes.forEach(hike => {
            const props = {
                hike: hike,
                removeUnFavorites,
                renderModal
            };

            const hikeItem = new HikeItem(props);
            const hikeItemDOM = hikeItem.renderDOM();
            dom.querySelector('.hikes-list').appendChild(hikeItemDOM);
        });

    }

    renderHTML() {
        return /*html*/`
        <div>
            <section class="options-section">
            <!-- options go here -->
            </section>
            <ul class="hikes-list"></ul>
        </div>
        `;
    }
}

export default HikesList;

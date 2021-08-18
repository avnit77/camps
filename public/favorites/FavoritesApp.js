import Component from '../Component.js';
import Header from '../common/Header.js';
import Nav from '../common/Nav.js';
import Footer from '../common/Footer.js';
import HikesList from '../hikes/HikesList.js';
import Modal from '../hikes/Modal.js';
import { getFavorites } from '../services/hikes-api.js';

class FindHikesApp extends Component {

    async onRender(dom) {
        const header = new Header();
        dom.prepend(header.renderDOM());

        const nav = new Nav();
        dom.appendChild(nav.renderDOM());

        const listSection = dom.querySelector('.list-section');

        const hikesList = new HikesList({
            hikes: [],
            removeUnFavorites: true,
            renderModal: (modalHike, campgrounds, weather) => {
                modal.update({ modalHike, campgrounds, weather });
                modal.rootElement.hidden = false;
            }
        });
        listSection.appendChild(hikesList.renderDOM());

        const hikes = await getFavorites()
        hikesList.update({ hikes });

        const footer = new Footer();
        dom.appendChild(footer.renderDOM());

        const modalSection = dom.querySelector('.modal-section');
        const modal = new Modal({
            modalHike: {},
            campgrounds: [],
        });
        modalSection.appendChild(modal.renderDOM());
    }



    renderHTML() {

        return /*html*/`
            <div>
                <!-- header goes here -->
                
                <main>
                    <section class="list-section">
                        <!-- hikes list goes here -->     
                    </section>
                    <section class="modal-section">
                    <!-- modal goes here -->
                    </section>
                </main>
                <!-- footer goes here -->
            </div>
        `;
    }
}

export default FindHikesApp;
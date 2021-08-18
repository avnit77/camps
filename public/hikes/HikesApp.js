import Component from '../Component.js';
import Header from '../common/Header.js';
import Nav from '../common/Nav.js';
import Footer from '../common/Footer.js';
import Loading from '../common/Loading.js';
import HikesList from './HikesList.js';
import Modal from './Modal.js';
import { getHikes } from '../services/hikes-api.js';

class HikesApp extends Component {

    onRender(dom) {
        localStorage.removeItem('difficulty');
        localStorage.removeItem('rating');
        localStorage.removeItem('length');
        const header = new Header();
        dom.prepend(header.renderDOM());

        const nav = new Nav();
        dom.appendChild(nav.renderDOM());

        const loading = new Loading({ loading: true });
        dom.appendChild(loading.renderDOM());

        const footer = new Footer();
        dom.appendChild(footer.renderDOM());

        const listSection = dom.querySelector('.list-section');

        const hikesList = new HikesList({
            hikes: [],
            onSearchSubmit: (array) => {
                let searchedHikes;
                if (!array) {
                    searchedHikes = this.state.hikes;
                }
                else {
                    searchedHikes = array;
                }
                const updatedProps = { hikes: searchedHikes };
                hikesList.update(updatedProps);
            },
            renderModal: (modalHike, campgrounds, weather) => {
                modal.update({ modalHike, campgrounds, weather });
                modal.rootElement.hidden = false;
            }
        });
        listSection.appendChild(hikesList.renderDOM());

        const modalSection = dom.querySelector('.modal-section');
        const modal = new Modal({
            modalHike: {},
            campgrounds: [],
        });
        modalSection.appendChild(modal.renderDOM());

        //event listener for search location
        const searchForm = dom.querySelector('.location-search');

        const getSetAndUpdateHikes = async (searchLocation) => {
            try {
                const hikes = await getHikes(searchLocation);
                localStorage.setItem('allHikes', JSON.stringify(hikes));
                hikesList.update({ hikes });
            }

            catch (err) {
                console.log(err);
            }
        }
        const loadHikes = async () => {
            try {
                const hikes = await getHikes();
                localStorage.setItem('allHikes', JSON.stringify(hikes));
                hikesList.update({ hikes: hikes });

                searchForm.addEventListener('submit', async (event) => {
                    event.preventDefault();
                    const formData = new FormData(searchForm);
                    const searchLocation = formData.get('search');


                    const loading2 = new Loading({ loading: true }); // why not use the loading component you've already instantiated, and just update it with { loading: true }?
                    dom.appendChild(loading2.renderDOM());

                    await getSetAndUpdateHikes(searchLocation);
                });
            }

            catch (err) {
                console.log(err);
            }
            finally {
                loading.update({ loading: false });
            }

            searchForm.addEventListener('submit', async (event) => {
                event.preventDefault();
                const formData = new FormData(searchForm);
                const searchLocation = formData.get('search');

                await getSetAndUpdateHikes(searchLocation);

            });
        };

        loadHikes();
    }

    renderHTML() {
        return /*html*/`
            <div>
                <!-- header goes here -->
                <main>
                    <form class="location-search">
                        <input type="text" name="search" placeholder="City, State">
                        <button class="location-search-button">Search</button>
                    </form>
                    
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

export default HikesApp;
import Component from '../Component.js';
import Header from '../common/Header.js';
import Footer from '../common/Footer.js';
import Nav from '../common/Nav.js';

class AboutUsApp extends Component {

    onRender(dom) {
        const header = new Header();
        dom.prepend(header.renderDOM());

        const nav = new Nav();
        dom.appendChild(nav.renderDOM());

        const footer = new Footer();
        dom.appendChild(footer.renderDOM());
    }

    renderHTML() {
        return /*html*/`
            <div>
                <!-- header goes here -->
                <main>
                    <ul>
                        <li>
                            <img src="../assets/brittany_square.jpg" alt="Brittany">
                            <p>Brittany is from Portland, Oregon. When not in front of a computer screen, you can find her reading with her cat and a cup of coffee, training in aerial circus arts, or donating her last dollar to Hollywood Theatre.</p>
                        </li>
                        <li>
                            <img src="../assets/dan_square.jpg" alt="Dan">
                            <p>Business owner, head brewer, hostel manager, wilderness guide, technician, developer; Dan's held many titles over the years, but one thing has stayed the same: his drive to always learn more, move forward, and have fun doing it!</p>
                        </li>
                        <li>
                            <img src="../assets/jbj_square.jpg" alt="Brittany">
                            <p>JBJ is an east coast transplant that has called the Pacific Northwest home for quite some time. They spend a majority of their time with their person and their dog trying to find the most beautiful places in Oregon. When they aren't in the woods, they are most likely found rollerskating in circles.</p>
                        </li>
                        <li>
                            <img src="../assets/lisa_square.jpg" alt="Lisa">
                            <p>Lisa loves all things trails and prefers using physical maps to navigate the great outdoors. She invented the competitive leisure sport of Adventure Tubing, which consists of trail running with inflated innertubes to alpine lakes.</p>
                        </li>
                        <li>
                            <img src="../assets/tali_square.jpg" alt="Tali">
                            <p>Tali would rather be in a forest right now. She enjoys petting ferns and shouting positive affirmations at trees.</p>
                        </li>
                        <li>
                            <img src="../assets/tess_square.jpg" alt="Tess">
                            <p>Tess loves trails and camping, though she prefers land that is close to the ocean. When not developing software, she's exploring Oregon's outdoors, indulging in visual art, or dreaming of sailing the coast of Maine.</p>
                        </li>
                        
                    </ul>
                </main>
                <!-- footer goes here -->
            </div>
        `;
    }
}

export default AboutUsApp;
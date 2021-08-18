import Component from '../Component.js';

class Footer extends Component {
    renderHTML() {
        return /*html*/`
        <div class="footer">
            <div class="footer">Alchemy Code Lab 2019 &copy</div>
            <a href="../about-us.html">About the Developers</a>
        </div>
        `;
    }
}

export default Footer;
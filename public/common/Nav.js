import Component from '../Component.js';

class Nav extends Component {

    renderHTML() {

        return /*html*/`
            <div class="nav">
                <a href="./">Home</a>
                <a href="./hikes.html">Search Hikes</a>
                <a href="./favorites.html">Favorites</a>
            </div>
        `;
    }
}

export default Nav;
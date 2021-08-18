import Component from '../Component.js';

class Header extends Component {
    onRender(dom) {
        
        if (localStorage.getItem('USER')) {
            const button = dom.querySelector('.log-out');
            button.classList.remove('hidden');

            button.addEventListener('click', () => {
                localStorage.removeItem('USER');
                location = './';
            });
        }
    }

    renderHTML() {
        const title = this.props.title || 'TREKS N TRAILS';

        let token = '';
        const json = localStorage.getItem('USER');
        if (json) {
            const user = JSON.parse(json);
            token = user.token;
        }
        const actualHTMLtoRender = token ? `<button class="log-out">Log Out</button>` : ``;


        return /*html*/`
            <header>
                <div class="header-contents">
                    <img class="logo" src="./assets/hike-icon-white.png" alt="Hike Logo">
                    <h1>${title}</h1>
                    ${actualHTMLtoRender}
                </div>
            </header>
        `;
    }
}

export default Header;
import Component from '../Component.js';
import Header from '../common/Header.js';
import Footer from '../common/Footer.js';
import SignUp from './SignUp.js';
import SignIn from './SignIn.js';
import { signUp as userSignUp, signIn as userSignIn } from '../services/hikes-api.js';
import Nav from '../common/Nav.js';

function success(user) {
    localStorage.setItem('USER', JSON.stringify(user));
    location = '/hikes.html';
}

class App extends Component {

    onRender(dom) {

        const header = new Header();
        dom.prepend(header.renderDOM());

        const nav = new Nav();
        dom.appendChild(nav.renderDOM());

        let token = '';
        const json = localStorage.getItem('USER');
        if (json) {
            const user = JSON.parse(json);
            token = user.token;
        }

        if (!token) {
            const errors = dom.querySelector('.errors');
            const signUpContainer = dom.querySelector('#signup-container');
            const signInContainer = dom.querySelector('#signin-container');

            const signUp = new SignUp({
                onSignUp: async newUser => {
                    errors.textContent = '';

                    try {
                        const user = await userSignUp(newUser);
                        success(user);
                    }
                    catch (err) {
                        errors.textContent = err;
                        throw err;
                    }
                }
            });

            signUpContainer.appendChild(signUp.renderDOM());

            const signIn = new SignIn({
                onSignIn: async credentials => {
                    errors.textContent = '';

                    try {
                        const user = await userSignIn(credentials);
                        success(user);
                    }
                    catch (err) {
                        errors.textContent = err;
                        throw err;
                    }
                }
            });
            signInContainer.appendChild(signIn.renderDOM());

            if(!signInContainer.classList.value && !signUpContainer.classList.value){
                signUpContainer.classList.add('no-display')
            }


            const hideContainers = (e) => {
                const button = e.target.id
                    if(button === 'signup-button'){
                        signInContainer.classList.add('no-display')
                        signUpContainer.classList.remove('no-display')

                    }if(button === 'signin-button'){

                        signUpContainer.classList.add('no-display')
                        signInContainer.classList.remove('no-display')
                    }   
            };

            const switchToSignIn = dom.querySelector('#signin-button');
            const switchToSignUp = dom.querySelector('#signup-button');

            [switchToSignIn, switchToSignUp]
                .forEach(el => el.addEventListener('click', hideContainers));


        }


        const footer = new Footer();
        dom.appendChild(footer.renderDOM());
    }

    renderHTML() {
        const loginHTML =
            `<section id="signup-container">
            <p class="errors"></p>
                <p class="switch">
                <button id="signin-button">Existing User Sign-In</button>
                </p>
            </section>
            <section id="signin-container">
                <p class="switch">
                <button id="signup-button">New User Registration</button>
                </p>
            </section>`;

        const loggedInHTML = `
        <img class="mthood" src="../assets/mthood.jpeg" alt="Image of Mt. Hood in Oregon">
        `;

        let token = '';
        const json = localStorage.getItem('USER');
        if (json) {
            const user = JSON.parse(json);
            token = user.token;
        }
        const actualHTMLtoRender = token ? loggedInHTML : loginHTML; 

        return /*html*/`
            <div>
                <!-- header goes here -->
                <main>
                ${actualHTMLtoRender}
                </main>
            </div>
        `;
    }
}

export default App;
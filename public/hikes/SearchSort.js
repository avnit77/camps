import Component from '../Component.js';
class Search extends Component {

    onRender(dom) {
        const form = dom.querySelector('.search-form');
        const resetButton = dom.querySelector('.reset-button');
        const onSearchSubmit = this.props.onSearchSubmit;

        form.addEventListener('submit', event => {
            event.preventDefault();
            //const { hikes } = this.props;
            const hikes = JSON.parse(localStorage.getItem('allHikes'));
            const formData = new FormData(form);

            localStorage.setItem('difficulty', formData.get('difficulty'));
            localStorage.setItem('rating', formData.get('rating'));
            localStorage.setItem('length', formData.get('length'));

            let filteredDifficultyResultsArray;

            const makeDifficultyArray = () => {
                if (formData.get('difficulty') === 'any') {
                    filteredDifficultyResultsArray = hikes;
                } else {
                    filteredDifficultyResultsArray = hikes.filter(hike => (hike.difficulty === formData.get('difficulty')));
                }
                return filteredDifficultyResultsArray;
            };

            makeDifficultyArray();

            const filteredRatingResultsArray = hikes.filter(hike => (hike.stars >= Math.round(formData.get('rating'))));

            let filteredLengthResultsArray;

            const makeLengthArray = () => {
                if (!formData.get('length')) {
                    filteredLengthResultsArray = hikes;
                } else {
                    filteredLengthResultsArray = hikes.filter(hike => (hike.length <= formData.get('length')));
                }
                return filteredLengthResultsArray;
            };

            makeLengthArray();

            const foundInTwo = filteredDifficultyResultsArray.filter(element => filteredRatingResultsArray.includes(element));

            const bigMamaArray = foundInTwo.filter(element => filteredLengthResultsArray.includes(element));

            onSearchSubmit(bigMamaArray);

        });

        resetButton.addEventListener('click', () => {
            const hikes = JSON.parse(localStorage.getItem('allHikes'));
            onSearchSubmit(hikes);
            form.reset();
        }
        );
    }

    renderHTML() {
        const difficulty = localStorage.getItem('difficulty') || 'any';

        const optionValues = [['any', 'All Levels'], ['green', 'Easiest'], ['greenBlue', 'Easy'], ['blue', 'Medium'], ['blueBlack', 'Hard'], ['black', 'Hardest']];

        const optionValuesString = optionValues.map(array => `<option value=${array[0]} ${difficulty === array[0] ? 'selected=true' : ''}>${array[1]}</option>`).reduce((acc, optionString) => acc + optionString, '');

        const rating = parseInt(localStorage.getItem('rating')) || 1;

        const ratingsArray = [1, 2, 3, 4, 5];

        const ratingValuesString = ratingsArray.map(value => `<option value=${value} ${rating === value ? 'selected=true' : ''}>${value}</option>`).reduce((acc, valuesString) => acc + valuesString, '');

        const length = parseInt(localStorage.getItem('length'));
        return /*html*/`
        <div>
            <form class="search-form">

                <section class="difficulty">
                    <label>Difficulty:</label>
                    <select name="difficulty">
                        ${optionValuesString}
                    </select>
                </section>
                <section class="rating">
                    <label>Minimum Rating:</label>
                        <select name="rating">
                        ${ratingValuesString}
                        </select>
                </section>
                <section class="length">
                    <label>Max Length:</label>
                    <input class="max-length" type="number" min="0" name="length" value=${length}> mi.
                </section>
                <section class="buttons">
                    <button class="filter-button">Filter</button>
                    <button class="reset-button"><a class="reset" href="../hikes.html">Reset</a></button>
                </section>
            </form>
        </div>
        `;
    }
}

export default Search;


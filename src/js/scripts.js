// This is where you should write all JavaScript
// for your project. Remember a few things as you start!
// - Use let or const for all variables
// - Do not use jQuery - use JavaScript instead
// - Do not use onclick - use addEventListener instead
// - Run npm run test regularly to check autograding
// - You'll need to link this file to your HTML :)
const API_KEY = 'patek5CwtdjvmqMhM.90281cc2296beb4dc42fdb51a6997d4eed6e0d99cdd9c02183362d8ab2eff9b7';

const baseId = 'appOCmWMUziDi675p';
const tableId = 'tbl1KC9Y3SRCRsqpD';

let apiUrl = `https://api.airtable.com/v0/${baseId}/${tableId}`;

let userSelection = {
	genre: [],
	adjectives: null,
	scenario: [],
	obscurity: null
};

const lookForGenre = `SEARCH("Electronic",genre)`;
let lookForAdjectives = null;

/* // Look for any items with "Harper" text in Author field.
const lookForAuthor = `SEARCH("Harper",Author)`;

// Look for items that match one of genre OR author field text.
const requireSome = `OR(${lookForGenre}, ${lookForAuthor})`;

// Look for items that match BOTH genre and author field text.
const requireAll = `AND(${lookForGenre}, ${lookForAuthor})`;

// Choose the filterByFormula you want - lookForGenre, lookForAuthor, requireSome, or requireAll. */



async function getAirtableData() {
	const dataContainer = document.querySelector('#data');
	const response = await fetch(apiUrl, {
		headers: {
			"Content-Type": "application/json",
			"authorization": `Bearer ${API_KEY}`
		},
	})
		.then(response => response.json())
		.then((data) => {
			// Check the console for the full object
			console.log(data);
			let randomIndex = Math.floor(Math.random() * data.records.length);
			const music = data.records[randomIndex];
			const musicHTML = `
        <section class="resultscard">
		  <img class="artistimage"src="${music.fields.photos[0].url}" alt="${music.fields.artist}" />
			<h2 class="artistname">${music.fields.artist}</h2>
          <h3 class="artistgenre">${music.fields.genre[0]}</h3>
          <p class="describe">${music.fields.adjectives}</p>
			 <p>${music.fields.description}</p>
			 <a class="listenbutton" href="${music.fields.links}"> Listen!</a>
        </section>
        `
			dataContainer.insertAdjacentHTML('beforeend', musicHTML);
			/*data.records.map((music) => {
				const musicHTML = `
		  <section>
		  <img class="artistimage"src="${music.fields.photos[0].url}" alt="${music.fields.artist}" />
			<h2>${music.fields.artist}</h2>
			 <h3>${music.fields.genre[0]}</h3>
			 <p>${music.fields.adjectives}</p>
			<a class="listenbutton" href="${music.fields.links}"> Listen!</a>
		  </section>
		  `
				dataContainer.insertAdjacentHTML('beforeend', musicHTML);
			});*/
		})
		.catch(error => console.error('Error:', error));
}







document.querySelector('.buttonone').addEventListener('click', getQuizOne);
function getQuizOne() {
	var section = document.querySelector('#quizone');
	section.classList.toggle('show');
	section.classList.toggle('hide');

	var section = document.querySelector("#homepage");
	section.classList.toggle('hide');
	section.classList.toggle('show');
}







document.querySelector('.buttontwo').addEventListener('click', getQuizTwo);
function getQuizTwo() {

	var section = document.querySelector('#quiztwo');
	section.classList.toggle('show');
	section.classList.toggle('hide');

	var section = document.querySelector("#quizone");
	section.classList.toggle('hide');
	section.classList.toggle('show');
}



document.addEventListener('click', (event) => {
	if (event.target.matches('input[type="radio"]')) {
		userSelection[event.target.name] = event.target.value;
		console.log(userSelection);
	}
	if (event.target.matches('input[type="checkbox"]')) {
		if (userSelection[event.target.name].includes(event.target.value)) {
			userSelection[event.target.name] = userSelection[event.target.name].filter(function (item) {
				return item !== event.target.value;
			});
		} else {
			userSelection[event.target.name].push(event.target.value);
		}
		console.log(userSelection);
	}
});

function getFilteredResults() {
	console.log(userSelection);
	let requireAll = `AND(`;
	let adjectives = `SEARCH("${userSelection.adjectives}",adjectives)`;
	let genres = `OR(`;
	let obscurity = `SEARCH("${userSelection.obscurity}",obscurity)`;

	for (genre of userSelection["genre"]) {
		console.log(genre)
		console.log(`SEARCH("${genre}",genre)`)
		genres += `SEARCH("${genre}",genre),`
	}
	let cleanedGenres = genres.slice(0, -1);
	cleanedGenres += `)`;

	let scenarios = `OR(`;

	for (scenario of userSelection["scenario"]) {
		console.log(scenarios)
		console.log(`SEARCH("${scenario}",scenarios)`)
		scenarios += `SEARCH("${scenario}",scenarios),`
	}
	let cleanedScenarios = scenarios.slice(0, -1);
	cleanedScenarios += `)`;

	requireAll += `${cleanedGenres},${cleanedScenarios},${adjectives}, ${obscurity})`;

	apiUrl += `?filterByFormula=${encodeURI(requireAll)}`;
	console.log(apiUrl)
	getAirtableData();
}







document.querySelector('.buttonthree').addEventListener('click', getQuizThree);
function getQuizThree() {

	var section = document.querySelector('#quizthree');
	section.classList.toggle('show');
	section.classList.toggle('hide');
	var section = document.querySelector("#quiztwo");
	section.classList.toggle('hide');
	section.classList.toggle('show');
}

document.querySelector('.buttonfour').addEventListener('click', getQuizFour);
function getQuizFour() {

	var section = document.querySelector('#quizfour');
	section.classList.toggle('show');
	section.classList.toggle('hide');
	var section = document.querySelector("#quizthree");
	section.classList.toggle('hide');
	section.classList.toggle('show');
}

document.querySelector('.buttonfive').addEventListener('click', getResultsPage);
function getResultsPage() {

	var section = document.querySelector('#resultspage');
	section.classList.toggle('show');
	section.classList.toggle('hide');
	var section = document.querySelector("#quizfour");
	section.classList.toggle('hide');
	section.classList.toggle('show');
	getFilteredResults();
}

const restartbutton = document.querySelectorAll('.restart');
for (const button of restartbutton) {
	button.addEventListener('click', alertRestart);
}

function resetQuiz() {
	const forms = document.querySelectorAll('form');
	for (const form of forms) {
		form.reset();
		console.log(form);
	}
}

function alertRestart() {
	var txt;
	if (confirm("Are you sure you want to restart the quiz?")) {
		var sections = Array.from(document.querySelectorAll('.show'));
		for (const section of sections) {
			section.classList.toggle('hide');
			section.classList.toggle('show');
		}
		var section = document.querySelector('#homepage');
		section.classList.toggle('show');
		section.classList.toggle('hide');
		resetQuiz();
	} else {

	}

}

document.querySelector('.restartbutton').addEventListener('click', takeAgain);
function takeAgain() {
	var section = document.querySelector('#resultspage');
	section.classList.toggle('hide');
	section.classList.toggle('show');
	var section = document.querySelector('#homepage');
	section.classList.toggle('show');
	section.classList.toggle('hide');
	resetQuiz();
}

document.addEventListener("DOMContentLoaded", function (event) {
	resetQuiz();
})



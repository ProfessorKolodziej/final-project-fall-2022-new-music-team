// This is where you should write all JavaScript
// for your project. Remember a few things as you start!
// - Use let or const for all variables
// - Do not use jQuery - use JavaScript instead
// - Do not use onclick - use addEventListener instead
// - Run npm run test regularly to check autograding
// - You'll need to link this file to your HTML :)

const baseId = 'appOCmWMUziDi675p';
const tableId = 'tbl1KC9Y3SRCRsqpD';

const apiUrl = `https://api.airtable.com/v0/${baseId}/${tableId}`;

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
			data.records.map((music) => {
				const musicHTML = `
        <li>
          <h2>${music.fields.Genre}</h2>
          <p>${music.fields.Adjectives}</p>

        </li>
        `
				dataContainer.insertAdjacentHTML('beforeend', musicHTML);
			});
		})
		.catch(error => console.error('Error:', error));
}



const button = document.querySelector('.buttonone');


document.querySelector('.buttonone').addEventListener('click', getQuizOne);
function getQuizOne() {
	var section = document.querySelector('#quizone');
	section.classList.toggle('show');

	var section = document.querySelector("#homepage");
	section.classList.toggle('hide');
}


const checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');

checkboxes.forEach(checkbox => {
	console.log(checkbox.value);
});



document.querySelector('.buttontwo').addEventListener('click', getQuizTwo);
function getQuizTwo() {

	var section = document.querySelector('#quiztwo');
	section.classList.toggle('show');

	var section = document.querySelector("#quizone");
	section.classList.toggle('hide');

}

const radios = document.querySelectorAll('input[type="radio"]');
radios.forEach(radio => {
	radio.name = "adjectives";
	radio.addEventListener('change', () => {
	});
});

document.querySelector('.buttonthree').addEventListener('click', getQuizThree);
function getQuizThree() {

	var section = document.querySelector('#quizthree');
	section.classList.toggle('show');

	var section = document.querySelector("#quiztwo");
	section.classList.toggle('hide');

}

document.querySelector('.buttonfour').addEventListener('click', getQuizFour);
function getQuizFour() {

	var section = document.querySelector('#quizfour');
	section.classList.toggle('show');

	var section = document.querySelector("#quizthree");
	section.classList.toggle('hide');

}

document.querySelector('.buttonfive').addEventListener('click', getResultsPage);
function getResultsPage() {

	var section = document.querySelector('#resultspage');
	section.classList.toggle('show');

	var section = document.querySelector("#quizfour");
	section.classList.toggle('hide');

}

document.querySelector('.restart').addEventListener('click', alertRestart);
function alertRestart() {
	var txt;
	if (confirm("Are you sure you want to restart the quiz?")) {
		var section = document.querySelector('#homepage');
		section.classList.toggle('show');

		var section = document.querySelector("#quizone #quizthree #quizfour #resultspage");
		section.classList.toggle('hide');
	} else {

	}

}

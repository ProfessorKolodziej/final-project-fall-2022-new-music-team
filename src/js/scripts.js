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


document.querySelector(".buttonone").addEventListener('click', getQuizOne);
function getQuizOne() {
	var section = document.querySelector("#quizone");
	section.classList.add("show");

	var section = document.querySelector("#homepage");
	section.classList.add("hide");
}

const checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');

checkboxes.forEach(checkbox => {
	console.log(checkbox.value);
});



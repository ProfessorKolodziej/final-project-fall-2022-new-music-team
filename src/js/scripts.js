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

// Get the button
//const button = document.querySelector('#getdata');

//button.addEventListener('click', getAirtableData);


document.querySelector(".buttonone").addEventListener('click', getQuizOne);
function getQuizOne() {
	var x = document.getElementById("quizone");
	if (x.style.display === "none") {
		x.style.display = "block";
	} else {
		x.style.display = "none";
	}
}

import "./addWell.js";
import "./updateWell.js";

import { getDocs, collection } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js";

import { db } from "../../../src/index.js";

// console.log(db);
// Array containing all the names of the well in the data base, to be used in addWell.js to add only wells thta don't exist
export let well_names_array = [];

// Object containing the current viewed well, to be used in updateWell.js to update this especific well only
export let current_viewed_well = {};

const info_paragraph = document.getElementById("info_paragraph");
const tbody = document.getElementById("tbody");

function addRowsToBody(data) {
	tbody.innerHTML = "";
	well_names_array = [];
	current_viewed_well = {};
	data.forEach(item => {
		const well = item.data();

		//console.log(well['inicio perforacion']);

		const date = (new Date ((well['inicio perforacion'].seconds)*1000)).getDate();
		const month = (new Date ((well['inicio perforacion'].seconds)*1000)).getMonth();
		const year = (new Date ((well['inicio perforacion'].seconds)*1000)).getFullYear();

		const datef = (new Date((well['final perforacion'].seconds)*1000)).getDate();
		const monthf = (new Date((well['final perforacion'].seconds)*1000)).getMonth();
		const yearf = (new Date((well['final perforacion'].seconds)*1000)).getFullYear();

		const tr = document.createElement('tr');

		const td = document.createElement('td');
		const td2 = document.createElement('td');
		const td3 = document.createElement('td');

		const button = document.createElement('button');
		button.innerHTML = `${well['nombre del pozo']}`;

		button.addEventListener('click', ()=> {
			info_paragraph.innerText = "";
			info_paragraph.innerHTML= `
				<b>Nombre del pozo:</b> ${well["nombre del pozo"]}.</br>
				<b>Coordenadas de superficie:</b> E: ${well["coordenada superf utm x"].toFixed(2)} m, N: ${well["coordenada superf utm y"].toFixed(2)} m.</br>
				<b>Coordenadas de fondo:</b> E: ${well["coordenada fondo utm x"].toFixed(2)} m, N: ${well["coordenada fondo utm y"].toFixed(2)} m.</br>
				<b>Referencia UTM:</b> ${well["utm projection id"]}.</br>
				<b>Tipo de pozo:</b> ${well["tipo de pozo"]}.</br>
				<b>Inicio de perforación:</b> ${date}/${month+1}/${year}.</br>
				<b>Fin de perforación:</b> ${datef}/${monthf+1}/${yearf}.</br>
				<b>Contratista de perforación:</b> ${well["contratista perforacion"]}.</br>
				<b>Nombre del taladro:</b> ${well["nombre del taladro"]}.</br>
				<b>Elevación del taladro:</b> ${well["elevacion del taladro"].toFixed(1)} pies.</br>
				<b>Referencia de elevación:</b>  ${well["referencia de elevacion"]}.</br>
				<b>Elevación del terreno:</b> ${well["elevacion del terreno"].toFixed(1)} pies.</br>
				<b>Locación en superficie:</b> ${well["locacion en superficie"]}.
			`;
			current_viewed_well = {
				"nombre del pozo": well["nombre del pozo"],
				"coordenada superf utm x": well["coordenada superf utm x"],
				"coordenada superf utm y": well["coordenada superf utm y"],
				"coordenada fondo utm x": well["coordenada fondo utm x"],
				"coordenada fondo utm y": well["coordenada fondo utm y"],
				"longitud x": well["longitud x"],
				"latitud y": well["latitud y"],
				"utm projection id": well["utm projection id"],
				"tipo de pozo": well["tipo de pozo"],
				"inicio perforacion": well['inicio perforacion'],
				"final perforacion": well['final perforacion'],
				"contratista perforacion": well["contratista perforacion"],
				"nombre del taladro": well["nombre del taladro"],
				"elevacion del taladro": well["elevacion del taladro"],
				"referencia de elevacion": well["referencia de elevacion"],
				"elevacion del terreno": well["elevacion del terreno"],
				"locacion en superficie": well["locacion en superficie"]
			};

			console.log(current_viewed_well);
		});

		td.appendChild(button);

		td2.innerHTML = `${date}/${month+1}/${year}`;
		td3.innerHTML = `${datef}/${monthf+1}/${yearf}`;

		tr.appendChild(td);
		tr.appendChild(td2);
		tr.appendChild(td3);

		tbody.appendChild(tr);

		// Add the well into the array
		well_names_array.push(well["nombre del pozo"]);
	});

	// console.log(well_names_array);
}


const wellsInSanJose = await getDocs(collection(db, 'sanjose'));

// console.log(wellsInSanJose.docs);

addRowsToBody(wellsInSanJose.docs);
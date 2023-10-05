import "./addWell.js";

import { getDocs, collection } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js";

import { db } from "../../../src/index.js";

// console.log(db);

const info_paragraph = document.getElementById("info_paragraph");
const tbody = document.getElementById("tbody");

function addRowsToBody(data) {

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
			info_paragraph.innerText = `Nombre del pozo: ${well["nombre del pozo"]}.
			Coordenadas de superficie: ${well["coordenada superf utm x"].toFixed(2)} m, ${well["coordenada superf utm y"].toFixed(2)} m.
			Coordenadas de fondo: ${well["coordenada fondo utm x"].toFixed(2)} m, ${well["coordenada fondo utm y"].toFixed(2)} m.
			Referencia UTM: ${well["utm projection id"]}.
			Tipo de pozo: ${well["tipo de pozo"]}.
			Inicio de la perforación: ${date}/${month+1}/${year}.
			Fin de la perforación: ${datef}/${monthf+1}/${yearf}.
			Contratista de perforación: ${well["contratista perforacion"]}.
			Nombre del taladro: ${well["nombre del taladro"]}.
			Elevación del taladro: ${well["elevacion del taladro"].toFixed(1)} pies.
			Referencia de elevación:  ${well["referencia de elevacion"]}.
			Elevación del terreno: ${well["elevacion del terreno"].toFixed(1)} pies.
			Locación en superficie: ${well["locacion en superficie"]}.
		`;
		});

		td.appendChild(button);

		td2.innerHTML = `${date}/${month+1}/${year}`;
		td3.innerHTML = `${datef}/${monthf+1}/${yearf}`;

		tr.appendChild(td);
		tr.appendChild(td2);
		tr.appendChild(td3);

		tbody.appendChild(tr);
	});
}


const wellsInSanJose = await getDocs(collection(db, 'sanjose'));

// const q = query(wellsInSanJose);

// console.log(wellsInSanJose.docs);

addRowsToBody(wellsInSanJose.docs);

// onSnapshot(q, (querySnapshot) => {
// 		addRowsToBody(querySnapshot.docs);
// });

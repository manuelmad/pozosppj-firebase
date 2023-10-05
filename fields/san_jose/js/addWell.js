import { doc, setDoc } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js";
import { db } from "../../../src/index.js";

/* show / hide modal */

const add_well_modal = document.getElementById("add_well_modal");
add_well_modal.style.display = "none";

const add_well_btn = document.getElementById("add_well_btn");
add_well_btn.addEventListener("click", showAddModal);

function showAddModal() {
    add_well_modal.style.display = "block";
}

const x_icon = document.getElementById("x_icon");
x_icon.addEventListener("click", hideAddModal);


function hideAddModal() {
	add_well_modal.style.display = "none";
}

/* Add New Well */

// Add a new document in collection "sanjose"
const send_new_well = document.getElementById("send_new_well");
send_new_well.addEventListener("click", addNewWell);

const well_name = document.getElementById("well_name");
const utm_x = document.getElementById("utm_x");
const utm_y = document.getElementById("utm_y");
const long_x = document.getElementById("long_x");
const lat_y = document.getElementById("lat_y");
const utm_id = document.getElementById("utm_id");
const well_type = document.getElementById("well_type");
const drilling_init = document.getElementById("drilling_init");
const drilling_end = document.getElementById("drilling_end");
const drilling_contractor = document.getElementById("drilling_contractor");
const rig_name = document.getElementById("rig_name");
const rig_elevation = document.getElementById("rig_elevation");
const elevation_ref = document.getElementById("elevation_ref");
const ground_elevation = document.getElementById("ground_elevation");
const location = document.getElementById("location");

// Tengo que lograr pasar la fecha al mismo timestamp de firebase para que me funcione el código en san_jose.js
// O tendré que colocar las fechas en string y listo
async function addNewWell() {
    await setDoc(doc(db, "sanjose", well_name.value), {
        "nombre del pozo" : well_name.value,
        "coordenada superf utm x": Number(utm_x.value),
        "coordenada superf utm y": Number(utm_y.value),
        "longitud x": Number(long_x.value),
        "latitud y": Number(lat_y.value),
        "utm projection id": utm_id.value,
        "tipo de pozo": well_type.value,
        "inicio perforacion": (new Date(drilling_init.value).getTime())/1000,
        "final perforacion": (new Date(drilling_end.value).getTime())/1000,
        "contratista perforacion": drilling_contractor.value,
        "nombre del taladro": rig_name.value,
        "elevacion del taladro": Number(rig_elevation.value),
        "referencia de elevacion": elevation_ref.value,
        "elevacion del terreno": Number(ground_elevation.value),
        "locacion en superficie": location.value,
    });
}

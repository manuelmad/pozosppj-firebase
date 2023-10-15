import { doc, setDoc } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js";
import { db } from "../../../src/firebase.js";

import { well_names_array } from "./san_jose.js";

// show / hide Add Modal
const well_modal_container = document.getElementById("well_modal_container");
// well_modal_container.style.display = "none";

const add_well_btn = document.getElementById("add_well_btn");
add_well_btn.addEventListener("click", showAddModal);

function showAddModal() {
    // Clean all inputs, because they are cached
    well_name.value = "";
    utm_x.value = "";
    utm_y.value = "";
    utm_x_fondo.value = "";
    utm_y_fondo.value = "";
    long_x.value = "";
    lat_y.value = "";
    utm_id.value = "";
    well_type.value = "";
    drilling_init.value = "";
    drilling_end.value = "";
    drilling_contractor.value = "";
    rig_name.value = "";
    rig_elevation.value = "";
    elevation_ref.value = "";
    ground_elevation.value = "";
    location.value = "";

    // Show modal and scroll to the top of the screen
    well_modal_container.style.display = "block";
    window.scroll({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
}

const x_icon = document.getElementById("x_icon");
x_icon.addEventListener("click", hideAddModal);


function hideAddModal() {
	well_modal_container.style.display = "none";
}

// show / hide Success Add Modal
const add_success_container = document.getElementById("add_success_container");
// add_success_container.style.display = "none";

function showAddSuccess() {
    add_success_container.style.display = "flex";
}

function hideAddSuccess() {
	add_success_container.style.display = "none";
}

/* Add New Well */

// Add a new document in collection "sanjose"
const send_new_well = document.getElementById("send_new_well");
send_new_well.addEventListener("click", addNewWell);

const well_name = document.getElementById("well_name");
const utm_x = document.getElementById("utm_x");
const utm_y = document.getElementById("utm_y");
const utm_x_fondo = document.getElementById("utm_x_fondo");
const utm_y_fondo = document.getElementById("utm_y_fondo");
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


async function addNewWell() {
    //console.log(well_name.value);
    if(!well_name.value) {
        alert("El nombre del pozo es requerido.");
        return;
    } else if(well_names_array.includes(well_name.value)) {
        alert(`El pozo ${well_name.value} ya existe en la base de datos.`);
        return;
    }
    
    await setDoc(doc(db, "sanjose", well_name.value), {
        "nombre del pozo" : well_name.value,
        "coordenada superf utm x": Number(utm_x.value),
        "coordenada superf utm y": Number(utm_y.value),
        "coordenada fondo utm x": Number(utm_x_fondo.value),
        "coordenada fondo utm y": Number(utm_y_fondo.value),
        "longitud x": Number(long_x.value),
        "latitud y": Number(lat_y.value),
        "utm projection id": utm_id.value,
        "tipo de pozo": well_type.value,
        "inicio perforacion": {
            seconds: (new Date(drilling_init.value).getTime())/1000
        },
        "final perforacion": {
            seconds: (new Date(drilling_end.value).getTime())/1000
        },
        "contratista perforacion": drilling_contractor.value,
        "nombre del taladro": rig_name.value,
        "elevacion del taladro": Number(rig_elevation.value),
        "referencia de elevacion": elevation_ref.value,
        "elevacion del terreno": Number(ground_elevation.value),
        "locacion en superficie": location.value,
    }); 
    
    hideAddModal();
    showAddSuccess();

    setTimeout(()=>{
        hideAddSuccess();
    }, 2000);
    
}

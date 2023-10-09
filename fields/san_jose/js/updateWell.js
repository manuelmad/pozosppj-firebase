import { doc, setDoc } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js";
import { db } from "../../../src/index.js";

import { well_names_array, current_viewed_well } from "./san_jose.js";

// Accesing all inputs in udate nodal
const well_name_update = document.getElementById("well_name_update");
const utm_x_update = document.getElementById("utm_x_update");
const utm_y_update = document.getElementById("utm_y_update");
const utm_x_fondo_update = document.getElementById("utm_x_fondo_update");
const utm_y_fondo_update = document.getElementById("utm_y_fondo_update");
const long_x_update = document.getElementById("long_x_update");
const lat_y_update = document.getElementById("lat_y_update");
const utm_id_update = document.getElementById("utm_id_update");
const well_type_update = document.getElementById("well_type_update");
const drilling_init_update = document.getElementById("drilling_init_update");
const drilling_end_update = document.getElementById("drilling_end_update");
const drilling_contractor_update = document.getElementById("drilling_contractor_update");
const rig_name_update = document.getElementById("rig_name_update");
const rig_elevation_update = document.getElementById("rig_elevation_update");
const elevation_ref_update = document.getElementById("elevation_ref_update");
const ground_elevation_update = document.getElementById("ground_elevation_update");
const location_update = document.getElementById("location_update");


// show / hide Add Modal
const update_modal_container = document.getElementById("update_modal_container");
update_modal_container.style.display = "none";

const update_well_btn = document.getElementById("update_well_btn");
update_well_btn.addEventListener("click", showUpdateModal);

function showUpdateModal() {
    if(!current_viewed_well["nombre del pozo"]) {
        alert("Antes debe visualizar un pozo específico.");
        return;
    }
    // Giving default values to all inputs from current_viewed_well (name is disabled)
    well_name_update.value = current_viewed_well["nombre del pozo"];
    utm_x_update.value = current_viewed_well["coordenada superf utm x"];
    utm_y_update.value = current_viewed_well["coordenada superf utm y"];
    utm_x_fondo_update.value = current_viewed_well["coordenada fondo utm x"];
    utm_y_fondo_update.value = current_viewed_well["coordenada fondo utm y"];
    long_x_update.value = current_viewed_well["longitud x"];
    lat_y_update.value = current_viewed_well["latitud y"];
    utm_id_update.value = current_viewed_well["utm projection id"];
    well_type_update.value = current_viewed_well["tipo de pozo"];
    // For the dates is a bit complicated:
    const datei = new Date();
    let drillInit = (current_viewed_well["inicio perforacion"].seconds)*1000-16200000; // I had to sustract 4,5 hours (16,2 millions miliseconds) because JS added 4,5 hours to the date coming from Firebase.
    //console.log(drillInit);
    if(!isNaN(drillInit)) {
        datei.setTime(drillInit);
        let x = datei.toISOString();
        //console.log(x);
        drilling_init_update.value = x.substring(0,21);
        //console.log(drilling_init_update.value);
    } else {
        datei.setTime(0);
    }
    console.log(drilling_init_update.value);
    
    const datef = new Date();
    let drillFinal = (current_viewed_well["final perforacion"].seconds)*1000-16200000; // I had to sustract 4,5 hours (16,2 millions miliseconds) because JS added 4,5 hours to the date coming from Firebase.
    console.log(drillFinal);
    if(!isNaN(drillFinal)) {
        datef.setTime(drillFinal);
        let y = datef.toISOString();
        //console.log(y);
        drilling_end_update.value = y.substring(0,21);
        //console.log(drilling_end_update.value);
    } else {
        datef.setTime(0);
    }
    console.log(drilling_end_update.value);

    drilling_contractor_update.value = current_viewed_well["contratista perforacion"];
    rig_name_update.value = current_viewed_well["nombre del taladro"];
    rig_elevation_update.value = current_viewed_well["elevacion del taladro"];
    elevation_ref_update.value = current_viewed_well["referencia de elevacion"];
    ground_elevation_update.value = current_viewed_well["elevacion del terreno"];
    location_update.value = current_viewed_well["locacion en superficie"];

    update_modal_container.style.display = "block";
    window.scroll({
        top: 0,
        left: 0,
        behavior: "smooth",
      });

}

const x_icon_update = document.getElementById("x_icon_update");
x_icon_update.addEventListener("click", hideUpdateModal);

function hideUpdateModal() {
	update_modal_container.style.display = "none";
}

// show / hide Success Add Modal
const update_success_container = document.getElementById("update_success_container");
update_success_container.style.display = "none";

function showUpdateSuccess() {
    update_success_container.style.display = "flex";
}

function hideUpdateSuccess() {
	update_success_container.style.display = "none";
}

/* Update Existing Well */

// Update a document in collection "sanjose"
const send_update_well = document.getElementById("send_update_well");
send_update_well.addEventListener("click", updateExistingWell);

async function updateExistingWell() {
    //console.log(well_name.value);  
    await setDoc(doc(db, "sanjose", well_name_update.value), {
        "nombre del pozo" : well_name_update.value,
        "coordenada superf utm x": Number(utm_x_update.value),
        "coordenada superf utm y": Number(utm_y_update.value),
        "coordenada fondo utm x": Number(utm_x_fondo_update.value),
        "coordenada fondo utm y": Number(utm_y_fondo_update.value),
        "longitud x": Number(long_x_update.value),
        "latitud y": Number(lat_y_update.value),
        "utm projection id": utm_id_update.value,
        "tipo de pozo": well_type_update.value,
        "inicio perforacion": {
            seconds: ((new Date(drilling_init_update.value).getTime())/1000)+1800 // I had to add 30 minutes (1800 second)s because Firebase subastracts half an hour to the date coming from JS
        } ,
        "final perforacion": {
            seconds: ((new Date(drilling_end_update.value).getTime())/1000)+1800 // I had to add 30 minutes (1800 second)s because Firebase subastracts half an hour to the date coming from JS
        } ,
        "contratista perforacion": drilling_contractor_update.value,
        "nombre del taladro": rig_name_update.value,
        "elevacion del taladro": Number(rig_elevation_update.value),
        "referencia de elevacion": elevation_ref_update.value,
        "elevacion del terreno": Number(ground_elevation_update.value),
        "locacion en superficie": location_update.value,
    }); 
    
    hideUpdateModal();
    showUpdateSuccess();

    setTimeout(()=>{
        hideUpdateSuccess();
        window.location.reload();
    }, 2000);
    
}

// Los inputs tendrán como values por defecto los provenientes de current_viewed_well para que el usuario envíe esos mismos si no los modifica.
// No puedo asignarle el valor de la fecha al nuevo input por ser de un tipo raro.

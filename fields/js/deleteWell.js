import { doc, deleteDoc  } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js";
import { db } from "../../src/firebase.js";


import { current_viewed_well, current_field } from "./fields.js";

// show / hide Delete Modal
const delete_modal_container = document.getElementById("delete_modal_container");

const delete_well_btn = document.getElementById("delete_well_btn");
delete_well_btn.addEventListener("click", showDeleteModal);

const delete_confirmation__paragraph = document.getElementById("delete_confirmation__paragraph");

function showDeleteModal() {
    if(!current_viewed_well["nombre del pozo"]) {
        alert("Antes debe visualizar un pozo específico.");
        return;
    }

    delete_confirmation__paragraph.innerHTML = `Si desea eliminar definitivamente el pozo <b>${current_viewed_well["nombre del pozo"]}</b>, por favor ingrese la clave secreta y haga clic en el botón "Confirmar".`;

    delete_modal_container.style.display = "block";
}

const x_icon_delete = document.getElementById("x_icon_delete");
x_icon_delete.addEventListener("click", hideDeleteModal);

const cancel_delete_well = document.getElementById("cancel_delete_well");
cancel_delete_well.addEventListener("click", hideDeleteModal);

function hideDeleteModal() {
	delete_modal_container.style.display = "none";
}

// show / hide Success Delete Modal
const delete_success_container = document.getElementById("delete_success_container");

function showDeleteSuccess() {
    delete_success_container.style.display = "flex";
}

function hideDeleteSuccess() {
	delete_success_container.style.display = "none";
}

/* Delete Existing Well */

// Delete a document in the collection (field)

// Confirm button
const send_delete_well = document.getElementById("send_delete_well");
send_delete_well.addEventListener("click", deleteExistingWell);

// Secret password input
const delete_password = document.getElementById("delete_password");

async function deleteExistingWell() {
    // If not the correct password, dont delete the well
    if(delete_password.value !== "123") {
        alert("Clave secreta inválida.");
        return;
    }

    await deleteDoc(doc(db, current_field, current_viewed_well["nombre del pozo"]));

    // Clean de info paragraph because the information of the old well was still visible
    info_paragraph.innerText = "";

    hideDeleteModal();
    showDeleteSuccess();

    setTimeout(()=>{
        hideDeleteSuccess();
    }, 2000);
}
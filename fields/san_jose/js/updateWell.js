import { doc, setDoc } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js";
import { db } from "../../../src/index.js";

import { well_names_array, current_viewed_well } from "./san_jose.js";

// El código será muy parecido al addWell.js
// Debo agregar en el html el modal de actualización y acceder aquí a todos sus inputs
// Los inputs tendrán como values por defecto los provenientes de current_viewed_well para que el usuario envíe esos mismos si no los modifica.
// El input del nombre del pozo tiene que estar inhabilitado para que el usiario no pueda cambiarlo.
// Usaré setDoc para publicar los cambios hacia la db
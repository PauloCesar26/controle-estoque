import { loadingOverlay } from "./loadingOverlay.js";
import { db } from "../../app.js";
import { ref, remove } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";

export async function cleanDB(){
    loadingOverlay.show();

    try{
        await remove(ref(db, "massa"));
        await remove(ref(db, "recheio"));
        await remove(ref(db, "bebida"));
        
        alert("Dados apagados");
        loadingOverlay.hide();
    }
    catch(error){
        alert(`Erro! ${error.message}`);
        loadingOverlay.hide();
    }
};
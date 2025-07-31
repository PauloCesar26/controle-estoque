import { loadingOverlay } from "../../components/loadingOverlay.mjs";
import { db } from "../../../app.mjs";
import { ref, remove } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";

export async function cleanDB(){
    loadingOverlay.show();

    try{
        await remove(ref(db, "massa"));
        await remove(ref(db, "recheio"));
        await remove(ref(db, "bebida"));
        await remove(ref(db, "dbCurrentRecheio"));
        
        alert("Dados apagados");
        loadingOverlay.hide();
    }
    catch(error){
        alert(`Erro! ${error.message}`);
        loadingOverlay.hide();
    }
};
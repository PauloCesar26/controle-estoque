import { ref, remove } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";
import Toastify from "https://cdn.jsdelivr.net/npm/toastify-js/src/toastify-es.js";
import { loadingOverlay } from "../../components/loadingOverlay.mjs";
import { db } from "../../../app.mjs";

export async function cleanDB(){
    loadingOverlay.show();

    try{
        await remove(ref(db, "massa"));
        await remove(ref(db, "recheio"));
        await remove(ref(db, "bebida"));
        await remove(ref(db, "dbCurrentRecheio"));
        await remove(ref(db, "dbCurrentMassa"));
        
        Toastify({
            text: "✅Produtos apagados do banco de dados!",
            duration: 2700,
            gravity: "bottom", 
            position: "right", 
            stopOnFocus: true, 
            style: {
                background: "rgb(10, 92, 139)",
                color: "white",
                borderRadius: "10px",
                fontWeight: "bold"
            },
        }).showToast();
        loadingOverlay.hide();
    }
    catch(error){
        Toastify(error)({
            text: `❌Erro ao apagar do banco de dados: ${error.message}`,
            duration: 2500,
            gravity: "bottom", 
            position: "right", 
            stopOnFocus: true, 
            style: {
                background: "rgb(192, 31, 31)",
                color: "white",
                borderRadius: "10px",
                fontWeight: "bold"
            },
        }).showToast();
        loadingOverlay.hide();
    }
};
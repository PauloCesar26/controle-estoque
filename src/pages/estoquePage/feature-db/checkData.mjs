import { ref, get } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";
import Toastify from "https://cdn.jsdelivr.net/npm/toastify-js/src/toastify-es.js";
import { updateUI } from "../feature-estoque/updateUI.mjs";
import { db } from "../../../app.mjs";

export async function checkData(){
    const massaRef = ref(db, "massa");
    const recheioRef = ref(db, "recheio");
    const bebidaRef = ref(db, "bebida");

    try{
        const [massaSnap, recheioSnap, bebidaSnap] = await Promise.all([
            get(massaRef),
            get(recheioRef),
            get(bebidaRef)
        ]);

        const hasData = massaSnap.exists() || recheioSnap.exists() || bebidaSnap.exists();

        if(hasData){
            updateUI();
        } 
        else{
            Toastify({
                text: "Não contém produto no banco de dados!",
                duration: 2500,
                gravity: "bottom", 
                position: "right", 
                stopOnFocus: true, 
                style: {
                    background: "rgb(0, 0, 0)",
                    color: "white",
                    borderRadius: "10px",
                    fontWeight: "bold"
                },
            }).showToast();
        }
    } 
    catch(error){
        Toastify({
            text: `Erro ao buscar produtos no banco de dados! ${error}`,
            duration: 2500,
            gravity: "bottom", 
            position: "right", 
            stopOnFocus: true, 
            style: {
                background: "rgb(0, 0, 0)",
                color: "white",
                borderRadius: "10px",
                fontWeight: "bold"
            },
        }).showToast();
    }
}


import { ref, get } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";
import Toastify from "../../components/toastify-js/node_modules/toastify-js/src/toastify-es.js";
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
            console.log("Nenhum dado encontrado no Firebase");
            Toastify({
                text: "Não contém produto no banco de dados!",
                duration: 2500,
                gravity: "bottom", 
                position: "right", 
                stopOnFocus: true, 
                style: {
                    background: "#f1b15c",
                    color: "black",
                    borderRadius: "10px",
                    fontWeight: "bold"
                },
            }).showToast();
        }
    } 
    catch(error){
        console.error("Erro ao buscar dados do Firebase:", error);
        Toastify({
            text: "Erro ao buscar produtos no banco de dados!",
            duration: 2500,
            gravity: "bottom", 
            position: "right", 
            stopOnFocus: true, 
            style: {
                background: "#f1b15c",
                color: "black",
                borderRadius: "10px",
                fontWeight: "bold"
            },
        }).showToast();
    }
}


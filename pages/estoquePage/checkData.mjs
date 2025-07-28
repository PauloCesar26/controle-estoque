import { ref, get } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";
import { updateUI } from "./updateUI.mjs";
import { db } from "../../app.mjs";

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
        }
    } 
    catch(error){
        console.error("Erro ao buscar dados do Firebase:", error);
    }
}


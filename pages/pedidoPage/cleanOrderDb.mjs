import { loadingOverlay } from "../estoquePage/loadingOverlay.mjs";
import { db } from "../../app.mjs";
import { ref, remove } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";

export async function cleanOrderDb(){
    const order = document.getElementById("exibir-order");
    loadingOverlay.show();
    
    const dbRef = ref(db, "orders");
    remove(dbRef)

    try{
        alert("Todos os pedidos removidos");
        order.innerHTML = "";
    }
    catch(error){
        console.error("Erro ao apagar pedidos: ", error);
        alert("Erro ao apagar pedidos.");
    }
    finally{
        loadingOverlay.hide();
    }
}
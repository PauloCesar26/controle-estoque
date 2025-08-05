import { ref, remove } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";
import Toastify from "https://cdn.jsdelivr.net/npm/toastify-js/src/toastify-es.js";
import { loadingOverlay } from "../../components/loadingOverlay.mjs";
import { db } from "../../../app.mjs";

export async function cleanOrderDb(){
    const order = document.getElementById("exibir-order");
    
    const dbRef = ref(db, "orders");
    remove(dbRef)
    
    try{
        loadingOverlay.show();
        Toastify({
            text: "✅Todos os pedidos apagados!",
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
        order.innerHTML = "";
    }
    catch(error){
        console.error("Erro ao apagar pedidos: ", error);
        Toastify(error)({
            text: `❌Erro ao apagar os pedidos: ${error.message}`,
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
    finally{
        loadingOverlay.hide();
    }
}
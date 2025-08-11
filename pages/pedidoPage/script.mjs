import Toastify from "https://cdn.jsdelivr.net/npm/toastify-js/src/toastify-es.js";
import { ref, onValue, push, set } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";
import { db } from "../../app.mjs";
import { cleanOrderDb } from "./feature-db/cleanOrderDb.mjs";
import { handleSelect } from "./feature-display/handleSelect.mjs";
import { renderOrders } from "./feature-display/renderOrders.mjs";

export function pedido(){
    const form = document.getElementById("form");
    const btnClean = document.getElementById("limpar");
    const name = document.getElementById("name");
    const massa1 = document.querySelector(".name-massa1");
    const recheio1 = document.querySelector(".name-recheio1");
    const massa2 = document.querySelector(".name-massa2");
    const recheio2 = document.querySelector(".name-recheio2");

    const currentDate = document.getElementById("current-date");
    const date = new Date(); 
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const formattedDate = `${day}/${month}/${year}`;
    currentDate.textContent = formattedDate;

    const closeModal = document.querySelector("#close-modal");
    const modal = document.querySelector("#modal");
    const fade = document.querySelector("#fade");
    const modalMessage = document.querySelector("#modal-message");

    const toggleModal = () => {
        [modal, fade].forEach((el) => el.classList.toggle("hide"));
    };
    const showModal = (message) => {
        modalMessage.textContent = message;
        toggleModal();
    };
    closeModal.addEventListener("click", () => {
        toggleModal();
    });
    
    // let numOrder = 0;
    // const dbOrder = ref(db, "orders");
    // onValue(dbOrder, (snapshot) => {
    //     const data = snapshot.val();

    //     if(data){
    //         const totalPedidos = Object.keys(data).length;
    //         numOrder = totalPedidos + 1;
    //     } 
    //     else{
    //         numOrder = 0;
    //     }
    // });

    if(form){
        handleSelect();
        form.addEventListener("submit", (e) => {
            e.preventDefault();
            
            const nomeDigitado = name.value.trim();
            const massa1Pedido = massa1.value;
            const recheio1Pedido = recheio1.value;
            const massa2Pedido = massa2.value;
            const recheio2Pedido = recheio2.value;
            
            if(nomeDigitado === ""){
                showModal("Preencha o nome do cliente.");
                return;
            }
            if(massa1Pedido === ""){
                showModal("Escolha a massa 1.");
                return;
            }
            if(recheio1Pedido === ""){
                showModal("Escolha o recheio 1.");
                return;
            }
            if(massa2Pedido === ""){
                showModal("Escolha a massa 2.")
                return;
            }
            if(recheio2Pedido === ""){
                showModal("Escolha o recheio 2.")
                return;
            }
            
            const order = {
                // numOrder: numOrder,
                name: nomeDigitado,
                massa1: massa1Pedido,
                recheio1: recheio1Pedido,
                massa2: massa2Pedido,
                recheio2: recheio2Pedido,
                status: false,
            };
            
            const dbOrder = ref(db, "orders");
            const newRefOrder = push(dbOrder);
            set(newRefOrder, order);
            form.reset();
        });
        
        btnClean.addEventListener("click", () => {
            cleanOrderDb();
        });
    }

    onValue(ref(db, "orders"), (snapshot) => {
        renderOrders(snapshot);
    });

    onValue(ref(db, "orders"), (snapshot) => {
        const data = snapshot.val();
        const displayQtdOrders = document.getElementById("qtd-pedido-panel");
        const displayQtdOrdersPreparing = document.getElementById("qtd-pedido-preparing");
        let currentQtdOrders = 0;
        let currentQtdOrdersPreparing = 0;

        if(!data){ 
            displayQtdOrders.textContent = "0";
            displayQtdOrdersPreparing.textContent = "0";
            Toastify({
                text: "Nenhum pedido feito!",
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
            return; 
        }

        Object.values(data).forEach(el => {
            if(el){
                currentQtdOrders++;
            }
            if(el.status === false){
                currentQtdOrdersPreparing++;
            }
        });
        
        displayQtdOrders.textContent = `${currentQtdOrders}`;
        displayQtdOrdersPreparing.textContent = `${currentQtdOrdersPreparing}`;
    });
}
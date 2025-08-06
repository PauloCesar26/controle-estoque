import { ref, onValue } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";
import { renderOrders } from "../pedidoPage/feature-display/renderOrders.mjs";
import { db } from "../../app.mjs";

export function ordersPanel(){
    onValue(ref(db, "orders"), (snapshot) => {
        renderOrders(snapshot);
    });
}
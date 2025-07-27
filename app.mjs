import { estoque } from "./pages/estoquePage/script.mjs";
import { pedido } from "./pages/pedidoPage/script.mjs";
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyA3Aq8P2zuahFMSpCMBqxT-8N8U0Doixk4",
    authDomain: "controle-estoque-jd.firebaseapp.com",
    projectId: "controle-estoque-jd",
    storageBucket: "controle-estoque-jd.firebasestorage.app",
    messagingSenderId: "823622488465",
    appId: "1:823622488465:web:986fc037f9db5a4a8e0a30",
    databaseURL: "https://controle-estoque-jd-default-rtdb.firebaseio.com"
};

const appFirebase = initializeApp(firebaseConfig);
export const db = getDatabase(appFirebase);

const app = document.getElementById("app");
const links = document.querySelectorAll("a[data-link]");
const buttons = document.querySelectorAll(".button");
const menu = document.getElementById("menu");
const buttonMenu = document.querySelector(".button-menu");
const iconOpen = document.getElementById("icon-open");
const iconClose = document.getElementById("icon-close");

const routes = {
    "": "/pages/index.html",
    "/": "/pages/index.html",
    "/estoque": "/pages/estoquePage/index.html",
    "/pedido": "/pages/pedidoPage/index.html",
};
 
const render = async (path) => {
    const route = routes[path] || "/pages/index.html";

    try{
        const req = await fetch(route);
        if(!req.ok){
            app.innerHTML = `<h1>Erro ${req.status}</h1>`;
        }
        const res = await req.text();
        app.innerHTML = res;
        logicPage(path);
    }
    catch (error){
        console.error("Erro: ", error);
        app.innerHTML = "<h1>Erro ao carregar a página</h1>";
    }

};
const navigate = (e) => {
    e.preventDefault();
    const path = e.target.getAttribute("href");
    history.pushState({}, "", path);
    render(path);
};

const logicPage = (path) => {
    if(path === "/estoque"){
        estoque();
    } 
    if(path === "/pedido"){
        pedido();
    }
};

window.onpopstate = () => {
    render(location.pathname);   
};

document.addEventListener("DOMContentLoaded", () => {
    if(location.pathname === "/page1" || location.pathname === "/page2"){
        history.replaceState({}, "", "/");
        render("/");
        return;
    }

    links.forEach(link => {
        link.addEventListener("click", navigate);
    });
    render(location.pathname);
});

buttons.forEach((a) => {
    a.addEventListener("click", () => {
        buttons.forEach((links) => {
            links.classList.remove("active");
        })

        a.classList.add("active");
        buttonMenu.classList.toggle("hidden");
        iconOpen.classList.toggle("hidden");
        iconClose.classList.toggle("hidden");
    });
});
menu.addEventListener("click", () => {
    buttonMenu.classList.toggle("hidden");
    iconOpen.classList.toggle("hidden");
    iconClose.classList.toggle("hidden");
});
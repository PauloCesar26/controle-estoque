export function loadCurrentEstoque(){
    const displayCurrentMassa = document.getElementById("display-current-massa");
    const displayCurrentRecheio = document.getElementById("display-current-recheio");

    const currentEstoqueMassas = JSON.parse(localStorage.getItem("currentEstoqueMassas")) || [];
    const currentEstoqueRecheios = JSON.parse(localStorage.getItem("currentEstoqueRecheios")) || [];

    displayCurrentMassa.innerHTML = "";
    currentEstoqueMassas.forEach(massa => {
        displayCurrentMassa.innerHTML += 
        `
            <p class="border-b-1 pl-2">${massa.massa || "Nenhuma massa no estoque."}</p>
            <p class="border-b-1">${massa.quantidade || ""}</p>
        `;
    });

    displayCurrentRecheio.innerHTML = "";
    currentEstoqueRecheios.forEach(recheio => {
        displayCurrentRecheio.innerHTML += 
        `
            <p class="border-b-1 pl-2">${recheio.recheio || "Nenhuma recheio no estoque."}</p>
            <p class="border-b-1">${recheio.quantidade || ""}</p>
        `;
    });
};
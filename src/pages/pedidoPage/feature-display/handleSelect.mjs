import { db } from "../../../app.mjs";
import { ref, onValue } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";

export function handleSelect(){
    const dbMassa = ref(db, "dbCurrentMassa");
    const dbRecheio = ref(db, "dbCurrentRecheio");
    const selectMassa1 = document.querySelector(".name-massa1");
    const selectRecheio1 = document.querySelector(".name-recheio1");
    const selectMassa2 = document.querySelector(".name-massa2");
    const selectRecheio2 = document.querySelector(".name-recheio2");

    const queryDatabaseCurrentProducts = (
        databaseRef, 
        selectElement,
        dataKey,
        itemLabelKey
    ) => {
        onValue(databaseRef, (snapshot) => {
            const data = snapshot.val();
            selectElement.innerHTML = `<option value="">Selecione...</option>`;
            
            if(!data || !Array.isArray(data[dataKey])){
                selectElement.innerHTML = `
                    <option value="">Selecione...</option>
                    <option disabled>Nenhum produto</option>
                `;
                return;
            }
        
            data[dataKey].forEach(item => {
                if(item.quantidade > 0){
                    const option = document.createElement("option");
                    option.value = item[itemLabelKey];
                    option.textContent = item[itemLabelKey];
                    selectElement.appendChild(option);
                }
            });
        })
    };

    queryDatabaseCurrentProducts(
        dbMassa,
        selectMassa1,
        "currentMassaEstoque",
        "massa"
    );

    queryDatabaseCurrentProducts(
        dbRecheio,
        selectRecheio1,
        "currentRecheioEstoque",
        "recheio"
    );

    queryDatabaseCurrentProducts(
        dbMassa,
        selectMassa2,
        "currentMassaEstoque",
        "massa"
    );

    queryDatabaseCurrentProducts(
        dbRecheio,
        selectRecheio2,
        "currentRecheioEstoque",
        "recheio"
    );
}
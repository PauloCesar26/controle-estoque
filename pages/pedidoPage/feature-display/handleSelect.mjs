import { db } from "../../../app.mjs";
import { ref, onValue } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";

export function handleSelect(){
    const dbMassa = ref(db, "massa");
    const dbRecheio = ref(db, "recheio");
    const selectMassa1 = document.querySelector(".name-massa1");
    const selectRecheio1 = document.querySelector(".name-recheio1");
    const selectMassa2 = document.querySelector(".name-massa2");
    const selectRecheio2 = document.querySelector(".name-recheio2");
    
    onValue(dbMassa, (snapshot) => {
        const data = snapshot.val();
        selectMassa1.innerHTML = `<option value="">Selecione...</option>`;
        
        if(!data){
            selectMassa1.innerHTML = `
                <option value="">Selecione...</option>
                <option disabled>Nenhuma massa</option>
            `;
            return;
        }
    
        Object.values(data).forEach(obj => {
            if(obj.listMassas && Array.isArray(obj.listMassas)){
                obj.listMassas.forEach(item => {
                    const option = document.createElement("option");
                    option.value = item.massa;
                    option.textContent = item.massa;
                    selectMassa1.appendChild(option);
                });
            }
        });
    })

    onValue(dbRecheio, (snapshot) => {
        const data = snapshot.val();
        selectRecheio1.innerHTML = `<option value="">Selecione...</option>`;
        
        if(!data){
            selectRecheio1.innerHTML = `
                <option value="">Selecione...</option>
                <option disabled>Nenhum recheio</option>
            `;
            return;
        }
    
        Object.values(data).forEach(obj => {
            if(obj.listRecheios && Array.isArray(obj.listRecheios)){
                obj.listRecheios.forEach(item => {
                    const option = document.createElement("option");
                    option.value = item.recheio;
                    option.textContent = item.recheio;
                    selectRecheio1.appendChild(option);
                });
            }
        });
    })

    onValue(dbMassa, (snapshot) => {
        const data = snapshot.val();
        selectMassa2.innerHTML = `<option value="">Selecione...</option>`;
        
        if(!data){
            selectMassa2.innerHTML = `
                <option value="">Selecione...</option>
                <option disabled>Nenhuma massa</option>
            `;
            return;
        }
    
        Object.values(data).forEach(obj => {
            if(obj.listMassas && Array.isArray(obj.listMassas)){
                obj.listMassas.forEach(item => {
                    const option = document.createElement("option");
                    option.value = item.massa;
                    option.textContent = item.massa;
                    selectMassa2.appendChild(option);
                });
            }
        });
    })

    onValue(dbRecheio, (snapshot) => {
        const data = snapshot.val();
        selectRecheio2.innerHTML = `<option value="">Selecione...</option>`;
        
        if(!data){
            selectRecheio2.innerHTML = `
                <option value="">Selecione...</option>
                <option disabled>Nenhum recheio</option>
            `;
            return;
        }
    
        Object.values(data).forEach(obj => {
            if(obj.listRecheios && Array.isArray(obj.listRecheios)){
                obj.listRecheios.forEach(item => {
                    const option = document.createElement("option");
                    option.value = item.recheio;
                    option.textContent = item.recheio;
                    selectRecheio2.appendChild(option);
                });
            }
        });
    })
}

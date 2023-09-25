if(document.readyState !== "loading"){
    console.log("Document ready");
    initializeCode();
} else{
    document.addEventListener("DOMContentLoaded", function(){
        console.log("DOMContentLoaded event fired");
        initializeCode();
    })
}

async function initializeCode(){
    
    const url1 =  "https://statfin.stat.fi/PxWeb/sq/4e244893-7761-4c4f-8e55-7a8d41d86eff"
    const url2 = "https://statfin.stat.fi/PxWeb/sq/5e288b40-f8c8-4f1e-b3b0-61b86ce5c065"
    const userPromise1 = await fetch(url1);
    const userPromise2 = await fetch(url2);
    const userJSON1 = await userPromise1.json();
    const userJSON2 = await userPromise2.json();
    console.log(userJSON1);
    console.log(userJSON2);

    let municipality = userJSON1.dataset.dimension.Alue.category.label;
    const municipalityNames = Object.values(municipality);
    let population = userJSON1.dataset.value;
    let employmentAmount = userJSON2.dataset.value;

    console.log(municipality);
    console.log(population);
    console.log(employmentAmount);

    const table = document.getElementById("output_table");     
    
    for (let i = 0; i < population.length; i++) {
        let tr = document.createElement("tr");
        let td0 = document.createElement("td");
        let td1 = document.createElement("td");
        let td2 = document.createElement("td");
        let td3 = document.createElement("td");

        let employmentPercentage = employmentAmount[i] / population[i] * 100;
        employmentPercentage = employmentPercentage.toFixed(2);


        td0.innerText = municipalityNames[i];
        td1.innerText = population[i];
        td2.innerText = employmentAmount[i];
        td3.innerText = employmentPercentage + "%";
        tr.appendChild(td0);
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        table.appendChild(tr);

        if(employmentPercentage > 45){
            tr.style.backgroundColor = "#abffbd";
        }
        else if (employmentPercentage < 25) {
            tr.style.backgroundColor = "#ff9e9e"
        }
}

}
let pokemons = [];
let pag = (window.location.pathname.split("/"))[1];
//const respesquisa = ((window.location.search).split("="))[1];
//document.querySelector("#pesquisa").value = respesquisa;

window.addEventListener("load", getPokemons);

async function getPokemons() {

    let url = "https://pokeapi.co/api/v2/pokemon?limit=251&offset=0";
    fetch(url).then((json) => {

        return json.json();
    }).then((pokemon) => {

        for(let i=0; i < pokemon["results"].length; i++) {

            let url = `https://pokeapi.co/api/v2/pokemon/${pokemon["results"][i]["name"]}`;
            fetch(url).then((response) => {

                return response.json();
            }).then((pokemon) => {

                pokemons.push(pokemon);
                montacard(pokemons[pokemons.length - 1]);
            })
        }
    })
}

//console.log(pokemons);

function montacard(pokemon) {

    const cardOriginal = document.querySelector("#original");

    let nome = pokemon["name"];
    let id = pokemon["id"];
    
    let clone = cardOriginal.cloneNode(true);
    clone.id = `card${id}`;

    console.log(pag);

    if(pag == "index.html") {

        document.querySelector(".container").appendChild(clone);
        setAtributes(pokemon);
    } else {

        let respesquisa = (input.value).toLowerCase();

        if(id == respesquisa || nome.match(respesquisa)) {

            document.querySelector(".container").appendChild(clone);
            setAtributes(pokemon);
        } else {
    
            console.log("erro");
        }
    }
}

function setAtributes(pokemon) {

    let card_id = "#"+document.querySelector(`#card${pokemon["id"]}`).id;
    //Set imagem
    document.querySelector(`${card_id} .frente > .imagens-pokemons`).src = pokemon["sprites"]["front_default"];
    
    //set status
    //vida
    let docvida = document.querySelector(`${card_id} .barra-vida .status`);
    let spanvida = document.querySelector(`${card_id} .barra-vida .qtd-status`);
    let vida = pokemon["stats"][0]["base_stat"];
    docvida.style.width = vida+"%";
    if(vida > 100) {
        docvida.style.width = "100%";
    }
    spanvida.innerHTML = vida;

    //ataque
    let docataque = document.querySelector(`${card_id} .barra-ataque .status`);
    let spanataque = document.querySelector(`${card_id} .barra-ataque .qtd-status`);
    let ataque = pokemon["stats"][1]["base_stat"];
    docataque.style.width = ataque+"%";
    if(ataque > 100) {
        docataque.style.width = "100%";
    }
    spanataque.innerHTML = ataque;

    //defesa
    let docdefesa = document.querySelector(`${card_id} .barra-defesa .status`);
    let spandefesa = document.querySelector(`${card_id} .barra-defesa .qtd-status`);
    let defesa = pokemon["stats"][2]["base_stat"];
    docdefesa.style.width = defesa+"%";
    if(defesa > 100) {
        docdefesa.style.width = "100%";
    }
    spandefesa.innerHTML = defesa;

    //velocidade
    let docvelocidade = document.querySelector(`${card_id} .barra-velocidade .status`);
    let spanvelocidade = document.querySelector(`${card_id} .barra-velocidade .qtd-status`);
    let velocidade = pokemon["stats"][5]["base_stat"];
    docvelocidade.style.width = velocidade+"%";
    if(velocidade > 100) {
        docvelocidade.style.width = "100%";
    }
    spanvelocidade.innerHTML = velocidade;

    //set N° e nome
    let idAux = pokemon["id"];
    if(pokemon["id"] < 10) idAux = "00"+pokemon["id"];
    if(pokemon["id"] > 9 && pokemon["id"] < 100) idAux = "0"+pokemon["id"];
    document.querySelector(`${card_id} .numero-pokemon`).innerHTML = idAux;
    document.querySelector(`${card_id} .nome-pokemon`).innerHTML = pokemon["name"];

    //set tipos
    for(let i=0; i < pokemon["types"].length; i++) {

        let p = document.createElement("p");
        p.classList.add("tipo", pokemon["types"][i]["type"]["name"]);
        document.querySelector(`${card_id} .container-tipo`).appendChild(p);
    }
}

//sugestoes de pesquisa
let input = document.querySelector("#pesquisa");
let datalist = document.querySelector("#lista");

input.addEventListener("keyup", function(event) {

    datalist.style.display = "block";
    datalist.innerHTML = "";

    let palavra;

    if(input.value == "") {

        datalist.style.display = "none";
    } else {
        palavra = `${input.value}`; 
    }

    palavra = palavra.toLowerCase();
    
    let contador = 0;

    for(let i=0; i < pokemons.length; i++) {
    
        if(contador < 4) {
    
            if((pokemons[i]['name'].match(palavra)) || ((pokemons[i]["id"].toString()).match(palavra))) {
    
                let option = document.createElement("option");
                option.innerHTML = pokemons[i]["name"];
                option.classList.add("option");
    
                datalist.appendChild(option);
                (datalist.lastChild).addEventListener("mousedown",function() {
                    input.value = pokemons[i]["name"];
                });
    
                contador++;
            }
        } else {
            break;
        }
    }

    let opt = document.querySelectorAll(".option");

    /*if(event.key == "ArrowDown") {

        opt[countBaixo].classList.add("inner");

        if(opt.length == 1) opt[0].classList.add("inner");

        countCima = countBaixo-1;
        countBaixo++;
        if(countBaixo >= opt.length) {
            countBaixo=0;
        }


    }

    if(event.key == "ArrowUp") {

        opt[countCima].classList.add("inner");

        if(opt.length == 1) opt[0].classList.add("inner");

        countBaixo = countCima+1;
        countCima--;
        if(countCima < 0) {
            countCima= opt.length-1;
        }

    }*/

    if(datalist.lastChild == null) {
        
        let option = document.createElement("option");
        option.innerHTML = "Mals, nada encontrado :(";
        option.classList.add("option");

        datalist.appendChild(option);
    }
    
})

input.addEventListener("blur", () => {

    if(datalist.style.display != "none") {
        setTimeout(() => {
            datalist.style.display = "none";
        }, 300);
    }
})

//clique no botão pesquisa
document.querySelector("#btnpesquisa").addEventListener("click", pesquisa);
document.querySelector("#pesquisa").addEventListener("focus", () => {

    this.addEventListener("keyup", (event) => {

        if(event.key == "Enter") {
            pesquisa();
            datalist.style.display = "none";
        }
    })
})


function pesquisa() {

    let pesquisa = input.value.toLowerCase();
    let pokeAux =  [];

    if(pesquisa != "") {

        for(let nome of pokemons) {
            if((nome["name"].match(pesquisa) || (nome["id"] == pesquisa))) {
                pokeAux.push(nome);
            }
        }

        if(pokeAux.length == 0) {

            /*let opt = document.createElement("option");
            opt.innerHTML = "Mals, nada encontrado :(";
            datalist.appendChild(opt);*/
            datalist.style.display = "block";
            setTimeout(() => {
                datalist.style.display = "none";
            }, 1500);
            
        } else {

            document.querySelector(".container").innerHTML = "";

            for(let pokemon of pokeAux) {
        
                montacard(pokemon);
                //console.log(pokemon["name"]);
            }
        }

    }
    
}

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {scrollFunction()};

function scrollFunction() {

    // Get the button:
    let btn = document.getElementById("btntop");

    if (document.body.scrollTop > 2500 || document. documentElement.scrollTop > 2500) {
        btn.style.display = "block";
    } else {
        btn.style.display = "none";
    }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {

    let scroll = document.documentElement.offsetHeight;
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    
}
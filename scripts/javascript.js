
window.addEventListener("load", montacard);

const elementoOriginal = document.getElementById("original");
const pokemons = [];
const idPokemons = [];

let url = "https://pokeapi.co/api/v2/pokemon?limit=251&offset=0";
    
fetch(url).then((pokejson) => {

    return pokejson.json();
}).then((dadosPokemon) => {

    let tamanhoPesquisa = dadosPokemon["results"].length;

    for(let i = 0; i < tamanhoPesquisa; i++) {

        pokemons.push(dadosPokemon["results"][i]["name"]);
        idPokemons.push(i+1);
    }

})

function montacard() {

    let urlTodos = "https://pokeapi.co/api/v2/pokemon?limit=252&offset=0";
    fetch(urlTodos).then(function (response) {

        return response.json();
    }).then((data) => {

        //percorre o array em busca dos pokemons
        for(let j=0; j <= data["results"].length; j++) {

            let pokemon = data["results"][j]["url"];

            fetch(pokemon).then((retornaPokemon) => {

                return retornaPokemon.json();
            }).then((dadosPokemon) => {

                let elementoClone = elementoOriginal.cloneNode(true);
                // inserindo o elemento na paǵina
                document.querySelector(".container").appendChild(elementoClone);

                document.querySelector(".container").lastChild.id = dadosPokemon["id"];

                let idPokemon = dadosPokemon["id"];
                /*elementoClone.id = "card"+idPokemon;*/

                document.querySelector(".container").lastChild.id = `card${idPokemon}`;

                document.querySelector("#card"+idPokemon).dataset.id = idPokemon;

                if(idPokemon < 100 && idPokemon >= 10) {
                    
                    idPokemon = "0"+idPokemon;
                } else {

                    if(idPokemon < 10) {

                        idPokemon = "00"+idPokemon;
                    }
                }

                document.querySelector("#card"+idPokemon+", .imagens-pokemons").src = dadosPokemon["sprites"]["front_default"];

                document.querySelector("#card"+idPokemon+", .numero-pokemon").innerHTML = "N° "+idPokemon;

                document.querySelector("#card"+idPokemon+", .nome-pokemon").innerHTML = dadosPokemon["name"];

                let tamanho = parseInt(dadosPokemon["types"].length);

                document.querySelector("#card"+dadosPokemon["id"]+", .container-tipo").innerHTML = "";

                for(let x = 0; x < tamanho; x++) {

                    let paragrafo = document.createElement("p");

                    paragrafo.classList.add("tipo", dadosPokemon["types"][x]["type"]["name"]);

                    document.querySelector("#card"+dadosPokemon["id"]+", .container-tipo").appendChild(paragrafo);

                }

                //DEFINIR STATUS

                //VIDA
                let docvida = document.querySelector(`#card${dadosPokemon["id"]}, .barra-status > .vida`);
                let spanvida = document.querySelector(`#card${dadosPokemon["id"]}, .barra-vida > .qtd-status`);
                
                let vida = dadosPokemon["stats"][0]["base_stat"];

                docvida.style.width = vida+"%";
                if(vida > 100) {
                    
                    docvida.style.width = "100%";
                }
                spanvida.innerHTML = vida;

                //ATAQUE
                let docataque = document.querySelector(`#card${dadosPokemon["id"]}, .barra-status > .ataque`);
                let spanataque = document.querySelector(`#card${dadosPokemon["id"]}, .barra-ataque > .qtd-status`);
              
                let ataque = dadosPokemon["stats"][1]["base_stat"];

                docataque.style.width = ataque+"%";
                if(ataque > 100) {
                    
                    docataque.style.width = "100%";
                }
                spanataque.innerHTML = ataque;

                //DEFESA
                let docdefesa = document.querySelector(`#card${dadosPokemon["id"]}, .barra-status > .defesa`);
                let spandefesa = document.querySelector(`#card${dadosPokemon["id"]}, .barra-defesa > .qtd-status`);
              
                let defesa = dadosPokemon["stats"][2]["base_stat"];

                docdefesa.style.width = defesa+"%";
                if(defesa > 100) {
                    
                    docdefesa.style.width = "100%";
                }
                spandefesa.innerHTML = defesa;

                //VELOCIDADE
                let docvelocidade = document.querySelector(`#card${dadosPokemon["id"]}, .barra-status > .velocidade`);
                let spanvelocidade = document.querySelector(`#card${dadosPokemon["id"]}, .barra-velocidade > .qtd-status`);
                
                let velocidade = dadosPokemon["stats"][5]["base_stat"];

                docvelocidade.style.width = velocidade+"%";
                if(velocidade > 100) {
                    
                    docvelocidade.style.width = "100%";
                }

                if(velocidade < 20) {

                    spanvelocidade.style.set
                }
                spanvelocidade.innerHTML = velocidade;

                //Fim da definição de STATUS

                //dataList(dadosPokemon);
            
                
            })
            
        }

    })

    
}

// Get the button:
let mybutton = document.getElementById("btntop");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 1500 || document.documentElement.scrollTop > 1500) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {

    let scroll = document.documentElement.offsetHeight;
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    
}

//DataList
const datalist = document.querySelector("#lista");
const inputpesquisa = document.querySelector("#pesquisa");
const btnpesquisa = document.querySelector("#btnpesquisa");
let countBaixo=0;
let countCima=0;

inputpesquisa.addEventListener("keyup", function(event) {

    datalist.style.display = "block";
    datalist.innerHTML = "";
    btnpesquisa.type = "button";

    console.clear();

    let palavra;

    if(inputpesquisa.value == "") {

        datalist.style.display = "none";
    } else {
        palavra = `${inputpesquisa.value}`; 
    }

    palavra = palavra.toLowerCase();
    
    let contador = 0;

    for(let i=0; i < pokemons.length; i++) {
 
        let doc = document.querySelector(`#card${idPokemons[i]}`);
    
        if(contador <= 4) {
    
            if((pokemons[i].match(palavra)) || ((doc.dataset.id).match(palavra))) {
    
                let option = document.createElement("option");
                option.innerHTML = pokemons[i];
                option.classList.add("option");
    
                datalist.appendChild(option);
                (datalist.lastChild).addEventListener("mousedown",function() {
                    inputpesquisa.value = pokemons[i];
                });
    
                contador++;
            }
        } else {
            break;
        }
    }

    let opt = document.querySelectorAll(".option");

    if(event.key == "ArrowDown") {

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

    }

    console.log(datalist.lastChild);
    if(datalist.lastChild == null) {
        
        let option = document.createElement("option");
        option.innerHTML = "Mals, nada encontrado :(";
        option.classList.add("option");

        datalist.appendChild(option);
    }

    console.log(event.key);
    
})

inputpesquisa.addEventListener("blur", () => {

    datalist.style.display = "none";
})


/*function pesquisa(pokemon, key) {

    if(pokemon.match(key)) {

        console.log(pokemon);
    } else {

        console.log("erro");
    }
}*/

/*function dataList(dadosPokemon) {

    let array = dadosPokemon["name"];
    let option = document.createElement("option");
    option.innerHTML = dadosPokemon["name"];
    option.dataset.id = dadosPokemon["id"];
    option.addEventListener("click", () => {

     pesquisa.value = option.innerHTML;
     datalist.style.display = "none";
    })
    datalist.appendChild(option);

} */
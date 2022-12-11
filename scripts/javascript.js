
window.addEventListener("load", montacard);

const elementoOriginal = document.getElementById("original");

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

                console.log(tamanho);

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

                vida < 50 ? spanvida.style.color = "black" : spanvida.style.color = "white" ;

                docvida.style.width = vida+"%";
                if(vida > 100) docvida.style.width = "100%";
                spanvida.innerHTML = vida;

                //ATAQUE
                let docataque = document.querySelector(`#card${dadosPokemon["id"]}, .barra-status > .ataque`);
                let spanataque = document.querySelector(`#card${dadosPokemon["id"]}, .container-status > .barra-ataque > .qtd-status`);
                let ataque = dadosPokemon["stats"][1]["base_stat"];

                ataque < 50 ? spanataque.style.color = "black" : spanataque.style.color = "white";

                docataque.style.width = ataque+"%";
                if(ataque > 100) docataque.style.width = "100%";
                spanataque.innerHTML = ataque;

                //DEFESA
                let docdefesa = document.querySelector(`#card${dadosPokemon["id"]}, .barra-status > .defesa`);
                let spandefesa = document.querySelector(`#card${dadosPokemon["id"]}, .container-status > .barra-defesa > .qtd-status`);
                let defesa = dadosPokemon["stats"][2]["base_stat"];

                defesa < 50 ? spandefesa.style.color = "black" : spandefesa.style.color = "white";

                docdefesa.style.width = defesa+"%";
                if(defesa > 100) docdefesa.style.width = "100%";
                spandefesa.innerHTML = defesa;

                //VELOCIDADE
                let docvelocidade = document.querySelector(`#card${dadosPokemon["id"]}, .barra-status > .velocidade`);
                let spanvelocidade = document.querySelector(`#card${dadosPokemon["id"]}, .container-status > .barra-velocidade > .qtd-status`);
                let velocidade = dadosPokemon["stats"][5]["base_stat"];

                velocidade < 50 ? spanvelocidade.style.color = "black" : spanvelocidade.style.color = "white";

                docvelocidade.style.width = velocidade+"%";
                if(velocidade > 100) docvelocidade.style.width = "100%";
                spanvelocidade.innerHTML = velocidade;
            
                
            })
            
        }

    })

    /*constroi os cards
    for(let i=0; i < 9; i++) {

        var elementoClone = elementoOriginal.cloneNode(true);
    
        // inserindo o elemento na paǵina
        document.querySelector(".container").appendChild(elementoClone);
    } */
    
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
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}
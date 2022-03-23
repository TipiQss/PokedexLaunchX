//Pokemon
const pokemonData = document.getElementById("divData");
const pokeInput = document.getElementById("input");;

// Caracteristicas
const pokeName = document.getElementById("namePokemon");
const pokeType = document.getElementById("typePokemon");
const pokeId = document.getElementById("idPokemon");
const pokeHeight = document.getElementById("heightPokemon");
const pokeWeight = document.getElementById("weightPokemon");

// Estadisticas
const PokeHp = document.getElementById("hp");
const PokeAtk = document.getElementById("atk");
const PokeDef = document.getElementById("def");
const PokeSatk = document.getElementById("satk");
const PokeSdef = document.getElementById("sdef");
const PokeSpd = document.getElementById("spd");

// Ataques
const pokeMoves = document.getElementById("moves");


const fetchPokemon = () => {
    let pokeName = input.value.toLowerCase();
    const url = `https://pokeapi.co/api/v2/pokemon/${pokeName}`;

    fetch(url).then((res) => {
        if (res.status != "200") {
            console.log(res);
            let pokeImgE = document.getElementById("imgPokemon");
            pokeImgE.src = "img/pikachutriste.jpeg";
            pokemonData.classList.remove("active");
        }
        else {
            return res.json();
        }
    }).then((data) => {

        if (data.status !== 404 && pokeName !== " ") {
            pokemonData.classList.add("active");
            pokeImage(data);
            pokeData(data);
            movesPokemon(data);
            statsPokemon(data);
        } else {
            let pokeImgE = document.getElementById("imgPokemon");
            pokeImgE.src = "img/pikachutriste.jpeg";
            pokemonData.classList.remove("active");
        }

    }
    );
}



const pokeData = (data) => {

    pokeName.innerText = data.name.toUpperCase();
    pokeType.innerText = "";

    for (let i = 0; data.types.length > i; i++) {
        const type = document.createElement("span");
        type.classList.add("types");
        pokeType.appendChild(type);
        type.innerText = data.types[i].type.name;
    }

    pokeId.innerText = "#" + data.id;
    pokeHeight.innerText = "height: " + data.height;
    pokeWeight.innerText = "weight: " + data.weight;
}

const pokeImage = (data) => {
    let url = data.sprites.other.home.front_default;

    const pokeImg = document.getElementById("imgPokemon");
    pokeImg.src = `${url}`
}



const statsPokemon = (data) => {
    PokeHp.innerText =  data.stats[0].base_stat;
    PokeAtk.innerText = data.stats[1].base_stat;
    PokeDef.innerText = data.stats[2].base_stat;
    PokeSatk.innerText = data.stats[3].base_stat;
    PokeSdef.innerText = data.stats[4].base_stat;
    PokeSpd.innerText = data.stats[5].base_stat;

}


const movesPokemon = (data) => {
    pokeMoves.innerHTML = ""

    for (let i = 0; data.moves.length > i; i++) {
        let ataque = document.createElement("li");
        ataque.innerText = data.moves[i].move.name
        pokeMoves.appendChild(ataque);
    }
}

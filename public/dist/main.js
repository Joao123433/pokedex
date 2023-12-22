var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const statsName = document.querySelectorAll("#name-stat");
const divInside = document.querySelectorAll("#inside");
const valueStats = document.querySelectorAll("#value-stat");
const type = document.querySelector("#type");
const namePokemon = document.querySelector("#name-pokemon");
let styles = [];
const divImage = document.querySelector("#image");
const divStats = document.querySelector("#stats");
const h1Stat = document.querySelector("#h1-stat");
const footer = document.querySelector("#rodape");
function randomPokemon() {
    return Math.round(Math.random() * (151 - 1) + 1);
}
function settingInfoPokemon(pokemon) {
    type.textContent = pokemon.types[0].type.name.toUpperCase();
    let name = pokemon.name;
    name = name[0].toUpperCase() + name.substring(1);
    namePokemon.textContent = name;
    const image = createImg(pokemon.sprites.other["official-artwork"].front_default);
    document.querySelector("#image").append(image);
    document.body.classList.add(pokemon.types[0].type.name);
    styles.push(pokemon.types[0].type.name);
}
function createImg(path) {
    const image = document.createElement("img");
    image.src = path;
    image.id = "img";
    return image;
}
function settingStatsPokemon(pokemon) {
    h1Stat.textContent = "Stats";
    for (let i = 0; i < 6; i++) {
        statsName[i].textContent = pokemon.stats[i].stat.name.replace("-", " ");
        valueStats[i].textContent = pokemon.stats[i]["base_stat"];
        const elementoAtual = divInside[i];
        if (elementoAtual instanceof HTMLElement) {
            elementoAtual.style.width = `${pokemon.stats[i]["base_stat"] / 2}%`;
        }
    }
}
function fetchPokemon(pokemon) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
        if (response.ok) {
            return response.json();
        }
        return Promise.reject("Pokemon não foi achado");
    });
}
function clearInformation() {
    statsName.forEach(element => element.textContent = "");
    divInside.forEach((element) => element.style.width = "100%");
    valueStats.forEach(element => element.textContent = "");
    styles.forEach(style => document.body.classList.remove(style));
    type.textContent = "";
    namePokemon.textContent = "";
    h1Stat.textContent = "";
    if (document.querySelector("#img")) {
        document.querySelector("#img").remove();
    }
}
function TratamentError(err) {
    divImage.classList.add("none");
    divStats.classList.add("none");
    h1Stat.classList.add("none");
    footer.classList.add("none");
    namePokemon.classList.add("error");
    namePokemon.textContent = err;
}
function clearTratamentError() {
    divImage.classList.remove("none");
    divStats.classList.remove("none");
    h1Stat.classList.remove("none");
    footer.classList.remove("none");
    namePokemon.classList.remove("error");
    namePokemon.textContent = "";
}
function setup() {
    return __awaiter(this, void 0, void 0, function* () {
        clearInformation();
        try {
            const pokemon = String(randomPokemon());
            const response = yield fetchPokemon(pokemon);
            clearTratamentError();
            settingInfoPokemon(response);
            settingStatsPokemon(response);
        }
        catch (error) {
            TratamentError(error);
        }
    });
}
function searchPokemon() {
    return __awaiter(this, void 0, void 0, function* () {
        let inputValue = document.querySelector("#value");
        clearInformation();
        try {
            const response = yield fetchPokemon(inputValue.value.toLowerCase());
            clearTratamentError();
            settingInfoPokemon(response);
            settingStatsPokemon(response);
        }
        catch (error) {
            TratamentError(error);
        }
    });
}
document.querySelector("#search").addEventListener("click", searchPokemon);
document.addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
        searchPokemon();
    }
});
document.addEventListener("DOMContentLoaded", setup);

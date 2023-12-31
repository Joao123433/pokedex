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
const infoStats = document.querySelectorAll("#info-stats");
const type = document.querySelector("#type");
const contentStats = document.querySelector("#content-stats");
const namePokemon = document.querySelector("#name-pokemon");
const divImage = document.querySelector("#image");
const divStats = document.querySelector("#stats");
const h1Stat = document.querySelector("#h1-stat");
const divInfo = document.querySelector("#info");
var Colors;
(function (Colors) {
    Colors["fire"] = "#ff7402";
    Colors["grass"] = "#33a165";
    Colors["steel"] = "#00858a";
    Colors["water"] = "#0050ac";
    Colors["psychic"] = "#c90086";
    Colors["ground"] = "#c90086";
    Colors["ice"] = "#70deff";
    Colors["flying"] = "#5d4e75";
    Colors["ghost"] = "#4d5b64";
    Colors["normal"] = "#753845";
    Colors["poison"] = "#7e0058";
    Colors["rock"] = "#6e1a00";
    Colors["fighting"] = "#634136";
    Colors["dark"] = "#272625";
    Colors["bug"] = "#6e1a00";
    Colors["dragon"] = "#00c431";
    Colors["electric"] = "#bba909";
    Colors["fairy"] = "#d31c81";
    Colors["unknow"] = "#757575";
    Colors["shadow"] = "#29292c";
})(Colors || (Colors = {}));
function randomPokemon() {
    return Math.round(Math.random() * (151 - 1) + 1);
}
function settingInfoPokemon(pokemon) {
    type.textContent = pokemon.types[0].type.name.toUpperCase();
    // seta o nome do pokemon
    let name = pokemon.name;
    name = name[0].toUpperCase() + name.substring(1);
    namePokemon.textContent = name;
    // cria e seta a imagem do pokemon
    const image = createImg(pokemon.sprites.other["official-artwork"].front_default);
    document.querySelector("#image").append(image);
    // cria animacoes na section info que contem o nome e o tipo do pokemon
    divInfo.classList.add('animate__animated', 'animate__backInLeft');
    divInfo.style.setProperty('--animate-duration', '2s');
    // cria animacao no h1 stats
    h1Stat.classList.add('animate__animated', 'animate__backInLeft');
    h1Stat.style.setProperty('--animate-duration', '2s');
    // configura o background para ter a cor do enum Colors
    let tipoPokemon = pokemon.types[0].type.name;
    document.body.style.backgroundColor = Colors[tipoPokemon];
    if (tipoPokemon === "ice" || tipoPokemon === "dragon" || tipoPokemon === "electric" || tipoPokemon === "fairy" || tipoPokemon === "unknow") {
        document.body.classList.remove("white");
        document.body.classList.add("black");
    }
    else {
        document.body.classList.remove("black");
        document.body.classList.add("white");
    }
}
function createImg(path) {
    const image = document.createElement("img");
    image.src = path;
    image.id = "img";
    image.alt = `imagem do pokemon`;
    image.classList.add('animate__animated', 'animate__backInRight');
    image.style.setProperty('--animate-duration', '2s');
    return image;
}
function settingStatsPokemon(pokemon) {
    h1Stat.textContent = "Stats";
    for (let i = 0; i < 6; i++) {
        statsName[i].textContent = pokemon.stats[i].stat.name.replace("-", " ");
        valueStats[i].textContent = pokemon.stats[i]["base_stat"];
        infoStats[i].classList.add('animate__animated', 'animate__bounceInUp');
        infoStats[i].style.setProperty('--animate-duration', `${(i + 1) * 0.55}s`);
        const elementoAtual = divInside[i];
        if (elementoAtual instanceof HTMLElement) {
            if (pokemon.stats[i]["base_stat"] > 200) {
                elementoAtual.style.width = `100%`;
            }
            else {
                elementoAtual.style.width = `${pokemon.stats[i]["base_stat"] / 2}%`;
            }
        }
    }
}
function fetchPokemon(pokemon) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
        if (response.ok) {
            return response.json();
        }
        return Promise.reject("Pokemon não foi encontrado");
    });
}
function clearInformation() {
    statsName.forEach(element => element.textContent = "");
    divInside.forEach((element) => element.style.width = "0%");
    valueStats.forEach(element => element.textContent = "");
    type.textContent = "";
    namePokemon.textContent = "";
    h1Stat.textContent = "";
    if (document.querySelector("#img")) {
        document.querySelector("#img").remove();
    }
    contentStats.classList.remove("none");
    divInfo.classList.remove('animate__animated', 'animate__backInLeft');
    h1Stat.classList.remove('animate__animated', 'animate__backInLeft');
    infoStats.forEach((element) => element.classList.remove('animate__animated', 'animate__bounceInUp'));
}
function TratamentError(err) {
    divImage.classList.add("none");
    divStats.classList.add("none");
    h1Stat.classList.add("none");
    namePokemon.classList.add("error");
    namePokemon.textContent = err;
}
function clearTratamentError() {
    divImage.classList.remove("none");
    divStats.classList.remove("none");
    h1Stat.classList.remove("none");
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
function validateInput() {
    let inputValue = document.querySelector("#value");
    if (inputValue.value !== "") {
        return inputValue;
    }
    else {
        throw new Error("Insira o nome de um pokemon");
    }
}
function ErrorInput() {
    try {
        validateInput();
    }
    catch (error) {
        TratamentError(error.message);
    }
}
function searchPokemon() {
    return __awaiter(this, void 0, void 0, function* () {
        clearInformation();
        ErrorInput();
        let inputValue = validateInput();
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

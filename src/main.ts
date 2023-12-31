const statsName: NodeListOf<HTMLElement> = document.querySelectorAll("#name-stat")
const divInside: NodeListOf<HTMLElement> = document.querySelectorAll("#inside")
const valueStats: NodeListOf<HTMLElement> = document.querySelectorAll("#value-stat")

const infoStats: any = document.querySelectorAll("#info-stats")

const type: HTMLElement = document.querySelector("#type")
const contentStats: HTMLElement = document.querySelector("#content-stats")
const namePokemon: HTMLElement = document.querySelector("#name-pokemon")
const divImage: HTMLElement = document.querySelector("#image")
const divStats: HTMLElement = document.querySelector("#stats")
const h1Stat: HTMLElement = document.querySelector("#h1-stat")
const divInfo: HTMLElement = document.querySelector("#info")

enum Colors {
  fire = "#ff7402",
  grass = "#33a165",
  steel = "#00858a",
  water = "#0050ac",
  psychic = "#c90086",
  ground = "#c90086",
  ice = "#70deff",
  flying = "#5d4e75",
  ghost = "#4d5b64",
  normal = "#753845",
  poison = "#7e0058",
  rock = "#6e1a00",
  fighting = "#634136",
  dark = "#272625",
  bug = "#6e1a00",
  dragon = "#00c431",
  electric = "#bba909",
  fairy = "#d31c81",
  unknow = "#757575",
  shadow = "#29292c"
}

function randomPokemon() {
  return Math.round(Math.random() * (151 - 1) + 1)
}

function settingInfoPokemon(pokemon: { types: { type: { name: string } }[]; name: string; sprites: { other: { [x: string]: { front_default: string } } } }) {
  type.textContent = pokemon.types[0].type.name.toUpperCase()
  
  // seta o nome do pokemon
  let name = pokemon.name
  name = name[0].toUpperCase() + name.substring(1)
  namePokemon.textContent = name

  // cria e seta a imagem do pokemon
  const image = createImg(pokemon.sprites.other["official-artwork"].front_default)
  document.querySelector("#image").append(image)

  // cria animacoes na section info que contem o nome e o tipo do pokemon
  divInfo.classList.add('animate__animated', 'animate__backInLeft')
  divInfo.style.setProperty('--animate-duration', '2s');

  // cria animacao no h1 stats
  h1Stat.classList.add('animate__animated', 'animate__backInLeft')
  h1Stat.style.setProperty('--animate-duration', '2s');

  // configura o background para ter a cor do enum Colors
  let tipoPokemon = pokemon.types[0].type.name
  document.body.style.backgroundColor = Colors[tipoPokemon]
  if(tipoPokemon === "ice" || tipoPokemon === "dragon" || tipoPokemon === "electric" || tipoPokemon === "fairy" || tipoPokemon === "unknow") {
    document.body.classList.remove("white")
    document.body.classList.add("black")
  } else {
    document.body.classList.remove("black")
    document.body.classList.add("white")
  }
}

function createImg(path: string) {
  const image = document.createElement("img")
  image.src = path
  image.id = "img"
  image.alt = `imagem do pokemon`
  image.classList.add('animate__animated', 'animate__backInRight')
  image.style.setProperty('--animate-duration', '2s');
  return image
}

function settingStatsPokemon(pokemon: { stats: { [x: string]: any }[] }) {
  h1Stat.textContent = "Stats"
  for(let i = 0; i < 6; i++) {
    statsName[i].textContent = pokemon.stats[i].stat.name.replace("-", " ")
    
    valueStats[i].textContent = pokemon.stats[i]["base_stat"]

    infoStats[i].classList.add('animate__animated', 'animate__bounceInUp')
    infoStats[i].style.setProperty('--animate-duration', `${(i + 1) * 0.55}s`);

    const elementoAtual: Element = divInside[i];
    if (elementoAtual instanceof HTMLElement) {
      if(pokemon.stats[i]["base_stat"] > 200) {
        elementoAtual.style.width = `100%`;
      } else {
        elementoAtual.style.width = `${pokemon.stats[i]["base_stat"] / 2}%`;
      }
    }
  }
}

async function fetchPokemon(pokemon: string) {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
  if(response.ok) {
    return response.json()
  }

  return Promise.reject("Pokemon não foi encontrado")
}

function clearInformation() {
  statsName.forEach(element => element.textContent = "")
  divInside.forEach((element) => element.style.width = "0%")
  valueStats.forEach(element => element.textContent = "")
  type.textContent = ""
  namePokemon.textContent = ""
  h1Stat.textContent = ""
  if(document.querySelector("#img")) {
    document.querySelector("#img").remove()
  }

  contentStats.classList.remove("none")

  divInfo.classList.remove('animate__animated', 'animate__backInLeft')

  h1Stat.classList.remove('animate__animated', 'animate__backInLeft')

  infoStats.forEach((element: { classList: { remove: (arg0: string, arg1: string) => any } }) => element.classList.remove('animate__animated', 'animate__bounceInUp'))
}

function TratamentError(err: string) {
  divImage.classList.add("none")
  divStats.classList.add("none")
  h1Stat.classList.add("none")
  namePokemon.classList.add("error")
  namePokemon.textContent = err
}

function clearTratamentError() {
  divImage.classList.remove("none")
  divStats.classList.remove("none")
  h1Stat.classList.remove("none")
  namePokemon.classList.remove("error")
  namePokemon.textContent = ""
}

async function setup() {
  clearInformation()

  try {
    const pokemon = String(randomPokemon())
    const response = await fetchPokemon(pokemon)
    clearTratamentError()
    settingInfoPokemon(response)
    settingStatsPokemon(response)
  } catch(error) {
    TratamentError(error)
  }
}

function validateInput() {
  let inputValue: HTMLInputElement = document.querySelector("#value")
  if(inputValue.value !== "") {
    return inputValue
  } else {
    throw new Error("Insira o nome de um pokemon")
  }
}

function ErrorInput() {
  try {
    validateInput()
  }catch(error) {
    TratamentError(error.message)
  }
}

async function searchPokemon() {
  clearInformation()
  ErrorInput()

  let inputValue = validateInput()
  try {
    const response = await fetchPokemon(inputValue.value.toLowerCase())
    clearTratamentError()
    settingInfoPokemon(response)
    settingStatsPokemon(response)
  } catch(error) {
    TratamentError(error)
  }
}


document.querySelector("#search").addEventListener("click", searchPokemon)
document.addEventListener('keypress', function(event) {
  if (event.key === 'Enter') {
    searchPokemon()
  }
});
document.addEventListener("DOMContentLoaded", setup)

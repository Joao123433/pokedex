const statsName: NodeListOf<Element> = document.querySelectorAll("#name-stat")
const divInside: NodeListOf<Element> = document.querySelectorAll("#inside")
const valueStats: NodeListOf<Element> = document.querySelectorAll("#value-stat")
const type: HTMLElement = document.querySelector("#type")
const namePokemon: HTMLElement = document.querySelector("#name-pokemon")
let styles = []

const divImage: HTMLElement = document.querySelector("#image")
const divStats: HTMLElement = document.querySelector("#stats")
const h1Stat: HTMLElement = document.querySelector("#h1-stat")
const footer: HTMLElement = document.querySelector("#rodape")

function randomPokemon() {
  return Math.round(Math.random() * (151 - 1) + 1)
}

function settingInfoPokemon(pokemon: { types: { type: { name: string } }[]; name: string; sprites: { other: { [x: string]: { front_default: string } } } }) {
  type.textContent = pokemon.types[0].type.name.toUpperCase()
  
  let name = pokemon.name
  name = name[0].toUpperCase() + name.substring(1)
  namePokemon.textContent = name

  const image = createImg(pokemon.sprites.other["official-artwork"].front_default)
  document.querySelector("#image").append(image)

  document.body.classList.add(pokemon.types[0].type.name)
  styles.push(pokemon.types[0].type.name)
}

function createImg(path: string) {
  const image = document.createElement("img")
  image.src = path
  image.id = "img"
  return image
}

function settingStatsPokemon(pokemon: { stats: { [x: string]: any }[] }) {
  h1Stat.textContent = "Stats"
  for(let i = 0; i < 6; i++) {
    statsName[i].textContent = pokemon.stats[i].stat.name.replace("-", " ")
    
    valueStats[i].textContent = pokemon.stats[i]["base_stat"]

    const elementoAtual: Element = divInside[i];
    if (elementoAtual instanceof HTMLElement) {
      elementoAtual.style.width = `${pokemon.stats[i]["base_stat"] / 2}%`;
    }
  }
}

async function fetchPokemon(pokemon: string) {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
  if(response.ok) {
    return response.json()
  }

  return Promise.reject("Pokemon não foi achado")
}

function clearInformation() {
  statsName.forEach(element => element.textContent = "")
  divInside.forEach((element: HTMLElement) => element.style.width = "100%")
  valueStats.forEach(element => element.textContent = "")
  styles.forEach(style => document.body.classList.remove(style))
  type.textContent = ""
  namePokemon.textContent = ""
  h1Stat.textContent = ""
  if(document.querySelector("#img")) {
    document.querySelector("#img").remove()
  }
}

function TratamentError(err: string) {
  divImage.classList.add("none")
  divStats.classList.add("none")
  h1Stat.classList.add("none")
  footer.classList.add("none")
  namePokemon.classList.add("error")
  namePokemon.textContent = err
}

function clearTratamentError() {
  divImage.classList.remove("none")
  divStats.classList.remove("none")
  h1Stat.classList.remove("none")
  footer.classList.remove("none")
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

async function searchPokemon() {
  let inputValue: HTMLInputElement = document.querySelector("#value")
  clearInformation()

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

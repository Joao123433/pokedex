# Aplicativo de Informações sobre Pokémon
- Este repositório contém um aplicativo web simples que permite aos usuários obter e exibir informações sobre Pokémon usando a API PokeAPI. A aplicação fornece detalhes sobre o Pokémon, incluindo seu tipo, nome, imagem e estatísticas.

## Funcionalidades
- `Geração Aleatória:` Exibe informações sobre um Pokémon escolhido aleatoriamente.
- `Busca por Nome:` Permite buscar informações sobre um Pokémon específico inserindo seu nome.
- `Exibição Detalhada:` Mostra detalhes, incluindo tipo, nome, imagem e estatísticas do Pokémon.

# Dependências
A aplicação utiliza a [API PokeAPI][https://pokeapi.co/] para obter informações detalhadas sobre os Pokémon.

## Estrutura
- `randomPokemon():` Gera um número aleatório para obter informações sobre um Pokémon.
- `settingInfoPokemon(pokemon):` Exibe informações básicas sobre o Pokémon, como tipo e nome.
- `createImg(path):` Cria um elemento de imagem para exibir a imagem do Pokémon.
- `settingStatsPokemon(pokemon):` Exibe informações sobre as estatísticas do Pokémon.
- `fetchPokemon(pokemon):` Obtém informações sobre um Pokémon da API PokeAPI.
- `clearInformation():` Limpa as informações exibidas na página da web.
- `TratamentError(err):` Exibe mensagens de erro e ajusta o layout em caso de erro.
- `clearTratamentError():` Remove mensagens de erro e restaura o layout padrão.
- `setup():` Configura a aplicação ao carregar a página.
- `searchPokemon():` Busca informações sobre um Pokémon inserido pelo usuário.

## Acesse o projeto em
- https://joao123433.github.io/pokedex/
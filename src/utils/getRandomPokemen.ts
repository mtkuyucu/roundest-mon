const MAX_DEX_ID = 443;

export const getRandomPokemon: (notThisOne?: number) => number = (
  notThisOne?: number
) => {
  const pokedexNumber = Math.floor(Math.random() * (MAX_DEX_ID - 1) + 1);
  if (pokedexNumber !== notThisOne) return pokedexNumber;
  return getRandomPokemon(pokedexNumber);
};

export const getOptionsForVote = () => {
  const firstId = getRandomPokemon();
  const secondId = getRandomPokemon(firstId);
  return [firstId, secondId];
};

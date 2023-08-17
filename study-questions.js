const axios = require("axios");
// For this use the CoinGecko Api to find market data for crypto coins.

// getCoinMarketData()

// Create a function called getCoinMarketData that takes a string as a parameter. The string represents a crypto currency coin such as "bitcoin", or "ethereum", or "solana"

// The API endpoint will be similar to this endpoint to get bitcoin information: https://api.coingecko.com/api/v3/coins/bitcoin

// Make sure to make the API call update based on the coin name that is passed into getCoinMarketData.

// The function should return the market_data object from the result of the API call.

function getCoinMarketData(coinName = "") {
  const url = `https://api.coingecko.com/api/v3/coins/${coinName}`;
  return axios
    .get(url)
    .then(({ data }) => {
      return data.market_data;
    })
    .catch((err) => err.message);
}

// getCoinMarketData("bitcoin").then ((output) => {
//     console.log(output)
// })

// getFormattedCoinData()

// Write a function called getFormattedCoinData that accepts a coin name. It should make a call to an api endpoint similar to this: https://api.coingecko.com/api/v3/coins/bitcoin

// it should return a response that has this format (depending on the coin)
// {
//     coinName: "Bitcoin",
//     genesis_date: "2009-01-03",
//     usd_price: 20681, (hint: you'll find the usd price under the market data property somewhere nested in there)
//     ath_usd: 69045 (hint: you will also find the ath usd price in the market data property somewhere nested in there),
//     price_change_percentage_24h: -0.93073
// }

function getFormattedCoinData(coinName) {
  const base_url = "https://api.coingecko.com/api/v3/coins";
  const url = `${base_url}/${coinName}`;
  return axios
    .get(url)
    .then(({ data: { name, genesis_date, market_data } }) => {
      return {
        coinName: name,
        genesis_date,
        usd_price: market_data.current_price.usd,
        ath_usd: market_data.ath.usd,
        price_change_percentage_24h: market_data.price_change_percentage_24h,
      };
    })
    .catch((err) => err.message);
}

// getFormattedCoinData("bitcoin").then((output) => {
//     console.log(output)
// })

// getAllCoins()
// Make a function called getAllCoins that takes no parameters.
// You can use this endpoint: https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false

// Return an array that has formatted each coin to have this shape (values depend on the coin):

// {
//     "name": "Bitcoin",
//     "current_price": 20575,
//     "price_change_percentage_24h": -0.29773
// }

function getAllCoins() {
  const url =
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false";
  return axios
    .get(url)
    .then(({ data }) => {
      let result = [];
      for (let { name, current_price, price_change_percentage_24h } of data) {
        result.push({
          name,
          current_price,
          price_change_percentage_24h,
        });
      }
      return result;
    })
    .catch((err) => err.message);
}

// getAllCoins().then((response) =>  {
//     console.log(response);
// })

// catchEmAll()
// Using an api endpoint like this: https://pokeapi.co/api/v2/pokemon/ditto

// Write a function that takes a pokemon name and gives back an object similar to this:
// {
//   name: "ditto",
//   abilities: [{},{}],
//   height: 3,
//   base_experience: 48
// }

function catchEmAll(name) {
  const url = `https://pokeapi.co/api/v2/pokemon/${name}`;
  return axios
    .get(url)
    .then(({ data: { name, abilities, height, base_experience } }) => {
      return {
        name,
        abilities,
        height,
        base_experience,
      };
    })
    .catch((err) => err.message);
}

// catchEmAll("ditto").then((response) => {
//   console.log(response);
// });

//pokemonMove()
// Using an api endpoint like this: https://pokeapi.co/api/v2/pokemon/ditto

// Write a function that takes a pokemon name and gives back an object similar to this:

// {
//   name: "ditto",
//   firstAbilityName: "limber",
//   firstMove: "transform"
// }

function pokemonMove(name) {
  const url = `https://pokeapi.co/api/v2/pokemon/${name}`;
  return axios
    .get(url)
    .then(({ data }) => {
      return {
        name: data.name,
        firstAbilityName: data.abilities[0].ability.name,
        firstMove: data.moves[0].move.name,
      };
    })
    .catch((err) => err.message);
}

// pokemonMove("pikachu").then((response) => {
//     console.log(response);
// });

function getAllCoinsSorted() {
  const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false`;
  return axios
    .get(url)
    .then(({ data }) => {
      let result = [];
      for (let { name, current_price, price_change_percentage_24h } of data) {
        result.push({
          name,
          current_price,
          price_change_percentage_24h,
        });
      }
      return result.sort(
        (a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h
      );
    })
    .catch((err) => err.message);
}

getAllCoinsSorted().then((response) => {
  console.log(response);
});

module.exports = {
  getCoinMarketData,
  getFormattedCoinData,
  getAllCoins,
  catchEmAll,
  pokemonMove,
  getAllCoinsSorted,
};

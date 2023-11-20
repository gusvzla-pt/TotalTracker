import axios from "axios";

const apiKey = '&x_cg_demo_api_key=CG-sTM3DwoyBNdfgS9VfFyNPnQ5'

export const getDetailedCoinData = async (coinId) => {
  try {
    const apiUrl = `https://api.coingecko.com/api/v3/coins/${coinId}?localization=false&tickers=true&market_data=true&community_data=false&developer_data=false&sparkline=false${apiKey}`;
    const response = await axios.get(apiUrl);

    return response.data;
  } catch (error) {
    console.log("Error en getDetailedCoinData: " + error);
  }
};

export const getPricesForChart = async (coinId, period) => {
  try {
    const apiUrl = `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=${period}${apiKey}`;
    const response = await axios.get(apiUrl);
    const formatData = response.data.prices.map(function (i) {
      return {
        timestamp: i[0],
        value: i[1],
      };
    });

    return formatData;
  } catch (error) {
    console.log("Error en getPricesForChart: " + error);
  }
};

export const getMarketData = async (pageNumber = 1) => {
  try {
    const apiUrl = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=${pageNumber}&sparkline=false&price_change_percentage=24h&locale=en&precision=2${apiKey}`;
    console.log(apiUrl)
    const response = await axios.get(apiUrl);
    return response.data;
  } catch (error) {
    console.log("Error en getMarketData: ", error);
  }
};

export const getWatchlistedCoins = async (pageNumber = 1, coinsIds) => {
  try {
    const apiUrl = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${coinsIds}&order=market_cap_desc&per_page=50&page=${pageNumber}&sparkline=false&price_change_percentage=24h&locale=en&precision=2${apiKey}`;
    const response = await axios.get(apiUrl);
    return response.data;
  } catch (error) {
    console.log("Error en getWatchlistedCoins: ", error);
  }
};

export const getAllCoins = async () => {
  try {
    const apiUrl = `https://api.coingecko.com/api/v3/coins/list?include_platform=false${apiKey}`;
    const response = await axios.get(apiUrl);
    return response.data;
  } catch (error) {
    console.log('Error en getAllCoin: ', error)
  }
}




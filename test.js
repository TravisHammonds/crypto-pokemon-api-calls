const axios = require("axios");
const { geckoMockData, pokemonMockData } = require("./mock-data");
const { getCoinMarketData } = require("./study-questions");
const jest = require("jest");

describe("study-questions.js", () => {
  beforeEach(() => {
    jest.spyOn(axios, "get");
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
  describe("getCoinMarketData", () => {
    const baseUrl = "https://api.coingecko.com/api/v3/coins"

    it("should make request to appropriate url", async () => {
        await getCoinMarketData("bitcoin")
        const expectedUrl = `${baseUrl}/bitcoin`;
        expect(axios.get).toHaveBeenCalledWith(expectedUrl)
        
    });

    it("should return the market data for give coin", async () => {
        axios.get.mockImplementation(() =>  Promise.resolve({data: geckoMockData, status: 200}))
        const actual = await getCoinMarketData("bitcoin")
        const expected = geckoMockData.market_data
        expect(actual).toEqual(expected);
    });
  });
});

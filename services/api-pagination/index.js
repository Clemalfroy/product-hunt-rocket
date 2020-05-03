/* eslint-disable no-await-in-loop */
const _ = require("lodash");
const ProductHuntProvider = require("../../provider/product-hunt");

const REQUESTS = {
  findUpvoters: {
    startingCursor: "NTA=",
    func: ProductHuntProvider.findProductUpvoters,
    requestFields: ["node", "voters"]
  },
  findProducts: {
    startingCursor: "UmFuazow",
    func: ProductHuntProvider.findProducts,
    requestFields: ["search_posts"]
  }
};

const getDataFromPath = (response, path) => {
  let data = response.body.data;
  path.forEach(p => {
    data = data[p];
  });
  return data;
};

const mergeResults = async (requestIdentifier, query, limit = 9999) => {
  let results = [];
  let cursor = REQUESTS[requestIdentifier].startingCursor;
  let hasNextPage = true;
  while (hasNextPage) {
    const request = REQUESTS[requestIdentifier];
    const response = await request.func(query, cursor);
    const data = getDataFromPath(response, request.requestFields);
    cursor = data.pageInfo.endCursor;
    hasNextPage = data.pageInfo.hasNextPage;
    results = [...results, ..._.map(data.edges, "node")];
    if (results.length >= limit) break;
  }
  return results;
};

module.exports = {
  mergeResults
};

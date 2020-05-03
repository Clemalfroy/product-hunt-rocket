const superagent = require("superagent");

const PRODUCT_HUNT_ENDPOINT = "https://www.producthunt.com/frontend/graphql";

const findProductsQuery = require("../queries/find-products");
const findUpvotersQuery = require("../queries/find-upvoters");

const QUERIES = {
  findProducts: findProductsQuery,
  findUpvoters: findUpvotersQuery
};

const findProducts = async (query, cursor) => {
  return superagent
    .agent()
    .post(PRODUCT_HUNT_ENDPOINT)
    .set({
      authority: "www.producthunt.com",
      Accept: "application/json",
      origin: "https://www.producthunt.com"
    })
    .send({
      operationName: "VotersPage",
      variables: {
        featured: true,
        query,
        topicName: [],
        type: "top",
        includeNoLongerAvailable: true,
        postedBy: null,
        after: cursor
      },
      query: QUERIES.findProducts
    });
};

const findProductUpvoters = async (productId, cursor) => {
  return superagent
    .agent()
    .post(PRODUCT_HUNT_ENDPOINT)
    .set({
      authority: "www.producthunt.com",
      Accept: "application/json",
      origin: "https://www.producthunt.com"
    })
    .send({
      operationName: "VotersPage",
      variables: { id: productId, first: 50, cursor },
      query: QUERIES.findUpvoters
    });
};

module.exports = {
  findProducts,
  findProductUpvoters
};

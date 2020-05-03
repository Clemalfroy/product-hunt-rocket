/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
const ProductHuntApiPaginationService = require("../api-pagination");

const findInterestedUsers = async (query, maximumProducts = 500) => {
  let targetAudience = [];
  const products = await ProductHuntApiPaginationService.mergeResults(
    "findProducts",
    query,
    maximumProducts
  );
  for (const i in products) {
    const users = await ProductHuntApiPaginationService.mergeResults(
      "findUpvoters",
      products[i]._id
    );
    targetAudience = [...targetAudience, ...users];
  }
  return targetAudience;
};

module.exports = {
  findInterestedUsers
};

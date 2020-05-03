const PersonaFinderService = require("./services/persona-finder");

(async () => {
  if (process.argv.length <= 2) {
    console.log("Usage: node index.js <Query> <numberOfProductToScrape(opt)>");
    process.exit(-1);
  }

  const argument = process.argv[2];
  const numberOfProductToScrape = process.argv[3]
    ? parseInt(process.argv[3], 10)
    : 50;

  const targetAudience = await PersonaFinderService.findInterestedUsers(
    argument,
    numberOfProductToScrape
  );
  console.log(JSON.stringify(targetAudience));
})();

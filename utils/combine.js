const combineResolvers = (resolvers = []) => {
  const merged = {};
  resolvers.forEach((resolver) => {
    merged["Query"] = Object.assign(merged["Query"] || {}, resolver["Query"]);
    merged["Mutation"] = Object.assign(
      merged["Mutation"] || {},
      resolver["Mutation"]
    );
  });

  return merged;
};

module.exports = {
  combineResolvers,
};

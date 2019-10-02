const { ApolloServer } = require("apollo-server");
const { ApolloGateway, RemoteGraphQLDataSource } = require("@apollo/gateway");

const gateway = new ApolloGateway({
  serviceList: [
    { name: "accounts", url: "http://localhost:4001/graphql" },
    { name: "reviews", url: "http://localhost:4002/graphql" },
    { name: "products", url: "http://localhost:4003/graphql" },
    { name: "inventory", url: "http://localhost:4004/graphql" }
  ],

  buildService({ name, url }) {
    console.log(name, url);

    return new RemoteGraphQLDataSource({ url });
  }
});

(async () => {
  const { schema, executor } = await gateway.load();

  const server = new ApolloServer({ schema, executor });

  server.listen().then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
  });
})();

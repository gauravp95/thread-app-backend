const express = require("express");
const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@apollo/server/express4");
const app = express();
const PORT = process.env.PORT || 3000;

async function startApolloServer() {
  //GraphQL Server
  const gqlServer = new ApolloServer({
    typeDefs: `
      type Query {
        hello: String
        say(name: String) : String
      }
    `,
    resolvers: {
      Query: {
        hello: () => "Hello Gaurav",
        say: (_, { name }: { name: string }) => `Hey ${name} how are you`,
      },
    },
  });

  await gqlServer.start();

  app.use(express.json());

  app.get("/", (req, res) => {
    res.json({ message: "Server is up and running" });
  });

  app.use("/graphql", expressMiddleware(gqlServer));

  app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
  });
}

startApolloServer();

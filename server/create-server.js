import { createServer, Model, Factory } from 'miragejs';

createServer({
  models: {
    movie: Model,
  },
  factories: {
    movie: Factory.extend({}),
  },


  routes() {
    // slow down every route
    this.timing = 2300;
    this.passthrough('http://pets-v2.dev-apis.com/**');

    // when api is on different origin
    // this.urlPrefix = 'http://localhost:3000';
    this.namespace = 'api';


    this.delete("/movies/:id", (schema, request) => {
      let id = request.params.id

      return schema.movies.find(id).destroy()
    })

    // Shorthands
    this.get('/movies', { timing: 4000 })
    this.get("/movies/:id")
    this.post("/movies")
    this.patch("/movies/:id")
    this.del("/movies/:id")

  },

  seeds(server) {
    server.create('movie', { name: 'Inception', year: 2010 });
    server.create('movie', { name: 'Interstellar', year: 2014 });
    server.create('movie', { name: 'Dunkirk', year: 2017 });
  },
});

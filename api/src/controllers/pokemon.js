const {
  getAllInfo,
  getPokeDb,
  getSinglePoke,
  postPoke,
  getPokeByName,
} = require("./utils");

const getPokemons = async (req, res, next) => {
  try {
    const {name} = req.query;
    const response = await getAllInfo();
    if (name) {
      const pokemon = await getPokeByName(name);
      return pokemon
        ? res.send(pokemon)
        : res.status(404).send({msg: "poke not found"});
    }
    res.send(response);
  } catch (err) {
    if (err.response) {
      res.status(err.response.status).send({msg: err.response.status});
    } else if (err.request) {
      next(err.request);
    } else {
      next(err);
    }
  }
};

const getPokemonsDB = async (req, res, next) => {
  try {
    const response = await getPokeDb();
    res.send(response);
  } catch (err) {
    if (err.response) {
      res.status(err.response.status).send({msg: err.response.status});
    } else if (err.request) {
      next(err.request);
    } else {
      next(err);
    }
  }
};
const getPokemonId = async (req, res, next) => {
  try {
    const {id} = req.params;
    const poke = await getSinglePoke(id);
    poke.id ? res.send(poke) : res.status(404).send({msg: "poke not found"});
  } catch (err) {
    if (err.response) {
      res
        .status(err.response.status)
        .send({msg: err.response.statusText + " " + err.response.status});
    } else if (err.request) {
      next(err.request);
    } else {
      next(err);
    }
  }
};
const postPokemon = async (req, res, next) => {
  try {
    const props = req.body;
    const poke = await postPoke(props);
    poke.dataValues
      ? res.status(201).send({msg: "Pokemon added"})
      : res.status(200).send({msg: "invalid data"});
  } catch (err) {
    if (err.response) {
      res.status(err.response.status).send({msg: err.response.status});
    } else if (err.request) {
      next(err.request);
    } else {
      next(err);
    }
  }
};
module.exports = {
  getPokemons,
  getPokemonId,
  postPokemon,
  getPokemonsDB,
};

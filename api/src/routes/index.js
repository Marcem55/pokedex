const { Router } = require("express");

const router = Router();

const PokemonRoutes = require("./pokemon");
const TypeRoutes = require("./type");

router.use("/pokemons", PokemonRoutes);
router.use("/types", TypeRoutes);

module.exports = router;
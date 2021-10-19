const { Router } = require("express");

const router = Router();

const PokemonRouter = require("./pokemon");
const TypeRouter = require("./type");
// Nos traemos nuestras rutas para usarlas como middleware en /api/activity por ejemplo
router.use("/pokemons", PokemonRouter);
router.use("/types", TypeRouter);

module.exports = router;
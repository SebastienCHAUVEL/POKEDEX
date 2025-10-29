import { Pokemon, Type, Team, User } from "../../models/associations.js";
import { sequelize } from "../sequelize/sequelize.client.js";
import argon2 from "argon2";

// Users
console.log("🚧 Ajout des utilisateurs...");
const userA = await User.create({
  username: "user",
  password: await argon2.hash("User1234"),
});
const userB = await User.create({
  username: "user2",
  password: await argon2.hash("User1234"),
});

// Pokemons
console.log("🚧 Ajout des pokemons...");
const pikachu = await Pokemon.create({
  name: "Pikachu",
  hp: 35,
  atk: 55,
  def: 40,
  atk_spe: 50,
  def_spe: 50,
  speed: 90,
});
const bulbizarre = await Pokemon.create({
  name: "Bulbizarre",
  hp: 45,
  atk: 49,
  def: 49,
  atk_spe: 65,
  def_spe: 65,
  speed: 45,
});
const salameche = await Pokemon.create({
  name: "Salamèche",
  hp: 39,
  atk: 52,
  def: 43,
  atk_spe: 60,
  def_spe: 50,
  speed: 65,
});
const carapuce = await Pokemon.create({
  name: "Carapuce",
  hp: 44,
  atk: 48,
  def: 65,
  atk_spe: 50,
  def_spe: 64,
  speed: 43,
});
const dracaufeu = await Pokemon.create({
  name: "Dracaufeu",
  hp: 78,
  atk: 84,
  def: 78,
  atk_spe: 109,
  def_spe: 85,
  speed: 100,
});
const meltan = await Pokemon.create({
  name: "Meltan",
  hp: 46,
  atk: 65,
  def: 65,
  atk_spe: 55,
  def_spe: 35,
  speed: 34,
});
const cobaltium = await Pokemon.create({
  name: "Cobaltium",
  hp: 91,
  atk: 90,
  def: 129,
  atk_spe: 90,
  def_spe: 72,
  speed: 108,
});

// Types
console.log("🚧 Ajout des types...");
const electricType = await Type.create({
  name: "Électrik",
  color: "#FFEA70",
});
const fireType = await Type.create({
  name: "Feu",
  color: "#FF675C",
});
const waterType = await Type.create({
  name: "Eau",
  color: "#0596C7",
});
const grassType = await Type.create({
  name: "Plante",
  color: "#49D0B0",
});
const ironType = await Type.create({
  name: "Acier",
  color: "#D1D1E0",
});
const fightingType = await Type.create({
  name: "Combat",
  color: "#E6E0D4",
});
const dragonType = await Type.create({
  name: "Dragon",
  color: "#97B3E6",
});
const poisonType = await Type.create({
  name: "Poison",
  color: "#AA6BC8",
});

// Pokemon <-> Type
console.log("🚧 Association des pokemons et des types...");
await pikachu.addType(electricType);
await bulbizarre.addTypes([grassType, poisonType]);
await salameche.addType(fireType);
await carapuce.addType(waterType);
await dracaufeu.addTypes([fireType, fightingType]);
await meltan.addType(ironType);
await cobaltium.addTypes([ironType, fightingType]);
await cobaltium.addType(dragonType);

// Teams
console.log("🚧 Ajout des équipes...");
const ultimateTeam = await Team.create({
  name: "Ultimate Team",
  description: "La meilleure team du monde",
  userId: userA.id,
});
const fofolleTeam = await Team.create({
  name: "Squad fofolle",
  description: "Pour tout gagne",
  userId: userA.id,
});
const enferTeam = await Team.create({
  name: "La Team de l'enfer",
  description: "Le feuuuuu",
  userId: userB.id,
});

// Team <-> Pokemon
console.log("🚧 Association des équipes et des pokemons...");
await ultimateTeam.addPokemons([pikachu, dracaufeu, cobaltium]);
await fofolleTeam.addPokemons([bulbizarre, salameche, carapuce]);
await enferTeam.addPokemons([dracaufeu, meltan]);

console.log("✅ Migration OK ! Fermeture de la base...");
await sequelize.close();

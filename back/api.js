const express = require("express");
const app = express();
const {
  validateUserData,
  validateContactData,
  validateCompanyData,
  validateCityData,
  validateCountryData,
  validateRegionData,
  validacionJWT,
  validacionJWTAdmin,
} = require("./middlewares/middlewares");
const { createUser, logIn, getUser, updateUser, deleteUser } = require("./routes/users");
const { createContact, getContact, updateContact, deleteContact } = require("./routes/contacts");
const { createCompany, getCompany, updateCompany, deleteCompany } = require("./routes/companies");
const {
  createCity,
  createCountry,
  createRegion,
  getCity,
  getCountry,
  getRegion,
  updateCity,
  updateCountry,
  updateRegion,
  deleteCity,
  deleteCountry,
  deleteRegion,
} = require("./routes/locations");

app.use(express.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3500");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});

app.listen(3500, () => {
  console.log("Servidor en puerto 3500");
});

// USUARIOS
app.post("/users/login", logIn);
app.post("/users", validateUserData, validacionJWTAdmin, createUser);
app.get("/users", validacionJWTAdmin, getUser);
app.patch("/users/:id_user", validateUserData, validacionJWTAdmin, updateUser);
app.delete("/users/:id_user", validacionJWTAdmin, deleteUser);

// COMPAÑIAS
app.post("/companies", validateCompanyData, validacionJWT, createCompany);
app.get("/companies", validacionJWT, getCompany);
app.patch("/companies/:id_company", validacionJWT, updateCompany);
app.delete("/companies/:id_company", validacionJWT, deleteCompany);

// CONTACTOS
app.post("/contacts", validateContactData, validacionJWT, createContact);
app.get("/contacts", validacionJWT, getContact);
app.patch("/contacts/:id_contact", validacionJWT, updateContact);
app.delete("/contacts/:id_contact", validacionJWT, deleteContact);

// REGIONES
app.post("/regions", validateRegionData, validacionJWT, createRegion);
app.get("/regions", validacionJWT, getRegion);
app.patch("/regions/:id_region", validacionJWT, updateRegion);
app.delete("/regions/:id_region", validacionJWT, deleteRegion);

// PAISES
app.post("/countries", validateCountryData, validacionJWT, createCountry);
app.get("/countries", validacionJWT, getCountry);
app.patch("/countries/:id_country", validacionJWT, updateCountry);
app.delete("/countries/:id_country", validacionJWT, deleteCountry);

// CIUDADES
app.post("/cities", validateCityData, validacionJWT, createCity);
app.get("/cities", validacionJWT, getCity);
app.patch("/cities/:id_city", validacionJWT, updateCity);
app.delete("/cities/:id_city", validacionJWT, deleteCity);

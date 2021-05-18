const jwt = require("jsonwebtoken");
const tokenKey = "keyParaEncriptacionJWToken";

module.exports = {
  validateUserData: (req, res, next) => {
    if (req.body.fname && req.body.lname && req.body.email && req.body.pass) {
      next();
    } else {
      res.status(400).json({ msj: "Todos los campos deben estar completos" });
    }
  },
  validateCompanyData: (req, res, next) => {
    if (req.body.name && req.body.address && req.body.email && req.body.phone && req.body.id_city) {
      next();
    } else {
      res.status(400).json({ msj: "Todos los campos deben estar completos" });
    }
  },
  validateContactData: (req, res, next) => {
    if (req.body.fname && req.body.lname && req.body.position && req.body.email && req.body.id_company) {
      next();
    } else {
      res.status(400).json({ msj: "Los campos obligatorios deben estar completos" });
    }
  },
  validateCityData: (req, res, next) => {
    if (req.body.name && req.body.id_country) {
      next();
    } else {
      res.status(400).json({ msj: "Todos los campos deben estar completos" });
    }
  },
  validateCountryData: (req, res, next) => {
    if (req.body.name && req.body.id_region) {
      next();
    } else {
      res.status(400).json({ msj: "Todos los campos deben estar completos" });
    }
  },
  validateRegionData: (req, res, next) => {
    if (req.body.name) {
      next();
    } else {
      res.status(400).json({ msj: "Todos los campos deben estar completos" });
    }
  },
  validacionJWT: (req, res, next) => {
    try {
      const token = req.headers.authorization.split(" ")[1];
      const verificarToken = jwt.verify(token, tokenKey);
      if (verificarToken) {
        req.infoToken = verificarToken;
        return next();
      }
    } catch (error) {
      res.status(401).json({ msj: "Error al validar usuario" });
    }
  },
  validacionJWTAdmin: (req, res, next) => {
    try {
      const token = req.headers.authorization.split(" ")[1];
      const verificarToken = jwt.verify(token, tokenKey);
      if (verificarToken) {
        req.infoToken = verificarToken;
        if (req.infoToken.admin == true) {
          return next();
        } else {
          res.status(401).json({ msj: "Solo acceso Administrador" });
        }
      }
    } catch (error) {
      res.status(401).json({ msj: "Error al validar usuario" });
    }
  },
};

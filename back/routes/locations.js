const sequelize = require("../conexion.js");

module.exports = {
  createCity: async(req,res) =>{
    const {name, id_country} = req.body;
    const active = 1;
    try {
      const cityExistente = await sequelize.query("SELECT name FROM cities WHERE name=?", {
        replacements: [name],
        type: sequelize.QueryTypes.SELECT,
      });
      if (cityExistente.length == 0) {
        try {
          const data = await sequelize.query(
            "INSERT INTO cities (name,id_country,active) VALUES (?,?,?)",
            {
              replacements: [name, id_country, active],
              type: sequelize.QueryTypes.INSERT,
            }
          );
          res.status(201).json({ msj: "Ciudad creada exitosamente" });
        } catch (err) {
          console.log("error" + err);
        }
      } else {
        res.status(400).json({ msj: "Ciudad existente - registrada" });
      }
    } catch (err) {
      console.log("error" + err);
    }
  },
  createCountry: async(req,res) =>{
    const {name, id_region} = req.body;
    const active = 1;
    try {
      const countryExistente = await sequelize.query("SELECT name FROM countries WHERE name=?", {
        replacements: [name],
        type: sequelize.QueryTypes.SELECT,
      });
      if (countryExistente.length == 0) {
        try {
          const data = await sequelize.query(
            "INSERT INTO countries (name,id_region,active) VALUES (?,?,?)",
            {
              replacements: [name, id_region, active],
              type: sequelize.QueryTypes.INSERT,
            }
          );
          res.status(201).json({ msj: "Pais creado exitosamente" });
        } catch (err) {
          console.log("error" + err);
        }
      } else {
        res.status(400).json({ msj: "Pais existente - registrado" });
      }
    } catch (err) {
      console.log("error" + err);
    }
  },
  createRegion: async(req,res) =>{
    const name = req.body.name;
    const active = 1;
    try {
      const regionExistente = await sequelize.query("SELECT name FROM regions WHERE name=?", {
        replacements: [name],
        type: sequelize.QueryTypes.SELECT,
      });
      if (regionExistente.length == 0) {
        try {
          const data = await sequelize.query(
            "INSERT INTO regions (name,active) VALUES (?,?)",
            {
              replacements: [name, active],
              type: sequelize.QueryTypes.INSERT,
            }
          );
          res.status(201).json({ msj: "Region creada exitosamente" });
        } catch (err) {
          console.log("error" + err);
        }
      } else {
        res.status(400).json({ msj: "Region existente - registrada" });
      }
    } catch (err) {
      console.log("error" + err);
    }
  },
  getCity: async(req,res) =>{
    try {
      const cityCompleto = await sequelize.query(
        "SELECT cities.id_city,cities.name,cities.id_country,countries.name AS nombre_pais,countries.id_region,regions.name AS nombre_region FROM cities INNER JOIN countries ON cities.id_country=countries.id_country INNER JOIN regions ON countries.id_region=regions.id_region WHERE cities.active=1",
        {
          type: sequelize.QueryTypes.SELECT,
        }
      );
      res.status(200).json(cityCompleto);
    } catch (err) {
      console.log("error" + err);
    }
  },
  getCountry: async(req,res) =>{
    try {
      const countryCompleto = await sequelize.query(
        "SELECT countries.id_country,countries.name,countries.id_region,regions.name AS nombre_region FROM countries INNER JOIN regions ON countries.id_region=regions.id_region WHERE countries.active=1",
        {
          type: sequelize.QueryTypes.SELECT,
        }
      );
      res.status(200).json(countryCompleto);
    } catch (err) {
      console.log("error" + err);
    }
  },
  getRegion: async(req,res) =>{
    try {
      const regionCompleto = await sequelize.query(
        "SELECT id_region,name FROM regions WHERE active=1",
        {
          type: sequelize.QueryTypes.SELECT,
        }
      );
      res.status(200).json(regionCompleto);
    } catch (err) {
      console.log("error" + err);
    }
  },
  updateCity: async(req,res) =>{
    const { name, id_country } = req.body;
    const idCity = req.params.id_city;
    try {
      const cityExistente = await sequelize.query("SELECT id_city FROM cities WHERE id_city=?", {
        replacements: [idCity],
        type: sequelize.QueryTypes.SELECT,
      });
      if (cityExistente.length != 0) {
        if (name && id_country) {
          try {
            const data = await sequelize.query(
              "UPDATE cities SET name=?, id_country=? WHERE id_city=?",
              {
                replacements: [name, id_country, idCity],
                type: sequelize.QueryTypes.UPDATE,
              }
            );
            console.log(data);
            res.status(200).json({ msj: "Ciudad modificada exitosamente" });
          } catch (err) {
            console.log("error" + err);
          }
        } else {
          res.status(400).json({ msj: "Todos los campos deben estar completos" });
        }
      } else {
        res.status(400).json({ msj: "Id ciudad erroneo - No se encuentra en Base de Datos" });
      }
    } catch (err) {
      console.log("error" + err);
    }
  },
  updateCountry: async(req,res) =>{
    const { name, id_region } = req.body;
    const idCountry = req.params.id_country;
    try {
      const countryExistente = await sequelize.query("SELECT id_country FROM countries WHERE id_country=?", {
        replacements: [idCountry],
        type: sequelize.QueryTypes.SELECT,
      });
      if (countryExistente.length != 0) {
        if (name && id_region) {
          try {
            const data = await sequelize.query(
              "UPDATE countries SET name=?, id_region=? WHERE id_country=?",
              {
                replacements: [name, id_region, idCountry],
                type: sequelize.QueryTypes.UPDATE,
              }
            );
            console.log(data);
            res.status(200).json({ msj: "Pais modificado exitosamente" });
          } catch (err) {
            console.log("error" + err);
          }
        } else {
          res.status(400).json({ msj: "Todos los campos deben estar completos" });
        }
      } else {
        res.status(400).json({ msj: "Id pais erroneo - No se encuentra en Base de Datos" });
      }
    } catch (err) {
      console.log("error" + err);
    }
  },
  updateRegion: async(req,res) =>{
    const name = req.body.name;
    const idRegion = req.params.id_region;
    try {
      const regionExistente = await sequelize.query("SELECT id_region FROM regions WHERE id_region=?", {
        replacements: [idRegion],
        type: sequelize.QueryTypes.SELECT,
      });
      if (regionExistente.length != 0) {
        if (name) {
          try {
            const data = await sequelize.query(
              "UPDATE regions SET name=? WHERE id_region=?",
              {
                replacements: [name, idRegion],
                type: sequelize.QueryTypes.UPDATE,
              }
            );
            console.log(data);
            res.status(200).json({ msj: "Region modificada exitosamente" });
          } catch (err) {
            console.log("error" + err);
          }
        } else {
          res.status(400).json({ msj: "Todos los campos deben estar completos" });
        }
      } else {
        res.status(400).json({ msj: "Id region erroneo - No se encuentra en Base de Datos" });
      }
    } catch (err) {
      console.log("error" + err);
    }
  },
  deleteCity: async(req,res) =>{
    const idCity = req.params.id_city;
    const active = 0;
    try {
      const cityUse = await sequelize.query("SELECT id_city FROM contacts WHERE id_city=? AND active=1 ", {
        replacements: [idCity],
        type: sequelize.QueryTypes.SELECT,
      });
      if (cityUse.length == 0) {
        try {
          const cityExistente = await sequelize.query("SELECT id_city FROM cities WHERE id_city=?", {
            replacements: [idCity],
            type: sequelize.QueryTypes.SELECT,
          });
          if (cityExistente.length != 0) {
            try {
              const data = await sequelize.query("UPDATE cities SET active=? WHERE id_city=?", {
                replacements: [active, idCity],
                type: sequelize.QueryTypes.UPDATE,
              });
              res.status(200).json({ msj: "Ciudad desactivada exitosamente" });
            } catch (err) {
              console.log("error" + err);
            }
          } else {
            res.status(400).json({ msj: "Id ciudad erroneo - No se encuentra en Base de Datos" });
          }
        } catch (err) {
          console.log("error" + err);
        }
      } else {
        res.status(400).json({ msj: "La ciudad esta en uso, no esta permitido eliminarla" });
      }
    } catch (error) {
      console.log("error" + err);
    }
  },
  deleteCountry: async(req,res) =>{
    const idCountry = req.params.id_country;
    const active = 0;
    try {
      const countryUse = await sequelize.query("SELECT id_country FROM cities WHERE id_country=? AND active=1 ", {
        replacements: [idCountry],
        type: sequelize.QueryTypes.SELECT,
      });
      if (countryUse.length == 0) {
        try {
          const countryExistente = await sequelize.query("SELECT id_country FROM countries WHERE id_country=?", {
            replacements: [idCountry],
            type: sequelize.QueryTypes.SELECT,
          });
          if (countryExistente.length != 0) {
            try {
              const data = await sequelize.query("UPDATE countries SET active=? WHERE id_country=?", {
                replacements: [active, idCountry],
                type: sequelize.QueryTypes.UPDATE,
              });
              res.status(200).json({ msj: "Pais desactivado exitosamente" });
            } catch (err) {
              console.log("error" + err);
            }
          } else {
            res.status(400).json({ msj: "Id pais erroneo - No se encuentra en Base de Datos" });
          }
        } catch (err) {
          console.log("error" + err);
        }
      } else {
        res.status(400).json({ msj: "El pais esta en uso, no esta permitido eliminarlo" });
      }
    } catch (error) {
      console.log("error" + err);
    }
  },
  deleteRegion: async(req,res) =>{
    const idRegion = req.params.id_region;
    const active = 0;
    try {
      const regionUse = await sequelize.query("SELECT id_region FROM countries WHERE id_region=? AND active=1 ", {
        replacements: [idRegion],
        type: sequelize.QueryTypes.SELECT,
      });
      if (regionUse.length == 0) {
        try {
          const regionExistente = await sequelize.query("SELECT id_region FROM regions WHERE id_region=?", {
            replacements: [idRegion],
            type: sequelize.QueryTypes.SELECT,
          });
          if (regionExistente.length != 0) {
            try {
              const data = await sequelize.query("UPDATE regions SET active=? WHERE id_region=?", {
                replacements: [active, idRegion],
                type: sequelize.QueryTypes.UPDATE,
              });
              res.status(200).json({ msj: "Region desactivada exitosamente" });
            } catch (err) {
              console.log("error" + err);
            }
          } else {
            res.status(400).json({ msj: "Id region erroneo - No se encuentra en Base de Datos" });
          }
        } catch (err) {
          console.log("error" + err);
        }
      } else {
        res.status(400).json({ msj: "La region esta en uso, no esta permitido eliminarla" });
      }
    } catch (error) {
      console.log("error" + err);
    }
  }
}
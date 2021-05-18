const sequelize = require("../conexion.js");

module.exports = {
  createCompany: async (req, res) => {
    const { name, address, email, phone, id_city } = req.body;
    const active = 1;
    try {
      const companyExistente = await sequelize.query("SELECT name FROM companies WHERE name=?", {
        replacements: [name],
        type: sequelize.QueryTypes.SELECT,
      });
      if (companyExistente.length == 0) {
        try {
          const data = await sequelize.query(
            "INSERT INTO companies (name,address,email,phone,id_city,active) VALUES (?,?,?,?,?,?)",
            {
              replacements: [name, address, email, phone, id_city, active],
              type: sequelize.QueryTypes.INSERT,
            }
          );
          res.status(201).json({ msj: "Compañia creada exitosamente" });
        } catch (err) {
          console.log("error" + err);
        }
      } else {
        res.status(400).json({ msj: "Compañia existente - registrada" });
      }
    } catch (err) {
      console.log("error" + err);
    }
  },
  getCompany: async (req, res) => {
    try {
      const companyCompleto = await sequelize.query(
        "SELECT companies.id_company,companies.name,companies.address,companies.email,companies.phone,companies.id_city,cities.name AS nombre_ciudad,countries.id_country,countries.name AS nombre_pais,regions.id_region,regions.name AS nombre_region FROM companies INNER JOIN cities ON companies.id_city=cities.id_city INNER JOIN countries ON cities.id_country=countries.id_country INNER JOIN regions ON countries.id_region=regions.id_region WHERE companies.active=1",
        {
          type: sequelize.QueryTypes.SELECT,
        }
      );
      res.status(200).json(companyCompleto);
    } catch (err) {
      console.log("error" + err);
    }
  },
  updateCompany: async (req, res) => {
    const { name, address, email, phone, id_city } = req.body;
    const idCompany = req.params.id_company;
    try {
      const companyExistente = await sequelize.query("SELECT id_company FROM companies WHERE id_company=?", {
        replacements: [idCompany],
        type: sequelize.QueryTypes.SELECT,
      });
      if (companyExistente.length != 0) {
        if (name && address && email && phone && id_city) {
          try {
            const data = await sequelize.query(
              "UPDATE companies SET name=?, address=?, email=?, phone=?, id_city=? WHERE id_company=?",
              {
                replacements: [name, address, email, phone, id_city, idCompany],
                type: sequelize.QueryTypes.UPDATE,
              }
            );
            console.log(data);
            res.status(200).json({ msj: "Compañia modificada exitosamente" });
          } catch (err) {
            console.log("error" + err);
          }
        } else {
          res.status(400).json({ msj: "Todos los campos deben estar completos" });
        }
      } else {
        res.status(400).json({ msj: "Id compañia erroneo - No se encuentra en Base de Datos" });
      }
    } catch (err) {
      console.log("error" + err);
    }
  },
  deleteCompany: async (req, res) => {
    const idCompany = req.params.id_company;
    const active = 0;
    try {
      const companyUse = await sequelize.query("SELECT id_company FROM contacts WHERE id_company=? AND active=1 ", {
        replacements: [idCompany],
        type: sequelize.QueryTypes.SELECT,
      });
      if (companyUse.length == 0) {
        try {
          const companyExistente = await sequelize.query("SELECT id_company FROM companies WHERE id_company=?", {
            replacements: [idCompany],
            type: sequelize.QueryTypes.SELECT,
          });
          if (companyExistente.length != 0) {
            try {
              const data = await sequelize.query("UPDATE companies SET active=? WHERE id_company=?", {
                replacements: [active, idCompany],
                type: sequelize.QueryTypes.UPDATE,
              });
              res.status(200).json({ msj: "Compañia desactivada exitosamente" });
            } catch (err) {
              console.log("error" + err);
            }
          } else {
            res.status(400).json({ msj: "Id compañia erroneo - No se encuentra en Base de Datos" });
          }
        } catch (err) {
          console.log("error" + err);
        }
      } else {
        res.status(400).json({ msj: "La compañia esta en uso, no esta permitido eliminarla" });
      }
    } catch (error) {
      console.log("error" + err);
    }
  },
};

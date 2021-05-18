const sequelize = require("../conexion.js");

module.exports = {
  createContact: async (req, res) => {
    const {
      fname,
      lname,
      position,
      email,
      id_company,
      id_city,
      address,
      account_phone,
      account_whatsapp,
      account_instagram,
      account_facebook,
      account_linkedin,
    } = req.body;
    const active = 1;
    const interest = req.body.interest ? req.body.interest : 0;
    const preference_phone = req.body.preference_phone ? req.body.preference_phone : 1;
    const preference_whatsapp = req.body.preference_whatsapp ? req.body.preference_whatsapp : 1;
    const preference_instagram = req.body.preference_instagram ? req.body.preference_instagram : 1;
    const preference_facebook = req.body.preference_facebook ? req.body.preference_facebook : 1;
    const preference_linkedin = req.body.preference_linkedin ? req.body.preference_linkedin : 1;
    try {
      const contactExistente = await sequelize.query("SELECT email FROM contacts WHERE email=?", {
        replacements: [email],
        type: sequelize.QueryTypes.SELECT,
      });
      if (contactExistente.length == 0) {
        try {
          const data = await sequelize.query(
            "INSERT INTO contacts (fname,lname,position,email,id_company,id_city,address,interest,account_phone,preference_phone,account_whatsapp,preference_whatsapp,account_instagram,preference_instagram,account_facebook,preference_facebook,account_linkedin,preference_linkedin,active) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
            {
              replacements: [
                fname,
                lname,
                position,
                email,
                id_company,
                id_city,
                interest,
                address,
                account_phone,
                preference_phone,
                account_whatsapp,
                preference_whatsapp,
                account_instagram,
                preference_instagram,
                account_facebook,
                preference_facebook,
                account_linkedin,
                preference_linkedin,
                active,
              ],
              type: sequelize.QueryTypes.INSERT,
            }
          );
          res.status(201).json({ msj: "Contacto creado exitosamente" });
        } catch (err) {
          console.log("error" + err);
        }
      } else {
        res.status(400).json({ msj: "Contacto existente - Correo registrado" });
      }
    } catch (err) {
      console.log("error" + err);
    }
  },
  getContact: async (req, res) => {
    try {
      const contactCompleto = await sequelize.query(
        "SELECT contacts.id_contact,contacts.fname,contacts.lname,contacts.position,contacts.email,contacts.id_company,companies.name AS nombre_compania,contacts.id_city,cities.name AS nombre_ciudad,countries.id_country,countries.name AS nombre_pais,regions.id_region,regions.name AS nombre_region,contacts.address,contacts.interest,contacts.account_phone,contacts.preference_phone,pre_pho.name AS preferencia_phone,contacts.account_whatsapp,contacts.preference_whatsapp,pre_wha.name AS preferencia_whatsapp,contacts.account_instagram,contacts.preference_instagram,pre_ins.name AS preferencia_instagram,contacts.account_facebook,contacts.preference_facebook,pre_fac.name AS preferencia_facebook,contacts.account_linkedin,contacts.preference_linkedin,pre_lin.name AS preferencia_linkedin FROM contacts INNER JOIN companies ON contacts.id_company=companies.id_company INNER JOIN preferences AS pre_pho ON contacts.preference_phone=pre_pho.id_preference INNER JOIN preferences AS pre_wha ON contacts.preference_whatsapp=pre_wha.id_preference INNER JOIN preferences AS pre_ins ON contacts.preference_instagram=pre_ins.id_preference INNER JOIN preferences AS pre_fac ON contacts.preference_facebook=pre_fac.id_preference INNER JOIN preferences AS pre_lin ON contacts.preference_linkedin=pre_lin.id_preference INNER JOIN cities ON contacts.id_city=cities.id_city INNER JOIN countries ON cities.id_country=countries.id_country INNER JOIN regions ON countries.id_region=regions.id_region WHERE contacts.active=1",
        {
          type: sequelize.QueryTypes.SELECT,
        }
      );
      res.status(200).json(contactCompleto);
    } catch (err) {
      console.log("error" + err);
    }
  },
  updateContact: async (req, res) => {
    const {
      fname,
      lname,
      position,
      email,
      id_company,
      id_city,
      interest,
      account_phone,
      account_whatsapp,
      account_instagram,
      account_facebook,
      account_linkedin,
    } = req.body;
    const idContact = req.params.id_contact;
    const preference_phone = req.body.preference_phone ? req.body.preference_phone : 1;
    const preference_whatsapp = req.body.preference_whatsapp ? req.body.preference_whatsapp : 1;
    const preference_instagram = req.body.preference_instagram ? req.body.preference_instagram : 1;
    const preference_facebook = req.body.preference_facebook ? req.body.preference_facebook : 1;
    const preference_linkedin = req.body.preference_linkedin ? req.body.preference_linkedin : 1;
    try {
      const contactExistente = await sequelize.query("SELECT id_contact FROM contacts WHERE id_contact=?", {
        replacements: [idContact],
        type: sequelize.QueryTypes.SELECT,
      });
      if (contactExistente.length != 0) {
        if (
          fname &&
          lname &&
          position &&
          email &&
          id_company &&
          id_city &&
          interest &&
          preference_phone &&
          preference_whatsapp &&
          preference_instagram &&
          preference_facebook &&
          preference_linkedin
        ) {
          try {
            const data = await sequelize.query(
              "UPDATE contacts SET fname=?, lname=?, position=?, email=?, id_company=?, id_city=?, interest=?, account_phone=?, preference_phone=?, account_whatsapp=?, preference_whatsapp=?, account_instagram=?, preference_instagram=?,account_facebook=?,  preference_facebook=?,account_linkedin=?,  preference_linkedin=? WHERE id_contact=?",
              {
                replacements: [
                  fname,
                  lname,
                  position,
                  email,
                  id_company,
                  id_city,
                  interest,
                  account_phone,
                  preference_phone,
                  account_whatsapp,
                  preference_whatsapp,
                  account_instagram,
                  preference_instagram,
                  account_facebook,
                  preference_facebook,
                  account_linkedin,
                  preference_linkedin,
                  idContact,
                ],
                type: sequelize.QueryTypes.UPDATE,
              }
            );
            console.log(data);
            res.status(200).json({ msj: "Contacto modificado exitosamente" });
          } catch (err) {
            console.log("error" + err);
          }
        } else {
          res.status(400).json({ msj: "Todos los campos deben estar completos" });
        }
      } else {
        res.status(400).json({ msj: "Id contacto erroneo - No se encuentra en Base de Datos" });
      }
    } catch (err) {
      console.log("error" + err);
    }
  },
  deleteContact: async (req, res) => {
    const idContact = req.params.id_contact;
    const active = 0;
    try {
      const contactExistente = await sequelize.query("SELECT id_contact FROM contacts WHERE id_contact=?", {
        replacements: [idContact],
        type: sequelize.QueryTypes.SELECT,
      });
      if (contactExistente.length != 0) {
        try {
          const data = await sequelize.query("UPDATE contacts SET active=? WHERE id_contact=?", {
            replacements: [active, idContact],
            type: sequelize.QueryTypes.UPDATE,
          });
          res.status(200).json({ msj: "Contacto desactivado exitosamente" });
        } catch (err) {
          console.log("error" + err);
        }
      } else {
        res.status(400).json({ msj: "Id contacto erroneo - No se encuentra en Base de Datos" });
      }
    } catch (err) {
      console.log("error" + err);
    }
  },
};

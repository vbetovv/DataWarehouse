const sequelize = require("../conexion");
const jwt = require("jsonwebtoken");
const tokenKey = "keyParaEncriptacionJWToken";

module.exports = {
  createUser: async (req, res) => {
    const { fname, lname, email, pass, admin } = req.body;
    const active = 1;
    try {
      const userExistente = await sequelize.query("SELECT email FROM users WHERE email=?", {
        replacements: [email],
        type: sequelize.QueryTypes.SELECT,
      });
      if (userExistente.length == 0) {
        try {
          const data = await sequelize.query(
            "INSERT INTO users (fname,lname,email,pass,admin,active) VALUES (?,?,?,?,?,?)",
            {
              replacements: [fname, lname, email, pass, admin, active],
              type: sequelize.QueryTypes.INSERT,
            }
          );
          res.status(201).json({ msj: "Usuario creado exitosamente" });
        } catch (err) {
          console.log("error" + err);
        }
      } else {
        res.status(400).json({ msj: "Usuario existente - Correo registrado" });
      }
    } catch (err) {
      console.log("error" + err);
    }
  },
  logIn: async (req, res) => {
    const { email, pass } = req.body;
    try {
      const data = await sequelize.query("SELECT * FROM users WHERE email=? AND pass=?", {
        replacements: [email, pass],
        type: sequelize.QueryTypes.SELECT,
      });
      if (data.length == 0) {
        res.status(401).json({ msj: "Error en LogIn" });
      } else {
        const dataToken = {
          id_user: data[0].id_user,
          email: data[0].email,
          fname: data[0].fname,
          lname: data[0].lname,
          admin: data[0].admin,
        };
        infoToken = jwt.sign(dataToken, tokenKey, { expiresIn: "365d" });
        // console.log(infoToken);
        // console.log(dataToken);
        res.status(200).json({ msj: "Usuario logueado exitosamente", token: infoToken, admin: data[0].admin });
      }
    } catch (err) {
      console.log("error" + err);
    }
  },
  getUser: async (req, res) => {
    try {
      const userCompleto = await sequelize.query("SELECT id_user,fname,lname,email,admin FROM users WHERE active=1", {
        type: sequelize.QueryTypes.SELECT,
      });
      res.status(200).json(userCompleto);
    } catch (err) {
      console.log("error" + err);
    }
  },
  updateUser: async (req, res) => {
    const { fname, lname, email, pass } = req.body;
    const admin = req.body.admin ? req.body.admin : 0;
    const idUser = req.params.id_user;
    try {
      const usuarioExistente = await sequelize.query("SELECT id_user FROM users WHERE id_user=?", {
        replacements: [idUser],
        type: sequelize.QueryTypes.SELECT,
      });
      if (usuarioExistente.length != 0) {
        if (fname && lname && email && pass) {
          try {
            const data = await sequelize.query(
              "UPDATE users SET fname=?, lname=?, email=?, pass=?,admin=? WHERE id_user=?",
              {
                replacements: [fname, lname, email, pass, admin, idUser],
                type: sequelize.QueryTypes.UPDATE,
              }
            );
            console.log(data);
            res.status(200).json({ msj: "Usuario modificado exitosamente" });
          } catch (err) {
            console.log("error" + err);
          }
        } else {
          res.status(400).json({ msj: "Todos los campos deben estar completos" });
        }
      } else {
        res.status(400).json({ msj: "Id usuario erroneo - No se encuentra en Base de Datos" });
      }
    } catch (err) {
      console.log("error" + err);
    }
  },
  deleteUser: async (req, res) => {
    const idUser = req.params.id_user;
    const active = 0;
    try {
      const productExistente = await sequelize.query("SELECT id_user FROM users WHERE id_user=?", {
        replacements: [idUser],
        type: sequelize.QueryTypes.SELECT,
      });
      if (productExistente.length != 0) {
        try {
          const data = await sequelize.query("UPDATE users SET active=? WHERE id_user=?", {
            replacements: [active, idUser],
            type: sequelize.QueryTypes.UPDATE,
          });
          res.status(200).json({ msj: "Usuario desactivado exitosamente" });
        } catch (err) {
          console.log("error" + err);
        }
      } else {
        res.status(400).json({ msj: "Id usuario erroneo - No se encuentra en Base de Datos" });
      }
    } catch (err) {
      console.log("error" + err);
    }
  },
};

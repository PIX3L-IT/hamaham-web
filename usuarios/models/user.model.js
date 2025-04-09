const mongoose = require("mongoose");

const usuarioSchema = new mongoose.Schema(
  {
    IDUsuario: { type: String },
    Email: { type: String, required: true },
    Nombre: { type: String },
    FirebaseUID: { type: String }
  },
  {
    collection: "Usuario",
  }
);

const Usuario = mongoose.model("Usuario", usuarioSchema);

module.exports = Usuario;
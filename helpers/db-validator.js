const Usuario = require ('../models/user.model');

const emailExiste = async (correo = '') => {

    const existeEmail = await Usuario.findOne({ correo });
    if (existeEmail) {
      throw new Error (`El correo ${correo} ya esta registrado`);
    }

}

const existeUsuarioPorId = async (id ) => {

  const existeUsuario = await Usuario.findById(id);
  if (!existeUsuario) {
    throw new Error (`El id :${id} no existe`);
  }

}

module.exports = {
    emailExiste,
    existeUsuarioPorId
}
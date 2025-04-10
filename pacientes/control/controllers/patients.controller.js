exports.get_patients = async (request, response, next) => {
    try {
        // Llama al servicio Feathers para obtener todos los patients
        const patients = await request.app.service('api/patients').find();
        // Renderiza la vista EJS
        response.render('patients-list', { patients });
  } catch (error) {
        console.error(error.message);
        response.status(500).render('500'); // Tu vista de error
  }
};

exports.get_agregar_patient = async (request, response, next) => {
    response.render('patients-create');
};

exports.post_agregar_patient = async (request, response, next) => {
    try {
        const { IdPatient, Email, Name } = request.body;

        await request.app.service('api/patients').create({ 
            IdPatient, 
            Email, 
            Name  
      });
        response.redirect('/patients');
  } catch (error) {
        console.error(error.message);
        response.status(500).render('500');
  }
};

exports.get_modificar_patient = async (request, response, next) => {
    try {
        const id = request.params.id;
        // Obtiene un patient específico
        const patient = await request.app.service('api/patients').get(id);
        response.render('patients-edit', { patient });
  } catch (error) {
        console.error(error.message);
        response.status(500).render('500');
  }
};

exports.patch_modificar_patient = async (request, response, next) => {
    try {
        const id = request.params.id;
        const { IdPatient, Email, Name } = request.body;
        // Actualiza solo campos específicos con patch
        await request.app.service('api/patients').patch(
            id,
            { IdPatient, Email, Name }
      );
        response.redirect('/patients');
  } catch (error) {
        console.error(error.message);
        response.status(500).render('500');
  }
};

exports.delete_eliminar_patient = async (request, response, next) => {
    try {
        const id = request.params.id;
        await request.app.service('api/patients').remove(id);
        response.redirect('/patients');
  } catch (error) {
        console.error(error.message);
        response.status(500).render('500');
  }
};
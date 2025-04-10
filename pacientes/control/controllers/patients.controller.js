const sanitize = require('mongo-sanitize');

exports.get_patients = async (request, response, next) => {
  try {
    const patients = await request.app.service('api/patients').find();
    response.render('patients-list', { patients });
  } catch (error) {
    console.error(error.message);
    response.status(500).render('500');
  }
};

exports.get_agregar_patient = async (request, response, next) => {
  response.render('patients-create');
};

exports.post_agregar_patient = async (request, response, next) => {
  try {
    const IdPatient = sanitize(request.body.IdPatient);
    const Email = sanitize(request.body.Email);
    const Name = sanitize(request.body.Name);

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
    const id = sanitize(request.params.id);
    const patient = await request.app.service('api/patients').get(id);
    response.render('patients-edit', { patient });
  } catch (error) {
    console.error(error.message);
    response.status(500).render('500');
  }
};

exports.patch_modificar_patient = async (request, response, next) => {
  try {
    const id = sanitize(request.params.id);
    const IdPatient = sanitize(request.body.IdPatient);
    const Email = sanitize(request.body.Email);
    const Name = sanitize(request.body.Name);

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
    const id = sanitize(request.params.id);
    await request.app.service('api/patients').remove(id);
    response.redirect('/patients');
  } catch (error) {
    console.error(error.message);
    response.status(500).render('500');
  }
};

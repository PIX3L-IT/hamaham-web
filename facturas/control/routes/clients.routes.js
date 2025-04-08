const express = require('express');
const clienteController = require('../controllers/clients.controller');

const router = express.Router();


// Agregar Cliente
router.get('/facturama/agregar-cliente', clienteController.getAddClient);

router.post('/facturama/agregar-cliente', clienteController.postAddClient);

// Ver Clientes
router.get('/facturama/clientes/get-clients', clienteController.getClientList);

router.get('/facturama/clientes', clienteController.getSeeClients);

// Editar Cliente
router.get('/facturama/editar-cliente-info/:id', clienteController.getClientInfo);

router.get('/facturama/editar-cliente/:id', clienteController.getEditClient);

router.put('/facturama/editar-cliente/:id', clienteController.putEditClient);

// Eliminar cliente

router.get('/facturama/consultar-cliente/:id', clienteController.getDeleteClient);

router.delete('/facturama/eliminar-cliente/:id', clienteController.deleteDeleteClient);

module.exports = router;
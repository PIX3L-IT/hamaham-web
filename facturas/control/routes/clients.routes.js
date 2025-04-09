const express = require('express');
const clienteController = require('../controllers/clients.controller');

const router = express.Router();


// Agregar Cliente
router.get('/agregar-cliente', clienteController.getAddClient);

router.post('/agregar-cliente', clienteController.postAddClient);

// Ver Clientes
router.get('/get-clients', clienteController.getClientList);

router.get('/', clienteController.getSeeClients);

// Editar Cliente
router.get('/editar-cliente-info/:id', clienteController.getClientInfo);

router.get('/editar-cliente/:id', clienteController.getEditClient);

router.put('/editar-cliente/:id', clienteController.putEditClient);

// Eliminar cliente

router.get('/consultar-cliente/:id', clienteController.getDeleteClient);

router.delete('/eliminar-cliente/:id', clienteController.deleteDeleteClient);

module.exports = router;
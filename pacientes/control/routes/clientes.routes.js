const express = require('express');
const clienteController = require('../controllers/clientes.controller');

const router = express.Router();


// Agregar Cliente
router.get('/facturama/agregar-cliente', clienteController.get_agregar_cliente);

router.post('/facturama/agregar-cliente', clienteController.post_agregar_cliente);

// Ver Clientes
router.get('/facturama/clientes/get-clients', clienteController.get_lista_clientes);

router.get('/facturama/clientes', clienteController.get_ver_clientes);

// Editar Cliente
router.get('/facturama/editar-cliente-info/:id', clienteController.get_info_cliente);

router.get('/facturama/editar-cliente/:id', clienteController.get_editar_cliente);

router.put('/facturama/editar-cliente/:id', clienteController.put_editar_cliente);

// Eliminar cliente

router.get('/facturama/consultar-cliente/:id', clienteController.get_eliminar_cliente);

router.delete('/facturama/eliminar-cliente/:id', clienteController.delete_eliminar_cliente);

module.exports = router;
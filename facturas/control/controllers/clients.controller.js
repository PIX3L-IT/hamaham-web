const axios = require('axios');
require("dotenv").config();

// Agregar Cliente
exports.getAddClient = async (req, res, next) => {
    try {
        res.render('add-client');
    } catch (error) {
        console.error('Error calling API:', error.message);
        res.status(500).json({ error: 'Failed to GET' });
    }
}

exports.postAddClient = async (req, res, next) => {
    try {
        const clientData = {
            Email: req.body.Email,
            Address: req.body.Address,
            Rfc: req.body.Rfc,
            Name: req.body.Name,
            CfdiUse: req.body.CfdiUse
        }

        const response = await axios.post('https://apisandbox.facturama.mx/Client', 
            clientData, 
            {
                auth: {
                    username: process.env.FACTURAMA_USERNAME,
                    password: process.env.FACTURAMA_PASSWORD
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            }   
        );
        res.json({
            message: "Éxito",
            facturamaResponse: response.data
        });
    } catch (error) {
        console.error('Error:', error.message);
        console.error('Response Data:', error.response?.data);
        res.status(500).json({ error: 'Failed to POST' });
    }
};

// Ver Clientes
exports.getClientList = async (req, res, next) => {
    try {
        const response = await axios.get('https://apisandbox.facturama.mx/Clients/', {
            auth: {
                username: process.env.FACTURAMA_USERNAME,
                password: process.env.FACTURAMA_PASSWORD
            },
            headers: {
                'Content-Type': 'application/json'
            }
        })
        res.json(response.data);
    } catch (error) {
        console.log(error.message);
        console.log('Response Data:', error.response?.data);
    }
}

exports.getSeeClients = async (req, res, next) => {
    try {
        const response = await axios.get('https://apisandbox.facturama.mx/Clients/', {
            auth: {
                username: process.env.FACTURAMA_USERNAME,
                password: process.env.FACTURAMA_PASSWORD
            },
            headers: {
                'Content-Type': 'application/json'
            }
        })
        res.render('see-client');
    } catch (error) {
        console.log(error.message);
        console.log('Response Data:', error.response?.data);
    }
}

// Editar Cliente
exports.getClientInfo = async (req, res, next) => {
    try {
        const { id } = req.params;

        const response = await axios.get(`https://apisandbox.facturama.mx/client/${id}`, {
            auth: {
                username: process.env.FACTURAMA_USERNAME,
                password: process.env.FACTURAMA_PASSWORD
            },
            headers: {
                'Content-Type': 'application/json'
            }
        })
        res.json(response.data);
    } catch (error) {
        console.error('Error calling API:', error.message);
        res.status(500).json({ error: 'Failed to GET' });
    }
};

exports.getEditClient = async (req, res, next) => {
    try {
        res.render('edit-client', {
            id: req.params.id,
        });
    } catch (error) {
        console.error('Error calling API:', error.message);
        res.status(500).json({ error: 'Failed to GET' });
    }
}

exports.putEditClient = async (req, res, next) => {
    try {
        const clientData = {
            Id: req.params.id,
            Address: req.body.Address,
            Rfc: req.body.Rfc,
            Name: req.body.Name,
            Email: req.body.Email,
            CfdiUse: req.body.CfdiUse,
            TaxZipCode: req.body.Address.ZipCode
        }

        const response = await axios.put(`https://apisandbox.facturama.mx/Client/${req.params.id}`, 
            clientData, 
            {
                auth: {
                    username: process.env.FACTURAMA_USERNAME,
                    password: process.env.FACTURAMA_PASSWORD
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            }   
        );
        res.json({
            message: "Éxito",
            facturamaResponse: response.data
        });
    } catch (error) {
        console.error('Error:', error.message);
        console.error('Response Data:', error.response?.data);
        res.status(500).json({ error: 'Failed to PUT' });
    }
}

// Eliminar cliente

exports.getDeleteClient = async (req, res, next) => {
    try {
        res.render('consult-client', 
            {
                id: req.params.id
            }
        );
    } catch (error) {
        console.error('Error:', error.message);
        console.error('Response Data:', error.response?.data);
    }
}

exports.deleteDeleteClient = async (req, res, next) => {
    try {

        const response = await axios.delete(`https://apisandbox.facturama.mx/Client/${req.params.id}`,
            {
                auth: {
                    username: process.env.FACTURAMA_USERNAME,
                    password: process.env.FACTURAMA_PASSWORD
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            }   
        );
        res.json({
            message: 'Éxito eliminando cliente',
            response: response.data
        });
    } catch (error){
        console.error('Error:', error.message);
        console.error('Response Data:', error.response?.data);
    }
}
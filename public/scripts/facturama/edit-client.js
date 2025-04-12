const clientId = document.getElementById('id').value;

        fetch(`/clientes/editar-cliente-info/${clientId}`)
        .then(response => response.json())
        .then(client => {
            document.querySelector('input[name="Email"]').value = client.Email || ''
            document.querySelector('input[name="Street"]').value = client.Address.Street || ''
            document.querySelector('input[name="ExteriorNumber"]').value = client.Address.ExteriorNumber || ''
            document.querySelector('input[name="Neighborhood"]').value = client.Address.Neighborhood || ''
            document.querySelector('input[name="ZipCode"]').value = client.Address.ZipCode || ''
            document.querySelector('input[name="Municipality"]').value = client.Address.Municipality || ''
            document.querySelector('input[name="State"]').value = client.Address.State || ''
            document.querySelector('input[name="Country"]').value = client.Address.Country || ''
            document.querySelector('input[name="Rfc"]').value = client.Rfc || ''
            document.querySelector('input[name="Name"]').value = client.Name || ''
            document.querySelector('input[name="CfdiUse"]').value = client.CfdiUse || ''
        })


        const Form = document.getElementById('clienteForm');
        Form.addEventListener('submit', function(event) {
            event.preventDefault(); // Prevenir acciones predeterminadas de Form

            const form = event.target;
            const formData = new FormData(form);

            const data = {
                Id: clientId,
                Address: {
                    Street: formData.get("Street"),
                    ExteriorNumber: formData.get("ExteriorNumber"),
                    Neighborhood: formData.get("Neighborhood"),
                    ZipCode: formData.get("ZipCode"),
                    Municipality: formData.get("Municipality"),
                    State: formData.get("State"),
                    Country: formData.get("Country")
                },
                Rfc: formData.get("Rfc"),
                Name: formData.get("Name"),
                Email: formData.get("Email"),
                CfdiUse: formData.get("CfdiUse"),
                TaxZipCode: formData.get("ZipCode")
            }

            fetch(`/clientes/editar-cliente/${clientId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data)
            })
            .then(response => response.json())
            .then(result => {
                console.log("Server Response:", result);
            })
        })
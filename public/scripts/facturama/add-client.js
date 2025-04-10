const Form = document.getElementById('clienteForm');
        Form.addEventListener('submit', function(event) {
            event.preventDefault(); // Prevenir acciones predeterminadas de Form

            const form = event.target;
            const formData = new FormData(form);

            const data = {
                Email: formData.get("Email"),
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
                CfdiUse: formData.get("CfdiUse")
            }

            fetch("/agregar-cliente", {
                method: "POST",
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
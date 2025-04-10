const lista = document.getElementById('lista');
    fetch('/clientes/get-clients')
    .then(response => response.json())
    .then(data => {
        for (let user of data.data) {
            lista.innerHTML += `
                <li>
                ${user.Name} <a href="/clientes/editar-cliente/${user.Id}">Editar</a> <a href="/clientes/consultar-cliente/${user.Id}">Consultar</a>
                </li>
            `
        }
    })
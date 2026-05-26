const id = document.getElementById("id");
const nome = document.getElementById("nome");
const email = document.getElementById("email");
const registros = document.getElementById("registros");
const botoes = document.getElementsByTagName("button");
let lista = [];

Array.from(botoes).forEach(botao => {
    botao.addEventListener("click", () => contatos(botao.innerText));
});

function contatos(evento = null, obj = null) {

    const dadosSalvos = localStorage.getItem("contatos");
    lista = dadosSalvos ? JSON.parse(dadosSalvos) : [];

    if (!Array.isArray(lista)) {
        lista = [];
    }

    if (evento === "Salvar"
        && nome.value.trim() !== ""
        && email.value.trim() !== "") {

        if (id.value === "") {
            let contato = {
                nome: nome.value,
                email: email.value,
            };

            lista.push(contato);
            localStorage.setItem("contatos", JSON.stringify(lista));
        } else {

            let novaLista = [];

            lista.forEach((item, i) => {
                if (Number(id.value) === i) {
                    item.nome = nome.value;
                    item.email = email.value;
                    novaLista.push(item);
                } else {
                    novaLista.push(item);
                }
            });

            localStorage.setItem("contatos", JSON.stringify(novaLista));
            contatos();
        }

        nome.value = "";
        email.value = "";
    } else if (evento === "Editar") {

        let atributo = obj.getAttribute("data-item");

        lista.forEach((item, i) => {
            if (Number(atributo) === i) {
                id.value = i;
                nome.value = item.nome;
                email.value = item.email;
            }
        });

    } else if (evento === "Excluir") {

        let novaLista = [];
        let atributo = obj.getAttribute("data-item");

        lista.forEach((item, i) => {
            if (Number(atributo) !== i) {
                novaLista.push(item);
            }
        });

        localStorage.setItem("contatos", JSON.stringify(novaLista));
        contatos();
    }

    registros.innerHTML = "";

    lista.forEach((item, i) => {

        let tr = document.createElement("tr");

        let tdId = document.createElement("td");
        tdId.textContent = (i + 1);

        let tdNome = document.createElement("td");
        tdNome.textContent = item.nome;

        let tdEmail = document.createElement("td");
        tdEmail.textContent = item.email;

        let btnEditar = document.createElement("button");
        btnEditar.textContent = "Editar";
        btnEditar.classList.add("btn", "btn-sm", "btn-warning", "me-3");
        btnEditar.dataset.item = i;
        btnEditar.addEventListener("click", () => {
            contatos("Editar", btnEditar);
        });

        let btnExcluir = document.createElement("button");
        btnExcluir.textContent = "Excluir";
        btnExcluir.classList.add("btn", "btn-sm", "btn-danger");
        btnExcluir.dataset.item = i;
        btnExcluir.addEventListener("click", () => {
            contatos("Excluir", btnExcluir);
        });

        let tdAcoes = document.createElement("td");
        tdAcoes.append(btnEditar);
        tdAcoes.append(btnExcluir);

        tr.append(tdId);
        tr.append(tdNome);
        tr.append(tdEmail);
        tr.append(tdAcoes);

        registros.append(tr);
    });

    return;
}

contatos();
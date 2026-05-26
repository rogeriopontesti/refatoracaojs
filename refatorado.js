const id = document.getElementById("id");
const nome = document.getElementById("nome");
const email = document.getElementById("email");
const registros = document.getElementById("registros");
const botoes = document.getElementsByTagName("button");
let lista = [];

const dadosSalvos = localStorage.getItem("contatos");
lista = dadosSalvos ? JSON.parse(dadosSalvos) : [];

Array.from(botoes).forEach(botao => {
    botao.addEventListener("click", () => {
        if (id.value.trim() === "") {
            salvar();
        } else {
            atualizar(id.value);
        }
    });
});

function listar() {
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
            contatos("Editar", editar(i));
        });

        let btnExcluir = document.createElement("button");
        btnExcluir.textContent = "Excluir";
        btnExcluir.classList.add("btn", "btn-sm", "btn-danger");
        btnExcluir.dataset.item = i;
        btnExcluir.addEventListener("click", () => {
            contatos("Excluir", excluir(i));
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
}

function salvar() {
    if (nome.value.trim() !== "" && email.value.trim() !== "") {
        let contato = {
            nome: nome.value,
            email: email.value,
        };

        lista.push(contato);
        localStorage.setItem("contatos", JSON.stringify(lista));
    }
    listar();
}

function editar(index) {
    let item = lista[index];
    id.value = index;
    nome.value = item.nome;
    email.value = item.email;
}

function atualizar() {
    lista[id.value.trim()].nome = nome.value.trim();
    lista[id.value.trim()].email = email.value.trim();
    localStorage.setItem("contatos", JSON.stringify(lista));
    listar();
}

function excluir(index) {
    lista.splice(index, 1);
    localStorage.setItem("contatos", JSON.stringify(lista));
    listar();
}

listar();

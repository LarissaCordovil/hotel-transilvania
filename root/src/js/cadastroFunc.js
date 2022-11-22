const cadFunci = document.querySelector("#container-funcionario")

const funcionarios = []

function cadastroFunc(nome, profi) {
    const obj= {
        nome: nome,
        profissao: profi
    }
    funcionarios.push(obj)
}

cadastroFunc("Gabriela Almeida de Souza", "Chef de Cozinha")
cadastroFunc("João Gabriel de Oliveira", "Camareiro")
cadastroFunc("Alice Cristina Damasceno", "Recepcionista")

localStorage.setItem("funci", JSON.stringify(funcionarios))

const funcData = JSON.parse(localStorage.getItem("funci"))
funcData.map((funcionario) => {cadFunci.innerHTML += `<tr><td> ${funcionario.nome}</td> <td> ${funcionario.profissao}</td><tr>`
})
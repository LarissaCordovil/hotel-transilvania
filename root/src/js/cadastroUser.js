const cadUser = document.querySelector("#container-usuario")

const usuarios = []

function cadastroUser(nome, contact) {
    const obj={
        nome: nome,
        contact: contact
    }
    usuarios.push(obj)
}
cadastroUser("Gabriela Almeida de Souza", "(11) 9 8545-6785")
cadastroUser("João Gabriel de Oliveira", "(11) 9 8545-6785")
cadastroUser("Alice Cristina Damasceno", "(11) 9 8545-6785")

const userData = JSON.parse(localStorage.getItem("user"))
userData.map((usuarios) => {
    cadUser.innerHTML += `<tr><td>${usuarios.nome}</td> <td> ${usuarios.contact}</td><tr>`
})

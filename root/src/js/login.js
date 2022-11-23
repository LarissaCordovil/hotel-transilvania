const fields = [document.getElementById("name"), document.getElementById("email"), document.getElementById("password")];
// const form = document.getElementsByTagName("form")[0]
const button = document.getElementsByTagName("button")[0]
let valueField = {
    name: "",
    email: "",
    password: ""
}

export const users = [{
        email: "teste@teste.com",
        senha: "123"
    },
    {
        email: "joao@teste.com",
        senha: "12345"
    }
]

const emptyField = (value, label) => {
    if (value === "") {
        label.innerHTML = "campo vazio."
        label.setAttribute("class", "invalidLabel")
        return
    }
    label.innerHTML = ""
    label.setAttribute("class", "validLabel")
    return
}

const clearValue = (dirtyValue) => {
    const cleanValue = dirtyValue.replace(/'/g, "").replace(/"/g, "").trim()
    return cleanValue
}

const handleField = (event) => {
    const value = clearValue(event.target.value)
    const label = event.target.labels[0]
    switch (event.target.name) {
        case "name":
            valueField.name = value
            break
        case "email":
            valueField.email = value
            break
        case "password":
            valueField.password = value
            break
    }
    emptyField(value, label)
    return
}

const handleButton = (event) => {
    event.preventDefault()
    if (valueField.name != "" && valueField.email != "" && valueField.password != "") {
        let result = false
         users.forEach(user => {if (user.email === valueField.email && user.senha === valueField.password) {
            result = true
         }})
        if (result) {
            for (const [key, value] of Object.entries(valueField)) {
                localStorage.setItem(key.toString(), value)
            }
            window.location = "src/pages/home.html"
            return
        }
        alert("Usuário não cadastrado!")
        return
    }
    alert("Preencha todos os campos!")
    return
}

fields.map(field => {
    field.addEventListener("blur", handleField)
    field.addEventListener("change", handleField)
})

button.addEventListener("click", handleButton)
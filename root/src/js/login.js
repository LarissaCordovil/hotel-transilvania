const fields = [ document.getElementById("name"), document.getElementById("email"), document.getElementById("password") ];
// const form = document.getElementsByTagName("form")[0]
const button = document.getElementsByTagName("button")[0]
let valueField = {
    name: "",
    email: "",
    password: ""
}

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

const handleField = (event) => {
    const value = event.target.value;
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
        for (const [key, value] of Object.entries(valueField)) {
            localStorage.setItem(key.toString(), value)
          }
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


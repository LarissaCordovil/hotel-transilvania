const fields = [ document.getElementById("name"), document.getElementById("email"), document.getElementById("password") ];

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
    emptyField(value, label)
    return
}

fields.map(field => {
    field.addEventListener("blur", handleField)
    field.addEventListener("change", handleField)
})
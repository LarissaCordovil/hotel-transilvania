const storage = window.localStorage
const form = document.getElementById('form-cadastrar-funcionarios')

const alertPlaceholder = document.getElementById('liveAlertPlaceholder')

const alert = (message, type) => {
    const wrapper = document.createElement('div')
    wrapper.innerHTML = [
        `<div class="alert alert-${type} alert-dismissible" role="alert">`,
        `   <div>${message}</div>`,
        '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
        '</div>'
    ].join('')

    alertPlaceholder.append(wrapper)
}

form.addEventListener('submit', (a) => {
    a.preventDefault()
    let formValues = new FormData(form)

    let data = {
        codigo: formValues.get('codigo'),
        nome: formValues.get('nome'),
        tempoEmpresa: formValues.get('tempoEmpresa'),
        funcao: formValues.get('funcao'),
        ferias: formValues.get('ferias'),
        afmed1: formValues.get('afmed1'),
    }

    if (data.nome !== '' && data.email !== '') {
        let funcionarios = JSON.parse(storage.getItem('funcionarios')) || []
        storage.setItem('funcionarios', JSON.stringify([...funcionarios, data]))

        alert('Conta criada com sucesso!', 'success')
        form.reset()

    } else {
        alert('Preencha os campos obrigatórios')
    }
})


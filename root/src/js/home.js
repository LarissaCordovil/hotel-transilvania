const storage = window.localStorage
const form = document.getElementById('form-cadastrar-clientes')

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


const alreadyLogged = () => {
    const modal = new bootstrap.Modal(document.getElementById('randomImagesModal'))
    const div = document.querySelector('.image-in-modal')

    const sorteio = Math.floor(Math.random() * 10) + 1

    div.style.backgroundImage = `url(../../images/quarto${sorteio}.jpeg)`

    modal.show()
}

const telFormatter = (e) => {
    e.target.value = e.target.value.replace(/[^\d]/g, "")
    e.target.value = e.target.value.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3")
}

document.getElementById('telefone').addEventListener('change', (e) => {
    telFormatter(e)
})


form.addEventListener('submit', (a) => {
    a.preventDefault()
    let formValues = new FormData(form)

    let data = {
        nome: formValues.get('nome'),
        email: formValues.get('email'),
        telefone: formValues.get('telefone'),
        data_de_nascimento: formValues.get('data_de_nascimento'),
        nacionalidade: formValues.get('nacionalidade'),
        genero: formValues.get('genero'),
        endereco: formValues.get('endereco'),
        notificacao_por_email: formValues.get('notificacao_por_email')
    }

    if (data.nome !== '' && data.email !== '') {
        let clientes = JSON.parse(storage.getItem('clientes')) || []
        storage.setItem('clientes', JSON.stringify([...clientes, data]))

        alert('Conta criada com sucesso!', 'success')
        form.reset()

    } else {
        alert('Preencha os campos obrigatórios')
    }
})










if (storage.length === 0) {
    alert('Ops... Você precisa estar logado para acessar essa página')
    window.location.href = '/root'
} else {
    const user = storage
    const session = window.sessionStorage

    if (session.getItem('saudacoes') !== user.email) {
        alert(`Bem vindo ${user.name}`)
        session.setItem('saudacoes', user.email)
        alreadyLogged()
    }

}
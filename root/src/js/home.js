const storage = window.localStorage

const alreadyLogged = () => {
    const modal = new bootstrap.Modal(document.getElementById('randomImagesModal'))
    const div = document.querySelector('.image-in-modal')

    const sorteio = Math.floor(Math.random() * 10) + 1

    div.style.backgroundImage = `url(../../images/quarto${sorteio}.jpeg)`

    modal.show()
}












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
const storage = window.localStorage

if (storage.length === 0) {
    alert('Ops... Você precisa estar logado para acessar essa página')
    window.location.href = '/root'
} else {
    const user = storage
    const session = window.sessionStorage

    if (session.getItem('saudacoes') !== user.email) {
        alert(`Bem vindo ${user.name}`)
        session.setItem('saudacoes', user.email)
    }

}
const admin = JSON.parse(localStorage.getItem('admin')) || null


if (admin === null) {
    alert('Ops... Você precisa estar logado para acessar essa página')
    window.location.href = '/root/admin/login.html'
} else {

    if (sessionStorage.getItem('saudacoes-admin') !== admin.email) {
        alert(`Bem vindo ${admin.nome}`)
        sessionStorage.setItem('saudacoes-admin', admin.email)
    }

}


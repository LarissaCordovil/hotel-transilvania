const admins = [
    {
        nome: 'Flaviano',
        email: 'Flaviano@gmail.com',
        senha: 'Flaviano@gmail.com'
    }
]

const form = document.querySelectorAll('form')[0]

form.addEventListener('submit', (e) => {
    e.preventDefault()

    const formData = new FormData(form)

    const data = Object.fromEntries(formData)

    data.email = data.email.replaceAll(/[' "]/g, "")

    if (data.email !== '' && data.password !== '') {

        const newUser = admins.find(val => val.email === data.email && val.senha === data.password)


        if (newUser === undefined) alert('Email ou senha incorretos. Tente novamente :D')
        else {
            localStorage.setItem('admin', JSON.stringify(newUser))
            window.location.href = `/root/admin/home.html`
        }

    } else {
        alert('Você precisa preencher todos os campos')
    }
})



// 'TEST E@TESTE.COM"  teste@teste.com

// {
//     "email": "teste@teste.com",
//     "password": "123"
// }

// {
//     "nome": "Flaviano",
//     "email": "Flaviano@gmail.com",
//     "senha": "Flaviano@gmail.com"
// }
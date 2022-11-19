const sendForm = () => {

    const tel = document.getElementById('tel')
    const checkin = document.getElementById('checkin')
    const checkout = document.getElementById('checkout')
    const adultos = document.getElementById('adultos')
    const criancas = document.getElementById('criancas')

    const form = document.getElementById('form-reserva')
    const defaultValues = [{ room: 'executive', val: 120 }, { room: 'classic', val: 160 }, { room: 'premium', val: 200 }]


    const telFormatter = () => {
        tel.value = tel.value.replace(/[^\d]/g, "")
        tel.value = tel.value.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3")
    }

    const formatDate = d => {
        let data = new Date()
        let dt = new Date(data.setDate(data.getDate() + d)),
            month = '' + (dt.getMonth() + 1),
            day = '' + dt.getDate(),
            year = dt.getFullYear()

        if (month.length < 2)
            month = '0' + month
        if (day.length < 2)
            day = '0' + day

        return [year, month, day].join('-')
    }

    const convertDate = d => {
        return d.split('-').reverse().join('/')
    }

    const changeRoomsValue = () => {
        defaultValues.forEach(item => {
            let math = item.val * (parseInt(adultos.value) + parseInt(criancas.value))
            document.getElementById(`${item.room}-label`).innerHTML = `<span>R$</span> ${math},00`

        })
    }

    tel.addEventListener('change', () => {
        telFormatter()
    })

    adultos.addEventListener('change', () => {
        changeRoomsValue()
    })

    criancas.addEventListener('change', () => {
        changeRoomsValue()
    })


    form.addEventListener('submit', (e) => {
        e.preventDefault()

        const hoje = parseInt(formatDate(0).replaceAll('-', ''))
        let formValues = new FormData(form)

        let data = {
            nome: formValues.get('username'),
            email: formValues.get('email'),
            telefone: tel.value,
            checkin: { data: checkin.value, validation: parseInt(checkin.value.replaceAll('-', '')) },
            checkout: { data: checkout.value, validation: parseInt(checkout.value.replaceAll('-', '')) },
            adultos: parseInt(adultos.value),
            criancas: parseInt(criancas.value),
            executive: { checked: document.getElementById('executive').checked, val: 120, label: 'Executive', file: '../../images/acomodacao_standard.jpg' },
            classic: { checked: document.getElementById('classic').checked, val: 160, label: 'Classic', file: '../../images/acomodacao_premium.jpg' },
            premium: { checked: document.getElementById('premium').checked, val: 200, label: 'Premium', file: '../../images/acomodacao_vip.jpg' },
        }

        if (data.checkin.validation < hoje || data.checkout.validation < hoje) {
            alert('Checkin ou Checkout não podem ser datas passadas!')
            return
        } else if (data.checkin.validation > data.checkout.validation) {
            alert('Checkin não pode ser depois do Checkout!')
            return
        } else if (!data.executive.checked && !data.classic.checked && !data.premium.checked) {
            alert('Você deve selecionar um dos quartos!')
            return
        } else {
            let selected = Object.entries(data).find(item => item[1].checked)

            document.querySelectorAll('.result-apartamento').forEach(single => {
                single.textContent = `Apartamento: ${selected[1].label}`
            })

            document.querySelector('.card-img-top').src = selected[1].file

            document.querySelectorAll('.result-checkin').forEach(single => {
                single.textContent = `Checkin: ${convertDate(data.checkin.data)}`
            })

            document.querySelectorAll('.result-checkout').forEach(single => {
                single.textContent = `Checkout: ${convertDate(data.checkout.data)}`
            })

            document.querySelectorAll('.result-pessoas').forEach(single => {
                single.textContent = `Pessoas: ${data.adultos + data.criancas}`
            })

            window.localStorage.setItem('reserva', JSON.stringify({ ...data, selected: selected[1].label }))

            const servicos = [{ label: 'mordomo', desc: 'Serviço de mordomo' }, { label: 'cofre', desc: 'Cofre no quarto' }, { label: 'pet', desc: "Hospedagem para pet's" }, { label: 'cafe', desc: 'Incluso café da manhã no quarto' }, { label: 'massagem', desc: 'Cadeira de massagem no quarto' }, { label: 'ac', desc: 'Ar condicionado no talo!!!' }]

            document.querySelector('.content-servicos-extras').innerHTML = ''
            for (let i = 0; i < servicos.length; i++) {
                let item = localStorage.getItem(`service-${servicos[i].label}`)

                if (item !== null && item !== NaN) {
                    document.querySelector('.content-servicos-extras').innerHTML += `
                        <li class="list-group-item ">${servicos[i].desc}: R$ ${item}</li>
                    `
                }
            }

            let total = parseFloat(localStorage.getItem('totalServices').split('R$:')[1]) + (selected[1].val * (data.adultos + data.criancas))
            document.getElementById('total-services-modal').textContent = `Total: R$ ${total}`


            const modal = new bootstrap.Modal(document.getElementById('confirmChekin'))
            modal.show()

        }

    })

    checkin.value = formatDate(0)
    checkout.value = formatDate(30)
}

sendForm()
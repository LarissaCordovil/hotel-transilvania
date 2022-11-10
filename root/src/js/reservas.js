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
            executive: { checked: document.getElementById('executive').checked, label: 'Executive' },
            classic: { checked: document.getElementById('classic').checked, label: 'Classic' },
            premium: { checked: document.getElementById('premium').checked, label: 'Premium' },
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

            document.getElementById('result-apartamento').textContent = `Apartamento: ${selected[1].label}`
            document.getElementById('result-checkin').textContent = `Checkin: ${convertDate(data.checkin.data)}`
            document.getElementById('result-checkout').textContent = `Checkout: ${convertDate(data.checkout.data)}`
            document.getElementById('result-pessoas').textContent = `Pessoas: ${data.adultos + data.criancas}`

            window.localStorage.setItem('reserva', JSON.stringify({ ...data, selected: selected[1].label }))

            alert('Reserva realizada com sucesso!')
        }

    })


    checkin.value = formatDate(0)
    checkout.value = formatDate(30)
}

sendForm()
const listModal = document.querySelector('#list-modal');
const labels = Array.from(listModal.querySelectorAll('label'));
const btnConfirmServices = document.querySelector('#confirm-services');
const textServices = document.querySelector('#services-text');

const services = ['mordomo', 'cofre', 'pet', 'cafe', 'massagem', 'ac'];
let servicesObj = {};
let totalServices = 0;

const formatRealString = string => parseFloat(string.replace(',', '.'));

const handleLabelModal = (element) => {
    const input = element.target;
    const price = formatRealString(input.labels[0].nextSibling.children[0].innerText);
    (input.checked) ? localStorage.setItem(`service-${input.name}`, price.toString()) : localStorage.removeItem(`service-${input.name}`);
};

const handleModal = event => {
    event.preventDefault();
    servicesObj = {};
    totalServices = 0;
    services.map(element => {
        const keyObj = element;
        if (localStorage.getItem(`service-${element}`) !== null && localStorage.getItem(`service-${element}`) !== NaN) {
            servicesObj[`${keyObj}`] = localStorage.getItem(`service-${element}`);
            totalServices += parseFloat(localStorage.getItem(`service-${element}`));
        }
    });
    textServices.innerHTML = `R$: ${totalServices}`;
    localStorage.setItem('totalServices', `R$: ${totalServices}`)
    //console.log para ajudar o Flaviano XD
    console.log(servicesObj);
    console.log(totalServices);
};

labels.map(label => label.onclick = label => handleLabelModal(label));

btnConfirmServices.addEventListener('click', handleModal);;

// PARTE DE DEBORA //

window.onload = () =>{
    if(localStorage.getItem('apto')){
        document.getElementById('result-apartamento').textContent = `Apartamento: ${localStorage.getItem('apto')}`
    }
    if(localStorage.getItem('checkin')){
        document.getElementById('result-checkin').textContent = `Checkin: ${localStorage.getItem('checkin')}`
    }
    if(localStorage.getItem('checkin')){
        document.getElementById('result-checkout').textContent = `Checkout: ${localStorage.getItem('checkout')}`
    }
    if(localStorage.getItem('numPessoas')!==null){
        document.getElementById('result-pessoas').textContent = `Pessoas: ${localStorage.getItem('numPessoas')}`
    }
    if(localStorage.getItem('totalServices')!==null){
        document.getElementById('services-text').textContent = `${localStorage.getItem('totalServices')}`
    }

    services.map(element => {
        const keyObj = element
        if (localStorage.getItem(`service-${element}`) !== null && localStorage.getItem(`service-${element}`) !== NaN) {
            document.getElementById(element).setAttribute('checked', 'true')
        }
    })
    
}

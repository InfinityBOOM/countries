const baseURL = 'https://restcountries.com/v3.1'
const region = document.querySelector('.links')
const container = document.querySelector('#container')
const input = document.querySelector('#search')
const button = document.querySelector('#button')

fetch(`${baseURL}/region/africa`)
    .then(res => res.json())
    .then(r => {
        console.log(r)
        myFunc(r)
    })

region.addEventListener('click', e => {
    if (e.target.getAttribute('data-name')) {
        fetch(`${baseURL}/region/${e.target.getAttribute('data-name')}`)
            .then(res => res.json())
            .then(r => {
                myFunc(r)
            })
    }
})

button.addEventListener('click', e => { 
    let val = input.value 
    fetch(`${baseURL}/name/${val}`) 
    .then(res => res.json()) 
    .then(r => { 
        if (!r.status) { 
            myFunc(r) 
        } else { 
            container.innerHTML = 'Не найдено' 
        } 
 
    }) 
})

function myFunc(r) {
    let empty = ''
    r.map((item, index) => {
        empty += temp(item.flags.png, item.name.official, item.name.common, item.capital[0], item.population, item.region, item.maps.googleMaps, item.area)
        container.innerHTML = empty
    })
}

function temp(flag, name, common, capital, population, region, maps, area) {
    return `
    <div class="list">
        <h2>${common}</h2>
        <div class="box">
            <img src="${flag}" alt=""> 
            <div class="text">
                <h3><span>Official name:</span> ${name}</h3>
                <h3><span>Region:</span> ${region}</h3>
                <h3><span>Area:</span> ${area} km<small><sup>2</sup></small></h3>
                <h3><span>Capital:</span> ${capital}</h3>
                <h3><span>Population:</span> ${population}</h3>
                <a href="${maps}" target="_blank">Google Map</a>
            </div>
        </div>
    </div>
    `
}
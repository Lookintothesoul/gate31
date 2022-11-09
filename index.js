let countEl = document.getElementById('cardCount')
let formEl = document.getElementById('titleFilter')
let filterContainer = document.querySelector('.filters-container')
let selectFiltersArr = []

const getObjectFromQueryString = search => Object.fromEntries(new URLSearchParams(search).entries())

const changeFilter = (value) => {
    const filters = getObjectFromQueryString(window.location.search)
    let newFilters = {...filters, optionTitle: value}
    
    return new URLSearchParams(newFilters).toString()
}

window.onload = getPosts = async () => {
    let url = "https://jsonplaceholder.typicode.com/posts/?_start=0&_limit=7"
    await fetch(url)
        .then( response => response.json())
        .then(result => drawPosts(result))
    
    const filters = getObjectFromQueryString(window.location.search)
    reDrawPosts(filters.optionTitle ? filters.optionTitle : "")
}

const reDrawPosts = (filters) => {
    if (filters !== "") {
        let options = filters.split('-')

        for (let i = 0; i < options.length; i++) {
            let el = document.querySelector(`.option-${options[i]}`)
            let checkBoxEl = document.getElementById(`option-${options[i]}`)
            if (el) {
                el.classList.remove('hidden-post')
                checkBoxEl.checked = true
                selectFiltersArr.push(Number(options[i]))
            }
        }
    } else {
        let els = document.querySelectorAll('.card')
        for (let i = 0; i < els.length; i++) {
            els[i].classList.remove('hidden-post')
        }
    }
}

const drawPosts = (data) => {
    let filtersArr = []
    let container = document.querySelector('.main-body')

    for (let i = 0; i < data.length; i++) {
        let div = `
            <div class="card option-${i} hidden-post">
                <div class="card-title">
                    <label>${data[i].title}</label>
                    <span>${data[i].body}</span>
                </div>
                <label class="card-checkbox">
                    <input type="checkbox" onchange="selectCard()"/>
                    <span class="layer"></span>
                </label>
            </div>
        `
        container.innerHTML += div

        filtersArr.push({data: data[i].title, option: i})
    }
    
    drawFilters(filtersArr)
}

const selectCard = () => {
    event.path[2].classList.toggle('selected-card')
    getCountSelectedCard()
}

const drawFilters = (arr) => {
    for (let i = 0; i < arr.length; i++) {
        let filter = `
            <div class="filter-option">
                <label class="card-checkbox">
                    <input type="checkbox" onclick="selectFilter(this)" id="option-${arr[i].option}"/>
                    <span class="layer"></span>
                </label>
                <label for="option-${arr[i].option}">${arr[i].data}</label>
            </div>
        `

        filterContainer.innerHTML += filter
    }
}

const selectFilter = (el) => {
    let optionValue = Number(el.id.split('-')[1])
    let index = selectFiltersArr.findIndex(e => e === optionValue)
    el.parentElement.classList.toggle('selected-filter')
    
    if (index !== -1) {
        selectFiltersArr.splice(index, 1)
    } else {
        selectFiltersArr.push(optionValue)
    }
    
    console.log('selectFiltersArr', selectFiltersArr)
}

let getCountSelectedCard = () => countEl.textContent = document.querySelectorAll('.selected-card').length

const searchResult = () => {
    event.preventDefault()
    if (selectFiltersArr.length > 0) {
        document.querySelector('.filters-container').setAttribute('disabled', true)
        window.location.search = changeFilter(selectFiltersArr.join('-'))
    }
}

const clearFilter = () => {
    selectFiltersArr.length = 0
    window.location.search = changeFilter("")
}
let countEl = document.getElementById('cardCount')

let getPosts = async () => {
    let url = "https://jsonplaceholder.typicode.com/posts/?_start=0&_limit=7"
    let response = await fetch(url)
        .then( response => response.json())
        .then(result => drawPosts(result))
}

const drawPosts = (data) => {
    let container = document.querySelector('.main-body')

    for (let i = 0; i < data.length; i++) {
        let div = `
            <div class="card">
                <div class="card-title">
                    <label>${data[i].title}</label>
                    <span>${data[i].body}</span>
                </div>
                <label class="card-checkbox">
                    <input type="checkbox" onchange="selectCard(this)"/>
                    <span class="layer"></span>
                </label>
            </div> 
        `

        container.innerHTML += div
    }
}

getPosts()

const selectCard = (el) => {
    event.path[2].classList.toggle('selected-card')
    getCountSelectedCard()
}

let getCountSelectedCard = () => countEl.textContent = document.querySelectorAll('.selected-card').length

const searchResult = () => {
    
}
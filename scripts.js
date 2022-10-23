//Selectors to manipulate DOM

const usersContainer = document.querySelector('[data-users-container]')
const postsContainer = document.querySelector('[data-posts-container]')
const header = document.querySelector('[data-header]')

//Functions to get data from the API

let getUsers = async () => {
    let url = 'https://jsonplaceholder.typicode.com/users'

    let response = await fetch(url)
    let data = await response.json()
    addUserToDom(data)
}

let getPosts = async (userId, name) => {
    let url = 'https://jsonplaceholder.typicode.com/posts'
    let response = await fetch(url)
    let data = await response.json()
    addPostsToDom(data, userId, name)
}

//Functions to add API data to the DOM and clear the previous posts when a new user is clicked

let addUserToDom = (userList) => {
    userList.forEach(user => {
        let name = user.name
        let userId = user.id
        let div = document.createElement('div')
        div.textContent = name
        div.className = "users-item"
        div.dataset.userId = userId

        div.addEventListener('click', (event) => {
            let userId = event.target.dataset.userId
            let name = event.target.textContent
            getPosts(userId, name)
        })
        
        usersContainer.appendChild(div)
    })
}

let addPostsToDom = (postList, userId, name) => {
    clearPosts()
    let ol = document.createElement('ol')
    let h2 = document.createElement('h2')
    h2.textContent = `${name} says`
    h2.style.marginBottom = "1.5rem"
    header.textContent = "Let's See What They're Saying...Anyone speak Latin?"
    postsContainer.appendChild(ol)
    ol.appendChild(h2)
    
    let userPosts = postList.filter(posts => posts.userId == userId)
    
    userPosts.forEach(post => {
        let title = post.title
        let body = post.body

        let h3 = document.createElement('h3')
        let li = document.createElement('li')
        h3.textContent = title
        li.textContent = body
        li.style.marginBottom = "1rem"
        ol.appendChild(h3)
        ol.appendChild(li)
    })


}

let clearPosts = () => {
    if (postsContainer.childElementCount > 0) {
        postsContainer.removeChild(postsContainer.lastChild)
    }

    return
}

//Get users from API when the page loads

document.addEventListener('DOMContentLoaded', getUsers)




    

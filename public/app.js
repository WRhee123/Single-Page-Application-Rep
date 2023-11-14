document.addEventListener('DOMContentLoaded', () => {
    const baseURL = 'http://localhost:3000/api/restaurants'
let body = document.getElementsByTagName('body')[0]

let resButton = document.createElement('button')
resButton.textContent = 'Get all restaurants'
body.appendChild(resButton)


resButton.addEventListener("click", () => {
    getRestaurants()
})
async function getRestaurants() {
    const response = await fetch('http://localhost:3000/api/restaurants');
    const resData = await response.json();
    console.log(resData);
    resData.forEach((restaurant) => {
        let container = document.createElement('div');
        container.style.height = '40vh';
        container.style.width = '40vw';
        container.style.margin = 'auto'
        container.style.backgroundColor = 'gray'
        body.appendChild(container)

        let h1 = document.createElement('h1');
        h1.textContent = restaurant.name;
        container.appendChild(h1)

        let h2 = document.createElement('h2');
        h2.textContent = restaurant.phone_number;
        container.appendChild(h2)

        let h3 = document.createElement('h3');
        h3.textContent = restaurant.rating
        container.appendChild(h3)
    })
        }

})
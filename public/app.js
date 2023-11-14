document.addEventListener('DOMContentLoaded', () => {
    const baseURL = 'http://localhost:3000/api/restaurants'
let body = document.getElementsByTagName('body')[0]

let resButton = document.createElement('button')
resButton.textContent = 'Get all restaurants'
body.appendChild(resButton)

let addButton = document.createElement('button');
addButton.textContent = 'Add a restaurant';
body.appendChild(addButton)


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

        addButton.addEventListener("click", () => {
            addRestaurant();
        })

        function addRestaurant() {
            let container = document.createElement('div');
            container.style.height = '60vh';
            container.style.width = '90vw';
            container.style.margin = 'auto'
            container.style.backgroundColor = 'red'
            body.appendChild(container)

            let form = document.createElement('form');
            container.appendChild(form)

            let name = document.createElement('label');
            name.textContent = "name"
            name.style.margin = 'auto'
            form.appendChild(name)

            let nameInput = document.createElement('input');
            nameInput.id = "userNameInput"
            form.appendChild(nameInput)

            let phoneNumber = document.createElement('label');
            phoneNumber.textContent = 'phone number';
            phoneNumber.style.margin = 'auto'
            form.appendChild(phoneNumber);

            let phoneInput = document.createElement('input');
            phoneInput.id = 'userPhoneInput'
            form.appendChild(phoneInput)

            let rating = document.createElement('label');
            rating.textContent = 'rating';
            form.appendChild(rating)

            let ratingInput = document.createElement('input');
            ratingInput.id = 'userRatingInput'
            form.appendChild(ratingInput)

            let postButton = document.createElement('button');
            postButton.textContent = 'Post';
            container.appendChild(postButton)

            postButton.addEventListener('click', async () => {
              try{
                let name = document.getElementById('userNameInput').value;
                let phoneNumber = document.getElementById('userPhoneInput').value;
                let rating = document.getElementById('userRatingInput').value;

                let response = await fetch ('http://localhost:3000/api/restaurants') {
                    method: "POST",
                    body: JSON.stringify({
                        name: name,
                    phoneNumber: phoneNumber,
                    rating: rating
                    })
                }

              }catch(error) {

              }
            })
            
        }

})
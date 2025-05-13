console.log("Initializing Category Page...");

window.addEventListener('DOMContentLoaded', main);

window.addEventListener('DOMContentLoaded', () => {
    localStorage.removeItem("sessionId");
    localStorage.removeItem("username");
});


function main() {
    createNavBar();
    createFooter(footer[0].link, footer[1].link);

    const container = document.getElementById('category-items');
    if (!container) {
        console.error("Error: #category-items element not found in the DOM.");
        return;
    }
    
    const params = new URLSearchParams(window.location.search);
    const categoryId = params.get('id');

    if (!categoryId) {
        container.innerHTML = '<p>Error: No category ID provided in the URL.</p>';
        console.error('No category ID provided.');
        return;
    }

    toggleLoading(true);
    fetchCategoryItems(categoryId, container);

    document.getElementById("login-form").addEventListener("submit", logIn);
    
    document.addEventListener("click", function(event) {
        if (event.target.classList.contains('buyButton')) {
            addToCart(event);
        }
    });

}


function fetchCategoryItems(categoryId, container) {
    fetch(`https://learning-hub-1whk.onrender.com/learning-items?category=${categoryId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Failed to fetch data for category ID: ${categoryId}`);
            }
            return response.json();
        })
        .then(data => {
            if (data.length === 0) {
                container.innerHTML = '<p>No items found for this category.</p>';
            } else {
                renderCategoryItems(data, container);
            }
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            container.innerHTML = '<p>Error loading category data. Please try again later.</p>';
        })
        .finally(() => {
            toggleLoading(false);
        });
}

function renderCategoryItems(items, container) {
    const baseURL = "https://learning-hub-1whk.onrender.com/";

    const updatedItems = items.map(item => ({
        ...item,
        fullImagePath: item.image && item.image.trim()
            ? `${baseURL}${item.image}`
            : 'https://via.placeholder.com/300'
    }));

    const source = document.getElementById('category-items-template').innerHTML;
    const template = Handlebars.compile(source);

    const html = template({ items: updatedItems });
    container.innerHTML = html;
}


async function logIn(event) {
    event.preventDefault();
    //const loginURL = "https://learning-hub-1whk.onrender.com/login";
    const loginURL = "http://localhost:3000/login"
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const logCreds = {username: username, password: password};
    const message = document.getElementById('login-message');

    try {
        const response = await fetch(loginURL, 
            {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(logCreds)
            }
        );
    
        if (response.ok) {
            const data = await response.json();
            document.getElementById('login-form').style.display = 'none';
            message.textContent = "You are logged in";
            message.style.color = 'rgb(1, 94, 1)';
            localStorage.setItem("sessionId", data.sessionId);
            localStorage.setItem("username", username)
        } else {
            const error = await response.json();
            message.textContent = "Login failed, " + error.message;
            message.style.color = 'rgb(135, 4, 4)';
        }

    } catch (error) {
        message.textContent = "Error: " + error.message;
    }
}

async function addToCart(event) {
    event.preventDefault();

    const base = event.target;
    const item = event.target.closest('.item');

    const itemId = base.dataset.id;
    const title = item.querySelector('h3').textContent.trim();
    const description = item.querySelector('p').textContent.trim();
    const price = item.querySelector('p + p').textContent.trim();
    const sessionId = localStorage.getItem('sessionId');
    const username = localStorage.getItem('username');
    const message = item.querySelector('#buy-message');

    if (!sessionId) {  
        message.style.display='block';
        message.textContent = 'Please login to purchase the training material';
        message.style.color = 'rgb(135, 4, 4)';

        setTimeout(() => {
            message.style.display = 'none';
        }, 2000);

    }else{
        const cartURL = 'http://localhost:3000/add-to-cart';

        const addThis = {itemId:itemId, description:description, title:title, price:price,username:username, sessionId:sessionId};

        try {
            const response = await fetch(cartURL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(addThis),
            });

            if (response.ok) {
                const data = await response.json();
                message.style.display = 'block';
                message.textContent = data.message;
                message.style.color = 'rgb(2, 39, 2)';
            } else {
                const data = await response.json();
                message.style.display = 'block';
                message.textContent = data.message;
                message.style.color = 'rgb(135, 4, 4)';
            }

            setTimeout(() => {
                message.style.display = 'none';
            }, 3000);

        } catch (error) {
            message.style.display = 'block';
            message.textContent = 'Error: ' + error;
            message.style.color = 'rgb(135, 4, 4)';
        }
    }

}
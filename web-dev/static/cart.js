document.addEventListener('DOMContentLoaded', main);

function main() {
    const params = new URLSearchParams(window.location.search);
    const username = params.get('username');
    const sessionId = params.get('sessionId');

    // Ensure the cart link is accessed with correct parameters
    if (!username || !sessionId) {
        alert('You must be logged in to view the cart.');
        window.location.href = 'category.html'; // Redirect if parameters are missing
        return;
    }

    // Load the cart (data retrieval handled in another utility)
    loadCart(username, sessionId);
}

// Utility function to fetch the cart data
async function fetchCartData(username, sessionId) {
    const cartURL = `http://localhost:3000/cart?username=${username}&sessionId=${sessionId}`;

    try {
        const response = await fetch(cartURL);
        if (!response.ok) {
            throw new Error('Failed to fetch cart data.');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching cart:', error.message);
        alert('Could not load cart. Please try again later.');
        return null;
    }
}

// Load and render the cart
async function loadCart(username, sessionId) {
    const cartData = await fetchCartData(username, sessionId);

    if (cartData) {
        renderCartItems(cartData.cartItems); // Render the cart items
        updateTotalCost(cartData.totalCost); // Update the total cost
    }
}

// Render the cart items in the UI
function renderCartItems(items) {
    const cartTableBody = document.querySelector('#cart-table tbody');
    cartTableBody.innerHTML = ''; // Clear any existing rows

    items.forEach(item => {
        const row = document.createElement('tr');

        const typeCell = document.createElement('td');
        typeCell.textContent = item.type;

        const titleCell = document.createElement('td');
        titleCell.textContent = item.title;

        const costCell = document.createElement('td');
        costCell.textContent = `${item.cost}€`;

        const actionCell = document.createElement('td');
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.addEventListener('click', () => handleRemoveItem(item.id));
        actionCell.appendChild(removeButton);

        row.appendChild(typeCell);
        row.appendChild(titleCell);
        row.appendChild(costCell);
        row.appendChild(actionCell);

        cartTableBody.appendChild(row);
    });
}

// Update the total cost displayed in the UI
function updateTotalCost(totalCost) {
    const totalCostElement = document.getElementById('total-cost');
    totalCostElement.textContent = `Total Cost: ${totalCost}€`;
}

// Handle the removal of an item from the cart
async function handleRemoveItem(itemId) {
    const params = new URLSearchParams(window.location.search);
    const username = params.get('username');
    const sessionId = params.get('sessionId');

    const cartURL = `http://localhost:3000/cart?username=${username}&sessionId=${sessionId}&itemId=${itemId}`;

    try {
        const response = await fetch(cartURL, { method: 'DELETE' });
        if (!response.ok) {
            throw new Error('Failed to remove item from cart.');
        }
        const updatedCart = await response.json();
        renderCartItems(updatedCart.cartItems); // Update the cart UI
        updateTotalCost(updatedCart.totalCost); // Update the total cost
    } catch (error) {
        console.error('Error removing item:', error.message);
        alert('Could not remove item. Please try again later.');
    }
}

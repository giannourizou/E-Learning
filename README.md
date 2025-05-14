# LearningHub Web App
A web-based application for browsing and purchasing educational materials such as books and lectures via the LearningHub API. 
The project was developed as part of a university assignment.

## Features
Category & Subcategory Navigation

View available categories, subcategories, and related educational materials.

Material Details View
Display books and lectures with full metadata (title, author, publisher, description, cost, etc.).

User Authentication (Login)
Users must log in to add items to their cart.

Shopping Cart Management
Add educational items to a temporary session-based shopping cart.


## Tech Stack
### Frontend
- Semantic HTML5 & Responsive CSS
- Handlebars (for category/subcategory templates)
- React (shopping cart management)
- Fetch API (HTTP requests)

### Backend
- Node.js + Express
- RESTful API design
- Session management with UUID


## API Endpoints Used
GET /categories – Fetch all categories

GET /categories/:id/subcategories – Get subcategories by category

GET /learning-items?category={id} – Educational material per category

GET /learning-items?subcategory={id} – Educational material per subcategory

POST /login – Custom login service for user authentication


# Pages Overview
index.html – Displays categories and nested subcategories

category.html?id=x – Shows materials of a selected category

subcategory.html?id=x – Shows materials of a selected subcategory with feature breakdown

Login Form – Integrated into category.html, required for adding to cart

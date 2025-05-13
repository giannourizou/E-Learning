const express = require('express');
const cors = require('cors');
const uuid = require('uuid');
const app = express();
const port = 3000;

app.use(express.json());

app.use(cors({
    origin: 'http://127.0.0.1:5500',    // live server
    methods: ['POST'],
    allowedHeaders: ['Content-Type']
}));

const users = [
    {username: 'user1', password: 'pass1'},
    {username: 'user2', password: 'pass2'},
    {username: 'user3', password: 'pass3'}
];

let active_sessions = {};

app.post('/login', (req, res) => {
    const {username, password} = req.body;
    const exists = users.find(u => u.username === username && u.password === password);
    if (exists) {
        const sessionId = uuid.v4();
        res.status(200).json({sessionId});
        active_sessions[username] = {sessionId, cart: []};
    } else {
        res.status(400).json({message:'Invalid credentials'});
    }
});

app.post('/add-to-cart', (req, res) => {
    const {itemId,description,title,price,username,sessionId} = req.body;

    if (!active_sessions[username] || active_sessions[username].sessionId !== sessionId){
        return res.status(403).json({message:'You cannot apply this action.'});
    }

    const itemInCart = active_sessions[username].cart.some(item => item.id === itemId);
    if (itemInCart) {
        return res.status(400).json({message:'Item already in your cart'});
    }else{
        active_sessions[username].cart.push({id:itemId});
        res.status(200).json({message:'Item added to cart'});
    }
});


app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
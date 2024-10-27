const express = require('express')

const app = express()

app.use(express.json())

const products = [
    {
        name: 'Laptop',
        price: 400.00,
        quantity: 4,
        active: true
    },
    {
        name: 'Keyboard',
        price: 29.99,
        quantity: 10,
        active: true
    },
]

app.get('/', (request, response) => {
    response.send('Hello, World!')
})

app.get('/products', (request, response) => {
    response.json(products)
})

app.post('/products', (request, response) => {
    console.log(request.body)

    products.push(request.body)

    response.sendStatus(201).json({ message: 'Product created successfully!'})
})

app.listen(3000, () => console.log('Server started on port 3000'))
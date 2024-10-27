const express = require('express')
const crypto = require('crypto')

const app = express()

app.use(express.json())

const products = [
    {
        "id": "90286eb1-4cfd-42e5-93be-35f448e0f5e6",
        "name": "Laptop",
        "price": 400,
        "quantity": 4,
        "active": true
    },
    {
        "id": "90286eb1-4cfd-42e5-93be-35f448e0f5f4",
        "name": "Keyboard",
        "price": 29.99,
        "quantity": 10,
        "active": true
    },
    {
        "id": "90286eb1-4cfd-42e5-93be-35f448e0f5cf",
        "name": "Computer",
        "price": 700,
        "quantity": 1,
        "active": true
    },
]

app.get('/', (request, response) => {
    response.send('Hello, World!')
})

app.get('/products', (request, response) => {
    response.status(200).json(products)
})

app.post('/products', (request, response) => {
    const { name, price, quantity, active } = request.body

    if (!name) {
        return response.status(422).json({ message: "Name is required!" })
    }

    const id = crypto.randomUUID()

    products.push({
        id,
        name,
        price,
        quantity,
        active
    })

    response.status(201).json({ message: 'Product created successfully!', id })
})

app.get('/products/:id', (request, response) => {
    const product = products.find(product => product.id == request.params.id)

    if (!product) {
        // return response.status(204).send() 
        return response.status(404).send({ message: 'Product not found!' }) 
    }

    response.status(200).json(product)
})

app.put('/products/:id', (request, response) => {
    const product = products.find(product => product.id == request.params.id)

    if (!product) {
        return response.status(404).send({ message: 'Product not found!' }) 
    }

    const { name, price, quantity, active } = request.body

    if (name) {
        product.name = name
    }

    if (price) {
        product.price = price
    }

    if (quantity) {
        product.quantity = quantity
    }

    if ('active' in request.body) {
        product.active = active
    }

    response.status(200).json({ message: 'Product updated successfully!' })
})

app.delete('/products/:id', (request, response) => {
    const productIndex = products.findIndex(product => product.id == request.params.id)

    if (productIndex == -1) {
        return response.status(404).send({ message: 'Product not found!' }) 
    }

    products.splice(productIndex, 1)

    response.status(200).json({ message: 'Product deleted successfully!' })
})

app.listen(3000, () => console.log('Server started on port 3000'))
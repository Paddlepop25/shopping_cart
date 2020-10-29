// load libraries
const express = require('express')
const handlebars = require('express-handlebars')

// configure the PORT
const PORT = parseInt(process.argv[2]) || parseInt(process.env.PORT) || 3000

// create an instance of express
const app = express()

// configure handlebars
app.engine('hbs', handlebars({ defaultLayout: 'default.hbs' }))
app.set('view engine', 'hbs')

// routes
app.get('/',
  (req, res) => {
    const cart = []
    res.status(200)
    res.type('text/html')
    res.render('cart', { cartState: JSON.stringify(cart) })
    // why need to stringify cart?
    // console.info(JSON.stringify(cart))
    // console.info(cart)
  }
)

// Logic?
// 1) only can store string JSON obj {"item": "apples"} that's why need to JSON.stringify
// 2) if loop through JSON object will get keys and not values so need to JSON.parse it to be Javascript object {item: "apples"}
// 3) after pushing to cart, the state needs to be JSON object so we stringify it again for the cardState

app.post('/',
  express.urlencoded({ extended: true }),
  (req, res) => {
    // console.info('body -------> ', req.body)
    console.info('body -------> ', req.body.cartState)

    const cart = JSON.parse(req.body.cartState)
    console.info('cart ----->', cart)
    // const cart2 = req.body.cartState
    // console.info(cart2)

    cart.push({
      item: req.body.item,
      quantity: req.body.quantity,
      unitPrice: req.body.unitPrice
    })
    
    // console.info('cart2 ----->', cart)
    
    res.status(200)
    res.type('text/html')
    res.render('cart', {
      cart: cart,
      cartState: JSON.stringify(cart) // hiding the data
    })
  }
)
// use static folder
app.use(express.static(__dirname + '/static'))

// start application
app.listen(PORT, () => {
  console.info(`Application started on port ${PORT} at ${new Date()}`)
})

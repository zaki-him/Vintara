import express from 'express'
import protect from '../Middlewares/protect.js'
import Cart from '../Modules/cart.js'

const cartRouter = express.Router()

//get all items
cartRouter.get('/', protect, async (req, res) => {
  try {
    const cart = await Cart.find({ user: req.user.id }).populate("items.product")
    res.status(200).json(cart || { user: req.user.id, items: [] })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

//add to cart
cartRouter.post('/add', protect, async (req, res) => {
  try {
    const { productId, quantity } = req.body
    let cart = await Cart.findOne({ user: req.user.id })

    if(!cart){
      cart = new Cart({ user: req.user.id, items: [] })
    }

    const itemIndex = cart.items.findIndex(i => i.product.toString() === productId)

    if(itemIndex > -1){
      cart.items[itemIndex].quantity += quantity
    }else{
      cart.items.push({ product: productId, quantity })
    }

    await cart.save()
    res.status(201).json({ message: 'item added to cart' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

//delete from cart
cartRouter.delete('/delete/:productId', protect, async (req, res) => {
  try {
    const { productId } = req.params
    let cart = await Cart.findOne({ user: req.user.id })

    if(!cart){
      return res.status(404).json({ message: 'Cart not found' })
    }

    cart.items = cart.items.filter(i => i.product.toString() !== productId)
    await cart.save()

    res.status(200).json({ message: 'Item deleted from cart' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

export default cartRouter
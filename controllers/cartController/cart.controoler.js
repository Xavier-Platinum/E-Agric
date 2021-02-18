const {Product} = require('../../models/products/products.model')


module.exports = {

  add_to_cart: async(req, res)=>{
    let Id = req.params.productId
    Product.findById(Id ,(err, prod)=>{
      // console.log('product===>',prod)
      if (err) throw err
      if (typeof req.session.cart == "undefined"){
        req.session.cart = []
        req.session.cart.push({
          id: prod.pid,
          name: prod.name,
          sold: 1,
          price: parseFloat(prod.price).toFixed(2),
          image: prod.productImage
        })
      } else {
        let cart = req.session.cart
        let newItem = true

        for (let i = 0; i < cart.length; i++) {
          if(cart[i].name == prod.name) {
            cart[i].sold++
            newItem = false
            break
          }
        }
        if (newItem) {
          cart.push({
            id: prod.pid,
            name: prod.name,
            sold: 1,
            price: parseFloat(prod.price).toFixed(2),
            image: prod.productImage
          })
        }
      }
      console.log('cart====>',req.session.cart)
      req.flash("success_msg", "Product added");
      res.redirect('back')
    })
  },



  checkout_get : async(req, res)=>{
    if(req.session.cart && req.session.cart.length == 0) {
      delete req.session.cart
      res.redirect('/cart/checkout')
    } else {
      let pageTitle = "checkout"
      let cart = req.session.cart
      console.log(cart)
      res.render("defaultViews/cart", {pageTitle, cart});
    }
  },



  cart_update : async(req, res)=>{
      let pid = req.params.produceId
      Product.findOne({pid: pid}, (err, produce)=>{
      let cart = req.session.cart
      let action = req.query.action
      console.log('this is produce===>', produce)
      for (let i = 0; i < cart.length; i++) {
        console.log('here---->',cart[i].name)
        if (cart[i].name == produce.name){
          switch(action) {
            case "add":
                cart[i].sold++
                break
            case "remove":
                cart[i].sold--
                if(cart[i].sold < 1) cart.splice(i, 1)
                break
            case "clear":
                cart.splice(i, 1)
                if (cart.length == 0) delete req.session.cart
                break
            default:
              req.flash("error_msg", "update failed");
                break
          }
          break
        }
        
      }
      req.flash("success_msg", "Product updated");
      res.redirect('/cart/checkout')
    })
  },

  clear_cart : (req, res)=>{
    delete req.session.cart
    req.flash("success_msg", "Cart Cleared");
    res.redirect('/cart/checkout')
  }
}
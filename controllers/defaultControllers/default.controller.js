const { Product } = require("../../models/products/products.model");
const { Order, CartItem } = require("../../models/orders/order.model");
const { Cart } = require("../../models/cart");
module.exports = {
    index: (req, res) => {
        const pageTitle = "Home";
        res.render("defaultViews/index", {pageTitle});
    },
    about: (req, res) => {
        const pageTitle = "About";
        res.render("defaultViews/about", {pageTitle});
    },
    our_products: (req, res) => {
        const pageTitle = "Our Products";
        res.render("defaultViews/our-products", {pageTitle});
    },
    farming_practice: (req, res) => {
        const pageTitle = "Farming Practice";
        res.render("defaultViews/farming-practice", {pageTitle});
    },
    shop: async(req, res) => {
        await Product.find({approved: true}, async(err, products) => {
            const pageTitle = "Shop";
        res.render("defaultViews/shop", {pageTitle, products});
        })
    },
    news: (req, res) => {
        const pageTitle = "News";
        res.render("defaultViews/news", {pageTitle});
    },
    news_details: (req, res) => {
        const pageTitle = "News Details";
        res.render("defaultViews/news-details", {pageTitle});
    },
    contact: (req, res) => {
        const pageTitle = "Contact";
        res.render("defaultViews/contact", {pageTitle});
    },
    profile: async (req, res) => {
        console.log(req.user.role);
        if(req.user.role === "admin") {
            await res.redirect("/admin");
        } else if (req.user.role === "vendor") {
            await res.redirect("/vendor");
        } else if (req.user.role === "farmer") {
            await res.redirect("/farmer");
        } else if (req.user.role === "user") {
            await res.redirect("/user");
        } else {
            await req.flash("error", `User Not Found`);
            alert("Sorry User Not found, Please Try Again");
        }
    },
    place_order: async(req, res, next, id) => {
        res.send("You hit me")
        // Order.findById(id)
        // .populate("products.product", "name price")
        // .exec((err, order) => {
        //     if(err || !order) {
        //         return res.status(400).json({
        //             error: "could not add to cart"
        //         })
        //     }
        // })
    },
    getCart: async(req, res, next) => {
        const pageTitle = "Cart";
        await Cart.findOne({userId: req.user.id})
        .then((cart) => {
            res.render("defaultView/carts", {cart, pageTitle})
        }).catch((err) => console.log(err));
    },
    add_to_cart: async(req, res) => {
        console.log("You hit me");
        const id = req.params.id;
        await Cart.findOne({userId: req.user.id})
        .then(async(cart) => {
            if(!cart) {
                console.log("Sorry!!!!");
            } else {
                await Product.findOne({_id: id})
                .then((product) => {
                    console.log(product)
                    if(cart === null) {
                        const cart =  new Cart({
                            userId: req.user.id,
                            items: [
                                { product: id, title: product.name, price: product.price, quantity: 1}
                            ]
                        });
                        cart.save()
                        .then((result) => {
                            console.log(result);
                            req.flash("success_msg", "Saved Successfully")
                        })
                        .catch((err) => {
                            console.log(err);
                            req.flash("error_msg", "Sorry save failed");
                        });
                    } else {
                        const cartIndex = cart.items.findIndex(index => index.product == id);
                        if(cartIndex > -1) {
                            let cartItem = cart.items[cartIndex];

                            cartItem.quantity += 1;
                            cartItem.price = 0;
                            cartItem.price = product.price * (cartItem.quantity);
                            cart.save()
                            .then((result) => {
                                console.log(result);
                                res.render("success_msg", "Saved");
                            })
                            .catch((err) => console.log(err));
                        } else {
                            cart.items.push({
                                product: id,
                                title: product.title,
                                price: product.price,
                                quantity: 1
                            });
                            cart.save()
                            .then((result) => {
                                console.log(result);
                                req.flash("sucess_msg", "true")
                            })
                            .catch((err) => console.log(err));
                        }
                    }
                })
                .catch((err) => {
                    console.log(err);
                })
            }
        })
        .catch((err) => {
            console.log(err);
        })
    }, 
    getCartById: async(req, res) => {
        const id = req.params.id;
        Cart.findOne({userId: req.user.id})
        .then((cart) => {
            console.log(cart.items);
            const cartIndex = cart.items.findIndex(index => index.id == id);
            const cartItem = cart.items[cartIndex];
            console.log(cartItem);
        })
        .catch(err => {
            console.log(err);
        })
    }, 
    deleteCartItem: async(req, res) => {
        const id = req.params.id;
        await Cart.findOne({ 'userId': req.user.id })
        .then(cart => {
            const cartIndex = cart.items.findIndex(index => index.id == id);
            cart.items[cartIndex].remove();
            return cart.save();
        })
        .then(result => {
            req.flash("success_msg", "Result successful");
            console.log(result);
            // res.json({ success: true, cartItems: result });
        })
        .catch(err => {
            req.flash("error_msg", "Sorry an error occured while fetching")
            console.log(err);
            // res.status(500).json({ message: 'an error occured while fetching cart item from db' });
        });
    }, 
    deleteCart: async (req, res) => {
        await Cart.findOneAndDelete({ 'userId': req.user.id }, (err, done) => {
            if (err) {
                req.flash("error_msg", "Sorry an error occured");
                console.log(err);
            } else {
                req.flash("success_msg", "Successfully deleted cart");
                // res.json({ message: 'successfully deleted cart' })
            }
        });
    },
    getOrders: async (req, res) => {
        await Order.find({ 'userId': req.user.id })
        .then(orders => {
            res.json({ success: true, orders: orders });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ message: 'an error occured while fetching orders from db' });
        });
    },
    createOrder: async (req, res) => {
        const cartId = req.params.id;
        await Cart.findOne({ 'userId': req.user.id })
        .then(cart => {
            const cartIndex = cart.items.findIndex(item => item.id == cartId);
            const cartItem = cart.items[cartIndex];
            if (cartIndex > -1) {
                const order = new Order({
                    userId: req.user.id,
                    productId: cartItem.product,
                    title: cartItem.title,
                    price: cartItem.price,
                    quantity: cartItem.quantity,
                });
                cart.items[cartIndex].remove();
                cart.save();
                order.save()
                    .then(result => {
                        res.json({ success: true, order: result });
                    })
                    .catch(err => console.log(err));
            } else {
                res.status(404).json({ message: 'cart item does not exist' });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ message: 'an error occured while fetching user cart' });
        });
    },
    deleteOrder: async(req, res) => {
        await Order.find({ 'userId': req.user.id })
        .then(orders => {
            const deleteIndex = orders.findIndex(index => index.id == req.params.id);
            return orders[deleteIndex].remove();
        })
        .then(result => {
            res.json({ success: true, orders: result});
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ message: 'an error occured while fetching user orders from db' });
        });
    }
}

// router.post("/newsletter", async(req, res) => {
//     const {email} = req.body
    
//     const data = {
//         members:[
//           {
//             email_address:req.body.email,
//             status:"subscribed",
//             // merge_fields:{
//             //     FNAME:username,
//             // }
//           }
//         ]
//       }
//       const postData = JSON.stringify(data) 
//       const options = {
//         url :"https://us19.api.mailchimp.com/3.0/lists/02e1d16e87",
//         method:'POST',
//         headers:{
//           Authorization:"auth API_KEY"
//         },
//         body:postData
//       };
  
//       request(options, (err, response,body)=>{
//         if(err){
//           console.log("MAILCHIMP: ERROR", err)
//         } else{
//           if(response.statusCode === 200){
//             console.log("SUCCESS")
//           } else {
//             console.log("FAILED")
//           }
//         }
//       })
      
// })
class CartItem {
    constructor(name, desc, img, price) {
        this.name = name
        this.desc = desc
        this.img = img
        this.price = price
        this.quantity = 1
    }
}

class LocalCart {
    static key = "cartItems"

    static getLocalCartItems() {
        let cartMap = new Map()
        const cart = localStorage.getItem(LocalCart.key)
        if (cart === null || cart.length === 0) return cartMap
        return new Map(Object.entries(JSON.parse(cart)))
    }

    static addItemToLocalCart(id, item) {
        let cart = LocalCart.getLocalCartItems()
        if (cart.has(id)) {
            let mapItem = cart.get(id)
            mapItem.quantity += 1
            cart.set(id, mapItem)
        }
        else
            cart.set(id, item)
        localStorage.setItem(LocalCart.key, JSON.stringify(Object.fromEntries(cart)))
        updateCartUI()

    }

    static removeItemFromCart(id) {
        let cart = LocalCart.getLocalCartItems()
        if (cart.has(id)) {
            let mapItem = cart.get(id)
            if (mapItem.quantity > 1) {
                mapItem.quantity -= 1
                cart.set(id, mapItem)
            }
            else
                cart.delete(id)
        }
        if (cart.length === 0)
            localStorage.clear()
        else
            localStorage.setItem(LocalCart.key, JSON.stringify(Object.fromEntries(cart)))
        updateCartUI()
    }
}

const cartIcon = document.querySelector('.fa-cart-arrow-down')
const wholeCart = document.querySelector('.whole-cart-window')
wholeCart.inWindow = 0
const addToCartBtns = document.querySelectorAll('.add-to-cart-btn')
addToCartBtns.forEach((btn) => {
    btn.addEventListener('click', addItemFunction)
})

function addItemFunction(e){
    const id = e.target.parentElement.parentElement.parentElement.getAttribute("data-id")
    const img = e.target.parentElement.parentElement.previousElementSibling.src
    const name = e.target.parentElement.previousElementSibling.textContent
    const desc = e.target.parentElement.children[0].textContent
    let price = e.target.parentElement.children[1].textContent
    price = price.replace("Price: $", '')
    const item = new CartItem(name, desc, img, price)
    LocalCart.addItemToLocalCart(id, item)
 console.log(price)
}

cartIcon.addEventListener('mouseover', ()=>{
    if(wholeCart.classList.contains('hide'))
    wholeCart.classList.remove('hide')
    })
    
    cartIcon.addEventListener('mouseleave', ()=>{
       
        setTimeout( () =>{
            if(wholeCart.inWindow===0){
                wholeCart.classList.add('hide')
            }
        } ,500 )
        
        })
    
     wholeCart.addEventListener('mouseover', ()=>{
         wholeCart.inWindow=1
     })  
     
     wholeCart.addEventListener('mouseleave', ()=>{
        wholeCart.inWindow=0
        wholeCart.classList.add('hide')
    })  
     
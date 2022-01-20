function Cart(props) {
  const {quantity = 0, handleBasketShow } = props
  return <div className="cart #0d47a1 blue darken-4" onClick={handleBasketShow}>
      <i className=" material-icons">add_shopping_cart</i>
       {quantity ? <span className='cart-quantity'>{quantity}</span> : null}
  </div>
}
export {Cart}
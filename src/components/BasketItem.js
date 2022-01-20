function BasketItem(props) {
    const {mainId,
        displayName, 
        price, 
        quantity,
        removeFomBasket = Function.prototype,
        incQuantity = Function.prototype,
        decQuantity = Function.prototype
    } = props
    return <li className="collection-item ">
        {displayName} <i className="material-icons bascet_quanity" onClick={() => decQuantity(mainId)}>remove</i> x {quantity} <i className="material-icons bascet_quanity" onClick={() => incQuantity(mainId)}>add</i> = {price.regularPrice * quantity} руб.
        <span className="secondary-contenty" onClick={() => removeFomBasket(mainId)}>
            <i className="material-icons basket-delete">close</i>
        </span>
    </li>
   
}
export {BasketItem}
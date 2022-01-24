import {useContext} from 'react'
import {ShopContext} from '../context'
function GoodsItem(props) {
    const {mainId,displayName,displayDescription, price ,quantity} = props
    
   const {addToBasket} = useContext(ShopContext)
    return  <div className="card">
    <div className="card-image">
      <img src='https://via.placeholder.com/300x350.png' alt={displayName}/>
      <span className="card-title">{displayName}</span>
    </div>
    <div className="card-content">
      <p>{displayDescription}</p>
      <div className="card-action">
          <button onClick= {() => addToBasket({
            mainId,
            displayName,
            quantity,
            price,
          
          })} className="btn">купить</button>
          <span className="right">{price.regularPrice}</span>
        </div>
    </div>
  </div>
}
export {GoodsItem}
import{useState, useEffect} from 'react'
import{API_KEY,API_URL}from '../config'
import { GoodsList } from './GoodsList'
import { Loader } from './Loader'
import {Cart} from './Cart'
import {BasketList} from './BasketList'
import {Alert} from './Alert'

function Shop() {
    const [goods, setGoods] = useState([])
    const [loading, setLoading] = useState(true)
    const [order, setOrder] = useState([])
    const [isBasscketShow, setBasketShow] = useState(false)
    const [alertName, setAlertName] = useState('')

    const addToBasket = (item) => {
        const itemIndex = order.findIndex(orderItem => orderItem === item.mainId)
        if (itemIndex < 0) {
            const newItem = {
                ...item,
                quantity: 1
            }
            setOrder([...order,newItem])
        } else {
            const newOrder = order.map((orderItem, index) => {
                if (index === itemIndex) {
                    return {
                        ...orderItem,
                        quantity: orderItem.quantity + 1
                    }
                } else {
                    return orderItem
                }
            })
            setOrder(newOrder)
        }
        setAlertName(item.displayName)
    }
    const handleBasketShow = () => {
        setBasketShow(!isBasscketShow)
    }
    
    const removeFomBasket = (itemId) => {
       
        const newOrder = order.filter(el => el.mainId !== itemId )
        setOrder(newOrder)
    }
    const incQuantity = (itemId) => {
        const newOrder = order.map(el => {
            if(el.mainId === itemId) {
             const newQuanity = el.quantity +1
             return {
                 ...el,
                 quantity: newQuanity
             }  
            } else {
                return el
            }
        })
        setOrder(newOrder)
    }
    const decQuantity = (itemId) => {
        const newOrder = order.map(el => {
            if(el.mainId === itemId) {
             const newQuanity = el.quantity - 1
             return {
                 ...el,
                 quantity: newQuanity >= 0 ? newQuanity : 0
             }  
            } else {
                return el
            }
        })
        setOrder(newOrder)
    }
    const closeAlert = () => {
        setAlertName('')
    }

    useEffect(function getGoods() {
      fetch(API_URL, {
          headers: {
              'Authorization': API_KEY ,
          },
      })
      .then((response) => response.json())
      .then((data) => {setGoods(data.shop)})
      setLoading(false)

    }, [])
    return <main className=' contanier content'>
        <Cart quantity={ order.length} handleBasketShow={handleBasketShow} />
         {
             loading ? <Loader/> : <GoodsList goods={goods} addToBasket={addToBasket}/>
         }
         {
             isBasscketShow && <BasketList order={order}
              handleBasketShow={handleBasketShow} 
              removeFomBasket={removeFomBasket}
              decQuantity={decQuantity}
              incQuantity={incQuantity}
              />
         }
         {
             alertName && <Alert displayName={alertName} closeAlert={closeAlert}/>
         }
    </main>
}
 
export {Shop}
import{useEffect,useContext} from 'react'
import{API_KEY,API_URL}from '../config'
import { GoodsList } from './GoodsList'
import { Loader } from './Loader'
import {Cart} from './Cart'
import {BasketList} from './BasketList'
import {Alert} from './Alert'
import {ShopContext} from '../context'

function Shop() {
    
    const { loading, order, isBasketShow
        ,alertName, setGoods} = useContext(ShopContext)

    useEffect(function getGoods() {
      fetch(API_URL, {
          headers: {
              'Authorization': API_KEY ,
          },
      })
      .then((response) => response.json())
      .then((data) => {
        setGoods(data.shop)})
        //eslint-disable-next-line
    }, [])

    return <main className=' contanier content'>
        <Cart quantity={ order.length} />
         {  loading ? <Loader/> : <GoodsList/> }
         { isBasketShow && <BasketList/> }
         {  alertName && <Alert />   }
    </main>
}
 
export {Shop}
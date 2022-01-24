export function reducer(state, {type,payload}) {
    switch (type) {
        case "ClOSE_ALERT" :
        return {
            ...state,
            alertName: ''
        }
        case "FROM_BASCET":
        return {
            ...state,
            order: state.order.filter(el => el.mainId !== payload.id),
        }
        case "ADD_BASKET": {
            const itemIndex = state.order.findIndex(orderItem => orderItem.mainId === payload.mainId)
            let newOrder = null
            if (itemIndex < 0) {
                const newItem = {
                    ...payload,
                    quantity: 1
                }
                newOrder = [...state.order, newItem]
            } else {
               newOrder = state.order.map((orderItem, index) => {
                    if (index === itemIndex) {
                        return {
                            ...orderItem,
                            quantity: orderItem.quantity + 1
                        }
                    } else {
                        return orderItem
                    }
                })
            }
            return {
                ...state,
                order: newOrder,
                alertName: payload.displayName,
            }
        }
        case 'INC_QUANTITY':
            return {
              ...state,
              order: state.order.map(el => {
                if(el.mainId === payload.id) {
                 const newQuanity = el.quantity +1
                 return {
                     ...el,
                     quantity: newQuanity
                  }  
                } else {
                    return el
                }
              }) 
            }
            case 'DEC_QUANTITY':
                return {
                  ...state,
                  order: state.order.map(el => {
                    if(el.mainId === payload.id) {
                     const newQuanity = el.quantity -1
                     return {
                         ...el,
                         quantity: newQuanity >= 0 ? newQuanity : 0
                      }  
                    } else {
                        return el
                    }
                  }) 
                } 
        case 'TOGGLE_BASKET': 
        return {
          ...state,
          isBasketShow: !state.isBasketShow
        } 
        case 'SET_GOODS':
            return {
                ...state,
                loading:false,
                goods:payload || []
            }       
        default:
            return state
    }
}
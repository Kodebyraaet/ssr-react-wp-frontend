import { createStore, applyMiddleware, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk'

/*
|--------------------------------------------------------------------------
|  MENUS REDUCER
|--------------------------------------------------------------------------
|
*/
const menusReducer = (state = { no: {}, en: {} }, action) => {
    switch(action.type) {
        case 'STORE_MENU' : 
            const { lang, location, menu } = action.payload
            return {...state, [lang]: {...state[lang], [location]: menu }}
        default :
            return state
    }
}
export const saveMenu = ({ menu, location, lang }) => dispatch => {
    return dispatch({ type: 'STORE_MENU', payload: { menu, location, lang } })
}

/*
|--------------------------------------------------------------------------
|  COMBINED REDUCERS
|--------------------------------------------------------------------------
*/
const reducers = combineReducers({
    menus: menusReducer,
})

export const initializeStore = (initialState = {}) => {
    return createStore(
        reducers,
        initialState,
        composeWithDevTools(applyMiddleware(thunkMiddleware))
    )
}
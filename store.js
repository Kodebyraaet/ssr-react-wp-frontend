import { createStore, applyMiddleware, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk'

/*
|--------------------------------------------------------------------------
|  WP CONFIG REDUCER
|--------------------------------------------------------------------------
|
*/
const wpReducer = (state = null, action) => {
    switch(action.type) {
        case 'SAVE_WP' : 
            return action.payload
        default :
            return state
    }
}
export const saveWp = wp => dispatch => {
    return dispatch({ type: 'SAVE_WP', payload: wp })
}

/*
|--------------------------------------------------------------------------
|  MENUS REDUCER
|--------------------------------------------------------------------------
|
*/
const menusReducer = (state = {}, action) => {
    switch(action.type) {
        case 'SAVE_MENU' : 
            const { lang, location, menu } = action.payload
            if(lang) {
                return {...state, [lang]: {...state[lang], [location]: menu }}
            } else {
                return {...state, [location]: menu}
            }
            
        default :
            return state
    }
}
export const saveMenu = ({ menu, location, lang }) => dispatch => {
    return dispatch({ type: 'SAVE_MENU', payload: { menu, location, lang } })
}

/*
|--------------------------------------------------------------------------
|  COMBINED REDUCERS
|--------------------------------------------------------------------------
*/
const reducers = combineReducers({
    wp: wpReducer,
    menus: menusReducer,
})

export const initializeStore = (initialState = {}) => {
    return createStore(
        reducers,
        initialState,
        composeWithDevTools(applyMiddleware(thunkMiddleware))
    )
}
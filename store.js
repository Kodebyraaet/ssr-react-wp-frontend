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
        case 'SET_WP' : 
            return action.payload
        default :
            return state
    }
}
export const setWp = wp => dispatch => {
    return dispatch({ type: 'SET_WP', payload: wp })
}

/*
|--------------------------------------------------------------------------
|  LANGUAGE REDUCER
|--------------------------------------------------------------------------
|
*/
const langReducer = (state = '', action) => {
    switch(action.type) {
        case 'SET_LANG' : 
            return action.payload
        default :
            return state
    }
}
export const setLang = lang => dispatch => {
    return dispatch({ type: 'SET_LANG', payload: lang })
}

/*
|--------------------------------------------------------------------------
|  MENUS REDUCER
|--------------------------------------------------------------------------
|
*/
const menusReducer = (state = {}, action) => {
    switch(action.type) {
        case 'SET_MENU' : 
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
export const setMenu = ({ menu, location, lang }) => dispatch => {
    return dispatch({ type: 'SET_MENU', payload: { menu, location, lang } })
}

/*
|--------------------------------------------------------------------------
|  COMBINED REDUCERS
|--------------------------------------------------------------------------
*/
const reducers = combineReducers({
    wp: wpReducer,
    lang: langReducer,
    menus: menusReducer,
})

export const initializeStore = (initialState = {}) => {
    return createStore(
        reducers,
        initialState,
        composeWithDevTools(applyMiddleware(thunkMiddleware))
    )
}
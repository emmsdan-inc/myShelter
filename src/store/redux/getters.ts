import {rcUserTokenAtom} from './states'
import store from './'
// get token from redux store
export const getToken = () => {
    try {
        return store.getState().global[rcUserTokenAtom]
    } catch (e) {
        return null
    }
}

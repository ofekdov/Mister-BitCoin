import { userService } from "../../services/user.service"

export function spendBalance(amount) {
    console.log('amount:', amount)
    return async (dispatch, getState) => {
        try {
            dispatch({ type: 'SPEND_BALANCE', amount})
            const user = userService.getUser()
            user.coins = user.coins - amount
            userService.updateUser(user)
        } catch (error) {
            console.log('error:', error)
        }
    }
}

export function signup(name) {
    return async (dispatch, getState) => {
        try {
            const user = userService.signup(name)
            dispatch({ type: 'SET_USER', user})
        } catch (error) {
            console.log('error:', error)
        }
    }
}

export function addMove(contact, amount) {
    return async (dispatch, getState) => {
        try {
            const user = userService.addMove(contact, amount)
            console.log('user',user)
            dispatch({ type: 'SET_USER', user})
        } catch (error) {
            console.log('error:', error)
        }
    }
}


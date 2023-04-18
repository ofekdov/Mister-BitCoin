import { storageService } from "./storage.service"

export const userService = {
  getUser,
  signup,
  addMove,
  updateUser
}

const userDB = 'userDB'

function getUser() {
  return storageService.load(userDB)
}

function signup(name) {
  const user = {
    name,
    coins:100,
    moves:[]
  }
  storageService.store(userDB, user)
  return user
}

function addMove(contact, amount) {
  const user = getUser()
  const move = {
    toId:contact._id,
    to:contact.name,
    at:Date.now(),
    amount
  }
  user.moves.unshift(move)  
  updateUser(user)
  return user
}

function updateUser(user) {
  storageService.store(userDB, user)
}


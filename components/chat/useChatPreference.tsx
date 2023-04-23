import { Chat } from '../../lib/type'
import { localStorage } from '../../lib/window'

export const useChatPreference = () => ({
  // Create new chat and save it to localStorage
  saveChatPreference: (chat: Chat | null) => {
    // get the chat item from localstorage by the id and parse it into the Chat object and push it into the stack so the localstorage will be updated
    const stack: Chat[] = JSON.parse(localStorage.getItem(chat.id) || '[]')
    if (!chat) return
    const newStack = [...stack]
    newStack.push(chat)
    localStorage.setItem(chat.id, JSON.stringify(newStack))
  },
  // update the existing chat in the localstorage by any new Chat object
  saveMessagePreference: async (id: string, item: Chat): Promise<any> => {
    if (!id) return
    const stack: Chat[] = JSON.parse(localStorage.getItem(id) || '[]')
    if (stack == null) return
    const newMessage = [...stack]
    newMessage.push(item)
    localStorage.setItem(id, JSON.stringify(newMessage))
  },

  // get all the chat values
  getChatPreference: () => {
    var values = []
    for (let i = 0; i < localStorage.length(); i++) {
      values.push(localStorage.getItem(localStorage.key(i)))
    }
    return values
  },
  // get specific chat by the id
  getChatIdPreference: (id: string) => {
    if (!id) return
    const stack: Chat[] = JSON.parse(localStorage.getItem(id) || '[]')
    if (stack == null) return
    return stack
  }
})

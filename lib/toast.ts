export const localConfirm = async (message: string): Promise<boolean> => {
  if (window) {
    return window.confirm(message)
  }

  return new Promise(resolve => {
    const confirm = window.confirm(message)
    resolve(confirm)
  })
}

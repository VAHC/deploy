export const totalByitem = (quantity, price) => {
    return quantity * price
}

export const totalItems = (cart) => {
    if (!cart) {
        return 0
      }
      const total = cart.reduce((acumulador, book) => {
        return acumulador + book.quantity
      }, 0);
      return total
    }

export const totalPrice = (cart) => {
    if (!cart) {
        return 0
    }
    const total = cart.reduce((acumulador, book) => {
        return acumulador + totalByitem(book.quantity, book.price)
    }, 0);
    return total
      }
export const priceFormatter = (price: number) => {
  const formattedPrice = price.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  return formattedPrice
}
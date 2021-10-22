export function formatBUSD(amount) {
  return `+ $${amount.toFixed(2)} BUSD`
}

export function formatDateAndAmount(date, amount) {
  return `${date} | ${formatBUSD(amount)}`
}
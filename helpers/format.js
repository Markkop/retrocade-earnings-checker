export function formatBUSD(amount) {
  return `+ $${amount.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})} BUSD`
}

export function formatDateAndAmount(date, amount) {
  return `${date} | ${formatBUSD(amount)}`
}
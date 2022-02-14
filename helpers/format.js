export function formatCurrency(amount, currency = '') {
  return `$${amount.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})} ${currency}`
}

export function formatDateAndAmount(date, amount, currency = 'BUSD') {
  return `${date} | ${formatCurrency(amount, currency)}`
}
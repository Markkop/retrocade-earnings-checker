export function formatCurrency(amount, currency = 'BUSD') {
  return `+ $${amount.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})} ${currency}`
}

export function formatDateAndAmount(date, amount, currency) {
  return `${date} | ${formatCurrency(amount, 'RC')}`
}
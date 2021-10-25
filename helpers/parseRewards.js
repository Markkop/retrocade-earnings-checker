export function mapTransactions(rawTransactions) {
  return rawTransactions.map(tx => ({
    date: tx.date.date,
    amount: tx.amount,
    txHash: tx.transaction.hash
  }))
}

export function reduceRewardsByDate(transactions) {
  return transactions.reduce((rewardsByDate, { date, amount }) => {
    const dateRewards = rewardsByDate.find(reward => reward.date === date)
    if (dateRewards) {
      dateRewards.amount = dateRewards.amount + amount
      return rewardsByDate
    }
    return rewardsByDate.concat({
      date,
      amount
    })
  }, [])
}

export function sumAmounts(transactions) {
  return transactions.reduce((totalAmount, { amount })=> {
    return totalAmount + amount
  }, 0)
}

export function getAverageAmountPerDay(transactions, totalAmount) {
  if (!transactions[0]) return totalAmount
  const firstDate = new Date(transactions[0].date)
  const lastDate = new Date(transactions[transactions.length - 1].date)
  const diffTime = Number(lastDate) - Number(firstDate)
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)) || 1
  return totalAmount / diffDays
}

export function sortByDate(a, b) {
  if (!a.date || !b.date) return 0
  return new Date(b.date) - new Date(a.date)
}
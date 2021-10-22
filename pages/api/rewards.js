// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { queryRewardTransactions } from "../../helpers/api";
import { 
  getAverageAmountPerDay, 
  mapTransactions, 
  reduceRewardsByDate, 
  sumAmounts, 
  sortByDate 
} from "../../helpers/parseRewards";

export default async function handler(req, res) {
  try {
    if (req.method !== 'POST') {
      return res.status(501).json({
        error: {
          code: 'method_unknown',
          message: 'This endpoint only responds to POST'
        }
      });
    }
    
    const { address } = JSON.parse(req.body)

    if (!address) {
      return res.status(400).json({
        error: {
          code: 'missing_data',
          message: 'Missing address'
        }
      })
    }

    const rawTransactions = await queryRewardTransactions(address)
    if (!rawTransactions.length) {
      return res.status(404).json({
        error: {
          code: 'not_found',
          message: 'Transactions not found for this address'
        }
      })
    }
    const transactions = mapTransactions(rawTransactions)
    const rewardsByDate = reduceRewardsByDate(transactions)
    const totalRewards = sumAmounts(transactions)
    const averageRewardsPerDay = getAverageAmountPerDay(transactions, totalRewards)

    return res.status(200).json({
      totalRewards,
      averageRewardsPerDay,
      rewardsByDate: rewardsByDate.sort(sortByDate),
      transactions: transactions.sort(sortByDate)
    });

  } catch (error) {
    console.log(error)
    return res.status(500).json({
      error: {
        code: 'server_error',
        message: 'Something did not work'
      }
    })
  }
}

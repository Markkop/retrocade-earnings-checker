// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { queryRewards } from "../../helpers/api";
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

    const { p2eTransfers, passiveTransfers, stakingContractTransfers, harvestCalls, address: receiverData } = await queryRewards(address)
    const passiveTransactions = mapTransactions(passiveTransfers)
    const p2eTransactions = mapTransactions(p2eTransfers)
    const totalPassiveRewards = sumAmounts(passiveTransactions)
    const totalP2ERewards = sumAmounts(p2eTransactions)
    
    const harvestTransfers = stakingContractTransfers.filter(tx => harvestCalls.some(call => call.transaction.hash === tx.transaction.hash))
    const harvestTransactions = mapTransactions(harvestTransfers)
    const totalHarvested = sumAmounts(harvestTransfers)

    const passiveRewardsByDate = reduceRewardsByDate(passiveTransactions)
    const averagePassiveRewardsPerDay = getAverageAmountPerDay(passiveTransactions, totalPassiveRewards)

    const balance = (receiverData[0] && receiverData[0].balances && receiverData[0].balances[0]) | {}
    const tokensHold = balance.value || 0

    return res.status(200).json({
      totalPassiveRewards,
      totalP2ERewards,
      averagePassiveRewardsPerDay,
      passiveRewardsByDate: passiveRewardsByDate.sort(sortByDate),
      passiveTransactions: passiveTransactions.sort(sortByDate),
      p2eTransactions: p2eTransactions.sort(sortByDate),
      tokensHold,
      totalHarvested,
      harvestTransactions
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

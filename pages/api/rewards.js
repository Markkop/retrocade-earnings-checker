// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { gql } from "@apollo/client";
import client from "../../apollo-client";

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

    if (!address ) {
      return res.status(400).json({
        error: {
          code: 'missing_data',
          message: 'Missing address'
        }
      })
    }

    const { data } = await client.query({
      variables: {
        "network": "bsc",
        "sender": process.env.SENDER_ADDRESS,
        "receiver": address
      },
      query: gql`query ($network: EthereumNetwork!, $sender: String!, $receiver: String!) {
        ethereum(network: $network) {
          transfers(
            sender: {is: $sender}
            receiver: {is: $receiver}
          ) {
            currency {
              name
            }
            date {
              date
            }
            amount(calculate: maximum)
            transaction {
              hash
            }
          }
        }
      }    
      `,
    });
    const rewardsWithTxHash = data.ethereum.transfers.map(transfer => ({
      date: transfer.date.date,
      amount: transfer.amount,
      txHash: transfer.transaction.hash
    }))

    const rewardsByDate = data.ethereum.transfers.reduce((rewardsByDate, transfer) => {
      const date = transfer.date.date
      const amount = transfer.amount
      const dateRewards = rewardsByDate.find(reward => reward.date === date)
      if (dateRewards) {
        dateRewards.amount = dateRewards.amount + amount
        return rewardsByDate
      }
      rewardsByDate.push({
          date,
          amount
      })
      return rewardsByDate    
    }, [])


    const rewards = rewardsByDate.reduce((rewards, rewardDate, index) => {
      const totalRewards = rewards.totalRewards + rewardDate.amount
      const averageRewards = totalRewards / index + 1
      return {
        totalRewards,
        averageRewards
      }
    }, {
      totalRewards: 0,
      averageRewards: 0,
    })

    return res.status(200).json({
      totalRewards: rewards.totalRewards,
      averageRewardsPerDay: rewards.averageRewards,
      rewardsByDate,
      rewardsWithTxHash
    });
  } catch (error) {
    return res.status(404).json({
      error: {
        code: 'not_found',
        message: 'Address not found'
      }
    })
  }
}

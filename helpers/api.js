
import { gql } from "@apollo/client";
import axios from "axios";
import client from "../apollo-client";

export async function getRewards(address) {
  const response = await fetch('/api/rewards', {
    method: 'POST',
    body: JSON.stringify({
      address
    })
  });
  return response.json();
}

export async function getPrice(slug) {
  const response = await fetch('/api/price', {
    method: 'POST',
    body: JSON.stringify({
      slug
    })
  });
  return response.json();
}

export async function queryRewards(receiverAddress) {
  try {
    const { data } = await client.query({
      variables: {
        "network": "bsc",
        "sender": process.env.SENDER_ADDRESS,
        "receiver": receiverAddress,
        "p2eSender": process.env.P2E_SENDER_ADDRESS,
        "newContract": process.env.NEW_CONTRACT_ADDRESS,
        "stakingSender": process.env.STAKING_SENDER_ADDRESS,
      },
      query: gql`query ($network: EthereumNetwork!, $sender: String!, $p2eSender: String!, $receiver: String!, $newContract: String!, $stakingSender: String! ) {
        ethereum(network: $network) {
          p2eTransfers: transfers(
            sender: {is: $p2eSender}
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
          passiveTransfers: transfers(
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
          stakingContractTransfers: transfers(
            sender: {is: $stakingSender}
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
          address(address: {is: $receiver}) {
            balances(currency: {is: $newContract}) {
              value
              currency {
                name
              }
            }
          }
          harvestCalls: smartContractCalls(
            smartContractMethod: {is: "harvestForUser"}
            smartContractAddress: {is: $stakingSender}
            caller: {is: $receiver}
          ) {
            transaction {
              hash
            }
          }
        }
      }    
      `,
    });
    return data.ethereum
  } catch (error) {
    console.log(error)
    throw new Error(error)
  }
  
}

export async function getTokenPrice(slug) {
    const url = "https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?slug=" + slug
    const options = {
        headers: {
            "X-CMC_PRO_API_KEY": process.env.CMC_API_KEY
        }
    }
    const { data } = await axios(url, options)
    return data.data[Object.keys(data.data)[0]].quote.USD.price
}
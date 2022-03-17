
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
        "p2eSender2": process.env.P2E_SENDER_ADDRESS_2,
        "p2eSenderRC": process.env.P2E_SENDER_ADDRESS_RC,
        "newContract": process.env.NEW_CONTRACT_ADDRESS,
        "stakingSender": process.env.STAKING_SENDER_ADDRESS,
      },
      query: gql`query ($network: EthereumNetwork!, $sender: String!, $p2eSender: String!, $p2eSender2: String!, $receiver: String!, $newContract: String!, $stakingSender: String!, $p2eSenderRC: String! ) {
        ethereum(network: $network) {
          p2eTransfers: transfers(
            sender: {in: [$p2eSender, $p2eSender2, $p2eSenderRC]}
            receiver: {is: $receiver}
          ) {
            currency {
              name,
              symbol
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
              name,
              symbol
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
              name,
              symbol
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
                name,
                symbol
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

export async function getTokenPrice(address) {
    const url = `https://api.pancakeswap.info/api/v2/tokens/${address}`
    const { data } = await axios(url)
    return data.data.price
}
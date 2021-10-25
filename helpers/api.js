
import { gql } from "@apollo/client";
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

export async function queryRewards(receiverAddress) {
  try {
    const { data } = await client.query({
      variables: {
        "network": "bsc",
        "sender": process.env.SENDER_ADDRESS,
        "receiver": receiverAddress,
        "contract": process.env.CONTRACT_ADDRESS,
      },
      query: gql`query ($network: EthereumNetwork!, $sender: String!, $receiver: String!, $contract: String! ) {
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
          address(address: {is: $receiver}) {
            balances(currency: {is: $contract}) {
              value
              currency {
                name
              }
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

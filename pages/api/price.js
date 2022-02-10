import { getTokenPrice } from "../../helpers/api";

export default async function handler(req, res) {
  try {
    const { slug } = JSON.parse(req.body)
    const price = await getTokenPrice(slug)
    res.status(200).json({
      price
    })
    return price
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
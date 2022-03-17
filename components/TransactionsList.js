import AnchoredListItem from "./AnchoredListItem";
import List from "./List";
import { formatDateAndAmount } from '../helpers/format'

export default function TransactionsList({ list, price }) {
  return (
    <List>
      {list.map(({ date, amount, txHash, currency }) => {
        return (
          <AnchoredListItem 
            href={`https://bscscan.com/tx/${txHash}`}
            key={txHash}
          >
            {formatDateAndAmount(date, amount, currency, price)}
          </AnchoredListItem>
        )}
      )}
    </List>
  )
}
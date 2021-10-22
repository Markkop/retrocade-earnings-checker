import AnchoredListItem from "./AnchoredListItem";
import List from "./List";
import { formatDateAndAmount } from '../helpers/format'

export default function TransactionsList({ list }) {
  return (
    <List>
      {list.map(({ date, amount, txHash }) => (
        <AnchoredListItem 
          href={`https://bscscan.com/tx/${txHash}`}
          key={txHash}
        >
          {formatDateAndAmount(date, amount)}
        </AnchoredListItem>
      ))}
    </List>
  )
}
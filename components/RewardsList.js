import List from "./List";
import { formatDateAndAmount } from '../helpers/format'

export default function TransactionsList({ list }) {
  return (
    <List>
      {list.map(({ date, amount }, index) => (
        <li key={index}>
          {formatDateAndAmount(date, amount)}
        </li>
      ))}
    </List>
  )
}
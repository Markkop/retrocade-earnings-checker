import styled from 'styled-components'
import Widget from './Widget'

const WalletWidget = styled(Widget)`
  width: 500px;
  font-size: 20px;
  display: flex;
  flex-direction: column;

  @media screen and (max-width: 768px) {
    width: auto;
    font-size: 12px;
  }

`

export default WalletWidget
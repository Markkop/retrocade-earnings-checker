import styled from 'styled-components'

const HeaderBase = styled.header`
  display: flex;
  flex-direction: column;
`

const HeaderTitle = styled.h1`
  color: white;
  margin-top: 10px;
`

export default function Header() {
  return (
    <HeaderBase>
      <HeaderTitle>
        <a href="https://www.retrocadep2e.com/" rel="noopener noreferrer" target="_blank">Retrocade</a> Earnings Checker
      </HeaderTitle>
    </HeaderBase>
  )
}
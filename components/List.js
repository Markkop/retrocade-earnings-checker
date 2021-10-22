import styled from 'styled-components'

const List = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-left: 30px;
  margin-top: 10px;
  overflow-y: scroll;
  height: 300px;
  scrollbar-color: black #00000000;

  li {
    padding-top: 3px;
  }
`

export default List
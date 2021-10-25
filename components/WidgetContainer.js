import styled from 'styled-components'

const WidgetContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px 30px;

  @media screen and (max-width: 768px) {
    padding: 0;
  }
` 

export default WidgetContainer
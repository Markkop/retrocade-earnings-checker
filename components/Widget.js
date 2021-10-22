import styled from 'styled-components'

const WidgetBase = styled.div`
  background-color: #cd44b3;
  border: 2px solid black;
  width: 300px;
  margin: 30px auto;
  padding: 10px;
  border-radius: 10px;
  text-align: center;
` 

export default function Widget({ title, children, className }) {
  return (
    <WidgetBase className={className}>
      {title}
      {children}
    </WidgetBase>
  )
}
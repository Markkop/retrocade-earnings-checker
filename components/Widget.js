import styled from 'styled-components'

const WidgetBase = styled.div`
  background-color: #cd44b3;
  border: 2px solid black;
  min-width: 300px;
  margin: 10px auto 10px auto;;
  padding: 10px;
  border-radius: 10px;
  text-align: center;

  @media screen and (max-width: 768px) {
    min-width: auto;
    margin: 10px 10px;
    padding: 10px 5px;
    font-size: 12px;
  }
` 

export default function Widget({ title, children, className }) {
  return (
    <WidgetBase className={className}>
      {title}
      {children}
    </WidgetBase>
  )
}
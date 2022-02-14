import styled from 'styled-components';

const Form = styled.form`
  margin-top: 5px;
`

const Input = styled.input`
  width: 100%;
`

const SubText = styled.p`
  margin-top: 10px;
  font-size: 12px;
`

const contract = process.env.NEW_CONTRACT_ADDRESS

export function AddressForm({ setInputAddress }) {
  return (
    <Form>
      <Input 
        name="address" 
        type="text"
        onChange={e => setInputAddress(e.target.value)}  
      />
      <SubText>
        or try an address from a <a rel="noopener noreferrer" target="_blank" href={`https://bscscan.com/token/${contract}#balances`}>holder</a>
      </SubText>
    </Form>
  )
}
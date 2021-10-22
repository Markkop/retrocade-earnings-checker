import styled from 'styled-components';

const Form = styled.form`
  margin-top: 5px;
`

const Input = styled.input`
  width: 100%;
`

export function AddressForm({ setInputAddress }) {
  return (
    <Form>
      <Input 
        name="address" 
        type="text"
        onChange={e => setInputAddress(e.target.value)}  
      />
    </Form>
  )
}
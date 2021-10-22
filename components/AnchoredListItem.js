import styled from 'styled-components'

const ListItem = styled.li`
  padding-top: 3px;
`

const Anchor = styled.a`
  text-align: left;
`

export default function AnchoredListItem({ href, children}) {
  return (
    <ListItem>
      <Anchor
        href={href}
        rel="noopener noreferrer"
        target="_blank"
        >
        {children}
      </Anchor>
    </ListItem>
  )
}
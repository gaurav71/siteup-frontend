import styled from 'styled-components'

export const Wrapper = styled.div`
  height: 50px;
  width: 100%;
  background: #fafafa;
  border-bottom: 1px solid #f0f0f0;
  display: flex;
  align-items: center;
  justify-content: center;

  .ant-dropdown-link {
    position: absolute;
      right: 0;
      margin-right: 40px;
  }

  .username-span {
    margin-left: 5px;
  }
`

export const UserNameSpan = styled.span`
  margin-left: 5px;
`
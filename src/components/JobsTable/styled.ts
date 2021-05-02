import styled from 'styled-components'

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 960px;

  table {
    min-width: 100%;
    border: 1px solid #f0f0f0;
    border-bottom: none;
  }

  .ant-table-wrapper {
    min-width: 100%;
  }
`

export const ButtonWrapper = styled.div`
  cursor: pointer;

  span {
    margin-left: 4px;
  }
`

export const Header = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;

  h2 {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
`

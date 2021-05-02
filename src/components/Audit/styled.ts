import styled from 'styled-components'

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 310px;

  .header {
    display: flex;
    justify-content: center;
    width: 500px;
    margin-bottom: 10px;
  }

  .div-wrap {
    width: 100%;
    height: 100%;
    overflow-y: scroll;
  }

  .ant-table-wrapper {
    width: 100%;
    height: 100%;
    // overflow-y: scroll;
  }

  .url {
    margin-right: 10px;
  }

  table {
    width: 100%;
    border: 1px solid #f0f0f0;
  }
`
export const TableWrapper = styled.div`
  width: 100%;
  height: 100%;
  overflow-y: scroll;
`

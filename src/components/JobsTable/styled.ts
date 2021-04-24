import styled from 'styled-components'

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  table {
    border: 1px solid #f0f0f0;
    border-bottom: none;
  }

`

export const Table = styled.table`
  border: 1px solid black;
  border-spacing: 0;
  border-radius: 8px;

  tr:first-child th:first-child { border-top-left-radius: 6px; }
  tr:first-child th:last-child { border-top-right-radius: 6px; }
  tr:last-child th:first-child { border-bottom-left-radius: 6px; }
  tr:last-child th:last-child { border-bottom-right-radius: 6px; }

  tr:not(:last-child) {
    th, td {
      border-bottom: 1px solid black;
    }
  }

  th:not(:last-child) {
    border-right: 1px solid black;
  }

  td:not(:last-child) {
    border-right: 1px solid black;
  }

  tr td i {
    cursor: pointer;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`

export const THead = styled.th`
  padding: 10px 20px;
  color: white;
  background: #434147;
`

export const TRow = styled.tr`

`

export const TData = styled.td`
  position: relative;
  padding: 10px 20px;
`

export const CheckNowButton = styled.button`
  cursor: pointer;
  border: 1px solid;
  border-radius: 3px;
`

export const UpIcon = styled.i`
  color: green;
  font-size: 18px;
`

export const DownIcon = styled.i`
  color: darkred;
  font-size: 18px;
`

export const EditIcon = styled.i`

`
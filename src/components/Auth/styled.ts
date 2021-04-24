import styled from 'styled-components'

export const Wrapper = styled.div`
  height: calc(100% - 40px);
  padding-top: 80px;
  display: flex;
  flex-direction: column;
  align-items: center;

  form {
    display: flex;
    width: 420px;
    flex-direction: column;
    border: 1px solid #d9d9d9;
    border-radius: 6px;
    padding: 40px;
    height: fit-content;

    .header {
      height: 40px;
      font-size: 18px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    input {
      height: 25px;
    }

    .ant-btn-primary {
      margin-right: 5px;
    }
  }
`
import styled, { keyframes } from 'styled-components'

const shake = keyframes`
  0% {
    transform: scale(1.1);
  }
  30% {
    transform: scale(1.1) rotateZ(-10deg);
  }
  60% {
    transform: scale(1.1) rotateZ(10deg);
  }
  100% {
    transform: scale(1.1);
  }
`

export const SearchWrapper = styled.div`
  width: 560px;
  height: 50px;
  margin: 30px auto 0;
  background-color: #fff;
  line-height: 50px;
  border-radius: 10px;

  position: relative;
  .input,
  .button {
    height: inherit;
    border: 2px solid transparent;
    line-height: inherit;
    transition: border-color 0.3s;
  }
  .input:focus,
  .input:focus + .button {
    border-color: rgba(24, 144, 255, 0.6);
  }
  .input {
    width: 500px;
    border-right: none;
    padding-left: 20px;
    vertical-align: top;
    outline: none;
    border-radius: 10px 0 0 10px;
  }
  .button {
    display: inline-block;
    width: 60px;
    border-left: none;
    color: #1890ff;
    font-size: 24px;
    cursor: pointer;
    border-radius: 0 10px 10px 0;
    &:hover .icon {
      animation: ${shake} 0.3s forwards;
    }
  }
  .results {
    position: absolute;
    width: 100%;
    z-index: 1;
    left: 0;
    bottom: 0;
    border-radius: 0 0 10px 10px;
    transform: translateY(100%);
    .result {
      .keyword {
        color: #1890ff;
      }
    }
  }
`
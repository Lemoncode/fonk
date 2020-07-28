import styled, { css } from "styled-components";

const btn = (light, dark) => css`
  white-space: nowrap;
  display: inline-block;
  border-radius: 5px;
  padding: 5px 15px;
  font-size: 16px;
  color: white;
  &:visited {
    color: white;
  }
  background-image: linear-gradient(${light}, ${dark});
  border: 1px solid ${dark};
  &:hover {
    background-image: linear-gradient(${light}, ${dark});
    &[disabled] {
      background-image: linear-gradient(${light}, ${dark});
    }
  }
  &:visited {
    color: black;
  }
  &[disabled] {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const btnDefault = css`
  ${btn("#ffffff", "#d5d5d5")} color: #555;
`;

const btnPrimary = btn("#4f93ce", "#285f8f");

export default styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;

  font-family: sans-serif;

  h1 {
    text-align: center;
    color: #222;
  }

  h2 {
    text-align: center;
    color: #222;
  }

  & > div {
    text-align: center;
  }

  a {
    display: block;
    text-align: center;
    color: #222;
  }

  form {
    width: 90%;
    margin: 10px auto;
    border: 1px solid #ccc;
    padding: 20px;
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3);
    border-radius: 3px;

    & > div {
      margin: 5px;
      & > input[type="checkbox"] {
        margin-top: 7px;
      }
      & > div {
        margin-left: 16px;
        & > label {
          display: block;
          & > input {
            margin-right: 3px;
          }
        }
      }
      & > span {
        line-height: 32px;
        margin-left: 10px;
        color: #800;
        font-weight: bold;
      }
    }
    button {
      margin: 0 10px;
      &[type="submit"] {
        ${btnPrimary};
        margin-top: 1rem;
        margin-bottom: 1rem;
      }
      &[type="button"] {
        ${btnDefault};
      }
    }
    pre {
      border: 1px solid #ccc;
      background: rgba(0, 0, 0, 0.1);
      box-shadow: inset 1px 1px 3px rgba(0, 0, 0, 0.2);
      padding: 20px;
    }
  }

  .row {
    display: flex;
    margin-top: 1rem;
    align-items: baseline;
    justify-content: center;
    & > :nth-child(n + 2) {
      margin-left: 1rem;
      flex-grow: 1;
    }
  }

  .input {
    display: flex;
    flex-direction: column;
    max-width: 150px;

    & input {
      font-size: 1rem;
      padding: 3px 5px;
      border: 1px solid #ccc;
      border-radius: 3px;
    }
  }

  .input-feedback {
    color: red;
    margin-top: 0.25rem;
  }
`;

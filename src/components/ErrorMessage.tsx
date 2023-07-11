import { styled } from "styled-components";

const Error = styled.span`
  color: #ff3f3f;
  margin: 0 4px;
`;

interface IErrorMessage {
  message?: string;
}
const ErrorMessage = ({ message }: IErrorMessage) => {
  return <Error>{message}</Error>;
};

export default ErrorMessage;

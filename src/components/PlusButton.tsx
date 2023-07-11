import { styled } from "styled-components";

export const PlusButton = styled.button`
  border: none;
  background-color: ${(props) => props.theme.plusBgColor};
  border-radius: 4px;
  cursor: pointer;
`;

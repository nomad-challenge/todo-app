import { useRecoilValue, useSetRecoilState } from "recoil";
import { IToDo, categoryListState, toDoState } from "../atoms";
import { styled } from "styled-components";

const Wrapper = styled.li`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
  padding-left: 8px;
  background-color: ${(props) => props.theme.todoBgColor};
  margin-top: 4px;
  border-radius: 4px;
  color: ${(props) => props.theme.todoColor};
  font-weight: 500;
`;
const BtnWrapper = styled.div`
  max-width: 30%;
`;

const Button = styled.button<{ transparent?: boolean }>`
  height: 100%;
  background-color: ${(props) =>
    props.transparent ? "transparent" : props.theme.btnBgColor};
  color: ${(props) => props.theme.btnColor};
  border: none;
  margin: 2px;
  padding: 4px;
  border-radius: 4px;
  cursor: pointer;
`;
const ToDo = ({ text, categoryId, id }: IToDo) => {
  const setToDos = useSetRecoilState(toDoState);
  const categoryList = useRecoilValue(categoryListState);

  const onClick = (category: number) => {
    setToDos((prev) => {
      const newToDos = prev.map((toDo) => {
        if (toDo.id === id) {
          return { ...toDo, categoryId: category };
        }
        return toDo;
      });
      return newToDos;
    });
  };

  const onDelete = () => {
    setToDos((prev) => prev.filter((toDo) => toDo.id !== id));
  };

  return (
    <Wrapper>
      <span>{text}</span>
      <BtnWrapper>
        {categoryList
          .filter((category) => category.id !== categoryId)
          .map((category) => (
            <Button key={category.id} onClick={() => onClick(category.id)}>
              {category.name}
            </Button>
          ))}
        <Button transparent onClick={onDelete}>
          ❌
        </Button>
      </BtnWrapper>
    </Wrapper>
  );
};

export default ToDo;

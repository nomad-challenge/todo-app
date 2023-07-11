import { useRecoilState, useRecoilValue } from "recoil";
import CreateToDo from "./CreateToDo";
import {
  IToDo,
  categoryListState,
  categoryState,
  toDoSelector,
  toDoState,
} from "../atoms";
import ToDo from "./ToDo";
import { styled } from "styled-components";
import CreateCategory from "./CreateCategory";

const Container = styled.div`
  margin: 0 20px;
`;
const Title = styled.h1`
  text-align: center;
  font-size: 30px;
  font-weight: 800;
  padding: 40px 0;
`;

const CategoryWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`;
const Category = styled.div`
  width: 400px;
  min-width: 400px;
  margin: 10px 10px 10px 0px;
  min-height: 85px;
  background-color: ${(props) => props.theme.todosBgColor};
  border-radius: 4px;
`;

const SubTitleWrapper = styled.div`
  position: relative;
`;
const SubTitle = styled.h2`
  text-align: center;
  font-size: 20px;
  font-weight: 600;
  background-color: ${(props) => props.theme.categoryBgColor};
  padding: 6px 0;
  border-radius: 4px;
  user-select: none;
`;

const DeleteCategory = styled.button`
  position: absolute;
  top: 0px;
  bottom: 0px;
  right: 0px;
  width: 40px;
  background-color: transparent;
  border: none;
  cursor: pointer;
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
`;

const Select = styled.select`
  width: 360px;
  font-size: 16px;
  padding: 4px;
  margin-left: -8px;
`;
const Option = styled.option``;
function ToDoList() {
  const [category, setCategory] = useRecoilState(categoryState);
  const [categoryList, setCategoryList] = useRecoilState(categoryListState);
  const [, setToDo] = useRecoilState(toDoState);
  const toDos = useRecoilValue(toDoSelector);
  const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
    setCategory(Number(event.currentTarget.value));
  };

  const onDeleteCategory = (categoryId: number) => {
    setToDo((prev) => prev.filter((toDo) => toDo.categoryId !== categoryId));
    setCategoryList((prev) =>
      prev.filter((category) => category.id !== categoryId)
    );
  };
  return (
    <Container>
      <Title>To Dos</Title>
      <CreateCategory />
      <Select value={category} onChange={onInput}>
        <Option value="" style={{ display: "none" }}>
          SELECT CATEGORY
        </Option>
        {categoryList.map((ca) => (
          <Option key={ca.id} value={ca.id}>
            {ca.name}
          </Option>
        ))}
      </Select>
      <CreateToDo />
      <CategoryWrapper>
        {toDos.map((toDo) => {
          const categoryName = Object.keys(toDo)[0];
          const toDoList = Object.values(toDo)[0] as IToDo[];
          return (
            <Category key={toDo["categoryId"]}>
              <SubTitleWrapper>
                <SubTitle>{categoryName}</SubTitle>
                <DeleteCategory
                  onClick={() => onDeleteCategory(toDo["categoryId"])}
                >
                  ❌
                </DeleteCategory>
              </SubTitleWrapper>
              <ul>
                {toDoList.map((toDo) => (
                  <ToDo key={toDo.id} {...toDo} />
                ))}
              </ul>
            </Category>
          );
        })}
      </CategoryWrapper>
    </Container>
  );
}

export default ToDoList;

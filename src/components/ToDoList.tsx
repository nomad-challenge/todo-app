import { useRecoilState, useRecoilValue } from "recoil";
import CreateToDo from "./CreateToDo";
import { categoryListState, categoryState, toDoSelector } from "../atoms";
import ToDo from "./ToDo";
import { styled } from "styled-components";
import CreateCategory from "./CreateCategory";

const Title = styled.h1`
  text-align: center;
  font-size: 24px;
`;

const CategoryWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`;
const Category = styled.div`
  width: 400px;
  min-width: 400px;
  margin: 10px 10px;
`;

const SubTitle = styled.h2`
  text-align: center;
  font-size: 20px;
  background-color: gray;
  padding: 6px 0;
  border-radius: 4px;
  user-select: none;
`;

function ToDoList() {
  const [category, setCategory] = useRecoilState(categoryState);
  const [categoryList] = useRecoilState(categoryListState);
  const toDos = useRecoilValue(toDoSelector);
  const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
    setCategory(Number(event.currentTarget.value));
  };
  return (
    <div>
      <Title>To Dos</Title>
      <hr />
      <CreateCategory />
      <select value={category} onChange={onInput} style={{ width: "150px" }}>
        <option value="" style={{ display: "none" }}>
          select category
        </option>
        {categoryList.map((ca) => (
          <option key={ca.id} value={ca.id}>
            {ca.name}
          </option>
        ))}
      </select>
      <CreateToDo />
      <CategoryWrapper>
        {toDos.map((toDo) => {
          const categoryName = Object.keys(toDo)[0];
          const toDoList = Object.values(toDo)[0];
          return (
            <Category key={categoryName}>
              <SubTitle>{categoryName}</SubTitle>
              <ul>
                {toDoList.map((toDo) => (
                  <ToDo key={toDo.id} {...toDo} />
                ))}
              </ul>
            </Category>
          );
        })}
      </CategoryWrapper>
    </div>
  );
}

export default ToDoList;

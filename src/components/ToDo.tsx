import { useRecoilValue, useSetRecoilState } from "recoil";
import { IToDo, categoryListState, toDoState } from "../atoms";

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
    <li>
      <span>{text}</span>
      {categoryList
        .filter((category) => category.id !== categoryId)
        .map((category) => (
          <button key={category.id} onClick={() => onClick(category.id)}>
            {category.name}
          </button>
        ))}
      <button onClick={onDelete}>❌</button>
    </li>
  );
};

export default ToDo;

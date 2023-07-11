import { atom, selector } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist({
  key: "toDos",
  storage: localStorage,
  converter: JSON,
});
const { persistAtom: categoryPersistAtom } = recoilPersist({
  key: "categoryList",
  storage: localStorage,
  converter: JSON,
});
export interface IToDo {
  text: string;
  id: number;
  categoryId: number;
}

export interface ICategory {
  id: number;
  name: string;
}

export const toDoState = atom<IToDo[]>({
  key: "toDo",
  default: [],
  effects_UNSTABLE: [persistAtom],
});

export const categoryListState = atom<ICategory[]>({
  key: "categoryList",
  default: [],
  effects_UNSTABLE: [categoryPersistAtom],
});

export const categoryState = atom<number>({
  key: "category",
  default: undefined,
});
export const toDoSelector = selector({
  key: "toDoSelector",
  get: ({ get }) => {
    const toDos = get(toDoState);
    const categoryList = get(categoryListState);
    return categoryList.map((category) => {
      return {
        [category.name]: toDos.filter(
          (toDo) => toDo.categoryId === category.id
        ),
      };
    });
  },
});

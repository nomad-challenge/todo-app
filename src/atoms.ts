import { atom, selector } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist({
  key: "toDosPersistAtom",
  storage: localStorage,
  converter: JSON,
});
const { persistAtom: categoryPersistAtom } = recoilPersist({
  key: "categoryPersistAtom",
  storage: localStorage,
  converter: JSON,
});

const { persistAtom: isDarkPersistAtom } = recoilPersist({
  key: "isDarkPersistAtom",
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

export const isDarkState = atom<boolean[]>({
  key: "isDark",
  default: [false],
  effects_UNSTABLE: [isDarkPersistAtom],
});

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
        categoryId: category.id,
      };
    });
  },
});

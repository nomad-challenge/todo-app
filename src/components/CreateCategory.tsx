import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import { categoryListState } from "../atoms";
import ErrorMessage from "./ErrorMessage";

interface IForm {
  category: string;
}
const CreateCategory = () => {
  const setCategoryList = useSetRecoilState(categoryListState);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<IForm>();
  const onValid = ({ category }: IForm) => {
    setCategoryList((prev) => {
      return [...prev, { id: Date.now(), name: category }];
    });
    setValue("category", "");
  };
  return (
    <form onSubmit={handleSubmit(onValid)}>
      <input
        {...register("category", {
          required: "Category is required",
          minLength: { value: 3, message: "min length is 3 charactors" },
        })}
        placeholder="write a category"
      />
      <button>➕</button>
      <ErrorMessage message={errors.category?.message} />
    </form>
  );
};

export default CreateCategory;

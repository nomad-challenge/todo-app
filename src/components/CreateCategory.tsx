import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import { categoryListState } from "../atoms";
import ErrorMessage from "./ErrorMessage";
import { InputBox } from "./InputBox";
import { Form } from "./Form";
import { PlusButton } from "./PlusButton";

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
    <>
      <Form onSubmit={handleSubmit(onValid)}>
        <InputBox
          {...register("category", {
            required: "Category is required",
            minLength: { value: 3, message: "min length is 3 charactors" },
          })}
          placeholder="write a category"
        />
        <PlusButton>➕</PlusButton>
      </Form>
      <ErrorMessage message={errors.category?.message} />
    </>
  );
};

export default CreateCategory;

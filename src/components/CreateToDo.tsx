import { useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import { categoryState, toDoState } from "../atoms";
import { useEffect } from "react";
import ErrorMessage from "./ErrorMessage";
import { Form } from "./Form";
import { InputBox } from "./InputBox";
import { PlusButton } from "./PlusButton";

interface IForm {
  toDo: string;
  extraError?: string;
}

const CreateToDo = () => {
  const [, setToDos] = useRecoilState(toDoState);
  const [category] = useRecoilState(categoryState);

  const {
    register,
    handleSubmit,
    setValue,
    setFocus,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<IForm>();

  useEffect(() => {
    if (!category) {
      setError("extraError", { message: "please select category" });
    } else {
      clearErrors("extraError");
    }
  }, [category]);
  const onValid = ({ toDo }: IForm) => {
    if (!category) {
      // setError("extraError", { message: "Please select category" });
    } else {
      setToDos((prev) => {
        return [{ text: toDo, id: Date.now(), categoryId: category }, ...prev];
      });
      setValue("toDo", "");
      setFocus("toDo");
    }
  };
  return (
    <>
      <Form onSubmit={handleSubmit(onValid)}>
        <InputBox
          {...register("toDo", { required: "please write a to do" })}
          placeholder="write a to do"
        />
        <PlusButton>➕</PlusButton>
      </Form>
      <ErrorMessage message={errors.toDo?.message} />
      <ErrorMessage message={errors.extraError?.message} />
    </>
  );
};

export default CreateToDo;

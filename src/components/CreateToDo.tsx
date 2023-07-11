import { useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import { categoryState, toDoState } from "../atoms";
import { useEffect } from "react";

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
      setError("extraError", { message: "Please select category" });
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
    <form onSubmit={handleSubmit(onValid)}>
      <input
        {...register("toDo", { required: "Please write a to do" })}
        placeholder="write a to do"
      />
      <button>➕</button>
      <span>{errors.toDo?.message}</span>
      <span>{errors.extraError?.message}</span>
    </form>
  );
};

export default CreateToDo;

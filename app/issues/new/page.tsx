"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import SimpleMDE from "react-simplemde-editor";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import "easymde/dist/easymde.min.css";
import { useRouter } from "next/navigation";

// 1. define the interface for the form
interface IssueForm {
  title: string;
  description: string;
}

const NewIssuePage = () => {
  const router = useRouter();

  // 2. use the form hook and set the type or shape of the form
  const { register, control, handleSubmit } = useForm<IssueForm>();
  // register ini sebuah function mengeluarkan value attribute umum dari sebuah input seperti onchange on blur dll. jd kita tidak perlu lagi menuliskan manual lgsg di assign aja ke input menggunakan spread oprator
  // console.log(register("title"));
  // 3. use the register function to register the input fields

  // CASE!
  // kita menggunakan library md editor, tapi tidak bisa secara langsung mengunakan function register maka kita harus menggunakan controller

  return (
    <form
      className="space-y-4 max-w-xl"
      onSubmit={handleSubmit(async (data) => {
        await axios.post("/api/issues", data);
        router.push("/issues");
      })}
    >
      <h1 className="text-2xl font-semibold">Create a new issue</h1>
      <div className="space-y-2">
        <Label htmlFor="title">Title</Label>
        <Input
          type="text"
          id="title"
          placeholder="ex: We have some bugs"
          {...register("title")}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <SimpleMDE
              // field samaa dengan register
              // value={field.value}
              // onChange={field.onChange}
              // onBlur={field.onBlur}
              {...field}
              placeholder="ex: We have some bugs in the system that need to be fixed"
            />
          )}
        />
      </div>
      <div className="space-x-4 text-right">
        <Button variant="outline">Cancel</Button>
        <Button>Create Issue</Button>
      </div>
    </form>
  );
};

export default NewIssuePage;

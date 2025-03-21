"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import SimpleMDE from "react-simplemde-editor";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import "easymde/dist/easymde.min.css";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AlertDestructive } from "@/components/blocks/AlertDescructive";
import { zodResolver } from "@hookform/resolvers/zod";
import { issueSchema } from "@/app/validationSchema";
import { z } from "zod";

// 1. define the interface for the form
// interface IssueForm {
//   title: string;
//   description: string;
// }
// ini kenapa diganti karena kita menggunakan schema zod agar tidak redundan
type IssueForm = z.infer<typeof issueSchema>;

const NewIssuePage = () => {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  // 2. use the form hook and set the type or shape of the form
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueForm>({
    resolver: zodResolver(issueSchema),
  });
  // register ini sebuah function mengeluarkan value attribute umum dari sebuah input seperti onchange on blur dll. jd kita tidak perlu lagi menuliskan manual lgsg di assign aja ke input menggunakan spread oprator
  // console.log(register("title"));
  // 3. use the register function to register the input fields

  // CASE!
  // kita menggunakan library md editor, tapi tidak bisa secara langsung mengunakan function register maka kita harus menggunakan controller

  const submitForm = async (data: IssueForm) => {
    try {
      const response = await axios.post("/api/issues", data);

      router.push("/issues");
    } catch (error) {
      setError("Ups! Something went wrong. Please try again later.");
    }
  };

  return (
    <div className="max-w-xl space-y-6">
      {error && <AlertDestructive message={error} />}
      <form className="space-y-4" onSubmit={handleSubmit(submitForm)}>
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
    </div>
  );
};

export default NewIssuePage;

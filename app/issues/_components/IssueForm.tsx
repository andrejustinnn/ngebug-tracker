"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
// import SimpleMDE from "react-simplemde-editor";
import { issueSchema } from "@/app/validationSchema";
import { LoadingSpinner } from "@/components/blocks/LoadingSpinner";
import { zodResolver } from "@hookform/resolvers/zod";
import { Issue } from "@prisma/client";
import axios from "axios";
import "easymde/dist/easymde.min.css";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import SimpleMDE from "react-simplemde-editor";
import { z } from "zod";

// 3. Import the SimpleMDE component dynamically.
// Tapi karena simple mde ini di import dynamic, jadi ada keliatan saat ahlaman di render
// simple mdenya telat baru tampil.
// jadi untuk improve loading experience kita bisa import simplemde secara static, TAPI Form ini di import secara dynamic
// const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
//   ssr: false, // not to render the component on the server, even tho this is a client side. but it's a good practice to add this because it's a dynamic import
// }); 

type IssueFormData = z.infer<typeof issueSchema>;

interface Props {
  issue?: Issue;
}

const IssueForm = ({issue} : Props) => {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  // 1. Define your form.
  const form = useForm<IssueFormData>({
    resolver: zodResolver(issueSchema),
    defaultValues: {
      title: issue?.title || "",
      description: issue?.description || ""
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: IssueFormData) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    try {
      if(issue) await axios.patch("/api/issues/"+issue.id, values);
      else await axios.post("/api/issues", values);
      router.push("/issues");
      router.refresh(); // ini refresh agar client side revalidate caching datanya
    } catch (error) {
      setError("Ups! Something went wrong. Please try again later.");
    }
  }

  return (
    <div className="max-w-xl space-y-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="ex: We have some bugs" {...field}  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <SimpleMDE
                    {...field}
                    placeholder="ex: We have some bugs in the system that need to be fixed"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex space-x-4">
            <Button variant="outline">Cancel</Button>
            <Button type="submit" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting ? <LoadingSpinner /> : "Submit"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default IssueForm;

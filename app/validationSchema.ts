import { z } from "zod";

export const issueSchema = z.object({
  title: z.string().min(1, "Title is required.").max(255),
  description: z.string().min(1, "Description is required.").max(65535)
  // kosongkan second argument untuk menggunakan pesan default
});

// untuk case misalnya kita hanya mau update assigned to user id atau statusnya saja. 
// kalau kita pakai schema "issueSchema", saat ingin update status misalnya kita harus mencantumkan title and desc krna required
// maka kita harus buat schema baru untuk patching
export const patchIssueSchema = z.object({
  title: z.string().min(1, "Title is required.").max(255).optional(),
  description: z.string().min(1, "Description is required.").max(65535).optional(),
  assignedToUserId: z.string().min(1, "Assigned to user is required").max(255).optional().nullable(),
});

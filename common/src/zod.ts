import { z } from "zod";

export const signUpSchema = z.object({
  username: z.string().min(5),
  email: z.string().email(),
  password: z.string().min(8),
});

export const signInSchema = z.object({
  username: z.string().min(5),
  password: z.string().min(8),
});

export const createPostSchema = z.object({
  title: z.string().min(30),
  content: z.string().min(100),
  thumbnail: z.string().optional(),
});

export const updatePostSchema = z.object({
  id: z.number(),
  title: z.string().min(30),
  content: z.string().min(100),
  thumbnail: z.string().optional(),
});

export type SignUp = z.infer<typeof signUpSchema>;
export type SignIn = z.infer<typeof signInSchema>;
export type CreatePostSchema = z.infer<typeof createPostSchema>;
export type UpdatePostSchema = z.infer<typeof updatePostSchema>;

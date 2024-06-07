"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePostSchema =
  exports.createPostSchema =
  exports.signInSchema =
  exports.signUpSchema =
    void 0;
const zod_1 = require("zod");
exports.signUpSchema = zod_1.z.object({
  username: zod_1.z.string().min(5),
  email: zod_1.z.string().email(),
  password: zod_1.z.string().min(8),
});
exports.signInSchema = zod_1.z.object({
  username: zod_1.z.string().min(5),
  password: zod_1.z.string().min(8),
});
exports.createPostSchema = zod_1.z.object({
  title: zod_1.z.string().min(30),
  content: zod_1.z.string().min(100),
  thumbnail: zod_1.z.string().optional(),
});
exports.updatePostSchema = zod_1.z.object({
  id: zod_1.z.number(),
  title: zod_1.z.string().min(30),
  content: zod_1.z.string().min(100),
  thumbnail: zod_1.z.string().optional(),
});

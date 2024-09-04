"use server";

import { z } from "zod";

const schema = z
  .object({
    name: z
      .string()
      .trim()
      .min(4, { message: "required" })
      .regex(new RegExp(/^[a-zA-Z\u0400-\u04FF\s'-]+$/), "invalid"),
    email: z
      .string()
      .trim()
      .min(1, { message: "required" })
      .email({ message: "invalid email format" }),
    userMessage: z.string().trim(),
    policy: z
      .string()
      .min(2, { message: "invalid" })
      .nullable()
      .refine((value) => value === "on", {
        message: "required",
      }),
  })
  .partial();

export interface IFormFields {
  name?: string;
  email?: string;
  userMessage?: string;
  policy?: string;
  message?: string;
  errors?: {
    name?: string[];
    email?: string[];
    userMessage?: string[];
    message?: string[];
    policy?: string[];
  };
}

export async function submitData(
  prevState: IFormFields | undefined,
  formData: FormData,
): Promise<IFormFields | undefined> {
  const name = formData.get("name")?.toString();
  const email = formData.get("email")?.toString();
  const userMessage = formData.get("userMessage")?.toString();
  const policy = formData.get("policy")?.toString();

  const validatedFields = schema.safeParse({
    name,
    email,
    userMessage,
    policy,
  });

  if (!validatedFields.success) {
    const errorsRes = validatedFields.error.flatten().fieldErrors;
    if (!policy) {
      return {
        errors: {
          ...errorsRes,
          policy: ["Need to agreed processing of personal data"],
        },
        message: "Error.",
      };
    }

    return {
      errors: errorsRes,
      message: "Error.",
    };
  }

  if (!policy) {
    return {
      errors: { policy: ["Need to agreed processing of personal data"] },
      message: "Error.",
    };
  }

  try {
    return { name, email, policy, userMessage, message: "success" };
  } catch (error) {
    console.error(error);
  }
}

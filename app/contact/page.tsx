"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { onContactRequest } from "./actions";

const contactRequestSchema = z.object({
  username: z.string().min(2),
  email: z.string().min(2),
  message: z.string().min(2),
});

type formData = z.infer<typeof contactRequestSchema>;

export default function Contact() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(contactRequestSchema),
  });

  const onSubmit = (data: FormData) => {
    onContactRequest(data);
  };

  return (
    <main>
      <h1>Contactez-nous</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <input type="text" placeholder="username" {...register("username")} />
          {errors.username && <p>{errors.username.message} </p>}
        </div>
        <div>
          <input type="email" placeholder="email" {...register("email")} />
          {errors.email && <p>{errors.email.message} </p>}
        </div>
        <div>
          <input type="text" placeholder="message" {...register("message")} />
          {errors.message && <p>{errors.message.message} </p>}
        </div>
        <div>
          <button type="submit">Envoyez</button>
        </div>
      </form>
    </main>
  );
}

"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { onContactRequest } from "./actions";
import { useState } from "react";

const onContactRequestSchema = z.object({
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  email: z.string().email(),
  message: z.string().min(2),
});

type FormData = z.infer<typeof onContactRequestSchema>;

export default function Contact() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(onContactRequestSchema),
  });

  const [isSubmitted, setIsSubmitted] = useState<string>("");

  const onSubmit = (data: FormData) => {
    onContactRequest(data).then(() => {
      setIsSubmitted("Form submitted successfully!");
    });
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-gray-100">
      <h1 className="text-3xl font-bold mb-8">Contactez-nous</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4 max-w-md w-full"
      >
        <div className="flex flex-col">
          <input
            type="text"
            placeholder="Nom"
            {...register("lastName")}
            className="border p-2 rounded-md focus:outline-none focus:border-blue-500"
          />
          {errors.lastName && (
            <p className="text-red-500 mt-2">{errors.lastName.message}</p>
          )}
        </div>
        <div className="flex flex-col">
          <input
            type="text"
            placeholder="Prénom"
            {...register("firstName")}
            className="border p-2 rounded-md focus:outline-none focus:border-blue-500"
          />
          {errors.firstName && (
            <p className="text-red-500 mt-2">{errors.firstName.message}</p>
          )}
        </div>
        <div className="flex flex-col">
          <input
            type="email"
            placeholder="Email"
            {...register("email")}
            className="border p-2 rounded-md focus:outline-none focus:border-blue-500"
          />
          {errors.email && (
            <p className="text-red-500 mt-2">{errors.email.message}</p>
          )}
        </div>
        <div className="flex flex-col">
          <textarea
            placeholder="Message"
            {...register("message")}
            className="border p-2 rounded-md focus:outline-none focus:border-blue-500"
          />
          {errors.message && (
            <p className="text-red-500 mt-2">{errors.message.message}</p>
          )}
        </div>
        <div>
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:ring focus:border-blue-300"
          >
            Envoyer
          </button>
        </div>
      </form>
      {isSubmitted ? (
        <p className="text-green-500 mt-4">{isSubmitted}</p>
      ) : (
        <p className="text-red-500 mt-4">Complete the form</p>
      )}
    </main>
  );
}

import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import axios from "axios";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";

const formSchema = z.object({
  username: z
    .string()
    .min(4, { message: "Username should be atleast 4 characters long" })
    .max(10, { message: "Username cannot exceed more than 10 characters" }),
  password: z
    .string()
    .min(4, { message: "Password length should be atleast 8 characters" }),
});

const InputForm = ({ type }) => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  // const { authenticate } = useAuth();
  const navigate = useNavigate();
  const onSubmit = async (e) => {
    e.preventDefault;
    try {
      const response = await axios.post(`/api/v1/user/${type.toLowerCase()}`, {
        username: form.getValues().username,
        password: form.getValues().password,
      });
      console.log(response.data);
      if (response) {
        navigate("/home");
      }
    } catch (error) {
      console.log(error.message);
      navigate(`/${type.toLowerCase()}`);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 w-full mx-auto p-6 rounded-lg border bg-[card] text-card-foreground shadow-sm"
      >
        <h2 className="text-2xl font-semibold w-full text-center">
          {type && type.charAt(0).toUpperCase() + type.substring(1)}
        </h2>
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="Enter your username" {...field} />
              </FormControl>
              {/* <FormDescription>
                Enter your username
              </FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Enter your password"
                  {...field}
                />
              </FormControl>
              {/* <FormDescription>
                Enter your username
              </FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-[15rem] block mx-auto">
          {type && type.charAt(0).toUpperCase() + type.substring(1)}
        </Button>
      </form>
    </Form>
  );
};

export default InputForm;

"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Form} from "@/components/ui/form"
import  FormField  from "@/components/FormField"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth"

import { z } from "zod"
import React from 'react'
import Image from "next/image"
import { toast } from "sonner"
import Link from "next/link"
import { useRouter } from "next/navigation"
import  {auth}  from "@/firebase/client"
import { signIn, signUp } from "@/lib/actions/auth.action"
const authFormSchema = (type: FormType) => {
  return z.object({
    name: type === "sign-up" ? z.string().min(1, { message: "Name is required" }) : z.string().optional(),
    email: z.string().email(),
    password: z.string().min(6, { message: "Password must be at least 6 characters long" }),
  })

}

const AuthForm = ({type}: {type: FormType}) => {
  const formSchema = authFormSchema(type);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  })

  const router = useRouter();
 
  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try{
      if(type === "sign-up"){
        // Sign up logic here
        const { name, email, password } = values;
        const  userCredentials = await createUserWithEmailAndPassword(auth, email, password)
        
        const risult = await signUp({
          uid: userCredentials.user.uid,
          name: name!,
          email,
          password
        })

        if(!risult?.success){
          toast.error(risult.message)
          return
        }
        //console.log("Sign up", values)
        toast.success("Account created successfully")
        router.push("/sign-in");
      }
      else{
        // Sign in logic here
        const { email, password } = values;
        const userCredentials = await signInWithEmailAndPassword(auth, email, password);
        const idToken = await userCredentials.user.getIdToken();

        if(!idToken){
          toast.error("Sign in failed")
          return;
        }

        await signIn({
          email,
          idToken
        })

      //  console.log("Sign in", values)
        toast.success("Logged in successfully")
        router.push("/");
      }

    }
    catch (error) {
      console.log(error);
      toast.error(`There was an error: ${error}`)
    }
    console.log(values)
  }

  const isSignIn = type === "sign-in"
  return (
    <div className=" card-border lg:min-w-[566px]">
      <div className="flex flex-col gap-6 card py-14 px-10">
        <div className="flex flex-row gap-2 justify-center">
          <Image src="/logo.svg" alt="logo" height={32} width={38}/>
          <h2 className="text-primary-100">PrepWise</h2>
        </div>
        <h3>Practice job interview with AI</h3>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} 
        className="w-full space-y-6 mt-4 form">
          {!isSignIn && (
            <FormField
              control={form.control}
              name="name"
              label="Name"
              placeholder="John Doe"
              type="text"
            />
          )}
           <FormField
              control={form.control}
              name="email"
              label="Email"
              placeholder="JohnDoe@mail.com"
              type="email"
            />
          <FormField
              control={form.control}
              name="password"
              label="Password"
              placeholder="********"
              type="password"
            />
  
          <Button className="btn" type="submit">
            {isSignIn ? "Sign In" : "Create an Account"}
          </Button>
        </form>
      </Form>
          <p className="text-center flex flex-row text-user-primary items-center justify-center">
            {isSignIn ? "Don't have an account?" : "Already have an account?"}
            <Link href={isSignIn ? "/sign-up" : "/sign-in"} className="text-primary-100 font-semibold ml-2">
              {isSignIn ? "Sign Up" : "Sign In"}
            </Link>
          </p>        
      </div>
    </div>
  )
}

export default AuthForm
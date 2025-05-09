import React from 'react'
import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Controller, FieldValues } from 'react-hook-form'
import path from 'path'
interface FormFieldProps<T extends FieldValues> {
    control: Control<T>
    name: path<T>
    label: string
    placeholder?: string
    type?: 'text' | 'email' | 'password'
}

const FormField = ({control,name, label, placeholder, type = "text"} : FormFieldProps<T>) => (
    <Controller 
        name = {name}
        control = {control}
        render = {({ field }) => (
              <FormItem>
                <FormLabel className='label'>{label}</FormLabel>
                <FormControl>
                  <Input placeholder={placeholder} {...field} type={type} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
    />
)

export default FormField
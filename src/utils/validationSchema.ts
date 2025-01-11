import {z} from "zod"


export const formData=z.object({
    email:z.string().email("Email is required"),
    password: z.string().min(8, "Password must be at least 8 characters long").regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(/[@$!%*?&]/, "Password must contain at least one special character"),
})

export const kycFormData = z.object({
  fullName: z.string().min(6, "name is required"),
  idNumber: z
    .string()
    .length(16, "ID Number must be exactly 16 digits")
    .regex(/^\d{16}$/, "ID Number must contain only numbers")
    .refine((val) => !/^(\d)\1{15}$/.test(val), {
      message: "ID Number cannot be a sequence of the same digit",
    }), 
  aadhaarName: z.string().min(6, "Aadhaar Name is required"),
  agreeToTerms: z.boolean().refine(val => val === true, "You must agree to the terms"),

});

export type formData=z.infer<typeof formData>
export type kycFormData = z.infer<typeof kycFormData>;

import z from "zod";

export const registrationSchema = z.object({
  schoolName: z
    .string()
    .min(1, "School name is required")
    .min(3, "School name must be at least 3 characters"),
  principalName: z.string().min(1, "Principal's name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(9, "Valid phone number required"),
  address: z.string().min(1, "Address is required"),
  country: z.string().min(1, "Country is required"),
});

export type RegistrationFormData = z.infer<typeof registrationSchema>;

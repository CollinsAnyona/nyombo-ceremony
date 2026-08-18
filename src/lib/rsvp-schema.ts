import { z } from "zod";

export const rsvpSchema = z.object({
  attending: z.enum(["yes", "no"]),
  name: z.string().trim().min(1, "Please enter your name.").max(120),
  whatsapp: z.string().trim().min(7, "Please enter a valid WhatsApp number.").max(20),
  email: z.union([z.string().trim().email("Please enter a valid email."), z.literal("")]).optional(),
  side: z.string().trim().min(1, "Please let us know which side you're joining from."),
  guestCount: z.number().int().min(1).max(20).optional(),
  message: z.string().trim().max(500).optional(),
});

export type RsvpInput = z.infer<typeof rsvpSchema>;

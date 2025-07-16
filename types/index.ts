import { z } from "zod";

export const TicketCreateSchema = z.object({
  titulo: z.string().min(1, "El título es obligatorio"),
  categoria: z.string().min(1, "La categoría es obligatoria"),
  descripcion: z.string().min(1, "La descripción es obligatoria"),
  prioridad: z.enum(["alta", "media", "baja"]),
  tecnico_id: z.number().optional(),
  comentarios: z.string().optional(),
});

export type TicketCreateInput = z.infer<typeof TicketCreateSchema>;

export interface Comment {
  id: number;
  ticket_id: number;
  user_id: number;
  message: string;
  created_at: string;
  updated_at: string;
  user?: {
    id: number;
    name: string;
    email: string;
  };
}

export interface Ticket {
  id: number;
  user_id: number;
  title: string;
  description: string;
  status: string;
  priority: string;
  category: string;
  attachments?: string | null;
  created_at: string;
  updated_at: string;
  comments?: Comment[];
}


export interface TicketClient {
  id: number;
  title: string;
  description: string;
  priority: string;
  category: string;
  attachments: string | null;
  status: string;
  user_id: number;
  created_at: string;
  updated_at: string;
}

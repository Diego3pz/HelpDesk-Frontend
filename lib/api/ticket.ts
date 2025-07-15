import api from "@/lib/axios";
import type { AxiosResponse } from "axios";

export interface TicketPayload {
    title: string;
    description: string;
    priority: "baja" | "media" | "alta";
    category: string;
    attachments?: FileList[] | null;
    status?: "open" | "in_progress" | "closed";
}

export interface Ticket {
    id: number;
    title: string;
    description: string;
    priority: string;
    category: string;
    attachments?: string[];
    status: string;
    user_id: number;
    comments: {
        id: number;
        content: string;
        user_id: number;
        created_at: string;
        updated_at: string;
        user: {
            id: number;
            name: string;
            email: string;
        };
    }[];
    created_at: string;
    updated_at: string;
}

// Crear un nuevo ticket
export async function createTicket(formData: FormData): Promise<Ticket> {
    const response: AxiosResponse<{ ticket: Ticket }> = await api.post("/tickets", formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data.ticket;
}

// Obtener todos los tickets del usuario autenticado
export async function getTickets(): Promise<Ticket[]> {
    const response: AxiosResponse<{ tickets: Ticket[] }> = await api.get("/tickets");
    return response.data.tickets;
}

// Obtener un ticket específico
export async function getTicket(id: number): Promise<Ticket> {
    const response: AxiosResponse<{ ticket: Ticket }> = await api.get(`/tickets/${id}`);
    return response.data.ticket;
}

// Actualizar un ticket
export async function updateTicket(id: number, payload: Partial<TicketPayload>): Promise<Ticket> {
    const response: AxiosResponse<{ ticket: Ticket }> = await api.put(`/tickets/${id}`, payload);
    return response.data.ticket;
}

// Cerrar un ticket
export async function closeTicket(id: number): Promise<Ticket> {
    const response: AxiosResponse<{ ticket: Ticket }> = await api.patch(`/tickets/${id}/close`);
    return response.data.ticket;
}
// Eliminar un ticket
export async function deleteTicket(id: number): Promise<void> {
    await api.delete(`/tickets/${id}`);
}
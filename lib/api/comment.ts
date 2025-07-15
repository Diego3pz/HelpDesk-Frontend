import axios from '@/lib/axios';

export const postComment = (ticketId: number, message: string) => {
    return axios.post(`/api/tickets/${ticketId}/comments`, { message });
}
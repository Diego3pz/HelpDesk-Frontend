'use client';

import { deleteTicket } from '@/lib/api/ticket';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Button, message, Modal, Space } from 'antd';
import Link from 'next/link';
import { useState } from 'react';

interface Props {
  ticketId: number;
}

export default function TicketTableActions({ ticketId }: Props) {
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const { mutate } = useMutation({
    mutationFn: deleteTicket,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tickets'] });
      message.success('Ticket eliminado con éxito');
      setIsModalOpen(false);
      setConfirmLoading(false);
    },
    onError: (error) => {
      console.error('Error al eliminar el ticket:', error);
      message.error('Error al eliminar el ticket');
      setConfirmLoading(false);
    },
  });

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setConfirmLoading(true);
    mutate(ticketId);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Space size="middle">
        <Button type="link">
          <Link href={`/cliente/tickets/${ticketId}`}>Ver</Link>
        </Button>
        <Button onClick={showModal} type="link" danger>
          Eliminar
        </Button>
      </Space>

      <Modal
        title="¿Estás seguro?"
        open={isModalOpen}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        okText="Sí, eliminar"
        cancelText="Cancelar"
      >
        <p>Esta acción eliminará el ticket permanentemente. ¿Deseas continuar?</p>
      </Modal>
    </>
  );
}

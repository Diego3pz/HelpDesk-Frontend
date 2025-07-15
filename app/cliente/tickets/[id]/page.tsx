'use client';

import { getTicket } from '@/lib/api/ticket';
import { postComment } from '@/lib/api/comment';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import {
  Card,
  Descriptions,
  Skeleton,
  Typography,
  Tag,
  Button,
  Divider,
  List,
  Input,
  Image,
  message as antMessage,
} from 'antd';
import { MessageOutlined, CloseCircleOutlined, FileImageOutlined } from '@ant-design/icons';
import { useState } from 'react';

const { Title, Text, Paragraph } = Typography;
const { TextArea } = Input;

export default function TicketDetailPage() {
  const { id } = useParams();
  const ticketId = parseInt(id as string, 10);
  const queryClient = useQueryClient();
  const [newComment, setNewComment] = useState('');

  const { data: ticket, isLoading } = useQuery({
    queryKey: ['ticket', ticketId],
    queryFn: () => getTicket(ticketId),
    enabled: !!id,
    refetchOnWindowFocus: false,
  });

  const commentMutation = useMutation({
    mutationFn: (message: string) => postComment(ticketId, message),
    onSuccess: () => {
      setNewComment('');
      queryClient.invalidateQueries({ queryKey: ['ticket', ticketId] });
      antMessage.success('Comentario agregado');
    },
    onError: () => {
      antMessage.error('No se pudo agregar el comentario');
    },
  });

  const handleCommentSubmit = () => {
    if (newComment.trim() === '') {
      antMessage.warning('El comentario no puede estar vacío');
      return;
    }

    commentMutation.mutate(newComment);
  };

  const getPriorityTag = (priority: string) => {
    switch (priority) {
      case 'alta':
        return <Tag color="red">Alta</Tag>;
      case 'media':
        return <Tag color="orange">Media</Tag>;
      case 'baja':
        return <Tag color="green">Baja</Tag>;
      default:
        return <Tag>{priority}</Tag>;
    }
  };

  const getStatusTag = (status: string) => {
    return status === 'open' ? (
      <Tag color="blue">Abierto</Tag>
    ) : (
      <Tag color="gray">Cerrado</Tag>
    );
  };

  return (
    <Card
      title={<Title level={4}>Detalle del Ticket</Title>}
      style={{ maxWidth: 1200, margin: '0 auto' }}
      extra={
        ticket?.status === 'open' && (
          <Button danger icon={<CloseCircleOutlined />} type="primary">
            Cerrar Ticket
          </Button>
        )
      }
    >
      {isLoading || !ticket ? (
        <Skeleton active paragraph={{ rows: 8 }} />
      ) : (
        <div style={{ display: 'flex', gap: 24 }}>
          {/* Columna Izquierda: Detalles del Ticket */}
          <div style={{ flex: 2 }}>
            <Descriptions bordered column={1} size="middle">
              <Descriptions.Item label="Título">{ticket.title}</Descriptions.Item>
              <Descriptions.Item label="Descripción">{ticket.description}</Descriptions.Item>
              <Descriptions.Item label="Categoría">{ticket.category}</Descriptions.Item>
              <Descriptions.Item label="Prioridad">{getPriorityTag(ticket.priority)}</Descriptions.Item>
              <Descriptions.Item label="Estado">{getStatusTag(ticket.status)}</Descriptions.Item>

              <Descriptions.Item label="Creado en">
                {new Date(ticket.created_at).toLocaleString()}
              </Descriptions.Item>
              <Descriptions.Item label="Última actualización">
                {new Date(ticket.updated_at).toLocaleString()}
              </Descriptions.Item>
            </Descriptions>

            <Divider orientation="left">
              <FileImageOutlined /> Adjuntos
            </Divider>
            <div>
              {ticket.attachments && ticket.attachments.length > 0 ? (
                <List
                  grid={{ gutter: 16, column: 4 }}
                  dataSource={ticket.attachments}
                  renderItem={(attachment: string) => (
                    <List.Item>
                      <Image
                        width={100}
                        src={`${process.env.NEXT_PUBLIC_WEBSITE_URL}${attachment}`} alt={attachment} style={{ height: 200, objectFit: 'cover' }}
                      />
                    </List.Item>
                  )}
                />
              ) : (
                <Text type="secondary">No hay imágenes adjuntas.</Text>
              )}
            </div>
          </div>

          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', maxHeight: '100%' }}>
            <Divider orientation="left">
              <MessageOutlined /> Comentarios
            </Divider>

            <div>
              <Text strong>Agregar comentario</Text>
              <TextArea
                rows={3}
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Escribe tu comentario..."
                style={{ marginTop: 8, marginBottom: 8 }}
              />
              <Button
                type="primary"
                onClick={handleCommentSubmit}
                loading={commentMutation.isPending}
              >
                Enviar Comentario
              </Button>
            </div>

            <div style={{ flex: 1, overflowY: 'auto', maxHeight: 400, marginBottom: 16 }}>
              {ticket.comments && ticket.comments.length > 0 ? (
                <List
                  dataSource={ticket.comments}
                  itemLayout="vertical"
                  renderItem={(comment: any) => (
                    <List.Item key={comment.id}>
                      <Card size="small">
                        <Text strong>{comment.user?.name || 'Usuario'}</Text>
                        <Paragraph style={{ marginTop: 4 }}>{comment.message}</Paragraph>
                        <Text type="secondary" style={{ fontSize: 12 }}>
                          {new Date(comment.created_at).toLocaleString()}
                        </Text>
                      </Card>
                    </List.Item>
                  )}
                />
              ) : (
                <Text type="secondary">Este ticket aún no tiene comentarios.</Text>
              )}
            </div>

          </div>
        </div>
      )}
    </Card>

  );
}

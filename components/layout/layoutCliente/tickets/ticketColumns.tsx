import { Tag } from 'antd';
import dayjs from 'dayjs';
import TicketTableActions from './TicketTableActions';
import type { ColumnsType } from 'antd/es/table';
import type { TicketClient } from '@/types';

const statusColors: Record<TicketClient['status'], string> = {
  open: 'green',
  closed: 'red',
  in_progress: 'blue',
};

const priorityColors: Record<TicketClient['priority'], string> = {
  baja: 'blue',
  media: 'orange',
  alta: 'red',
};

export const ticketColumns: ColumnsType<TicketClient> = [
  { title: 'ID', dataIndex: 'id', key: 'id' },
  { title: 'Título', dataIndex: 'title', key: 'title' },
  { title: 'Descripción', dataIndex: 'description', key: 'description' },
  {
    title: 'Prioridad',
    dataIndex: 'priority',
    key: 'priority',
    render: (priority) => (
      <Tag color={priorityColors[priority]}>{priority.toUpperCase()}</Tag>
    ),
  },
  { title: 'Categoría', dataIndex: 'category', key: 'category' },
  {
    title: 'Estado',
    dataIndex: 'status',
    key: 'status',
    render: (status) => (
      <Tag color={statusColors[status]}>{status.toUpperCase()}</Tag>
    ),
  },
  {
    title: 'Actualizado',
    dataIndex: 'updated_at',
    key: 'updated_at',
    render: (date) => dayjs(date).format('DD/MM/YYYY HH:mm'),
  },
  {
    title: 'Acciones',
    key: 'actions',
    render: (_, record) => <TicketTableActions ticketId={record.id} />,
  },
];

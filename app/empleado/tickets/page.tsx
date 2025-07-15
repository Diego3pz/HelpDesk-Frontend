'use client';

import React, { useState } from 'react';
import { Table, Tag, Space, Button, Input, Row, Col, Typography, Select } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import dayjs from 'dayjs';
import Link from 'next/link';

const { Title, Paragraph } = Typography;
const { Option } = Select;

interface Ticket {
  id: number;
  user_id: number;
  title: string;
  description: string;
  status: 'open' | 'closed' | 'in_progress';
  priority: 'baja' | 'media' | 'alta';
  category: string;
  assigned_to?: string;
  created_at: string;
  updated_at: string;
  user_name?: string;
}

const data: Ticket[] = [
  {
    id: 1,
    user_id: 1,
    title: 'Mi primer ticket',
    description: 'Tengo un problema con el sistema.',
    status: 'closed',
    priority: 'baja',
    category: 'Soporte',
    assigned_to: 'Carlos López',
    created_at: '2025-07-11T20:40:15.000000Z',
    updated_at: '2025-07-11T21:03:04.000000Z',
    user_name: 'Juan Pérez',
  },
  {
    id: 2,
    user_id: 1,
    title: 'Problema de acceso',
    description: 'No puedo acceder a mi cuenta.',
    status: 'open',
    priority: 'alta',
    category: 'Acceso',
    assigned_to: 'Ana García',
    created_at: '2025-07-12T10:15:30.000000Z',
    updated_at: '2025-07-12T11:00:00.000000Z',
    user_name: 'Juan Pérez',
  },
  {
    id: 3,
    user_id: 2,
    title: 'Solicitud de nueva funcionalidad',
    description: 'Me gustaría que se añadiera una nueva función al sistema.',
    status: 'in_progress',
    priority: 'media',
    category: 'Funcionalidad',
    assigned_to: 'Luis Fernández',
    created_at: '2025-07-13T08:30:45.000000Z',
    updated_at: '2025-07-13T09:20:10.000000Z',
    user_name: 'María López',
  }
];

const statusColors: Record<Ticket['status'], string> = {
  open: 'green',
  closed: 'red',
  in_progress: 'blue',
};

const priorityColors: Record<Ticket['priority'], string> = {
  baja: 'blue',
  media: 'orange',
  alta: 'red',
};

const columns: ColumnsType<Ticket> = [
  { title: 'ID', dataIndex: 'id', key: 'id' },
  { title: 'Usuario', dataIndex: 'user_name', key: 'user_name' },
  { title: 'Título', dataIndex: 'title', key: 'title' },
  { title: 'Descripción', dataIndex: 'description', key: 'description' },
  {
    title: 'Prioridad',
    dataIndex: 'priority',
    key: 'priority',
    render: (priority: Ticket['priority']) => (
      <Tag color={priorityColors[priority]}>{priority.toUpperCase()}</Tag>
    ),
  },
  { title: 'Categoría', dataIndex: 'category', key: 'category' },
  {
    title: 'Estado',
    dataIndex: 'status',
    key: 'status',
    render: (status: Ticket['status']) => (
      <Tag color={statusColors[status]}>{status.toUpperCase()}</Tag>
    ),
  },
  { title: 'Asignado a', dataIndex: 'assigned_to', key: 'assigned_to' },
  {
    title: 'Creado',
    dataIndex: 'created_at',
    key: 'created_at',
    render: (date) => dayjs(date).format('DD/MM/YYYY HH:mm'),
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
    render: (_, record) => (
      <Space size="middle">
        <Button type="link">
          <Link href={`/cliente/tickets/${record.id}`}>Ver</Link>
        </Button>
        <Button type="link" danger>
          Eliminar
        </Button>
      </Space>
    ),
  },
];

const unique = (arr: string[]) => Array.from(new Set(arr));

const EmpleadoTicketsPage: React.FC = () => {
  const [search, setSearch] = useState('');
  const [priority, setPriority] = useState<string | undefined>();
  const [category, setCategory] = useState<string | undefined>();
  const [status, setStatus] = useState<string | undefined>();

  // Opciones únicas para filtros
  const priorityOptions = unique(data.map(t => t.priority));
  const categoryOptions = unique(data.map(t => t.category));
  const statusOptions = unique(data.map(t => t.status));

  // Filtrado
  const filteredData = data.filter(ticket =>
    (ticket.title.toLowerCase().includes(search.toLowerCase()) ||
      ticket.description.toLowerCase().includes(search.toLowerCase())) &&
    (!priority || ticket.priority === priority) &&
    (!category || ticket.category === category) &&
    (!status || ticket.status === status)
  );

  return (
    <div>
      <Title level={2} style={{ marginBottom: 16 }}>Listado de Tickets</Title>
      <Paragraph style={{ marginBottom: 24 }}>
        Aquí puedes consultar todos tus tickets, buscar por palabras clave y crear nuevos tickets para reportar incidencias o solicitudes.
      </Paragraph>
      <Row gutter={16} style={{ marginBottom: 16 }}>
        <Col>
          <Input.Search
            placeholder="Buscar ticket..."
            allowClear
            onChange={e => setSearch(e.target.value)}
            style={{ width: 200 }}
          />
        </Col>
        <Col>
          <Select
            allowClear
            placeholder="Filtrar por prioridad"
            style={{ width: 150 }}
            onChange={value => setPriority(value)}
          >
            {priorityOptions.map(opt => (
              <Option key={opt} value={opt}>{opt.charAt(0).toUpperCase() + opt.slice(1)}</Option>
            ))}
          </Select>
        </Col>
        <Col>
          <Select
            allowClear
            placeholder="Filtrar por categoría"
            style={{ width: 180 }}
            onChange={value => setCategory(value)}
          >
            {categoryOptions.map(opt => (
              <Option key={opt} value={opt}>{opt}</Option>
            ))}
          </Select>
        </Col>
        <Col>
          <Select
            allowClear
            placeholder="Filtrar por estado"
            style={{ width: 150 }}
            onChange={value => setStatus(value)}
          >
            {statusOptions.map(opt => (
              <Option key={opt} value={opt}>{opt.charAt(0).toUpperCase() + opt.slice(1)}</Option>
            ))}
          </Select>
        </Col>
        <Col>
          <Button type="primary" icon={<PlusOutlined />}>
            <Link href={"/cliente/tickets/create"}>Nuevo Ticket</Link>
          </Button>
        </Col>
      </Row>
      <Table columns={columns} dataSource={filteredData} rowKey="id" />
    </div>
  );
};

export default EmpleadoTicketsPage;

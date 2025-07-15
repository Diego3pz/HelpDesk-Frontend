'use client';

import React, { useState } from 'react';
import { Table, Typography } from 'antd';
import { useQuery, dehydrate } from '@tanstack/react-query';
import { getTickets } from '@/lib/api/ticket';
import { getQueryClient } from '@/lib/react-query';
import QueryProvider from '@/components/layout/QueryProvider';
import TicketFilters from './TicketFilters';
import { ticketColumns } from './ticketColumns';

const { Title, Paragraph } = Typography;

const unique = (arr: string[]) => Array.from(new Set(arr));

export default function TicketTableWrapper() {
  const [search, setSearch] = useState('');
  const [priority, setPriority] = useState<string | undefined>();
  const [category, setCategory] = useState<string | undefined>();
  const [status, setStatus] = useState<string | undefined>();

  const queryClient = getQueryClient();
  const { data, isLoading } = useQuery({
    queryKey: ['tickets'],
    queryFn: getTickets,
    retry: false,
  });

  const dehydratedState = dehydrate(queryClient);
  if (!data) return <div>Cargando...</div>;

  const priorityOptions = unique(data.map(t => t.priority));
  const categoryOptions = unique(data.map(t => t.category));
  const statusOptions = unique(data.map(t => t.status));

  const filteredData = data.filter(ticket =>
    (ticket.title.toLowerCase().includes(search.toLowerCase()) ||
      ticket.description.toLowerCase().includes(search.toLowerCase())) &&
    (!priority || ticket.priority === priority) &&
    (!category || ticket.category === category) &&
    (!status || ticket.status === status)
  );

  return (
    <QueryProvider state={dehydratedState}>
      <div>
        <Title level={2}>Listado de Tickets</Title>
        <Paragraph>
          Aquí puedes consultar todos tus tickets, buscar por palabras clave y crear nuevos tickets para reportar incidencias o solicitudes.
        </Paragraph>

        <TicketFilters
          search={search}
          setSearch={setSearch}
          priority={priority}
          setPriority={setPriority}
          category={category}
          setCategory={setCategory}
          status={status}
          setStatus={setStatus}
          priorityOptions={priorityOptions}
          categoryOptions={categoryOptions}
          statusOptions={statusOptions}
        />

        <Table
          columns={ticketColumns}
          dataSource={filteredData}
          rowKey="id"
          loading={isLoading}
        />
      </div>
    </QueryProvider>
  );
}

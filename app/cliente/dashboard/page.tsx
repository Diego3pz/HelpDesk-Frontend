"use client";

import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Statistic, List, Typography, Tag } from 'antd';
import {
  FileTextOutlined,
  ClockCircleOutlined,
  PieChartOutlined,
  CheckCircleOutlined
} from '@ant-design/icons';
import dayjs from 'dayjs';
import { Pie, Bar } from '@ant-design/charts';

const { Title } = Typography;

// Simulación de datos de tickets
const tickets = [
  {
    id: 1,
    title: 'Mi primer ticket',
    status: 'closed',
    priority: 'baja',
    category: 'Soporte',
    assigned_to: 'Carlos López',
    created_at: '2025-07-11T20:40:15.000000Z',
    updated_at: '2025-07-11T21:03:04.000000Z',
  },
  {
    id: 2,
    title: 'Problema de acceso',
    status: 'open',
    priority: 'alta',
    category: 'Acceso',
    assigned_to: 'Ana García',
    created_at: '2025-07-12T10:15:30.000000Z',
    updated_at: '2025-07-12T11:00:00.000000Z',
  },
  {
    id: 3,
    title: 'Solicitud de nueva funcionalidad',
    status: 'in_progress',
    priority: 'media',
    category: 'Funcionalidad',
    assigned_to: 'Luis Fernández',
    created_at: '2025-07-13T08:30:45.000000Z',
    updated_at: '2025-07-13T09:20:10.000000Z',
  }
];

// Estadísticas básicas
const total = tickets.length;
const open = tickets.filter(t => t.status === 'open').length;
const closed = tickets.filter(t => t.status === 'closed').length;
const inProgress = tickets.filter(t => t.status === 'in_progress').length;

// Pie de prioridades
const priorityData = [
  { type: 'Alta', value: tickets.filter(t => t.priority === 'alta').length },
  { type: 'Media', value: tickets.filter(t => t.priority === 'media').length },
  { type: 'Baja', value: tickets.filter(t => t.priority === 'baja').length },
];

// Pie de estados
const statusData = [
  { type: 'Abiertos', value: open },
  { type: 'En Progreso', value: inProgress },
  { type: 'Cerrados', value: closed },
];

// Barras por categoría
const byCategory = Array.from(new Set(tickets.map(t => t.category))).map(cat => ({
  category: cat,
  count: tickets.filter(t => t.category === cat).length,
}));

// Últimos tickets
const latestTickets = [...tickets].sort((a, b) => dayjs(b.created_at).valueOf() - dayjs(a.created_at).valueOf()).slice(0, 3);

export default function DashboardPage() {
  const [showCharts, setShowCharts] = useState(false);

  useEffect(() => {
    setShowCharts(true);
  }, []);

  return (
    <div style={{ padding: 24 }}>
      <Title level={2} style={{ marginBottom: 24 }}>Resumen de Tickets</Title>

      <Row gutter={16} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic title="Total de Tickets" value={total} prefix={<FileTextOutlined />} />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic title="Abiertos" value={open} valueStyle={{ color: 'green' }} prefix={<ClockCircleOutlined />} />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic title="En Progreso" value={inProgress} valueStyle={{ color: 'blue' }} prefix={<PieChartOutlined />} />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic title="Cerrados" value={closed} valueStyle={{ color: 'red' }} prefix={<CheckCircleOutlined />} />
          </Card>
        </Col>
      </Row>

      <Row gutter={16} style={{ marginBottom: 24 }}>
        <Col xs={24} md={12}>
          <Card title="Distribución por Prioridad">
            {showCharts && (
              <Pie
                data={priorityData}
                angleField="value"
                colorField="type"
                radius={0.8}
                label={{
                  text: 'value',
                  style: { fontWeight: 'bold' },
                }}
                legend={{
                  color: {
                    title: false,
                    position: 'right',
                    rowPadding: 5,
                  },
                }}
                interactions={[{ type: 'element-active' }]}
              />
            )}
          </Card>
        </Col>

        <Col xs={24} md={12}>
          <Card title="Tickets por Categoría">
            <Bar
              data={byCategory}
              xField="count"
              yField="category"
              seriesField="category"
              legend={{ position: 'bottom' }}
              colorField="category"
              color={['#2f54eb', '#fa8c16', '#52c41a', '#eb2f96']}
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col xs={24} md={12}>
          <Card title="Últimos Tickets">
            <List
              itemLayout="horizontal"
              dataSource={latestTickets}
              renderItem={item => (
                <List.Item>
                  <List.Item.Meta
                    title={item.title}
                    description={
                      <>
                        <Tag color={item.status === 'open' ? 'green' : item.status === 'closed' ? 'red' : 'blue'}>
                          {item.status.toUpperCase()}
                        </Tag>
                        <span style={{ marginLeft: 8 }}>
                          Prioridad: <Tag color={item.priority === 'alta' ? 'red' : item.priority === 'media' ? 'orange' : 'blue'}>{item.priority.toUpperCase()}</Tag>
                        </span>
                        <span style={{ marginLeft: 8 }}>
                          {dayjs(item.created_at).format('DD/MM/YYYY HH:mm')}
                        </span>
                      </>
                    }
                  />
                </List.Item>
              )}
            />
          </Card>
        </Col>

        <Col xs={24} md={12}>
          <Card title="Distribución de Estados">
            {showCharts && (
              <Pie
                data={statusData}
                angleField="value"
                colorField="type"
                radius={0.8}
                label={{
                  text: 'value',
                  style: { fontWeight: 'bold' },
                }}
                legend={{
                  color: {
                    title: false,
                    position: 'right',
                    rowPadding: 5,
                  },
                }}
                interactions={[{ type: 'element-active' }]}
                color={['#52c41a', '#1890ff', '#ff4d4f']}
              />
            )}
          </Card>
        </Col>
      </Row>
    </div>
  );
}

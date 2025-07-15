'use client';

import { Input, Row, Col, Select, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import Link from 'next/link';

const { Option } = Select;

interface Props {
  search: string;
  setSearch: (val: string) => void;
  priority?: string;
  setPriority: (val?: string) => void;
  category?: string;
  setCategory: (val?: string) => void;
  status?: string;
  setStatus: (val?: string) => void;
  priorityOptions: string[];
  categoryOptions: string[];
  statusOptions: string[];
}

export default function TicketFilters({
  search,
  setSearch,
  priority,
  setPriority,
  category,
  setCategory,
  status,
  setStatus,
  priorityOptions,
  categoryOptions,
  statusOptions
}: Props) {
  return (
    <Row gutter={16} style={{ marginBottom: 16 }}>
      <Col>
        <Input.Search
          placeholder="Buscar ticket..."
          allowClear
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{ width: 200 }}
        />
      </Col>
      <Col>
        <Select
          allowClear
          placeholder="Filtrar por prioridad"
          value={priority}
          style={{ width: 150 }}
          onChange={setPriority}
        >
          {priorityOptions.map(opt => (
            <Option key={opt} value={opt}>
              {opt.charAt(0).toUpperCase() + opt.slice(1)}
            </Option>
          ))}
        </Select>
      </Col>
      <Col>
        <Select
          allowClear
          placeholder="Filtrar por categoría"
          value={category}
          style={{ width: 180 }}
          onChange={setCategory}
        >
          {categoryOptions.map(opt => (
            <Option key={opt} value={opt}>
              {opt}
            </Option>
          ))}
        </Select>
      </Col>
      <Col>
        <Select
          allowClear
          placeholder="Filtrar por estado"
          value={status}
          style={{ width: 150 }}
          onChange={setStatus}
        >
          {statusOptions.map(opt => (
            <Option key={opt} value={opt}>
              {opt.charAt(0).toUpperCase() + opt.slice(1)}
            </Option>
          ))}
        </Select>
      </Col>
      <Col>
        <Button type="primary" icon={<PlusOutlined />}>
          <Link href="/cliente/tickets/create">Nuevo Ticket</Link>
        </Button>
      </Col>
    </Row>
  );
}

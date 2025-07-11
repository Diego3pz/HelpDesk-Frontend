"use client"

import { useState } from "react"
import { Table, DatePicker, Select, Button, Card, Typography, Space, message } from "antd"
import { DownloadOutlined, SearchOutlined } from "@ant-design/icons"
import dayjs from "dayjs"

const { Title, Paragraph } = Typography
const { RangePicker } = DatePicker
const { Option } = Select

export default function AdminReportesPage() {
  const [loading, setLoading] = useState(false)

  const handleGenerate = () => {
    setLoading(true)
    setTimeout(() => {
      message.success("Reporte generado")
      setLoading(false)
    }, 1000)
  }

  const handleExport = () => {
    message.info("Exportando CSV...")
    // Aquí iría la lógica de exportar
  }

  const columns = [
    {
      title: "Fecha",
      dataIndex: "fecha",
    },
    {
      title: "Tipo",
      dataIndex: "tipo",
    },
    {
      title: "Descripción",
      dataIndex: "descripcion",
    },
    {
      title: "Acciones",
      dataIndex: "acciones",
      render: (_: any, record: any) => <Button type="link">Ver</Button>,
    },
  ]

  const data = [
    {
      key: "1",
      fecha: "2025-07-10",
      tipo: "Mantenimiento",
      descripcion: "Cambio de filtros",
    },
    {
      key: "2",
      fecha: "2025-07-09",
      tipo: "Equipo",
      descripcion: "Registro de nuevo equipo",
    },
  ]

  return (
    <div style={{ padding: 24 }}>
      <Typography>
        <Title level={2}>Reportes</Title>
        <Paragraph>Desde aquí puedes generar y ver reportes del sistema.</Paragraph>
      </Typography>

      <Card title="Filtros de búsqueda" style={{ marginBottom: 24 }}>
        <Space direction="vertical" size="middle" style={{ width: "100%" }}>
          <Space wrap>
            <RangePicker />
            <Select placeholder="Tipo de reporte" style={{ width: 200 }}>
              <Option value="todos">Todos</Option>
              <Option value="mantenimientos">Mantenimientos</Option>
              <Option value="equipos">Equipos</Option>
              <Option value="usuarios">Usuarios</Option>
            </Select>
            <Button type="primary" icon={<SearchOutlined />} loading={loading} onClick={handleGenerate}>
              Generar
            </Button>
          </Space>
        </Space>
      </Card>

      <Card
        title="Resultados"
        extra={
          <Button icon={<DownloadOutlined />} onClick={handleExport}>
            Exportar CSV
          </Button>
        }
      >
        <Table columns={columns} dataSource={data} pagination={{ pageSize: 5 }} />
      </Card>
    </div>
  )
}

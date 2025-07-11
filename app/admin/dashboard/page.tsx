import { Card } from "antd";
import Paragraph from "antd/es/typography/Paragraph";
import Title from "antd/es/typography/Title";

export default function AdminDashboardPage() {
  return (
    <>
      <div style={{ padding: 24 }}>
        <Title level={2}>Panel de Administración</Title>
        <Paragraph>
          Bienvenido al panel de administración. Aquí puedes gestionar usuarios, reportes y más.
        </Paragraph>
        <Card title="Estadísticas Generales" style={{ marginBottom: 24 }}>
          <Paragraph>Información sobre tickets, usuarios y más.</Paragraph>
        </Card>
      </div>
    
    </>
  )
}

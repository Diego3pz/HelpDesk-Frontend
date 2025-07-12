"use client";
import React, { useState } from "react";
import { Form, Input, Button, Typography, Select, Upload, Radio, message } from "antd";
import { useForm, Controller } from "react-hook-form";
import { Row, Col } from "antd";

const { Title } = Typography;

type TicketFormData = {
  titulo: string;
  descripcion: string;
  prioridad: "alta" | "media" | "baja";
  adjuntos?: FileList;
  categoria: string;
  tecnico_id?: number;
  comentarios: string;
};

export default function NuevoTicketPage() {
  const { control, handleSubmit, reset } = useForm<TicketFormData>();
  const [loading, setLoading] = useState(false);
  const [fileList, setFileList] = useState<any[]>([]);

  const onSubmit = async (data: TicketFormData) => {
    setLoading(true);
    // Simular una llamada a la API
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setLoading(false);
    message.success("Ticket creado con éxito");
    reset();
    setFileList([]); // Reinicia los archivos seleccionados
  };

  return (
    <div style={{ maxWidth: 600, margin: "40px auto" }}>
      <Title level={2} style={{ fontWeight: "bold" }}>Crear Nuevo Ticket</Title>
      <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
        <Row gutter={16}>
          <Col xs={24} md={12}>
            <Form.Item label="Título">
              <Controller
                name="titulo"
                control={control}
                rules={{ required: "El título es obligatorio" }}
                render={({ field, fieldState }) => (
                  <Input
                    style={{ borderRadius: "8px" }}
                    {...field}
                    placeholder="Ingrese el título del ticket"
                    status={fieldState.error ? "error" : ""}
                  />
                )}
              />
            </Form.Item>
            <Form.Item label="Prioridad">
              <Controller
                name="prioridad"
                control={control}
                defaultValue="baja"
                render={({ field }) => (
                  <Radio.Group
                    {...field}
                    optionType="button"
                    buttonStyle="solid"
                    style={{ width: "100%" }}
                  >
                    <Radio.Button value="baja">Baja</Radio.Button>
                    <Radio.Button value="media">Media</Radio.Button>
                    <Radio.Button value="alta">Alta</Radio.Button>
                  </Radio.Group>
                )}
              />
            </Form.Item>
            <Form.Item label="Adjuntar archivos">
              <Upload
                beforeUpload={() => false}
                multiple
                listType="text"
                accept=".png,.jpg,.jpeg,.pdf,.docx"
                fileList={fileList}
                onChange={({ fileList }) => setFileList(fileList)}
              >
                <Button>Seleccionar archivos</Button>
              </Upload>
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item label="Descripción" >
              <Controller
                name="descripcion"
                control={control}
                rules={{ required: "La descripción es obligatoria" }}
                render={({ field, fieldState }) => (
                  <Input
                    style={{ borderRadius: "8px", marginBottom: "16px" }}
                    {...field}
                    placeholder="Describa el problema o solicitud"
                    status={fieldState.error ? "error" : ""}
                  />
                )}
              />
            </Form.Item>
            <Form.Item label="Categoría">
              <Controller
                name="categoria"
                control={control}
                rules={{ required: "La categoría es obligatoria" }}
                render={({ field, fieldState }) => (
                  <Select
                    {...field}
                    style={{ borderRadius: "8px" }}
                    placeholder="Seleccione una categoría"
                    status={fieldState.error ? "error" : ""}
                    options={[
                      { label: "Soporte Técnico", value: "soporte_tecnico" },
                      { label: "Facturación", value: "facturacion" },
                      { label: "General", value: "general" },
                    ]}
                  />
                )}
              />
            </Form.Item>
            <Form.Item label="Asignar a técnico">
              <Controller
                name="tecnico_id"
                control={control}
                rules={{ required: "El técnico es obligatorio" }}
                render={({ field, fieldState }) => (
                  <Select
                    {...field}
                    style={{ borderRadius: "8px" }}
                    placeholder="Seleccione un técnico"
                    status={fieldState.error ? "error" : ""}
                    options={[
                      { label: "Juan García", value: 1 },
                      { label: "Ana Torres", value: 2 },
                    ]}
                  />
                )}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Form.Item label="Comentarios">
              <Controller
                name="comentarios"
                control={control}
                render={({ field }) => (
                  <Input.TextArea
                    {...field}
                    style={{
                      borderRadius: "8px",
                      height: "100px",
                      textAlign: "start",
                      verticalAlign: "top",
                      whiteSpace: "pre-wrap",
                      overflowY: "auto",
                      resize: "none",
                      paddingTop: 8,
                      scrollbarWidth: "none",
                    }}
                    placeholder="Agregue comentarios adicionales (opcional)"
                  />
                )}
              />
              <Button loading={loading} style={{ position: "relative", marginTop: "16px", borderRadius: "8px", padding: "24px" }} type="primary" htmlType="submit">
                Crear Ticket
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  );
}

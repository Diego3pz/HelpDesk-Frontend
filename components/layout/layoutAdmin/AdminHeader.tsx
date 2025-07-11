
'use client';

import { Layout, Button } from 'antd';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';

const { Header } = Layout;

type Props = {
  collapsed: boolean;
  toggleCollapse: () => void;
};

export default function AdminHeader({ collapsed, toggleCollapse }: Props) {
  return (
    <Header
      style={{
        background: '#fff',
        display: 'flex',
        alignItems: 'center',
        padding: '0 16px',
        justifyContent: 'space-between',
        borderBottom: '3px solid #eee',
        position: 'sticky',
        top: 0,
        zIndex: 1000,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Button
          type="text"
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={toggleCollapse}
          style={{ fontSize: '18px', marginRight: 16 }}
        />
        <h2 style={{ margin: 0 }}>Panel de Administración</h2>
      </div>
    </Header>
  );
}

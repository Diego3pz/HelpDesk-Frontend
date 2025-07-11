'use client';

import React from 'react';
import { Layout } from 'antd';
import SidebarMenu from '@/components/layout/layoutAdmin/SidebarMenu';
import AdminHeader from '@/components/layout/layoutAdmin/AdminHeader';
import { menuItems } from '@/components/layout/layoutAdmin/adminMenuItems';
import { usePersistentCollapse } from '@/hooks/usePersistentCollapse';

const { Content } = Layout;

const user = {
  name: 'Carlos Pérez',
  role: 'Administrador',
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { collapsed, toggle } = usePersistentCollapse();

  if (collapsed === null) return null;

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <SidebarMenu collapsed={collapsed} menuItems={menuItems} user={user} />
      <Layout>
        <AdminHeader collapsed={collapsed} toggleCollapse={toggle} />
        <Content style={{ margin: '16px', padding: 24, background: '#fff' }}>
          {children}
        </Content>
      </Layout>
    </Layout>
  );
}

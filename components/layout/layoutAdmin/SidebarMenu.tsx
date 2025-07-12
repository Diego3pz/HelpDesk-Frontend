
'use client';

import { Menu, Avatar, Layout } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { usePathname } from 'next/navigation';

const { Sider } = Layout;

type User = {
  name: string;
  role: string;
};

type SidebarProps = {
  collapsed: boolean;
  menuItems: any[];
  user: User;
};

export default function SidebarMenu({ collapsed, menuItems, user }: SidebarProps) {
  const pathname = usePathname();

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      trigger={null}
      style={{
        background: 'white',
        color: 'black',
        borderRight: '3px solid #eee',
        position: 'sticky',
        top: 0,
        height: '100vh',
        overflow: 'auto',
      }}
    >
      <div className='flex gap-4' style={{ padding: 16, textAlign: 'center' }}>
        <Avatar size={48} icon={<UserOutlined />} />
        {!collapsed && (
          <div>
            <div className='font-semibold' style={{ marginTop: 8 }}>{user.name}</div>
            <div style={{ fontSize: 12, opacity: 0.5 }}>{user.role}</div>
          </div>
        )}
      </div>

      <Menu
        theme="light"
        mode="inline"
        selectedKeys={[pathname]}
        items={menuItems}
      />
    </Sider>
  );
}

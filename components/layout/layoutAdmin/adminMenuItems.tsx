// constants/adminMenuItems.ts
import {
  DashboardOutlined,
  ContainerOutlined,
  TagsOutlined,
  FileTextOutlined,
  FileAddOutlined,
  UserOutlined,
  UsergroupAddOutlined,
  UserAddOutlined,
  SettingOutlined,
  NotificationOutlined,
  BulbOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import Link from 'next/link';

export const menuItems = [
  {
    key: '/admin/dashboard',
    icon: <DashboardOutlined />,
    label: <Link href="/admin/dashboard">Dashboard</Link>,
  },
  {
    key: '/admin/reportes',
    icon: <ContainerOutlined />,
    label: <Link href="/admin/reportes">Reportes</Link>,
  },
  {
    key: 'tickets-group',
    icon: <TagsOutlined />,
    label: 'Tickets',
    children: [
      { key: '/admin/tickets', label: <Link href="/admin/tickets">Ver tickets</Link>, icon: <FileTextOutlined /> },
      { key: '/admin/tickets/create', label: <Link href="/admin/tickets/create">Crear ticket</Link>, icon: <FileAddOutlined /> },
    ],
  },
  {
    key: 'users-group',
    icon: <UserOutlined />,
    label: 'Usuarios',
    children: [
      { key: '/admin/usuarios', label: <Link href="/admin/usuarios">Ver usuarios</Link>, icon: <UsergroupAddOutlined /> },
      { key: '/admin/usuarios/create', label: <Link href="/admin/usuarios/create">Crear usuario</Link>, icon: <UserAddOutlined /> },
    ],
  },
  {
    key: 'settings-group',
    icon: <SettingOutlined />,
    label: 'Configuración',
    children: [
      { key: '/admin/settings/profile', label: <Link href="/admin/settings/profile">Perfil</Link>, icon: <UserOutlined /> },
      { key: '/admin/settings/notifications', label: <Link href="/admin/settings/notifications">Notificaciones</Link>, icon: <NotificationOutlined /> },
    ],
  },
  {
    key: 'theme-toggle',
    icon: <BulbOutlined />,
    label: 'Modo oscuro',
  },
  {
    key: 'logout',
    icon: <LogoutOutlined />,
    label: <Link href="#">Cerrar sesión</Link>,
    danger: true,
  },
];

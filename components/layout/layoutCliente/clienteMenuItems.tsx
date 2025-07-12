
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
        key: '/cliente/dashboard',
        icon: <DashboardOutlined />,
        label: <Link href="/cliente/dashboard">Dashboard</Link>,
    },
    {
        key: 'tickets-group',
        icon: <TagsOutlined />,
        label: 'Tickets',
        children: [
            { key: '/cliente/tickets', label: <Link href="/cliente/tickets">Ver tickets</Link>, icon: <FileTextOutlined /> },
            { key: '/cliente/tickets/create', label: <Link href="/cliente/tickets/create">Crear ticket</Link>, icon: <FileAddOutlined /> },
        ],
    },
    {
        key: '/cliente/settings/profile',
        label: <Link href="/cliente/settings/profile">Perfil</Link>,
        icon: <UserOutlined />,
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

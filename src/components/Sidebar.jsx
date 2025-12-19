import React from 'react';
import { NavLink } from 'react-router-dom';
import {
    LayoutDashboard,
    FileText,
    ShoppingCart,
    Package,
    BarChart3,
    Settings,
    LogOut,
    GraduationCap
} from 'lucide-react';

const Sidebar = ({ userRole = 'admin' }) => {
    const menuItems = [
        { icon: <LayoutDashboard size={20} />, label: 'Visão Geral', path: '/admin', roles: ['admin'] },
        { icon: <FileText size={20} />, label: 'Solicitações', path: '/solicitacoes', roles: ['admin', 'user'], badge: '12' },
    ];

    return (
        <aside style={{
            width: '260px',
            backgroundColor: 'white',
            borderRight: '1px solid var(--border)',
            display: 'flex',
            flexDirection: 'column',
            height: '100vh',
            position: 'sticky',
            top: 0
        }}>
            <div style={{ padding: '2rem 1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{ background: 'var(--primary)', color: 'white', padding: '0.5rem', borderRadius: '8px' }}>
                    <GraduationCap size={24} />
                </div>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-main)' }}>Escola Admin</h2>
            </div>

            <nav style={{ flex: 1, padding: '0 1rem' }}>
                <p style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', padding: '1rem 0.5rem', letterSpacing: '0.05em' }}>
                    Gestão de Compras
                </p>
                <ul style={{ listStyle: 'none' }}>
                    {menuItems.map((item, index) => (
                        <li key={index} style={{ marginBottom: '0.25rem' }}>
                            <NavLink
                                to={item.path}
                                style={({ isActive }) => ({
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.75rem',
                                    padding: '0.75rem 1rem',
                                    borderRadius: '10px',
                                    textDecoration: 'none',
                                    color: isActive ? 'var(--primary)' : 'var(--text-muted)',
                                    backgroundColor: isActive ? 'rgba(30, 64, 175, 0.08)' : 'transparent',
                                    fontWeight: isActive ? 600 : 500,
                                    transition: 'all 0.2s'
                                })}
                            >
                                {item.icon}
                                <span style={{ flex: 1 }}>{item.label}</span>
                                {item.badge && (
                                    <span style={{
                                        background: 'var(--primary)',
                                        color: 'white',
                                        fontSize: '0.7rem',
                                        padding: '2px 8px',
                                        borderRadius: '99px'
                                    }}>{item.badge}</span>
                                )}
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </nav>

            <div style={{ padding: '1.5rem', borderTop: '1px solid var(--border)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                    <img src="https://ui-avatars.com/api/?name=Ana+Pereira&background=0D8ABC&color=fff" alt="User" style={{ width: '40px', height: '40px', borderRadius: '50%' }} />
                    <div>
                        <p style={{ fontSize: '0.875rem', fontWeight: 600 }}>Ana Pereira</p>
                        <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Administradora</p>
                    </div>
                </div>
                <NavLink to="/login" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.875rem', fontWeight: 500 }}>
                    <LogOut size={18} /> Sair
                </NavLink>
            </div>
        </aside>
    );
};

export default Sidebar;

import React from 'react';
import { Plus, CheckCircle, Clock, Package } from 'lucide-react';

const Dashboard = ({ requests, onNewRequest }) => {
    const stats = {
        total: requests.length,
        approved: requests.filter(r => r.status === 'approved').length,
        pending: requests.filter(r => r.status === 'pending').length,
    };

    return (
        <div style={{ marginBottom: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <div>
                    <h1 style={{ fontSize: '1.75rem' }}>Dashboard de Compras</h1>
                    <p style={{ color: 'var(--text-muted)' }}>Gerencie as solicitações da escola</p>
                </div>
                <button className="btn btn-primary" onClick={onNewRequest}>
                    <Plus size={20} /> Nova Solicitação
                </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
                <div className="glass" style={{ padding: '1.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
                        <div style={{ padding: '0.5rem', borderRadius: '8px', background: 'rgba(30, 64, 175, 0.1)', color: 'var(--primary)' }}>
                            <Package size={24} />
                        </div>
                        <span style={{ fontWeight: 500, color: 'var(--text-muted)' }}>Total de Pedidos</span>
                    </div>
                    <p style={{ fontSize: '2rem', fontWeight: 700 }}>{stats.total}</p>
                </div>

                <div className="glass" style={{ padding: '1.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
                        <div style={{ padding: '0.5rem', borderRadius: '8px', background: 'rgba(16, 185, 129, 0.1)', color: 'var(--success)' }}>
                            <CheckCircle size={24} />
                        </div>
                        <span style={{ fontWeight: 500, color: 'var(--text-muted)' }}>Aprovados</span>
                    </div>
                    <p style={{ fontSize: '2rem', fontWeight: 700 }}>{stats.approved}</p>
                </div>

                <div className="glass" style={{ padding: '1.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
                        <div style={{ padding: '0.5rem', borderRadius: '8px', background: 'rgba(245, 158, 11, 0.1)', color: 'var(--warning)' }}>
                            <Clock size={24} />
                        </div>
                        <span style={{ fontWeight: 500, color: 'var(--text-muted)' }}>Pendentes</span>
                    </div>
                    <p style={{ fontSize: '2rem', fontWeight: 700 }}>{stats.pending}</p>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;

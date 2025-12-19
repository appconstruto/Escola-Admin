import React from 'react';
import { MoreVertical, FileText } from 'lucide-react';

const RequestList = ({ requests }) => {
    const getStatusBadge = (status) => {
        switch (status) {
            case 'approved': return <span className="badge badge-approved">Aprovado</span>;
            case 'pending': return <span className="badge badge-pending">Pendente</span>;
            case 'rejected': return <span className="badge badge-rejected">Rejeitado</span>;
            default: return null;
        }
    };

    return (
        <div className="glass" style={{ overflow: 'hidden' }}>
            <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ fontSize: '1.1rem' }}>Solicitações Recentes</h3>
                <button style={{ background: 'none', border: 'none', color: 'var(--primary)', fontWeight: 600, cursor: 'pointer', fontSize: '0.875rem' }}>Ver todas</button>
            </div>
            <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                    <thead style={{ background: '#f8fafc', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)' }}>
                        <tr>
                            <th style={{ padding: '1rem 1.5rem' }}>Solicitação</th>
                            <th style={{ padding: '1rem 1.5rem' }}>Categoria</th>
                            <th style={{ padding: '1rem 1.5rem' }}>Solicitante</th>
                            <th style={{ padding: '1rem 1.5rem' }}>Valor</th>
                            <th style={{ padding: '1rem 1.5rem' }}>Status</th>
                            <th style={{ padding: '1rem 1.5rem' }}>Ações</th>
                        </tr>
                    </thead>
                    <tbody style={{ fontSize: '0.875rem' }}>
                        {requests.map((request) => (
                            <tr key={request.id} style={{ borderBottom: '1px solid var(--border)', transition: 'background 0.2s' }}>
                                <td style={{ padding: '1rem 1.5rem' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                        <div style={{ color: 'var(--primary)', background: '#eff6ff', padding: '0.4rem', borderRadius: '6px' }}>
                                            <FileText size={18} />
                                        </div>
                                        <span style={{ fontWeight: 500 }}>{request.title}</span>
                                    </div>
                                </td>
                                <td style={{ padding: '1rem 1.5rem', color: 'var(--text-muted)' }}>{request.category}</td>
                                <td style={{ padding: '1rem 1.5rem' }}>{request.requester}</td>
                                <td style={{ padding: '1rem 1.5rem', fontWeight: 600 }}>R$ {request.price.toFixed(2)}</td>
                                <td style={{ padding: '1rem 1.5rem' }}>{getStatusBadge(request.status)}</td>
                                <td style={{ padding: '1rem 1.5rem' }}>
                                    <button style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
                                        <MoreVertical size={18} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default RequestList;

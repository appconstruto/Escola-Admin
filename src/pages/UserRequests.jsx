import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import {
    Search,
    Plus,
    FileText,
    PenTool,
    Eye,
    MoreVertical,
    Info,
    Laptop,
    Book,
    Wrench,
    Trash2
} from 'lucide-react';

const UserRequests = () => {
    const [filter, setFilter] = useState('Todos');
    const [searchTerm, setSearchTerm] = useState('');

    const allRequests = [
        { id: '#REQ-2023-001', title: 'Compra de Projetores - Sala 3', type: 'Material', date: '24/10/2023', status: 'Pendentes', icon: <Laptop size={18} />, color: '#3b82f6' },
        { id: '#REQ-2023-045', title: 'Reparo Ar Condicionado - Biblioteca', type: 'Serviço', date: '20/10/2023', status: 'Concluída', icon: <Wrench size={18} />, color: '#f59e0b' },
        { id: '#REQ-2023-032', title: 'Livros Didáticos 5º Ano', type: 'Material', date: '18/10/2023', status: 'Rejeitada', icon: <Book size={18} />, color: '#3b82f6' },
        { id: '#REQ-2023-018', title: 'Material de Limpeza - Estoque', type: 'Material', date: '15/10/2023', status: 'Concluída', icon: <Info size={18} />, color: '#3b82f6' },
        { id: '#REQ-2023-012', title: 'Manutenção Elétrica - Quadra', type: 'Serviço', date: '10/10/2023', status: 'Em andamento', icon: <PenTool size={18} />, color: '#f59e0b' },
    ];

    const filteredRequests = allRequests.filter(req => {
        const matchesFilter = filter === 'Todos' || req.status === filter;
        const matchesSearch = req.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            req.id.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesFilter && matchesSearch;
    });

    const getStatusStyle = (status) => {
        switch (status) {
            case 'Pendentes': return { bg: '#fff7ed', color: '#9a3412' };
            case 'Em andamento': return { bg: '#eff6ff', color: '#1e40af' };
            case 'Concluída': return { bg: '#d1fae5', color: '#065f46' };
            case 'Rejeitada': return { bg: '#fee2e2', color: '#991b1b' };
            default: return { bg: '#f1f5f9', color: '#64748b' };
        }
    };

    return (
        <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f8fafc' }}>
            <Sidebar userRole="user" />

            <main style={{ flex: 1, padding: '2rem 3rem' }}>
                <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '3rem' }}>
                    <div>
                        <h1 style={{ fontSize: '2.25rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>Minhas Solicitações</h1>
                        <p style={{ color: 'var(--text-muted)' }}>Gerencie suas solicitações de compra e serviços escolares.</p>
                    </div>
                    <button className="btn btn-primary" onClick={() => alert('Abrir formulário de nova solicitação')} style={{ padding: '0.875rem 1.5rem', fontSize: '1rem' }}>
                        <Plus size={20} /> Nova Solicitação
                    </button>
                </header>

                <section className="glass" style={{ padding: '0', overflow: 'hidden' }}>
                    {/* Toolbar */}
                    <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'white' }}>
                        <div style={{ position: 'relative', flex: 1, maxWidth: '400px' }}>
                            <input
                                type="text"
                                placeholder="Pesquisar por título ou ID..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                style={{ width: '100%', padding: '0.75rem 1rem', paddingLeft: '2.75rem', borderRadius: '12px', border: '1px solid var(--border)', background: '#f8fafc' }}
                            />
                            <Search size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                        </div>

                        <div style={{ display: 'flex', gap: '0.75rem' }}>
                            {['Todos', 'Pendentes', 'Em andamento', 'Concluída', 'Rejeitada'].map((s) => (
                                <button
                                    key={s}
                                    onClick={() => setFilter(s)}
                                    style={{
                                        padding: '0.6rem 1.25rem',
                                        borderRadius: '10px',
                                        border: 'none',
                                        fontSize: '0.875rem',
                                        fontWeight: 600,
                                        cursor: 'pointer',
                                        backgroundColor: filter === s ? 'var(--primary)' : '#f1f5f9',
                                        color: filter === s ? 'white' : 'var(--text-muted)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.5rem',
                                        transition: 'all 0.2s'
                                    }}
                                >
                                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: filter === s ? 'white' : getStatusStyle(s).color }}></div>
                                    {s}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Table */}
                    <div style={{ overflowX: 'auto' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                            <thead style={{ background: '#f8fafc', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)', letterSpacing: '0.05em' }}>
                                <tr>
                                    <th style={{ padding: '1.25rem 2rem' }}>Título</th>
                                    <th style={{ padding: '1.25rem 2rem' }}>Tipo</th>
                                    <th style={{ padding: '1.25rem 2rem' }}>Data de Envio</th>
                                    <th style={{ padding: '1.25rem 2rem' }}>Status</th>
                                    <th style={{ padding: '1.25rem 2rem', textAlign: 'center' }}>Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredRequests.map((req, i) => (
                                    <tr key={i} style={{ borderBottom: '1px solid var(--border)', background: 'white' }}>
                                        <td style={{ padding: '1.5rem 2rem' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                                <div style={{ padding: '0.6rem', background: '#eff6ff', color: 'var(--primary)', borderRadius: '10px' }}>
                                                    {req.icon}
                                                </div>
                                                <div>
                                                    <p style={{ fontWeight: 700, color: '#1e293b' }}>{req.title}</p>
                                                    <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>ID: {req.id}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td style={{ padding: '1.5rem 2rem' }}>
                                            <span style={{ padding: '0.4rem 0.8rem', background: '#f1f5f9', color: '#475569', borderRadius: '8px', fontSize: '0.75rem', fontWeight: 600 }}>
                                                {req.type}
                                            </span>
                                        </td>
                                        <td style={{ padding: '1.5rem 2rem', color: '#475569', fontWeight: 500 }}>{req.date}</td>
                                        <td style={{ padding: '1.5rem 2rem' }}>
                                            <span style={{
                                                padding: '0.4rem 1rem',
                                                borderRadius: '99px',
                                                fontSize: '0.75rem',
                                                fontWeight: 700,
                                                backgroundColor: getStatusStyle(req.status).bg,
                                                color: getStatusStyle(req.status).color,
                                                display: 'inline-flex',
                                                alignItems: 'center',
                                                gap: '0.4rem'
                                            }}>
                                                <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'currentColor' }}></div>
                                                {req.status}
                                            </span>
                                        </td>
                                        <td style={{ padding: '1.5rem 2rem' }}>
                                            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center' }}>
                                                <button onClick={() => alert(`Editar ${req.id}`)} style={{ border: 'none', background: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}><PenTool size={18} /></button>
                                                <button onClick={() => alert(`Visualizar ${req.id}`)} style={{ border: 'none', background: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}><Eye size={18} /></button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    <div style={{ padding: '1.25rem 2rem', background: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Mostrando 1 a {filteredRequests.length} de {allRequests.length} resultados</p>
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                            <button className="btn" style={{ padding: '0.5rem 0.75rem', background: 'white', border: '1px solid var(--border)', cursor: 'pointer' }}>&lt;</button>
                            <button className="btn" style={{ padding: '0.5rem 1rem', background: 'var(--primary)', color: 'white', border: 'none', cursor: 'pointer' }}>1</button>
                            <button className="btn" style={{ padding: '0.5rem 1rem', background: 'white', border: '1px solid var(--border)', cursor: 'pointer' }}>2</button>
                            <button className="btn" style={{ padding: '0.5rem 1rem', background: 'white', border: '1px solid var(--border)', cursor: 'pointer' }}>3</button>
                            <span style={{ alignSelf: 'center', color: 'var(--text-muted)' }}>...</span>
                            <button className="btn" style={{ padding: '0.5rem 0.75rem', background: 'white', border: '1px solid var(--border)', cursor: 'pointer' }}>&gt;</button>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default UserRequests;

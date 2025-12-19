import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import {
    ClipboardList,
    DollarSign,
    AlertCircle,
    Search,
    Filter,
    Printer,
    Download,
    MoreVertical,
    CheckCircle,
    Clock
} from 'lucide-react';

const INITIAL_REQUESTS = [
    { id: '#402', title: 'Materiais de Arte', requester: 'Prof. Carlos Eduardo', time: 'Há 2 horas', price: 350.00, status: 'Pendentes', icon: '🎨', color: '#818cf8', category: 'Materiais', date: '24 Out, 2025 às 09:30', items: [{ name: 'Kit Tinta Acrílica', qty: 5, total: 200 }, { name: 'Pincéis variados', qty: 10, total: 100 }, { name: 'Papel Canson A3', qty: 2, total: 50 }], justification: 'Necessário para as aulas práticas de pintura com as turmas do 6º e 7º ano...' },
    { id: '#401', title: 'Manutenção Lab. Informática', requester: 'Coord. João Paulo', time: 'Há 4 horas', price: 1200.00, status: 'Em andamento', icon: '💻', color: '#34d399', category: 'Serviços', date: '24 Out, 2025 às 08:15', items: [{ name: 'Manutenção Preventiva', qty: 1, total: 1200 }], justification: 'Vários computadores apresentando lentidão e necessidade de limpeza.' },
    { id: '#399', title: 'Livros Didáticos 2º Ano', requester: 'Biblio. Helena', time: 'Ontem', price: 890.50, status: 'Pendentes', icon: '📚', color: '#a78bfa', category: 'Materiais', date: '23 Out, 2025 às 14:00', items: [{ name: 'Coleção Português', qty: 10, total: 500 }, { name: 'Coleção Matemática', qty: 8, total: 390.50 }], justification: 'Reposição de estoque para o próximo semestre.' },
    { id: '#398', title: 'Bolas de Futebol', requester: 'Prof. Roberto', time: 'Ontem', price: 150.00, status: 'Concluída', icon: '⚽', color: '#60a5fa', category: 'Materiais', date: '23 Out, 2025 às 10:30', items: [{ name: 'Bolas de Couro', qty: 3, total: 150 }], justification: 'Bolas antigas furadas.' },
];

const AdminDashboard = () => {
    const [requests, setRequests] = useState(INITIAL_REQUESTS);
    const [selectedId, setSelectedId] = useState('#402');
    const [filterCategory, setFilterCategory] = useState('Todos');
    const [searchTerm, setSearchTerm] = useState('');

    const selectedRequest = requests.find(r => r.id === selectedId) || requests[0];

    const filteredRequests = requests.filter(req => {
        const matchesCategory = filterCategory === 'Todos' || req.category === filterCategory;
        const s = searchTerm.toLowerCase();
        const matchesSearch = req.title.toLowerCase().includes(s) ||
            req.id.toLowerCase().includes(s) ||
            req.requester.toLowerCase().includes(s);
        return matchesCategory && matchesSearch;
    });

    const handleAction = (id, newStatus) => {
        setRequests(requests.map(req =>
            req.id === id ? { ...req, status: newStatus } : req
        ));
    };

    const stats = {
        pending: requests.filter(r => r.status === 'Pendentes').length,
        approved: requests.filter(r => r.status === 'Concluída').length,
        urgent: requests.filter(r => r.status === 'Pendentes' && r.price > 1000).length
    };

    return (
        <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f8fafc' }}>
            <Sidebar />

            <main style={{ flex: 1, padding: '2rem' }}>
                {/* Top Bar */}
                <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <div style={{ background: 'white', padding: '0.6rem', borderRadius: '10px', boxShadow: 'var(--shadow)', color: 'var(--primary)' }}>
                            <ClipboardList size={22} />
                        </div>
                        <h1 style={{ fontSize: '1.5rem', fontWeight: 700 }}>Painel de Aprovações</h1>
                    </div>

                </header>

                {/* Stats Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', marginBottom: '2.5rem' }}>
                    {[
                        { label: 'Solicitações Pendentes', value: stats.pending, sub: '+2 hoje', icon: <Clock />, color: '#f59e0b', bg: '#fff7ed' },
                        { label: 'Solicitações Aprovadas', value: stats.approved, sub: 'Total concluído', icon: <CheckCircle />, color: '#10b981', bg: '#d1fae5' },
                        { label: 'Urgentes', value: stats.urgent, sub: 'Precisam atenção', icon: <AlertCircle />, color: '#ef4444', bg: '#fef2f2' },
                    ].map((stat, i) => (
                        <div key={i} className="glass" style={{ padding: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div>
                                <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', fontWeight: 500, marginBottom: '0.5rem' }}>{stat.label}</p>
                                <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem' }}>
                                    <h2 style={{ fontSize: '1.75rem', fontWeight: 700 }}>{stat.value}</h2>
                                    {stat.sub && <span style={{ fontSize: '0.75rem', color: stat.color, fontWeight: 600 }}>{stat.sub}</span>}
                                </div>
                            </div>
                            <div style={{ padding: '0.75rem', borderRadius: '12px', background: stat.bg, color: stat.color }}>
                                {stat.icon}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Filters & Content Area */}
                <div style={{ display: 'flex', gap: '2rem' }}>
                    <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                            <div style={{ display: 'flex', gap: '0.75rem' }}>
                                <button
                                    className="btn"
                                    onClick={() => setFilterCategory('Todos')}
                                    style={{ background: filterCategory === 'Todos' ? 'var(--primary)' : 'white', color: filterCategory === 'Todos' ? 'white' : 'var(--text-main)', border: filterCategory === 'Todos' ? 'none' : '1px solid var(--border)' }}
                                >
                                    Todos
                                </button>
                                <button
                                    className="btn"
                                    onClick={() => setFilterCategory('Materiais')}
                                    style={{ background: filterCategory === 'Materiais' ? 'var(--primary)' : 'white', color: filterCategory === 'Materiais' ? 'white' : 'var(--text-main)', border: filterCategory === 'Materiais' ? 'none' : '1px solid var(--border)' }}
                                >
                                    Materiais <Filter size={14} />
                                </button>
                                <button
                                    className="btn"
                                    onClick={() => setFilterCategory('Serviços')}
                                    style={{ background: filterCategory === 'Serviços' ? 'var(--primary)' : 'white', color: filterCategory === 'Serviços' ? 'white' : 'var(--text-main)', border: filterCategory === 'Serviços' ? 'none' : '1px solid var(--border)' }}
                                >
                                    Serviços <Filter size={14} />
                                </button>
                            </div>
                            <div style={{ position: 'relative' }}>
                                <input
                                    type="text"
                                    placeholder="Buscar por título, ID ou solicitante..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    style={{ padding: '0.6rem 1rem', paddingLeft: '2.5rem', borderRadius: '10px', border: '1px solid var(--border)', background: 'white', width: '320px' }}
                                />
                                <Search size={16} style={{ position: 'absolute', left: '0.8rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                            </div>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            {filteredRequests.map((req) => (
                                <div key={req.id} onClick={() => setSelectedId(req.id)} className="glass" style={{
                                    padding: '1.25rem',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '1.5rem',
                                    border: selectedId === req.id ? '2px solid var(--primary)' : '1px solid transparent',
                                    cursor: 'pointer',
                                    transition: 'border 0.2s'
                                }}>
                                    <div style={{
                                        width: '48px',
                                        height: '48px',
                                        borderRadius: '12px',
                                        background: `${req.color}20`,
                                        color: req.color,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontSize: '1.5rem'
                                    }}>
                                        {req.icon}
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                            <h4 style={{ fontWeight: 700 }}>{req.title}</h4>
                                            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{req.id}</span>
                                        </div>
                                        <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>{req.requester} • {req.time}</p>
                                    </div>
                                    <div style={{ textAlign: 'right' }}>
                                        <p style={{ fontWeight: 700, fontSize: '1.1rem' }}>R$ {req.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
                                        <span style={{
                                            fontSize: '0.75rem',
                                            fontWeight: 700,
                                            color: req.status === 'Pendentes' ? '#f59e0b' : req.status === 'Em andamento' ? '#3b82f6' : req.status === 'Rejeitada' ? '#ef4444' : '#10b981',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '0.25rem',
                                            justifyContent: 'flex-end'
                                        }}>
                                            <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'currentColor' }}></div>
                                            {req.status}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Details Sidebar */}
                    {selectedRequest && (
                        <div className="glass" style={{ width: '380px', padding: '1.5rem', alignSelf: 'flex-start', position: 'sticky', top: '2rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
                                <span style={{
                                    fontSize: '0.75rem',
                                    fontWeight: 700,
                                    textTransform: 'uppercase',
                                    background: selectedRequest.status === 'Pendentes' ? '#fff7ed' : selectedRequest.status === 'Em andamento' ? '#eff6ff' : selectedRequest.status === 'Concluída' ? '#d1fae5' : '#fee2e2',
                                    color: selectedRequest.status === 'Pendentes' ? '#9a3412' : selectedRequest.status === 'Em andamento' ? '#1e40af' : selectedRequest.status === 'Concluída' ? '#065f46' : '#991b1b',
                                    padding: '0.25rem 0.75rem',
                                    borderRadius: '6px'
                                }}>
                                    {selectedRequest.status}
                                </span>
                                <div style={{ display: 'flex', gap: '0.5rem' }}>
                                    <Printer size={18} style={{ cursor: 'pointer' }} onClick={() => window.print()} />
                                    <Download size={18} style={{ cursor: 'pointer' }} />
                                </div>
                            </div>

                            <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '0.5rem' }}>Solicitação {selectedRequest.id}</h3>
                            <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>Criado em {selectedRequest.date}</p>

                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2rem', padding: '1rem', background: '#f8fafc', borderRadius: '12px' }}>
                                <img src={`https://ui-avatars.com/api/?name=${selectedRequest.requester.replace('Prof. ', '').replace('Coord. ', '').replace('Biblio. ', '')}&background=${selectedRequest.color.replace('#', '')}&color=fff`} alt="Requester" style={{ width: '40px', height: '40px', borderRadius: '50%' }} />
                                <div>
                                    <p style={{ fontWeight: 700, fontSize: '0.875rem' }}>{selectedRequest.requester}</p>
                                    <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{selectedRequest.requester.startsWith('Prof.') ? 'Professor' : selectedRequest.requester.startsWith('Coord.') ? 'Coordenador' : 'Bibliotecário'}</p>
                                </div>
                            </div>

                            <div style={{ marginBottom: '2rem' }}>
                                <h5 style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '1rem' }}>Itens Solicitados</h5>
                                <table style={{ width: '100%', fontSize: '0.875rem', borderCollapse: 'collapse' }}>
                                    <thead style={{ textAlign: 'left', color: 'var(--text-muted)' }}>
                                        <tr style={{ borderBottom: '1px solid var(--border)' }}>
                                            <th style={{ paddingBottom: '0.5rem' }}>Item</th>
                                            <th style={{ paddingBottom: '0.5rem', textAlign: 'center' }}>Qtd</th>
                                            <th style={{ paddingBottom: '0.5rem', textAlign: 'right' }}>Total</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {selectedRequest.items.map((item, i) => (
                                            <tr key={i}>
                                                <td style={{ padding: '0.75rem 0' }}>{item.name}</td>
                                                <td style={{ padding: '0.75rem 0', textAlign: 'center' }}>{item.qty}</td>
                                                <td style={{ padding: '0.75rem 0', textAlign: 'right', fontWeight: 600 }}>R$ {item.total.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</td>
                                            </tr>
                                        ))}
                                        <tr style={{ borderTop: '2px solid var(--border)' }}>
                                            <td colSpan="2" style={{ paddingTop: '1rem', fontWeight: 700 }}>Total Geral</td>
                                            <td style={{ paddingTop: '1rem', textAlign: 'right', fontWeight: 800, color: 'var(--primary)', fontSize: '1.1rem' }}>R$ {selectedRequest.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            <div style={{ marginBottom: '2rem' }}>
                                <h5 style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Justificativa</h5>
                                <p style={{ fontSize: '0.875rem', color: '#475569', lineHeight: 1.5, background: '#f0f9ff', padding: '1rem', borderRadius: '12px' }}>
                                    {selectedRequest.justification}
                                </p>
                            </div>

                            {selectedRequest.status === 'Pendentes' && (
                                <div style={{ display: 'flex', gap: '1rem' }}>
                                    <button
                                        className="btn"
                                        onClick={() => handleAction(selectedRequest.id, 'Rejeitada')}
                                        style={{ flex: 1, background: '#fee2e2', color: '#dc2626' }}
                                    >
                                        Reprovar
                                    </button>
                                    <button
                                        className="btn btn-primary"
                                        onClick={() => handleAction(selectedRequest.id, 'Em andamento')}
                                        style={{ flex: 2 }}
                                    >
                                        Aprovar Solicitação
                                    </button>
                                </div>
                            )}

                            {selectedRequest.status === 'Em andamento' && (
                                <div style={{ display: 'flex', gap: '1rem' }}>
                                    <button
                                        className="btn btn-primary"
                                        onClick={() => handleAction(selectedRequest.id, 'Concluída')}
                                        style={{ flex: 1 }}
                                    >
                                        Marcar como Concluída
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default AdminDashboard;

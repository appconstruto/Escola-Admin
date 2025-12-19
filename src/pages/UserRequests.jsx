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
    Trash2,
    X,
    Send,
    CheckCircle,
    Clock,
    AlertCircle
} from 'lucide-react';
import RequestForm from '../components/RequestForm';

const UserRequests = () => {
    const [filter, setFilter] = useState('Todos');
    const [searchTerm, setSearchTerm] = useState('');

    const [allRequests, setAllRequests] = useState([
        { id: '#REQ-2023-001', title: 'Compra de Projetores - Sala 3', type: 'Material', date: '24/10/2023', status: 'Pendentes', icon: <Laptop size={18} />, color: '#3b82f6', category: 'Equipamentos', price: 2500, description: 'Necessário para renovação das salas de aula.', urgency: 'Alta' },
        { id: '#REQ-2023-045', title: 'Reparo Ar Condicionado - Biblioteca', type: 'Serviço', date: '20/10/2023', status: 'Concluída', icon: <Wrench size={18} />, color: '#f59e0b', category: 'Serviços', price: 450, description: 'Manutenção periódica.', urgency: 'Média' },
        { id: '#REQ-2023-032', title: 'Livros Didáticos 5º Ano', type: 'Material', date: '18/10/2023', status: 'Rejeitada', icon: <Book size={18} />, color: '#3b82f6', category: 'Material Pedagógico', price: 890, description: 'Livros para a biblioteca.', urgency: 'Baixa' },
        { id: '#REQ-2023-018', title: 'Material de Limpeza - Estoque', type: 'Material', date: '15/10/2023', status: 'Concluída', icon: <Info size={18} />, color: '#3b82f6', category: 'Infraestrutura', price: 200, description: 'Reposição mensal.', urgency: 'Baixa' },
        { id: '#REQ-2023-012', title: 'Manutenção Elétrica - Quadra', type: 'Serviço', date: '10/10/2023', status: 'Em andamento', icon: <PenTool size={18} />, color: '#f59e0b', category: 'Serviços', price: 1200, description: 'Troca de fiação e lâmpadas.', urgency: 'Alta' },
    ]);

    const [isFormOpen, setIsFormOpen] = useState(false);
    const [selectedRequest, setSelectedRequest] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const filteredRequests = allRequests.filter(req => {
        const matchesFilter = filter === 'Todos' || req.status === filter;
        const matchesSearch = req.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            req.id.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesFilter && matchesSearch;
    });

    const totalPages = Math.ceil(filteredRequests.length / itemsPerPage);
    const paginatedRequests = filteredRequests.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handleNewRequest = (data) => {
        const newReq = {
            id: `#REQ-${new Date().getFullYear()}-${Math.floor(Math.random() * 900) + 100}`,
            title: data.title,
            type: data.category === 'Serviços' ? 'Serviço' : 'Material',
            date: new Date().toLocaleDateString('pt-BR'),
            status: 'Pendentes',
            icon: data.category === 'Serviços' ? <PenTool size={18} /> : <Laptop size={18} />,
            color: '#3b82f6',
            category: data.category,
            price: data.price,
            description: data.description,
            urgency: data.urgency
        };
        setAllRequests([newReq, ...allRequests]);
        setIsFormOpen(false);
    };

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
                    <button className="btn btn-primary" onClick={() => setIsFormOpen(true)} style={{ padding: '0.875rem 1.5rem', fontSize: '1rem' }}>
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
                                {paginatedRequests.map((req, i) => (
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
                                                <button onClick={() => setSelectedRequest(req)} style={{ border: 'none', background: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}><Eye size={18} /></button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    <div style={{ padding: '1.25rem 2rem', background: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                            Mostrando {filteredRequests.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0} a {Math.min(currentPage * itemsPerPage, filteredRequests.length)} de {filteredRequests.length} resultados
                        </p>
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                            <button
                                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                disabled={currentPage === 1}
                                className="btn"
                                style={{ padding: '0.5rem 0.75rem', background: 'white', border: '1px solid var(--border)', cursor: currentPage === 1 ? 'not-allowed' : 'pointer', opacity: currentPage === 1 ? 0.5 : 1 }}
                            >
                                &lt;
                            </button>
                            {[...Array(totalPages)].map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => setCurrentPage(i + 1)}
                                    className="btn"
                                    style={{
                                        padding: '0.5rem 1rem',
                                        background: currentPage === i + 1 ? 'var(--primary)' : 'white',
                                        color: currentPage === i + 1 ? 'white' : 'var(--text-main)',
                                        border: currentPage === i + 1 ? 'none' : '1px solid var(--border)',
                                        cursor: 'pointer'
                                    }}
                                >
                                    {i + 1}
                                </button>
                            ))}
                            <button
                                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                disabled={currentPage === totalPages || totalPages === 0}
                                className="btn"
                                style={{ padding: '0.5rem 0.75rem', background: 'white', border: '1px solid var(--border)', cursor: (currentPage === totalPages || totalPages === 0) ? 'not-allowed' : 'pointer', opacity: (currentPage === totalPages || totalPages === 0) ? 0.5 : 1 }}
                            >
                                &gt;
                            </button>
                        </div>
                    </div>
                </section>
            </main>

            {/* Modal: New Request */}
            {isFormOpen && (
                <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100, padding: '2rem' }}>
                    <div style={{ width: '100%', maxWidth: '800px' }}>
                        <RequestForm
                            onSubmit={handleNewRequest}
                            onCancel={() => setIsFormOpen(false)}
                        />
                    </div>
                </div>
            )}

            {/* Modal: Request Details */}
            {selectedRequest && (
                <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100, padding: '2rem' }}>
                    <div className="glass" style={{ width: '100%', maxWidth: '600px', padding: '2.5rem', position: 'relative', background: 'white', borderRadius: '24px' }}>
                        <button
                            onClick={() => setSelectedRequest(null)}
                            style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}
                        >
                            <X size={24} />
                        </button>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
                            <div style={{ padding: '0.75rem', background: '#eff6ff', color: 'var(--primary)', borderRadius: '12px' }}>
                                {selectedRequest.icon}
                            </div>
                            <div>
                                <h1 style={{ fontSize: '1.5rem', fontWeight: 800 }}>{selectedRequest.title}</h1>
                                <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>ID: {selectedRequest.id}</p>
                            </div>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '2rem' }}>
                            <div>
                                <p style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Status Atual</p>
                                <span style={{
                                    padding: '0.4rem 1rem',
                                    borderRadius: '99px',
                                    fontSize: '0.875rem',
                                    fontWeight: 700,
                                    backgroundColor: getStatusStyle(selectedRequest.status).bg,
                                    color: getStatusStyle(selectedRequest.status).color,
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '0.5rem'
                                }}>
                                    {selectedRequest.status === 'Pendentes' && <Clock size={14} />}
                                    {selectedRequest.status === 'Concluída' && <CheckCircle size={14} />}
                                    {selectedRequest.status === 'Em andamento' && <Clock size={14} />}
                                    {selectedRequest.status === 'Rejeitada' && <AlertCircle size={14} />}
                                    {selectedRequest.status}
                                </span>
                            </div>
                            <div>
                                <p style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Valor Estimado</p>
                                <p style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--primary)' }}>
                                    R$ {selectedRequest.price?.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                                </p>
                            </div>
                            <div>
                                <p style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Data do Pedido</p>
                                <p style={{ fontWeight: 600 }}>{selectedRequest.date}</p>
                            </div>
                            <div>
                                <p style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Categoria</p>
                                <p style={{ fontWeight: 600 }}>{selectedRequest.category}</p>
                            </div>
                            <div>
                                <p style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Urgência</p>
                                <p style={{
                                    fontWeight: 700,
                                    color: selectedRequest.urgency === 'Alta' ? '#dc2626' : selectedRequest.urgency === 'Média' ? '#d97706' : '#16a34a',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.25rem'
                                }}>
                                    {selectedRequest.urgency === 'Alta' ? '🔴' : selectedRequest.urgency === 'Média' ? '🟡' : '🟢'} {selectedRequest.urgency}
                                </p>
                            </div>
                        </div>

                        <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '12px' }}>
                            <p style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>Justificativa</p>
                            <p style={{ fontSize: '0.95rem', color: '#334155', lineHeight: 1.6 }}>{selectedRequest.description}</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserRequests;

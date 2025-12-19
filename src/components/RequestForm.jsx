import React, { useState } from 'react';
import { X, Send } from 'lucide-react';

const RequestForm = ({ onSubmit, onCancel }) => {
    const [formData, setFormData] = useState({
        title: '',
        category: 'Material de Escritório',
        requester: 'Coordenação',
        price: '',
        description: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({
            ...formData,
            price: parseFloat(formData.price) || 0
        });
    };

    return (
        <div className="glass" style={{ padding: '2rem', marginBottom: '2rem', position: 'relative' }}>
            <button
                onClick={onCancel}
                style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}
            >
                <X size={24} />
            </button>

            <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                Nova Solicitação de Compra/Serviço
            </h3>

            <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                <div style={{ gridColumn: 'span 2' }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 600 }}>Título da Solicitação</label>
                    <input
                        required
                        type="text"
                        placeholder="Ex: Papel A4, Manutenção de Impressora..."
                        style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border)', fontSize: '1rem' }}
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    />
                </div>

                <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 600 }}>Categoria</label>
                    <select
                        style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border)', fontSize: '1rem' }}
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    >
                        <option>Material de Escritório</option>
                        <option>Material Pedagógico</option>
                        <option>Serviços</option>
                        <option>Equipamentos</option>
                        <option>Infraestrutura</option>
                    </select>
                </div>

                <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 600 }}>Valor Estimado (R$)</label>
                    <input
                        required
                        type="number"
                        step="0.01"
                        placeholder="0.00"
                        style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border)', fontSize: '1rem' }}
                        value={formData.price}
                        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    />
                </div>

                <div style={{ gridColumn: 'span 2' }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 600 }}>Descrição / Justificativa</label>
                    <textarea
                        rows="3"
                        style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border)', fontSize: '1rem', fontFamily: 'inherit' }}
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    ></textarea>
                </div>

                <div style={{ gridColumn: 'span 2', display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1rem' }}>
                    <button type="button" onClick={onCancel} className="btn" style={{ background: '#f1f5f9', color: 'var(--text-main)' }}>Cancelar</button>
                    <button type="submit" className="btn btn-primary" style={{ padding: '0.75rem 2rem' }}>
                        <Send size={18} /> Enviar Solicitação
                    </button>
                </div>
            </form>
        </div>
    );
};

export default RequestForm;

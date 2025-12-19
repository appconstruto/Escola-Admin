import React from 'react';
import { ShoppingBag, Bell, User } from 'lucide-react';

const Header = () => {
    return (
        <header className="glass" style={{ margin: '1rem', padding: '1rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{ background: 'var(--primary)', color: 'white', padding: '0.5rem', borderRadius: '10px' }}>
                    <ShoppingBag size={24} />
                </div>
                <h2 style={{ fontSize: '1.25rem', color: 'var(--primary)' }}>EduPurchase</h2>
            </div>

            <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                <Bell size={20} style={{ color: 'var(--text-muted)', cursor: 'pointer' }} />
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', paddingLeft: '1.5rem', borderLeft: '1px solid var(--border)' }}>
                    <div style={{ textAlign: 'right' }}>
                        <p style={{ fontSize: '0.875rem', fontWeight: 600 }}>Coordenação</p>
                        <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Maria Fernanda</p>
                    </div>
                    <div style={{ background: '#e2e8f0', padding: '2px', borderRadius: '50%' }}>
                        <User size={32} style={{ color: 'var(--primary)' }} />
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;

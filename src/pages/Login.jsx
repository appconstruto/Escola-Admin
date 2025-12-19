import React, { useState } from 'react';
import { GraduationCap, ArrowRight, User, Eye, EyeOff } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);

    const handleLogin = (e) => {
        e.preventDefault();
        navigate('/admin');
    };

    return (
        <div style={{ display: 'flex', height: '100vh', width: '100vw', overflow: 'hidden' }}>
            {/* Lado Esquerdo - Hero */}
            <div style={{
                flex: 1,
                background: 'linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)',
                padding: '3rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                color: 'white',
                position: 'relative'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', zIndex: 1 }}>
                    <div style={{ background: 'rgba(255,255,255,0.2)', padding: '0.5rem', borderRadius: '8px' }}>
                        <GraduationCap size={28} />
                    </div>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: 700 }}>EduCompras</h2>
                </div>

                <div style={{ zIndex: 1, maxWidth: '500px' }}>
                    <h1 style={{ fontSize: '3rem', fontWeight: 800, lineHeight: 1.1, marginBottom: '1.5rem', color: 'white' }}>
                        Gestão inteligente para sua escola.
                    </h1>
                    <p style={{ fontSize: '1.25rem', opacity: 0.9, lineHeight: 1.6 }}>
                        Simplifique processos de aquisição, controle orçamentos e garanta que sua instituição tenha tudo o que precisa, na hora certa.
                    </p>
                </div>

                <div style={{ zIndex: 1, display: 'flex', gap: '2rem', fontSize: '0.875rem', opacity: 0.7 }}>
                    <span>© 2025 EduCompras</span>
                    <a href="#" style={{ color: 'white', textDecoration: 'none' }}>Termos de Uso</a>
                    <a href="#" style={{ color: 'white', textDecoration: 'none' }}>Privacidade</a>
                </div>

                <div style={{
                    position: 'absolute',
                    bottom: '-10%',
                    right: '-5%',
                    opacity: 0.2,
                    fontSize: '20rem',
                    transform: 'rotate(-15deg)'
                }}>
                    📚
                </div>
            </div>

            {/* Lado Direito - Form */}
            <div style={{
                width: '500px',
                backgroundColor: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '2rem'
            }}>
                <div style={{ width: '100%', maxWidth: '360px' }}>
                    <h2 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>Bem-vindo de volta</h2>
                    <p style={{ color: 'var(--text-muted)', marginBottom: '2.5rem' }}>
                        Insira suas credenciais para acessar o painel de controle.
                    </p>

                    <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        <div>
                            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.5rem' }}>E-mail ou Usuário</label>
                            <div style={{ position: 'relative' }}>
                                <input
                                    type="text"
                                    placeholder="ex: nome@escola.com.br"
                                    required
                                    style={{
                                        width: '100%',
                                        padding: '0.875rem 1rem',
                                        paddingRight: '2.5rem',
                                        borderRadius: '12px',
                                        border: '1px solid var(--border)',
                                        fontSize: '1rem'
                                    }}
                                />
                                <User size={18} style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                            </div>
                        </div>

                        <div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                <label style={{ fontSize: '0.875rem', fontWeight: 600 }}>Senha</label>
                                <a href="#" style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--primary)', textDecoration: 'none' }}>Esqueceu a senha?</a>
                            </div>
                            <div style={{ position: 'relative' }}>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Digite sua senha"
                                    required
                                    style={{
                                        width: '100%',
                                        padding: '0.875rem 1rem',
                                        paddingRight: '2.5rem',
                                        borderRadius: '12px',
                                        border: '1px solid var(--border)',
                                        fontSize: '1rem'
                                    }}
                                />
                                <div
                                    onClick={() => setShowPassword(!showPassword)}
                                    style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', cursor: 'pointer' }}
                                >
                                    {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                                </div>
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="btn btn-primary"
                            style={{ padding: '1rem', justifyContent: 'center', fontSize: '1rem', boxShadow: '0 10px 15px -3px rgba(30, 64, 175, 0.3)' }}
                        >
                            Entrar no Sistema <ArrowRight size={20} />
                        </button>
                    </form>

                    <p style={{ marginTop: '2.5rem', textAlign: 'center', fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                        Ainda não tem acesso? <a href="#" style={{ fontWeight: 600, color: 'var(--primary)', textDecoration: 'none' }}>Solicitar cadastro</a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;

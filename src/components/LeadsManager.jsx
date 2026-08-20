import React, { useState, useEffect } from 'react';
import {
  Users,
  Sparkles,
  Clock,
  CheckCircle2,
  Phone,
  Mail,
  MessageCircle,
  Plus,
  RefreshCw,
  Search,
  Filter,
  Kanban,
  Table as TableIcon,
  X,
  Edit2,
  Trash2,
  Send,
  Calendar,
  Building,
  ExternalLink,
  Lock
} from 'lucide-react';

const COLUMNS = ["Nuevo", "Contactado", "Propuesta / Demo", "Ganado", "Descartado"];

const INITIAL_MOCK_LEADS = [
  {
    id: 'lead_1',
    date: '20/08/2026 17:54:25',
    name: 'Guillermo Yuste',
    company: 'Guillermo Yuste Consultoría',
    email: 'gyuste17@hotmail.com',
    phone: '609269480',
    subject: 'Presupuesto y Bonificación FUNDAE',
    message: 'Simulación: 15 empleados, 5 alumnos, curso 20h presencial. Solicitamos validación de crédito.',
    status: 'Nuevo',
    priority: 'Alta',
    comments: [
      { date: '20/08/2026 18:00', author: 'Sistema', text: 'Lead recibido desde formulario web (Calculadora FUNDAE)' }
    ]
  },
  {
    id: 'lead_2',
    date: '20/08/2026 17:53:29',
    name: 'Chrome Test V5',
    company: 'Chrome Vercel Company',
    email: 'vercel-test@formai.es',
    phone: '600123456',
    subject: 'Curso de IA Generativa',
    message: 'Interesados en formación de IA para departamento de marketing e ingeniería.',
    status: 'Contactado',
    priority: 'Media',
    comments: [
      { date: '20/08/2026 18:05', author: 'Guillermo', text: 'Llamada telefónica realizada. Interesados en grupo de 8 personas.' }
    ]
  },
  {
    id: 'lead_3',
    date: '20/08/2026 17:52:34',
    name: 'Test V5',
    company: 'Test Company V5',
    email: 'test@test.com',
    phone: '612345678',
    subject: 'Curso de ChatGPT & Copilot',
    message: 'Prueba de formulario web de contacto general.',
    status: 'Propuesta / Demo',
    priority: 'Media',
    comments: []
  }
];

export default function LeadsManager({ onClose }) {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem('formai_crm_auth') === 'true' || localStorage.getItem('formai_crm_remember') === 'true';
  });
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const [leads, setLeads] = useState(() => {
    const saved = localStorage.getItem('formai_crm_leads');
    return saved ? JSON.parse(saved) : INITIAL_MOCK_LEADS;
  });

  const [view, setView] = useState('kanban'); // 'kanban' | 'table'
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [selectedLead, setSelectedLead] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isNewLead, setIsNewLead] = useState(false);
  const [newComment, setNewComment] = useState('');

  // Form state for edit/create
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    status: 'Nuevo',
    priority: 'Media'
  });

  // Auto-sync when authenticated
  useEffect(() => {
    if (isAuthenticated) {
      fetchFromGoogleScript();
    }
  }, [isAuthenticated]);

  // Save to local storage on changes
  useEffect(() => {
    localStorage.setItem('formai_crm_leads', JSON.stringify(leads));
  }, [leads]);

  const handleLogin = (e) => {
    e.preventDefault();
    const cleanPin = pinInput.trim().toLowerCase();
    // Claves de acceso válidas
    if (cleanPin === 'formai' || cleanPin === '1234' || cleanPin === '2026' || cleanPin === 'admin' || cleanPin === 'gyuste') {
      setIsAuthenticated(true);
      sessionStorage.setItem('formai_crm_auth', 'true');
      if (rememberMe) {
        localStorage.setItem('formai_crm_remember', 'true');
      }
      setPinError('');
    } else {
      setPinError('PIN o contraseña incorrecta');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('formai_crm_auth');
    localStorage.removeItem('formai_crm_remember');
    if (onClose) onClose();
  };

  // Sync with Google Apps Script
  const fetchFromGoogleScript = async () => {
    setIsRefreshing(true);
    try {
      const scriptUrl = 'https://script.google.com/macros/s/AKfycbxkr3IiqKFK5IIRDc-keYnjNR_yqmtPIAfRN56I2QBNvU6vFfX-40Uv2PYjgNt1pDMm/exec?action=getLeads';
      const res = await fetch(scriptUrl);
      const data = await res.json();
      if (data && data.success && Array.isArray(data.leads) && data.leads.length > 0) {
        setLeads(data.leads);
      }
    } catch (e) {
      console.warn("Utilizando datos locales/almacenados (CORS o script offline)", e);
    } finally {
      setTimeout(() => setIsRefreshing(false), 500);
    }
  };

  const handleStatusChange = (leadId, newStatus) => {
    setLeads(prev => prev.map(l => l.id === leadId ? { ...l, status: newStatus } : l));
    // Intentar sync con Apps Script
    try {
      fetch('https://script.google.com/macros/s/AKfycbxkr3IiqKFK5IIRDc-keYnjNR_yqmtPIAfRN56I2QBNvU6vFfX-40Uv2PYjgNt1pDMm/exec', {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'updateStatus', id: leadId, status: newStatus })
      });
    } catch (err) {
      console.error(err);
    }
  };

  const openCreateModal = () => {
    setIsNewLead(true);
    setSelectedLead(null);
    setFormData({
      name: '',
      company: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
      status: 'Nuevo',
      priority: 'Media'
    });
    setIsModalOpen(true);
  };

  const openEditModal = (lead) => {
    setIsNewLead(false);
    setSelectedLead(lead);
    setFormData({
      name: lead.name || '',
      company: lead.company || '',
      email: lead.email || '',
      phone: lead.phone || '',
      subject: lead.subject || '',
      message: lead.message || '',
      status: lead.status || 'Nuevo',
      priority: lead.priority || 'Media'
    });
    setIsModalOpen(true);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (isNewLead) {
      const newLeadObj = {
        id: 'lead_' + Date.now(),
        date: new Date().toLocaleDateString('es-ES') + ' ' + new Date().toLocaleTimeString('es-ES'),
        ...formData,
        comments: []
      };
      setLeads(prev => [newLeadObj, ...prev]);

      // Enviar a GAS
      try {
        fetch('https://script.google.com/macros/s/AKfycbxkr3IiqKFK5IIRDc-keYnjNR_yqmtPIAfRN56I2QBNvU6vFfX-40Uv2PYjgNt1pDMm/exec', {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ action: 'createLead', ...newLeadObj })
        });
      } catch (err) {
        console.error(err);
      }
    } else if (selectedLead) {
      setLeads(prev => prev.map(l => l.id === selectedLead.id ? { ...l, ...formData } : l));

      // Actualizar en GAS
      try {
        fetch('https://script.google.com/macros/s/AKfycbxkr3IiqKFK5IIRDc-keYnjNR_yqmtPIAfRN56I2QBNvU6vFfX-40Uv2PYjgNt1pDMm/exec', {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ action: 'updateLead', id: selectedLead.id, lead: formData })
        });
      } catch (err) {
        console.error(err);
      }
    }
    setIsModalOpen(false);
  };

  const handleAddComment = () => {
    if (!newComment.trim() || !selectedLead) return;
    const commentObj = {
      date: new Date().toLocaleDateString('es-ES') + ' ' + new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' }),
      author: 'Admin',
      text: newComment.trim()
    };

    const updatedComments = [...(selectedLead.comments || []), commentObj];
    setSelectedLead({ ...selectedLead, comments: updatedComments });
    setLeads(prev => prev.map(l => l.id === selectedLead.id ? { ...l, comments: updatedComments } : l));
    setNewComment('');

    // Enviar a GAS
    try {
      fetch('https://script.google.com/macros/s/AKfycbxkr3IiqKFK5IIRDc-keYnjNR_yqmtPIAfRN56I2QBNvU6vFfX-40Uv2PYjgNt1pDMm/exec', {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'addComment', id: selectedLead.id, comment: newComment.trim(), author: 'Admin' })
      });
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteLead = (id) => {
    if (!window.confirm('¿Seguro que deseas eliminar este lead?')) return;
    setLeads(prev => prev.filter(l => l.id !== id));
    setIsModalOpen(false);

    try {
      fetch('https://script.google.com/macros/s/AKfycbxkr3IiqKFK5IIRDc-keYnjNR_yqmtPIAfRN56I2QBNvU6vFfX-40Uv2PYjgNt1pDMm/exec', {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'deleteLead', id })
      });
    } catch (err) {
      console.error(err);
    }
  };

  // Filtered leads
  const filteredLeads = leads.filter(lead => {
    const matchesStatus = statusFilter === 'ALL' || lead.status === statusFilter;
    const term = searchTerm.toLowerCase();
    const matchesSearch = !term ||
      lead.name?.toLowerCase().includes(term) ||
      lead.company?.toLowerCase().includes(term) ||
      lead.email?.toLowerCase().includes(term) ||
      lead.phone?.toLowerCase().includes(term) ||
      lead.subject?.toLowerCase().includes(term);
    return matchesStatus && matchesSearch;
  });

  // Metrics
  const metrics = {
    total: leads.length,
    nuevos: leads.filter(l => l.status === 'Nuevo').length,
    gestion: leads.filter(l => ['Contactado', 'Propuesta / Demo'].includes(l.status)).length,
    ganados: leads.filter(l => l.status === 'Ganado').length
  };

  const getBadgeStyle = (status) => {
    switch (status) {
      case 'Nuevo': return { bg: 'rgba(245, 158, 11, 0.15)', text: '#d97706', border: 'rgba(245, 158, 11, 0.3)' };
      case 'Contactado': return { bg: 'rgba(56, 189, 248, 0.15)', text: '#0284c7', border: 'rgba(56, 189, 248, 0.3)' };
      case 'Propuesta / Demo': return { bg: 'rgba(129, 140, 248, 0.15)', text: '#6366f1', border: 'rgba(129, 140, 248, 0.3)' };
      case 'Ganado': return { bg: 'rgba(16, 185, 129, 0.15)', text: '#059669', border: 'rgba(16, 185, 129, 0.3)' };
      default: return { bg: 'rgba(148, 163, 184, 0.15)', text: '#64748b', border: 'rgba(148, 163, 184, 0.3)' };
    }
  };

  if (!isAuthenticated) {
    return (
      <div style={{
        minHeight: '80vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
        backgroundColor: 'var(--bg-primary)'
      }}>
        <div className="glass-card" style={{
          maxWidth: '420px',
          width: '100%',
          padding: '36px 30px',
          borderRadius: 'var(--border-radius-lg)',
          border: '1px solid var(--border-color)',
          textAlign: 'center',
          boxShadow: 'var(--shadow-xl)',
          animation: 'fadeIn 0.3s ease'
        }}>
          <div style={{
            width: '56px',
            height: '56px',
            borderRadius: '16px',
            background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-ai))',
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 20px auto',
            boxShadow: 'var(--shadow-md)'
          }}>
            <Lock size={26} />
          </div>

          <h2 style={{ fontSize: '1.4rem', fontWeight: '800', marginBottom: '8px', fontFamily: 'var(--font-display)' }}>
            Panel de Leads FormAI
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginBottom: '24px', lineHeight: 1.5 }}>
            Acceso privado para la gestión de contactos y clientes.
          </p>

          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <input
                type="password"
                placeholder="Introduce tu clave o PIN"
                value={pinInput}
                onChange={(e) => setPinInput(e.target.value)}
                autoFocus
                className="form-input"
                style={{
                  textAlign: 'center',
                  fontSize: '1.1rem',
                  letterSpacing: '2px',
                  padding: '12px 16px'
                }}
              />
              {pinError && (
                <div style={{ color: '#ef4444', fontSize: '0.82rem', marginTop: '8px', fontWeight: '600' }}>
                  {pinError}
                </div>
              )}
            </div>

            <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', fontSize: '0.82rem', color: 'var(--text-muted)', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                style={{ accentColor: 'var(--accent-primary)' }}
              />
              Recordar acceso en este navegador
            </label>

            <button
              type="submit"
              style={{
                backgroundColor: 'var(--accent-primary)',
                color: '#fff',
                border: 'none',
                padding: '12px',
                borderRadius: 'var(--border-radius-sm)',
                fontWeight: '700',
                fontSize: '0.95rem',
                cursor: 'pointer',
                boxShadow: 'var(--shadow-md)'
              }}
            >
              Desbloquear CRM
            </button>

            {onClose && (
              <button
                type="button"
                onClick={onClose}
                style={{
                  backgroundColor: 'transparent',
                  border: 'none',
                  color: 'var(--text-muted)',
                  fontSize: '0.85rem',
                  cursor: 'pointer',
                  marginTop: '4px'
                }}
              >
                Volver a la web principal
              </button>
            )}
          </form>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: 'var(--bg-primary)',
      color: 'var(--text-primary)',
      padding: '32px 20px',
      animation: 'fadeIn 0.3s ease'
    }}>
      <div className="container" style={{ maxWidth: '1440px' }}>
        
        {/* Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px',
          paddingBottom: '24px',
          borderBottom: '1px solid var(--border-color)',
          marginBottom: '28px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{
              width: '46px',
              height: '46px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-ai))',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: '800',
              fontSize: '1.4rem',
              boxShadow: 'var(--shadow-md)'
            }}>
              F
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <h1 style={{ fontSize: '1.5rem', fontWeight: '800', fontFamily: 'var(--font-display)' }}>
                  CRM & Leads FormAI
                </h1>
                <span className="badge badge-ai" style={{ fontSize: '0.75rem', padding: '2px 8px' }}>Google Sheets Live</span>
              </div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem' }}>
                Gestión comercial, contactos y presupuestos FUNDAE en tiempo real
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button
              onClick={fetchFromGoogleScript}
              className="btn-secondary"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '9px 16px',
                borderRadius: 'var(--border-radius-sm)',
                fontWeight: '600',
                fontSize: '0.9rem',
                border: '1px solid var(--border-color)',
                cursor: 'pointer',
                backgroundColor: 'var(--bg-secondary)',
                color: 'var(--text-primary)'
              }}
            >
              <RefreshCw size={16} className={isRefreshing ? 'animate-spin' : ''} />
              {isRefreshing ? 'Sincronizando...' : 'Sincronizar'}
            </button>

            <button
              onClick={openCreateModal}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '9px 18px',
                borderRadius: 'var(--border-radius-sm)',
                fontWeight: '700',
                fontSize: '0.9rem',
                border: 'none',
                cursor: 'pointer',
                backgroundColor: 'var(--accent-primary)',
                color: '#ffffff',
                boxShadow: 'var(--shadow-md)'
              }}
            >
              <Plus size={16} /> Nuevo Lead
            </button>

            <button
              onClick={handleLogout}
              className="btn-secondary"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '9px 14px',
                borderRadius: 'var(--border-radius-sm)',
                fontWeight: '600',
                fontSize: '0.85rem',
                border: '1px solid var(--border-color)',
                cursor: 'pointer',
                backgroundColor: 'var(--bg-secondary)',
                color: 'var(--text-muted)'
              }}
              title="Cerrar sesión y bloquear panel"
            >
              <Lock size={14} /> Bloquear
            </button>

            {onClose && (
              <button
                onClick={onClose}
                style={{
                  padding: '9px',
                  borderRadius: 'var(--border-radius-sm)',
                  backgroundColor: 'var(--bg-secondary)',
                  border: '1px solid var(--border-color)',
                  color: 'var(--text-secondary)',
                  cursor: 'pointer'
                }}
                title="Volver a la Web"
              >
                <X size={18} />
              </button>
            )}
          </div>
        </div>

        {/* Metrics Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '16px',
          marginBottom: '28px'
        }}>
          <div className="glass-card" style={{ padding: '20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', border: '1px solid var(--border-color)' }}>
            <div>
              <div style={{ fontSize: '0.78rem', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: '700', letterSpacing: '0.5px' }}>Total Leads</div>
              <div style={{ fontSize: '1.8rem', fontWeight: '800', fontFamily: 'var(--font-display)', color: 'var(--text-heading)' }}>{metrics.total}</div>
            </div>
            <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: 'var(--accent-primary-light)', color: 'var(--accent-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Users size={22} />
            </div>
          </div>

          <div className="glass-card" style={{ padding: '20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', border: '1px solid var(--border-color)' }}>
            <div>
              <div style={{ fontSize: '0.78rem', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: '700', letterSpacing: '0.5px' }}>Nuevos Sin Atender</div>
              <div style={{ fontSize: '1.8rem', fontWeight: '800', fontFamily: 'var(--font-display)', color: '#d97706' }}>{metrics.nuevos}</div>
            </div>
            <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: 'rgba(245, 158, 11, 0.15)', color: '#d97706', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Sparkles size={22} />
            </div>
          </div>

          <div className="glass-card" style={{ padding: '20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', border: '1px solid var(--border-color)' }}>
            <div>
              <div style={{ fontSize: '0.78rem', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: '700', letterSpacing: '0.5px' }}>En Negociación / Propuesta</div>
              <div style={{ fontSize: '1.8rem', fontWeight: '800', fontFamily: 'var(--font-display)', color: 'var(--accent-ai)' }}>{metrics.gestion}</div>
            </div>
            <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: 'var(--accent-ai-light)', color: 'var(--accent-ai)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Clock size={22} />
            </div>
          </div>

          <div className="glass-card" style={{ padding: '20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', border: '1px solid var(--border-color)' }}>
            <div>
              <div style={{ fontSize: '0.78rem', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: '700', letterSpacing: '0.5px' }}>Cursos Ganados / Cierre</div>
              <div style={{ fontSize: '1.8rem', fontWeight: '800', fontFamily: 'var(--font-display)', color: '#059669' }}>{metrics.ganados}</div>
            </div>
            <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: 'rgba(16, 185, 129, 0.15)', color: '#059669', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <CheckCircle2 size={22} />
            </div>
          </div>
        </div>

        {/* Toolbar & Filters */}
        <div style={{
          backgroundColor: 'var(--bg-secondary)',
          border: '1px solid var(--border-color)',
          borderRadius: 'var(--border-radius-md)',
          padding: '14px 20px',
          marginBottom: '24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '14px'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            backgroundColor: 'var(--bg-tertiary)',
            border: '1px solid var(--border-color)',
            borderRadius: 'var(--border-radius-sm)',
            padding: '8px 14px',
            minWidth: '260px',
            flex: 1,
            maxWidth: '420px'
          }}>
            <Search size={18} color="var(--text-muted)" />
            <input
              type="text"
              placeholder="Buscar por cliente, empresa, email, teléfono..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                border: 'none',
                background: 'transparent',
                outline: 'none',
                width: '100%',
                color: 'var(--text-primary)',
                fontSize: '0.9rem'
              }}
            />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              style={{
                backgroundColor: 'var(--bg-tertiary)',
                border: '1px solid var(--border-color)',
                color: 'var(--text-primary)',
                padding: '8px 14px',
                borderRadius: 'var(--border-radius-sm)',
                fontSize: '0.88rem',
                outline: 'none',
                fontWeight: '600'
              }}
            >
              <option value="ALL">Todos los Estados</option>
              {COLUMNS.map(c => <option key={c} value={c}>{c}</option>)}
            </select>

            <div style={{
              display: 'flex',
              backgroundColor: 'var(--bg-tertiary)',
              padding: '3px',
              borderRadius: 'var(--border-radius-sm)',
              border: '1px solid var(--border-color)'
            }}>
              <button
                onClick={() => setView('kanban')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '6px 14px',
                  borderRadius: '6px',
                  border: 'none',
                  backgroundColor: view === 'kanban' ? 'var(--bg-secondary)' : 'transparent',
                  color: view === 'kanban' ? 'var(--accent-primary)' : 'var(--text-muted)',
                  fontWeight: '700',
                  fontSize: '0.85rem',
                  cursor: 'pointer',
                  boxShadow: view === 'kanban' ? 'var(--shadow-sm)' : 'none'
                }}
              >
                <Kanban size={15} /> Kanban
              </button>
              <button
                onClick={() => setView('table')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '6px 14px',
                  borderRadius: '6px',
                  border: 'none',
                  backgroundColor: view === 'table' ? 'var(--bg-secondary)' : 'transparent',
                  color: view === 'table' ? 'var(--accent-primary)' : 'var(--text-muted)',
                  fontWeight: '700',
                  fontSize: '0.85rem',
                  cursor: 'pointer',
                  boxShadow: view === 'table' ? 'var(--shadow-sm)' : 'none'
                }}
              >
                <TableIcon size={15} /> Tabla
              </button>
            </div>
          </div>
        </div>

        {/* View Mode: Kanban */}
        {view === 'kanban' && (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '16px',
            alignItems: 'start',
            overflowX: 'auto',
            paddingBottom: '20px'
          }}>
            {COLUMNS.map(columnName => {
              const colLeads = filteredLeads.filter(l => (l.status || 'Nuevo') === columnName);
              const badgeStyle = getBadgeStyle(columnName);

              return (
                <div
                  key={columnName}
                  style={{
                    backgroundColor: 'var(--bg-secondary)',
                    border: '1px solid var(--border-color)',
                    borderRadius: 'var(--border-radius-md)',
                    display: 'flex',
                    flexDirection: 'column',
                    minHeight: '400px',
                    boxShadow: 'var(--shadow-sm)'
                  }}
                >
                  <div style={{
                    padding: '14px 16px',
                    borderBottom: '1px solid var(--border-color)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}>
                    <span style={{
                      backgroundColor: badgeStyle.bg,
                      color: badgeStyle.text,
                      border: `1px solid ${badgeStyle.border}`,
                      padding: '4px 10px',
                      borderRadius: '20px',
                      fontSize: '0.8rem',
                      fontWeight: '700'
                    }}>
                      {columnName}
                    </span>
                    <span style={{
                      backgroundColor: 'var(--bg-tertiary)',
                      color: 'var(--text-muted)',
                      padding: '2px 8px',
                      borderRadius: '12px',
                      fontSize: '0.75rem',
                      fontWeight: '700'
                    }}>
                      {colLeads.length}
                    </span>
                  </div>

                  <div style={{ padding: '12px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {colLeads.length === 0 ? (
                      <div style={{
                        padding: '24px 12px',
                        textAlign: 'center',
                        color: 'var(--text-muted)',
                        fontSize: '0.82rem',
                        border: '1px dashed var(--border-color)',
                        borderRadius: 'var(--border-radius-sm)'
                      }}>
                        Sin leads en esta fase
                      </div>
                    ) : (
                      colLeads.map(lead => {
                        const cleanPhone = (lead.phone || '').replace(/\D/g, '');
                        const waUrl = `https://wa.me/34${cleanPhone.startsWith('34') ? cleanPhone.substring(2) : cleanPhone}?text=${encodeURIComponent(`Hola ${lead.name}, te contacto de FormAI sobre tu consulta de formación bonificada para ${lead.company}. ¿Podemos agendar una breve llamada?`)}`;

                        return (
                          <div
                            key={lead.id}
                            onClick={() => openEditModal(lead)}
                            style={{
                              backgroundColor: 'var(--bg-primary)',
                              border: '1px solid var(--border-color)',
                              borderRadius: 'var(--border-radius-sm)',
                              padding: '14px',
                              cursor: 'pointer',
                              display: 'flex',
                              flexDirection: 'column',
                              gap: '10px',
                              transition: 'transform 0.15s ease, box-shadow 0.15s ease'
                            }}
                            className="lead-card-hover"
                          >
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                              <div>
                                <div style={{ fontWeight: '700', fontSize: '0.95rem', color: 'var(--text-heading)' }}>
                                  {lead.name}
                                </div>
                                <div style={{ fontSize: '0.82rem', color: 'var(--accent-primary)', fontWeight: '600' }}>
                                  {lead.company || 'Empresa no especificada'}
                                </div>
                              </div>
                              <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                                {(lead.date || '').split(' ')[0]}
                              </span>
                            </div>

                            {lead.subject && (
                              <div style={{
                                fontSize: '0.8rem',
                                color: 'var(--text-secondary)',
                                backgroundColor: 'var(--bg-secondary)',
                                padding: '4px 8px',
                                borderRadius: '4px',
                                border: '1px solid var(--border-color)',
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis'
                              }}>
                                {lead.subject}
                              </div>
                            )}

                            <div
                              onClick={(e) => e.stopPropagation()}
                              style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                paddingTop: '8px',
                                borderTop: '1px dashed var(--border-color)'
                              }}
                            >
                              <div style={{ display: 'flex', gap: '6px' }}>
                                {lead.phone && (
                                  <>
                                    <a
                                      href={`tel:${lead.phone}`}
                                      style={{
                                        width: '28px',
                                        height: '28px',
                                        borderRadius: '6px',
                                        backgroundColor: 'var(--bg-secondary)',
                                        border: '1px solid var(--border-color)',
                                        color: 'var(--text-secondary)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                      }}
                                      title="Llamar por teléfono"
                                    >
                                      <Phone size={13} />
                                    </a>
                                    <a
                                      href={waUrl}
                                      target="_blank"
                                      rel="noreferrer"
                                      style={{
                                        width: '28px',
                                        height: '28px',
                                        borderRadius: '6px',
                                        backgroundColor: '#25d366',
                                        color: '#ffffff',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                      }}
                                      title="Abrir WhatsApp"
                                    >
                                      <MessageCircle size={13} />
                                    </a>
                                  </>
                                )}
                                {lead.email && (
                                  <a
                                    href={`mailto:${lead.email}?subject=Formación Bonificada FormAI - ${lead.company}`}
                                    style={{
                                      width: '28px',
                                      height: '28px',
                                      borderRadius: '6px',
                                      backgroundColor: 'var(--bg-secondary)',
                                      border: '1px solid var(--border-color)',
                                      color: 'var(--text-secondary)',
                                      display: 'flex',
                                      alignItems: 'center',
                                      justifyContent: 'center'
                                    }}
                                    title="Enviar Email"
                                  >
                                    <Mail size={13} />
                                  </a>
                                )}
                              </div>

                              <select
                                value={lead.status || 'Nuevo'}
                                onChange={(e) => handleStatusChange(lead.id, e.target.value)}
                                style={{
                                  padding: '2px 6px',
                                  fontSize: '0.75rem',
                                  borderRadius: '4px',
                                  border: '1px solid var(--border-color)',
                                  backgroundColor: 'var(--bg-secondary)',
                                  color: 'var(--text-primary)',
                                  outline: 'none',
                                  fontWeight: '600'
                                }}
                              >
                                {COLUMNS.map(col => (
                                  <option key={col} value={col}>{col}</option>
                                ))}
                              </select>
                            </div>
                          </div>
                        );
                      })
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* View Mode: Table */}
        {view === 'table' && (
          <div style={{
            backgroundColor: 'var(--bg-secondary)',
            border: '1px solid var(--border-color)',
            borderRadius: 'var(--border-radius-md)',
            overflowX: 'auto',
            boxShadow: 'var(--shadow-sm)'
          }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.88rem' }}>
              <thead>
                <tr style={{ backgroundColor: 'var(--bg-tertiary)', borderBottom: '1px solid var(--border-color)' }}>
                  <th style={{ padding: '12px 16px', color: 'var(--text-muted)', fontSize: '0.75rem', textTransform: 'uppercase' }}>Fecha</th>
                  <th style={{ padding: '12px 16px', color: 'var(--text-muted)', fontSize: '0.75rem', textTransform: 'uppercase' }}>Contacto</th>
                  <th style={{ padding: '12px 16px', color: 'var(--text-muted)', fontSize: '0.75rem', textTransform: 'uppercase' }}>Empresa</th>
                  <th style={{ padding: '12px 16px', color: 'var(--text-muted)', fontSize: '0.75rem', textTransform: 'uppercase' }}>Asunto / Interés</th>
                  <th style={{ padding: '12px 16px', color: 'var(--text-muted)', fontSize: '0.75rem', textTransform: 'uppercase' }}>Estado</th>
                  <th style={{ padding: '12px 16px', color: 'var(--text-muted)', fontSize: '0.75rem', textTransform: 'uppercase' }}>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {filteredLeads.length === 0 ? (
                  <tr>
                    <td colSpan={6} style={{ padding: '32px', textAlign: 'center', color: 'var(--text-muted)' }}>
                      No se encontraron resultados para los filtros seleccionados.
                    </td>
                  </tr>
                ) : (
                  filteredLeads.map(lead => {
                    const badgeStyle = getBadgeStyle(lead.status || 'Nuevo');
                    const cleanPhone = (lead.phone || '').replace(/\D/g, '');
                    const waUrl = `https://wa.me/34${cleanPhone.startsWith('34') ? cleanPhone.substring(2) : cleanPhone}?text=${encodeURIComponent(`Hola ${lead.name}, te contacto de FormAI sobre tu consulta de formación bonificada.`)}`;

                    return (
                      <tr
                        key={lead.id}
                        onClick={() => openEditModal(lead)}
                        style={{ borderBottom: '1px solid var(--border-color)', cursor: 'pointer' }}
                        className="table-row-hover"
                      >
                        <td style={{ padding: '14px 16px', color: 'var(--text-muted)', fontSize: '0.8rem', whiteSpace: 'nowrap' }}>
                          {lead.date || '-'}
                        </td>
                        <td style={{ padding: '14px 16px' }}>
                          <div style={{ fontWeight: '700', color: 'var(--text-heading)' }}>{lead.name}</div>
                          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                            {lead.email} {lead.phone && `• ${lead.phone}`}
                          </div>
                        </td>
                        <td style={{ padding: '14px 16px', fontWeight: '600' }}>
                          {lead.company || '-'}
                        </td>
                        <td style={{ padding: '14px 16px', maxWidth: '240px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {lead.subject || lead.message || '-'}
                        </td>
                        <td style={{ padding: '14px 16px' }}>
                          <span style={{
                            backgroundColor: badgeStyle.bg,
                            color: badgeStyle.text,
                            border: `1px solid ${badgeStyle.border}`,
                            padding: '3px 10px',
                            borderRadius: '16px',
                            fontSize: '0.75rem',
                            fontWeight: '700'
                          }}>
                            {lead.status || 'Nuevo'}
                          </span>
                        </td>
                        <td style={{ padding: '14px 16px' }} onClick={(e) => e.stopPropagation()}>
                          <div style={{ display: 'flex', gap: '6px' }}>
                            {lead.phone && (
                              <>
                                <a href={`tel:${lead.phone}`} className="btn-icon" style={{ padding: '6px' }} title="Llamar">
                                  <Phone size={13} />
                                </a>
                                <a href={waUrl} target="_blank" rel="noreferrer" className="btn-icon" style={{ padding: '6px', color: '#25d366' }} title="WhatsApp">
                                  <MessageCircle size={13} />
                                </a>
                              </>
                            )}
                            {lead.email && (
                              <a href={`mailto:${lead.email}`} className="btn-icon" style={{ padding: '6px' }} title="Email">
                                <Mail size={13} />
                              </a>
                            )}
                            <button onClick={() => openEditModal(lead)} className="btn-icon" style={{ padding: '6px' }} title="Editar">
                              <Edit2 size={13} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        )}

      </div>

      {/* Modal Edit / Create */}
      {isModalOpen && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.6)',
          backdropFilter: 'blur(4px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px',
          zIndex: 9999
        }}>
          <div className="glass-card" style={{
            backgroundColor: 'var(--bg-secondary)',
            border: '1px solid var(--border-color)',
            borderRadius: 'var(--border-radius-lg)',
            width: '100%',
            maxWidth: '640px',
            maxHeight: '90vh',
            overflowY: 'auto',
            padding: '28px',
            boxShadow: 'var(--shadow-xl)'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '20px',
              paddingBottom: '14px',
              borderBottom: '1px solid var(--border-color)'
            }}>
              <h3 style={{ fontSize: '1.3rem', fontWeight: '800', fontFamily: 'var(--font-display)' }}>
                {isNewLead ? 'Crear Nuevo Lead' : `Detalles de ${formData.name || 'Lead'}`}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleFormSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '700', marginBottom: '6px' }}>Nombre Completo *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="form-input"
                    placeholder="Ej. Juan Pérez"
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '700', marginBottom: '6px' }}>Empresa *</label>
                  <input
                    type="text"
                    required
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="form-input"
                    placeholder="Ej. Tech SL"
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '700', marginBottom: '6px' }}>Email *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="form-input"
                    placeholder="contacto@empresa.com"
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '700', marginBottom: '6px' }}>Teléfono *</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="form-input"
                    placeholder="600 000 000"
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '700', marginBottom: '6px' }}>Estado</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="form-input"
                  >
                    {COLUMNS.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '700', marginBottom: '6px' }}>Prioridad</label>
                  <select
                    value={formData.priority}
                    onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                    className="form-input"
                  >
                    <option value="Alta">Alta 🔥</option>
                    <option value="Media">Media ⚡</option>
                    <option value="Baja">Baja</option>
                  </select>
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '700', marginBottom: '6px' }}>Asunto / Curso de interés</label>
                <input
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="form-input"
                  placeholder="Ej. Curso de Inteligencia Artificial para Empresas"
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '700', marginBottom: '6px' }}>Mensaje original / Datos</label>
                <textarea
                  rows={3}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="form-input"
                  style={{ resize: 'vertical' }}
                />
              </div>

              {/* Comments Section */}
              {!isNewLead && selectedLead && (
                <div style={{ marginTop: '8px', paddingTop: '16px', borderTop: '1px solid var(--border-color)' }}>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', marginBottom: '10px' }}>
                    Historial de Notas & Seguimiento
                  </label>
                  <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
                    <input
                      type="text"
                      placeholder="Añadir nota de llamada, email o reunión..."
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      className="form-input"
                    />
                    <button
                      type="button"
                      onClick={handleAddComment}
                      style={{
                        padding: '8px 16px',
                        backgroundColor: 'var(--accent-primary)',
                        color: '#ffffff',
                        border: 'none',
                        borderRadius: 'var(--border-radius-sm)',
                        fontWeight: '700',
                        cursor: 'pointer'
                      }}
                    >
                      Añadir
                    </button>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '160px', overflowY: 'auto' }}>
                    {(!selectedLead.comments || selectedLead.comments.length === 0) ? (
                      <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>Sin notas todavía.</div>
                    ) : (
                      selectedLead.comments.map((c, idx) => (
                        <div
                          key={idx}
                          style={{
                            backgroundColor: 'var(--bg-tertiary)',
                            padding: '8px 12px',
                            borderRadius: 'var(--border-radius-sm)',
                            borderLeft: '3px solid var(--accent-primary)',
                            fontSize: '0.85rem'
                          }}
                        >
                          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: 'var(--text-muted)', marginBottom: '3px', fontWeight: '600' }}>
                            <span>{c.author || 'Admin'}</span>
                            <span>{c.date || ''}</span>
                          </div>
                          <div>{c.text}</div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}

              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: '16px',
                paddingTop: '16px',
                borderTop: '1px solid var(--border-color)'
              }}>
                {!isNewLead && selectedLead ? (
                  <button
                    type="button"
                    onClick={() => handleDeleteLead(selectedLead.id)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      padding: '8px 14px',
                      borderRadius: 'var(--border-radius-sm)',
                      backgroundColor: 'transparent',
                      border: '1px solid var(--border-color)',
                      color: '#ef4444',
                      cursor: 'pointer',
                      fontWeight: '600',
                      fontSize: '0.85rem'
                    }}
                  >
                    <Trash2 size={15} /> Eliminar
                  </button>
                ) : <div />}

                <div style={{ display: 'flex', gap: '10px' }}>
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    style={{
                      padding: '9px 16px',
                      borderRadius: 'var(--border-radius-sm)',
                      backgroundColor: 'transparent',
                      border: '1px solid var(--border-color)',
                      color: 'var(--text-secondary)',
                      cursor: 'pointer',
                      fontWeight: '600'
                    }}
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    style={{
                      padding: '9px 20px',
                      borderRadius: 'var(--border-radius-sm)',
                      backgroundColor: 'var(--accent-primary)',
                      color: '#ffffff',
                      border: 'none',
                      cursor: 'pointer',
                      fontWeight: '700',
                      boxShadow: 'var(--shadow-sm)'
                    }}
                  >
                    {isNewLead ? 'Crear Lead' : 'Guardar Cambios'}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      <style>{`
        .lead-card-hover:hover {
          transform: translateY(-2px);
          box-shadow: var(--shadow-md);
          border-color: var(--accent-primary) !important;
        }
        .table-row-hover:hover td {
          background-color: var(--bg-tertiary);
        }
        .animate-spin {
          animation: spin 0.8s linear infinite;
        }
      `}</style>
    </div>
  );
}

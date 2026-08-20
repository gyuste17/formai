import React, { useState } from 'react';
import { HelpCircle, Calculator, Check, ArrowRight } from 'lucide-react';

export default function CalculatorComponent({ onSelectCalculatorBudget }) {
  const [employees, setEmployees] = useState(8);
  const [students, setStudents] = useState(5);
  const [hours, setHours] = useState(15);
  // 'superior' = cursos que habilitan a dirección (13€/h)
  // 'estandar' = resto de cursos (9€/h)
  const [modality, setModality] = useState('superior');

  // 1. Calculate Estimated Annual Credit available for the company
  const getAnnualCredit = (empCount) => {
    if (empCount <= 5) return 420;
    if (empCount <= 9) return empCount * 110;
    if (empCount <= 49) return empCount * 95;
    if (empCount <= 249) return empCount * 80;
    return empCount * 65;
  };

  const annualCredit = Math.round(getAnnualCredit(employees));

  // 2. Determine mandatory co-financing %
  const getCofinancingPercent = (empCount) => {
    if (empCount <= 5) return 0;
    if (empCount <= 9) return 5;
    if (empCount <= 49) return 10;
    if (empCount <= 249) return 20;
    return 40;
  };

  const cofinancingPercent = getCofinancingPercent(employees);

  // 3. Calculate module cost permitted by FUNDAE
  // Módulo económico según tipo de curso (RD 694/2017)
  const moduleRate = modality === 'superior' ? 13 : 9;
  const maxBonification = moduleRate * hours * students;

  // 4. Calculate final values
  // The bonification is capped by the company's available annual credit
  const bonificacionAplicada = Math.min(annualCredit, maxBonification);
  
  // Total hypothetical cost of the training course (matched to bonification capacity or slightly above)
  const totalCost = maxBonification;
  
  // Cash cost for the company is usually 0 if they have enough credit
  // and they satisfy cofinancing via salary cost of employees (which is standard)
  const cashCost = totalCost - bonificacionAplicada;

  const handleCta = () => {
    if (onSelectCalculatorBudget) {
      onSelectCalculatorBudget({
        employees,
        students,
        hours,
        modality: modality === 'superior' ? 'Curso Superior - Dirección (13€/h)' : 'Curso Estándar (9€/h)',
        bonificacion: bonificacionAplicada
      });
    }
    // Si no hay callback, hacer scroll a contacto
    const contactEl = document.getElementById('contacto');
    if (contactEl) contactEl.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="glass-card" style={{
      padding: '36px',
      borderRadius: 'var(--border-radius-lg)',
      border: '1px solid var(--border-color)',
      boxShadow: 'var(--shadow-lg)'
    }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr',
        gap: '40px'
      }} className="calc-grid">
        
        {/* Left Inputs Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div>
            <h3 style={{ fontSize: '1.5rem', fontWeight: '800', marginBottom: '8px' }}>
              Simulador de Bonificación FUNDAE
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.925rem' }}>
              Calcula en tiempo real cuánto crédito formativo puedes bonificar y el ahorro para tu empresa.
            </p>
          </div>

          {/* Input 1: Employees in Payroll */}
          <div className="slider-container">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <label htmlFor="calc-employees" className="form-label" style={{ margin: 0, fontWeight: '600' }}>
                Plantilla Media (Nº Empleados)
              </label>
              <span style={{
                backgroundColor: 'var(--accent-primary-light)',
                color: 'var(--accent-primary)',
                fontWeight: '700',
                padding: '4px 12px',
                borderRadius: '6px',
                fontSize: '0.9rem'
              }}>
                {employees} {employees === 1 ? 'empleado' : 'empleados'}
              </span>
            </div>
            <input 
              id="calc-employees"
              type="range" 
              min="1" 
              max="150" 
              value={employees} 
              aria-label="Número de empleados en plantilla"
              onChange={(e) => setEmployees(parseInt(e.target.value))}
              className="slider-input"
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>
              <span>1</span>
              <span>50</span>
              <span>100</span>
              <span>150+</span>
            </div>
          </div>

          {/* Input 2: Number of Students */}
          <div className="slider-container">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <label htmlFor="calc-students" className="form-label" style={{ margin: 0, fontWeight: '600' }}>
                Alumnos en el Curso
              </label>
              <span style={{
                backgroundColor: 'var(--accent-primary-light)',
                color: 'var(--accent-primary)',
                fontWeight: '700',
                padding: '4px 12px',
                borderRadius: '6px',
                fontSize: '0.9rem'
              }}>
                {students} {students === 1 ? 'alumno' : 'alumnos'}
              </span>
            </div>
            <input 
              id="calc-students"
              type="range" 
              min="1" 
              max="40" 
              value={students} 
              aria-label="Número de alumnos en el curso"
              onChange={(e) => setStudents(parseInt(e.target.value))}
              className="slider-input"
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>
              <span>1</span>
              <span>10</span>
              <span>20</span>
              <span>40</span>
            </div>
          </div>

          {/* Input 3: Duration of Course */}
          <div className="slider-container">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <label htmlFor="calc-hours" className="form-label" style={{ margin: 0, fontWeight: '600' }}>
                Horas del Curso
              </label>
              <span style={{
                backgroundColor: 'var(--accent-primary-light)',
                color: 'var(--accent-primary)',
                fontWeight: '700',
                padding: '4px 12px',
                borderRadius: '6px',
                fontSize: '0.9rem'
              }}>
                {hours} horas
              </span>
            </div>
            <input 
              id="calc-hours"
              type="range" 
              min="5" 
              max="40" 
              value={hours} 
              aria-label="Horas de duración del curso"
              onChange={(e) => setHours(parseInt(e.target.value))}
              className="slider-input"
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>
              <span>5h</span>
              <span>15h</span>
              <span>25h</span>
              <span>40h</span>
            </div>
          </div>

          {/* Input 4: Tipo de curso */}
          <div>
            <span className="form-label" style={{ fontWeight: '600', marginBottom: '10px' }}>Tipo de curso</span>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <button 
                type="button"
                aria-pressed={modality === 'superior'}
                onClick={() => setModality('superior')}
                style={{
                  padding: '12px 16px',
                  borderRadius: 'var(--border-radius-sm)',
                  border: modality === 'superior' ? '2px solid var(--accent-primary)' : '1px solid var(--border-color)',
                  backgroundColor: modality === 'superior' ? 'var(--accent-primary-light)' : 'var(--bg-secondary)',
                  color: modality === 'superior' ? 'var(--accent-primary)' : 'var(--text-primary)',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all var(--transition-fast)',
                  textAlign: 'center',
                  lineHeight: 1.3
                }}
              >
                Superior / Dirección
                <div style={{ fontSize: '0.75rem', fontWeight: '500', marginTop: '2px', opacity: 0.8 }}>13 €/hora</div>
              </button>
              <button 
                type="button"
                aria-pressed={modality === 'estandar'}
                onClick={() => setModality('estandar')}
                style={{
                  padding: '12px 16px',
                  borderRadius: 'var(--border-radius-sm)',
                  border: modality === 'estandar' ? '2px solid var(--accent-primary)' : '1px solid var(--border-color)',
                  backgroundColor: modality === 'estandar' ? 'var(--accent-primary-light)' : 'var(--bg-secondary)',
                  color: modality === 'estandar' ? 'var(--accent-primary)' : 'var(--text-primary)',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all var(--transition-fast)',
                  textAlign: 'center',
                  lineHeight: 1.3
                }}
              >
                Estándar
                <div style={{ fontSize: '0.75rem', fontWeight: '500', marginTop: '2px', opacity: 0.8 }}>9 €/hora</div>
              </button>
            </div>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '8px', lineHeight: 1.4 }}>
              * Según módulo económico FUNDAE (RD 694/2017). Los cursos superiores habilitan a puestos de dirección.
            </p>
          </div>
        </div>

        {/* Right Results Column */}
        <div style={{
          backgroundColor: 'var(--bg-primary)',
          borderRadius: 'var(--border-radius-md)',
          padding: '30px',
          border: '1px solid var(--border-color)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          gap: '24px'
        }}>
          <div>
            <span style={{ fontSize: '0.8rem', fontWeight: '700', textTransform: 'uppercase', color: 'var(--text-muted)' }}>Ahorro Neto Estimado</span>
            <div style={{
              display: 'flex',
              alignItems: 'baseline',
              gap: '6px',
              marginTop: '6px'
            }}>
              <span style={{
                fontSize: '3.5rem',
                fontWeight: '800',
                color: 'var(--accent-success)',
                lineHeight: 1,
                fontFamily: 'var(--font-display)'
              }}>
                {bonificacionAplicada} €
              </span>
              <span style={{ fontSize: '1rem', color: 'var(--text-muted)', fontWeight: '500' }}>Bonificados</span>
            </div>
          </div>

          {/* Breakdown Table */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
              <span style={{ color: 'var(--text-secondary)' }}>Crédito anual de tu empresa:</span>
              <strong style={{ color: 'var(--text-primary)' }}>~ {annualCredit} €</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
              <span style={{ color: 'var(--text-secondary)' }}>Coste máx. bonificable por curso:</span>
              <strong style={{ color: 'var(--text-primary)' }}>{maxBonification} €</strong>
            </div>
            <div style={{
              height: '1px',
              backgroundColor: 'var(--border-color)',
              margin: '6px 0'
            }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
              <span style={{ color: 'var(--text-secondary)' }}>Cofinanciación obligatoria ({cofinancingPercent}%):</span>
              <strong style={{ color: 'var(--text-primary)' }}>
                {employees <= 5 ? 'Exento (0%)' : `Sí (${cofinancingPercent}%)`}
              </strong>
            </div>
            
            {/* Cofinancing salary cost explanation tip */}
            {employees > 5 && (
              <div style={{
                backgroundColor: 'var(--accent-primary-light)',
                color: 'var(--accent-primary)',
                padding: '8px 12px',
                borderRadius: '6px',
                fontSize: '0.8rem',
                lineHeight: 1.35,
                fontWeight: '500'
              }}>
                ℹ️ Justificable mediante los costes salariales de los alumnos en jornada laboral (coste adicional en caja = 0€).
              </div>
            )}

            <div style={{
              height: '1px',
              backgroundColor: 'var(--border-color)',
              margin: '6px 0'
            }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.95rem' }}>
              <span style={{ fontWeight: '600' }}>Coste de caja estimado:</span>
              <strong style={{ color: cashCost > 0 ? 'var(--accent-primary)' : 'var(--accent-success)', fontSize: '1.05rem' }}>
                {cashCost <= 0 ? '0 €' : `${cashCost} €`}
              </strong>
            </div>
          </div>

          {/* CTA */}
          <button 
            onClick={handleCta}
            style={{
              width: '100%',
              backgroundColor: 'var(--accent-primary)',
              color: '#ffffff',
              border: 'none',
              padding: '16px 24px',
              borderRadius: 'var(--border-radius-md)',
              fontWeight: '700',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              boxShadow: 'var(--shadow-md)',
              transition: 'background-color var(--transition-fast)'
            }}
            className="calc-cta-btn"
          >
            Solicitar información · Ahorro estimado {bonificacionAplicada.toLocaleString('es-ES')} €
            <ArrowRight size={18} />
          </button>
        </div>

      </div>

      <style>{`
        @media (min-width: 769px) {
          .calc-grid {
            grid-template-columns: 1.1fr 0.9fr !important;
          }
        }
        .calc-cta-btn:hover {
          background-color: var(--accent-primary-hover) !important;
        }
      `}</style>
    </div>
  );
}

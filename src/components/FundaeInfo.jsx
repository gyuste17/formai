import React from 'react';
import { Search, PenTool, Award, GraduationCap, CheckCircle2, ShieldCheck, HeartHandshake } from 'lucide-react';

export default function FundaeInfo() {
  const steps = [
    {
      num: "1",
      title: "Analizamos tu crédito FUNDAE gratis",
      desc: "Revisamos gratuitamente el crédito formativo de tu empresa para el año en curso y te asesoramos sobre las opciones disponibles de bonificación.",
      icon: Search
    },
    {
      num: "2",
      title: "Diseñamos la formación a medida",
      desc: "Creamos un plan de estudios adaptado con los contenidos, casos prácticos, horarios y modalidades que mejor encajen con tu equipo.",
      icon: PenTool
    },
    {
      num: "3",
      title: "Impartimos y gestionamos todo",
      desc: "Llevamos a cabo las clases (virtuales o presenciales) y gestionamos el 100% de la burocracia ante la FUNDAE para garantizar la bonificación.",
      icon: Award
    }
  ];

  const features = [
    {
      title: "Formación personalizada",
      desc: "Adaptamos los ejercicios al sector y nivel de tu plantilla.",
      icon: GraduationCap
    },
    {
      title: "Gestión integral FUNDAE",
      desc: "Olvídate del papeleo. Realizamos toda la gestión de principio a fin.",
      icon: ShieldCheck
    },
    {
      title: "Soporte post-curso",
      desc: "Resolvemos dudas posteriores para asegurar el aprovechamiento.",
      icon: HeartHandshake
    }
  ];

  return (
    <section id="como-funciona" className="section-padding" style={{ backgroundColor: 'var(--bg-secondary)', transition: 'background-color var(--transition-normal)' }}>
      <div className="container">
        
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '64px' }}>
          <span className="badge badge-primary" style={{ marginBottom: '12px' }}>Paso a Paso</span>
          <h2 style={{ fontSize: '2.25rem', fontWeight: '800', marginBottom: '16px', letterSpacing: '-0.02em' }}>
            ¿Cómo funciona la formación bonificada?
          </h2>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '700px', margin: '0 auto', fontSize: '1.05rem' }}>
            Una formación bonificada con FUNDAE permite financiar cursos usando las cotizaciones a la Seguridad Social de tu empresa. La empresa adelanta el pago y lo recupera íntegramente como bonificación en los seguros sociales del mes siguiente.
          </p>
        </div>

        {/* Steps Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '32px',
          marginBottom: '80px'
        }}>
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div key={idx} className="glass-card" style={{
                padding: '40px',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                gap: '20px',
                border: '1px solid var(--border-color)'
              }}>
                {/* Step Number Badge */}
                <div style={{
                  position: 'absolute',
                  top: '-20px',
                  left: '40px',
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--accent-primary)',
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: '800',
                  fontSize: '1.25rem',
                  boxShadow: 'var(--shadow-md)'
                }}>
                  {step.num}
                </div>

                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '12px',
                  backgroundColor: 'var(--accent-primary-light)',
                  color: 'var(--accent-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginTop: '10px'
                }}>
                  <Icon size={24} />
                </div>

                <h3 style={{ fontSize: '1.25rem', fontWeight: '700' }}>{step.title}</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.925rem', lineHeight: 1.6 }}>{step.desc}</p>
              </div>
            );
          })}
        </div>

        {/* Benefits Divider Banner */}
        <div className="glass-card" style={{
          background: 'linear-gradient(135deg, var(--accent-primary) 0%, var(--accent-ai) 100%)',
          color: '#ffffff',
          padding: '48px',
          borderRadius: 'var(--border-radius-lg)',
          boxShadow: 'var(--shadow-lg)'
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: '40px',
            alignItems: 'center'
          }} className="benefits-grid">
            <div>
              <h3 style={{ color: '#ffffff', fontSize: '1.8rem', fontWeight: '800', marginBottom: '12px' }}>
                ¿Por qué elegir a FormAI?
              </h3>
              <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '1rem', lineHeight: 1.6 }}>
                Llevamos más de una década ayudando a empresas a digitalizarse y optimizar procesos de datos con profesores certificados y soporte directo continuo.
              </p>
            </div>
            
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '24px'
            }}>
              {features.map((feat, idx) => {
                const FeatIcon = feat.icon;
                return (
                  <div key={idx} style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                    <div style={{
                      backgroundColor: 'rgba(255,255,255,0.2)',
                      padding: '10px',
                      borderRadius: '8px',
                      color: '#ffffff',
                      flexShrink: 0
                    }}>
                      <FeatIcon size={20} />
                    </div>
                    <div>
                      <h4 style={{ color: '#ffffff', fontSize: '1.05rem', fontWeight: '700', marginBottom: '4px' }}>{feat.title}</h4>
                      <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.875rem' }}>{feat.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

      </div>

      <style>{`
        @media (min-width: 992px) {
          .benefits-grid {
            grid-template-columns: 1fr 1fr !important;
            gap: 64px !important;
          }
        }
      `}</style>
    </section>
  );
}

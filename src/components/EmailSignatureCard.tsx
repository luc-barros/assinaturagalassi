import React from 'react';
import { SignatureData } from '../types';
import { GalassiLogo } from './GalassiLogo';
import { Phone, Mail, MessageSquare, Building2 } from 'lucide-react';

interface EmailSignatureCardProps {
  data: SignatureData;
  id?: string;
  className?: string;
  compact?: boolean;
}

export const EmailSignatureCard: React.FC<EmailSignatureCardProps> = ({
  data,
  id = 'email-signature-card',
  className = '',
  compact = false,
}) => {
  return (
    <div
      id={id}
      className={`bg-white text-slate-800 p-5 rounded-none border border-slate-200/60 shadow-xs max-w-[620px] w-full font-sans select-text ${className}`}
      style={{
        backgroundColor: '#ffffff',
        fontFamily: "'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
      }}
    >
      {/* Top Section: Logo + Divider + Details */}
      <div className="flex items-center gap-4.5 sm:gap-6">
        {/* Left: Company Logo */}
        <div className="shrink-0 flex items-center justify-center pr-1">
          <GalassiLogo customLogoUrl={data.customLogoUrl} width={135} />
        </div>

        {/* Vertical Blue Line Divider */}
        <div
          className="self-stretch w-[2px] bg-[#1d70b8] shrink-0 my-0.5"
          style={{ backgroundColor: '#1d70b8' }}
        />

        {/* Right: Personal & Contact Information */}
        <div className="flex flex-col justify-center min-w-0 py-0.5 space-y-1">
          {/* Name */}
          <h2
            className="text-[20px] sm:text-[22px] font-bold leading-tight tracking-tight"
            style={{
              color: '#8b1e22',
              fontFamily: "'Segoe UI', Roboto, Arial, sans-serif",
              fontWeight: 700,
            }}
          >
            {data.name || <span className="text-slate-400 font-normal italic">Nome do Colaborador</span>}
          </h2>

          {/* Department / Role */}
          {(data.department || data.subDepartment) && (
            <div
              className="text-[13.5px] font-medium leading-tight"
              style={{ color: '#4a5568' }}
            >
              {data.department}
              {data.showSubDepartment && data.subDepartment && (
                <span className="text-slate-500">
                  {data.department ? ' • ' : ''}
                  {data.subDepartment}
                </span>
              )}
            </div>
          )}

          {/* Phone / Whatsapp */}
          {data.phone && (
            <div
              className="text-[13px] leading-tight flex items-center gap-1.5 pt-0.5"
              style={{ color: '#555555' }}
            >
              <span className="font-semibold text-slate-700">
                {data.phoneLabel || 'Celular'}:
              </span>
              <span className="text-slate-800 font-medium">
                {data.phone}
              </span>
            </div>
          )}

          {/* Email */}
          {data.showEmail && data.email && (
            <div
              className="text-[13px] leading-tight flex items-center gap-1.5"
              style={{ color: '#555555' }}
            >
              <span className="font-semibold text-slate-700">Email:</span>
              <span
                className="hover:underline"
                style={{ color: '#1d70b8' }}
              >
                {data.email}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Horizontal Divider Line */}
      {data.showDisclaimer && !compact && (
        <>
          <div
            className="w-full h-[1.5px] my-3.5"
            style={{ backgroundColor: '#1d70b8' }}
          />

          {/* Environmental & Legal Notice Disclaimer */}
          <div
            className="text-[9.5px] leading-[1.38] text-center space-y-1.5 px-0.5"
            style={{
              color: '#1d70b8',
              fontFamily: "'Segoe UI', Roboto, Arial, sans-serif",
            }}
          >
            <div className="font-bold tracking-wide uppercase text-[9.5px]">
              ANTES DE IMPRIMIR, PENSE EM SUA RESPONSABILIDADE E COMPROMISSO COM O MEIO AMBIENTE.
            </div>
            <p className="text-justify text-[8.5px] leading-[1.3] text-slate-600 font-normal">
              O conteúdo desta mensagem é de propriedade do Grupo Galassi e seu teor é dirigido apenas para conhecimento do seu destinatário. Não implica em assunção de responsabilidade ou contratação de qualquer espécie, as quais sempre serão feitas por escrito e através de instrumento próprio. A divulgação indevida do conteúdo desta mensagem é crime nos termos da legislação vigente. Não sendo o destinatário da mesma, favor inutilizá-la, sob riscos de sofrer penalidades.
            </p>
          </div>

          {/* Bottom Divider Line */}
          <div
            className="w-full h-[1.5px] mt-2.5"
            style={{ backgroundColor: '#1d70b8' }}
          />
        </>
      )}
    </div>
  );
};

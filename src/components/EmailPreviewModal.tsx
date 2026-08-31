import React, { useState } from 'react';
import { X, Send, Paperclip, Image as ImageIcon, Smile, MoreVertical, Trash2, ArrowLeft, RefreshCw } from 'lucide-react';
import { SignatureData } from '../types';
import { EmailSignatureCard } from './EmailSignatureCard';

interface EmailPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: SignatureData;
}

export const EmailPreviewModal: React.FC<EmailPreviewModalProps> = ({
  isOpen,
  onClose,
  data,
}) => {
  const [client, setClient] = useState<'gmail' | 'outlook'>('gmail');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-fade-in">
      <div
        className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full overflow-hidden border border-slate-200 flex flex-col max-h-[90vh]"
        id="email-simulation-modal"
      >
        {/* Modal Top Bar */}
        <div className="bg-slate-900 text-white px-5 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-sm font-semibold text-slate-200">
              Simulação de Envio de Email
            </span>
            <div className="flex bg-slate-800 p-0.5 rounded-lg border border-slate-700">
              <button
                onClick={() => setClient('gmail')}
                className={`px-3 py-1 text-xs font-semibold rounded-md transition-all ${
                  client === 'gmail'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Gmail
              </button>
              <button
                onClick={() => setClient('outlook')}
                className={`px-3 py-1 text-xs font-semibold rounded-md transition-all ${
                  client === 'outlook'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Outlook
              </button>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Simulated Email Client Window */}
        <div className="flex-1 overflow-y-auto p-6 bg-slate-100 flex flex-col items-center">
          {client === 'gmail' ? (
            /* Gmail Compose Window Mock */
            <div className="bg-white rounded-t-xl shadow-lg border border-slate-300 w-full max-w-2xl overflow-hidden flex flex-col text-slate-800">
              {/* Header */}
              <div className="bg-[#f2f6fc] px-4 py-2.5 flex items-center justify-between border-b border-slate-200">
                <span className="text-sm font-semibold text-slate-700">
                  Nova mensagem
                </span>
                <div className="flex items-center gap-2 text-slate-500">
                  <span className="text-xs">─</span>
                  <span className="text-xs">⤢</span>
                  <span className="text-xs">✕</span>
                </div>
              </div>

              {/* Fields */}
              <div className="divide-y divide-slate-100 text-sm">
                <div className="px-4 py-2 flex items-center gap-2">
                  <span className="text-slate-500 text-xs w-12">Para:</span>
                  <span className="bg-slate-100 text-slate-700 text-xs px-2.5 py-1 rounded-full border border-slate-200">
                    cliente@empresa.com.br
                  </span>
                </div>
                <div className="px-4 py-2 flex items-center gap-2">
                  <span className="text-slate-500 text-xs w-12">Assunto:</span>
                  <span className="text-slate-800 font-medium text-xs">
                    Confirmação de Faturamento / Contas a Receber
                  </span>
                </div>
              </div>

              {/* Body */}
              <div className="p-5 text-sm text-slate-700 space-y-4 min-h-[220px]">
                <p>Olá, prezados,</p>
                <p>
                  Seguem em anexo os comprovantes e informações solicitadas referentes ao faturamento deste período.
                </p>
                <p>
                  Fico à disposição para qualquer dúvida ou esclarecimento.
                </p>
                <p className="pt-2">Atenciosamente,</p>

                {/* Rendered Signature */}
                <div className="pt-3 border-t border-slate-200/70">
                  <EmailSignatureCard data={data} id="modal-gmail-signature" />
                </div>
              </div>

              {/* Footer Toolbar */}
              <div className="bg-slate-50 px-4 py-3 border-t border-slate-200 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium text-xs px-5 py-2 rounded-full shadow-xs flex items-center gap-1.5">
                    <Send className="w-3.5 h-3.5" /> Enviar
                  </button>
                  <div className="flex items-center gap-2 text-slate-500">
                    <Paperclip className="w-4 h-4 cursor-pointer hover:text-slate-700" />
                    <ImageIcon className="w-4 h-4 text-blue-600 cursor-pointer" />
                    <Smile className="w-4 h-4 cursor-pointer hover:text-slate-700" />
                  </div>
                </div>
                <Trash2 className="w-4 h-4 text-slate-400 hover:text-red-500 cursor-pointer" />
              </div>
            </div>
          ) : (
            /* Outlook Mock */
            <div className="bg-white rounded-xl shadow-lg border border-slate-300 w-full max-w-2xl overflow-hidden flex flex-col text-slate-800">
              {/* Ribbon */}
              <div className="bg-[#0078d4] text-white px-4 py-2 flex items-center justify-between text-xs font-semibold">
                <span>Outlook Mail</span>
                <span>{data.name || 'Colaborador'} ({data.department || 'Galassi'})</span>
              </div>
              <div className="bg-[#f3f2f1] px-4 py-2 border-b border-slate-200 flex items-center gap-3 text-xs">
                <button className="bg-[#0078d4] text-white px-4 py-1.5 rounded-md font-semibold flex items-center gap-1">
                  <Send className="w-3 h-3" /> Enviar
                </button>
                <button className="text-slate-700 hover:bg-slate-200 px-3 py-1.5 rounded-md flex items-center gap-1">
                  <Paperclip className="w-3 h-3" /> Anexar
                </button>
              </div>

              {/* Fields */}
              <div className="p-4 space-y-2 border-b border-slate-100 text-xs">
                <div className="flex items-center gap-2">
                  <span className="text-slate-500 font-semibold w-12">Para:</span>
                  <span className="text-slate-800">fornecedor@galassi.com.br</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-slate-500 font-semibold w-12">Assunto:</span>
                  <span className="text-slate-800 font-medium">
                    Relatório Financeiro - Grupo Galassi
                  </span>
                </div>
              </div>

              {/* Email Content */}
              <div className="p-5 text-xs text-slate-700 space-y-3">
                <p>Bom dia,</p>
                <p>
                  Segue a documentação necessária para conferência do setor de Contas a Receber.
                </p>
                <p>Qualquer necessidade, nosso contato direto via WhatsApp está na assinatura abaixo.</p>
                <p className="pt-2">Cordialmente,</p>

                {/* Signature */}
                <div className="pt-2">
                  <EmailSignatureCard data={data} id="modal-outlook-signature" />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Bottom Actions */}
        <div className="bg-white px-6 py-3.5 border-t border-slate-200 flex items-center justify-between">
          <span className="text-xs text-slate-500">
            A assinatura foi ajustada com dimensões otimizadas para não distorcer no destinatário.
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-xl transition-all"
          >
            Fechar Simulação
          </button>
        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { X, Check, Copy, ExternalLink, HelpCircle, Mail, Globe, Sparkles } from 'lucide-react';

interface InstructionsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const InstructionsModal: React.FC<InstructionsModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<'gmail' | 'outlook' | 'webmail'>('gmail');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fade-in">
      <div
        className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full overflow-hidden border border-slate-200"
        id="instructions-modal"
      >
        {/* Header */}
        <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-blue-600/30 rounded-lg text-blue-400">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-lg leading-tight">
                Como adicionar a assinatura no seu email
              </h3>
              <p className="text-xs text-slate-300">
                Passo a passo rápido para Gmail, Outlook e outros clientes
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
            aria-label="Fechar modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selection */}
        <div className="flex border-b border-slate-200 bg-slate-50 px-6 pt-3 gap-2">
          <button
            onClick={() => setActiveTab('gmail')}
            className={`px-4 py-2.5 text-sm font-semibold rounded-t-lg transition-colors border-b-2 ${
              activeTab === 'gmail'
                ? 'bg-white text-blue-600 border-blue-600 shadow-xs'
                : 'text-slate-600 hover:text-slate-900 border-transparent'
            }`}
          >
            Gmail / Google Workspace
          </button>
          <button
            onClick={() => setActiveTab('outlook')}
            className={`px-4 py-2.5 text-sm font-semibold rounded-t-lg transition-colors border-b-2 ${
              activeTab === 'outlook'
                ? 'bg-white text-blue-600 border-blue-600 shadow-xs'
                : 'text-slate-600 hover:text-slate-900 border-transparent'
            }`}
          >
            Outlook / Hotmail
          </button>
          <button
            onClick={() => setActiveTab('webmail')}
            className={`px-4 py-2.5 text-sm font-semibold rounded-t-lg transition-colors border-b-2 ${
              activeTab === 'webmail'
                ? 'bg-white text-blue-600 border-blue-600 shadow-xs'
                : 'text-slate-600 hover:text-slate-900 border-transparent'
            }`}
          >
            Outros Webmails / Apple Mail
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4 max-h-[65vh] overflow-y-auto">
          {activeTab === 'gmail' && (
            <div className="space-y-3.5 text-sm text-slate-700">
              <div className="flex items-start gap-3 p-3 bg-blue-50/70 border border-blue-100 rounded-xl">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-600 text-white font-bold text-xs shrink-0">
                  1
                </span>
                <div>
                  <strong className="text-slate-900">Clique em "Copiar Imagem"</strong> ou baixe a imagem em PNG clicando no botão azul acima.
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-slate-50 border border-slate-200/70 rounded-xl">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-slate-700 text-white font-bold text-xs shrink-0">
                  2
                </span>
                <div>
                  No seu Gmail, clique no ícone de <strong>Configurações (engrenagem ⚙️)</strong> no canto superior direito e selecione <strong>"Ver todas as configurações"</strong>.
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-slate-50 border border-slate-200/70 rounded-xl">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-slate-700 text-white font-bold text-xs shrink-0">
                  3
                </span>
                <div>
                  Na aba <strong>"Geral"</strong>, role a página até a seção <strong>"Assinatura"</strong>.
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-slate-50 border border-slate-200/70 rounded-xl">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-slate-700 text-white font-bold text-xs shrink-0">
                  4
                </span>
                <div>
                  Clique em <strong>"Criar nova"</strong> (dê um nome, ex: <em>Galassi - Lu Silva</em>).
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-blue-50/70 border border-blue-100 rounded-xl">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-600 text-white font-bold text-xs shrink-0">
                  5
                </span>
                <div>
                  No campo de texto, aperte <strong>Ctrl + V</strong> (se copiou a imagem) ou clique no ícone de <strong>Inserir Imagem 🖼️</strong> e envie o arquivo PNG baixado.
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-emerald-50 border border-emerald-100 rounded-xl text-emerald-900">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-emerald-600 text-white font-bold text-xs shrink-0">
                  6
                </span>
                <div>
                  Em <strong>"Padrões de assinatura"</strong>, selecione sua nova assinatura para <em>Novos e-mails</em> e <em>Respostas/Encaminhamentos</em>, e clique em <strong>"Salvar alterações"</strong> no fim da página.
                </div>
              </div>
            </div>
          )}

          {activeTab === 'outlook' && (
            <div className="space-y-3.5 text-sm text-slate-700">
              <div className="flex items-start gap-3 p-3 bg-blue-50/70 border border-blue-100 rounded-xl">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-600 text-white font-bold text-xs shrink-0">
                  1
                </span>
                <div>
                  Clique no botão <strong>"Copiar Imagem"</strong> ou baixe a imagem em PNG no computador.
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-slate-50 border border-slate-200/70 rounded-xl">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-slate-700 text-white font-bold text-xs shrink-0">
                  2
                </span>
                <div>
                  No Outlook, clique no ícone de <strong>Configurações ⚙️</strong> &gt; <strong>Contas</strong> &gt; <strong>Assinaturas</strong> (ou no Outlook Desktop: <em>Arquivo &gt; Opções &gt; Email &gt; Assinaturas</em>).
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-slate-50 border border-slate-200/70 rounded-xl">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-slate-700 text-white font-bold text-xs shrink-0">
                  3
                </span>
                <div>
                  Clique em <strong>"Nova assinatura"</strong> e digite um nome de identificação.
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-blue-50/70 border border-blue-100 rounded-xl">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-600 text-white font-bold text-xs shrink-0">
                  4
                </span>
                <div>
                  Clique na caixa de edição da assinatura e pressione <strong>Ctrl + V</strong> para colar a imagem ou use o ícone de inserir imagem.
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-emerald-50 border border-emerald-100 rounded-xl text-emerald-900">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-emerald-600 text-white font-bold text-xs shrink-0">
                  5
                </span>
                <div>
                  Defina a assinatura como padrão e clique em <strong>Salvar</strong>!
                </div>
              </div>
            </div>
          )}

          {activeTab === 'webmail' && (
            <div className="space-y-3.5 text-sm text-slate-700">
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
                <h4 className="font-bold text-slate-900 mb-2 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-blue-600" />
                  Método 1: Copiar Imagem Direta
                </h4>
                <p className="text-slate-600">
                  A maioria dos clientes modernos (Thunderbird, Apple Mail, Roundcube, cPanel Webmail) aceita colar diretamente a imagem com <strong>Ctrl + V</strong> ou arrastar o arquivo PNG baixado para o editor de assinatura.
                </p>
              </div>

              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
                <h4 className="font-bold text-slate-900 mb-2 flex items-center gap-2">
                  <Globe className="w-4 h-4 text-blue-600" />
                  Método 2: Código HTML
                </h4>
                <p className="text-slate-600">
                  Se o seu webmail suporta edição em código HTML, clique em <strong>"Copiar Código HTML"</strong> e cole o código na visualização de código-fonte da assinatura.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-slate-50 px-6 py-3.5 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-xl transition-all shadow-xs"
          >
            Entendido, fechar
          </button>
        </div>
      </div>
    </div>
  );
};

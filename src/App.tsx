import React, { useState, useRef } from 'react';
import { SignatureData } from './types';
import { EmailSignatureCard } from './components/EmailSignatureCard';
import { SignatureControls } from './components/SignatureControls';
import { EmailPreviewModal } from './components/EmailPreviewModal';
import { InstructionsModal } from './components/InstructionsModal';
import {
  downloadImage,
  copyImageToClipboard,
  generateHtmlSignature,
} from './utils/exportUtils';
import {
  Download,
  Copy,
  Code2,
  Eye,
  HelpCircle,
  CheckCircle2,
  Sparkles,
  RefreshCw,
  Share2,
  ZoomIn,
  Building2,
  FileImage,
  Layers,
  ArrowRight,
  ShieldAlert,
} from 'lucide-react';

const INITIAL_DATA: SignatureData = {
  name: '',
  department: 'Financeiro',
  subDepartment: 'Contas a receber',
  phone: '(19) 91234-5678 (Whatsapp)',
  phoneLabel: 'Celular / Whatsapp',
  email: 'nome@galassi.com.br',
  website: 'www.galassi.com.br',
  companyName: 'GALASSI SUPERMERCADOS',
  slogan: 'Amigos servindo amigos',
  showDisclaimer: true,
  showEmail: true,
  showSubDepartment: true,
  colorTheme: 'classic',
};

export default function App() {
  const [data, setData] = useState<SignatureData>(INITIAL_DATA);
  const [isExporting, setIsExporting] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [showInstructionsModal, setShowInstructionsModal] = useState(false);
  const [showComparison, setShowComparison] = useState(false);
  const [zoomLevel, setZoomLevel] = useState<number>(1);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const handleDownloadPng = async () => {
    try {
      setIsExporting('png');
      const sanitizedName = data.name.trim() ? data.name.trim().replace(/\s+/g, '-') : 'Colaborador';
      await downloadImage(
        'primary-email-signature',
        `Assinatura-Galassi-${sanitizedName}`,
        'png',
        3
      );
      showToast('Imagem PNG de alta resolução (300 DPI) baixada com sucesso!');
    } catch (err) {
      console.error(err);
      showToast('Erro ao baixar imagem. Tente novamente.');
    } finally {
      setIsExporting(null);
    }
  };

  const handleDownloadJpeg = async () => {
    try {
      setIsExporting('jpeg');
      const sanitizedName = data.name.trim() ? data.name.trim().replace(/\s+/g, '-') : 'Colaborador';
      await downloadImage(
        'primary-email-signature',
        `Assinatura-Galassi-${sanitizedName}`,
        'jpeg',
        3
      );
      showToast('Imagem JPEG baixada com sucesso!');
    } catch (err) {
      console.error(err);
      showToast('Erro ao baixar JPEG.');
    } finally {
      setIsExporting(null);
    }
  };

  const handleCopyToClipboard = async () => {
    try {
      setIsExporting('clipboard');
      const success = await copyImageToClipboard('primary-email-signature', 2.5);
      if (success) {
        showToast('Imagem copiada! Agora basta colar (Ctrl+V) no Gmail ou Outlook.');
      } else {
        // Fallback to downloading or standard copy
        await handleDownloadPng();
      }
    } catch (err) {
      console.error(err);
      showToast('Navegador bloqueou a cópia direta. Baixando arquivo PNG...');
      await handleDownloadPng();
    } finally {
      setIsExporting(null);
    }
  };

  const handleCopyHtml = () => {
    const htmlCode = generateHtmlSignature(data);
    navigator.clipboard.writeText(htmlCode);
    showToast('Código HTML da assinatura copiado com sucesso!');
  };

  const handleResetToDefaults = () => {
    setData(INITIAL_DATA);
    showToast('Dados restaurados para o padrão.');
  };

  return (
    <div className="min-h-screen bg-slate-100/70 text-slate-800 flex flex-col selection:bg-blue-600 selection:text-white pb-16">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-5 py-3.5 rounded-2xl shadow-xl border border-slate-700 flex items-center gap-3 animate-fade-in text-sm font-medium">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Navigation Bar */}
      <header className="bg-white border-b border-slate-200/80 sticky top-0 z-30 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-xs font-black text-lg">
              G
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-bold text-slate-900 text-base sm:text-lg leading-tight">
                  Assinatura de Email — Galassi
                </h1>
                <span className="hidden sm:inline-block bg-blue-100 text-blue-800 text-[11px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                  Galassi Supermercados
                </span>
              </div>
              <p className="text-xs text-slate-500 hidden sm:block">
                Departamento T.I
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => setShowInstructionsModal(true)}
              className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 hover:text-blue-600 bg-slate-100 hover:bg-blue-50 px-3.5 py-2 rounded-xl transition-all border border-slate-200/60"
            >
              <HelpCircle className="w-4 h-4 text-blue-600" />
              <span>Como Instalar</span>
            </button>
            <button
              onClick={() => setShowPreviewModal(true)}
              className="flex items-center gap-1.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 px-3.5 py-2 rounded-xl transition-all shadow-xs"
            >
              <Eye className="w-4 h-4 text-blue-400" />
              <span>Simular no Email</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 flex-1 w-full space-y-8">
        {/* Intro banner */}
        <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 rounded-3xl p-6 sm:p-8 text-white shadow-md relative overflow-hidden">
          <div className="relative z-10 max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 bg-blue-700/60 text-blue-200 text-xs font-semibold px-3 py-1 rounded-full border border-blue-500/30">
              <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
              Assinatura Gerada com Sucesso
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Sua nova assinatura de email está pronta para uso
            </h2>
            <p className="text-sm sm:text-base text-blue-100/90 leading-relaxed">
              Substituímos os dados do modelo original pelos dados de <strong>que serão preenchidos</strong>, mantendo a identidade visual exata do Galassi.
            </p>
          </div>
          <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-10 pointer-events-none flex items-center justify-center">
            <span className="text-[200px] font-black text-white">G</span>
          </div>
        </div>

        {/* Workspace Layout: Left (Preview + Export) & Right (Controls) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Live Card & Export Actions (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Card Preview Container */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm space-y-6">
              <div className="flex items-center justify-between flex-wrap gap-3 pb-4 border-b border-slate-100">
                <div>
                  <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                    <FileImage className="w-5 h-5 text-blue-600" />
                    Visualização da Imagem da Assinatura
                  </h3>
                  <p className="text-xs text-slate-500">
                    Dimensões e proporções oficiais prontas para exportação
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setShowComparison(!showComparison)}
                    className={`text-xs font-semibold px-3 py-1.5 rounded-lg border transition-all flex items-center gap-1.5 ${
                      showComparison
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border-slate-200'
                    }`}
                  >
                    <Layers className="w-3.5 h-3.5" />
                    <span>{showComparison ? 'Ocultar Modelo Anterior' : 'Comparar com Modelo'}</span>
                  </button>
                </div>
              </div>

              {/* Render Target */}
              <div className="p-4 sm:p-6 bg-slate-50 rounded-2xl border border-slate-200/60 flex items-center justify-center overflow-x-auto">
                <div className="transform transition-transform origin-center">
                  <EmailSignatureCard
                    data={data}
                    id="primary-email-signature"
                    className="shadow-sm"
                  />
                </div>
              </div>

              {/* Action Buttons Grid */}
              <div className="space-y-3">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Opções de Exportação e Cópia
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* Copy Image Button */}
                  <button
                    onClick={handleCopyToClipboard}
                    disabled={isExporting !== null}
                    className="flex items-center justify-center gap-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 px-4 rounded-xl shadow-sm transition-all hover:shadow-md active:scale-[0.99] cursor-pointer disabled:opacity-50"
                  >
                    <Copy className="w-4 h-4" />
                    <span>
                      {isExporting === 'clipboard'
                        ? 'Copiando...'
                        : 'Copiar Imagem (Ctrl+V)'}
                    </span>
                  </button>

                  {/* Download PNG Button */}
                  <button
                    onClick={handleDownloadPng}
                    disabled={isExporting !== null}
                    className="flex items-center justify-center gap-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold py-3.5 px-4 rounded-xl shadow-sm transition-all hover:shadow-md active:scale-[0.99] cursor-pointer disabled:opacity-50"
                  >
                    <Download className="w-4 h-4 text-blue-400" />
                    <span>
                      {isExporting === 'png'
                        ? 'Gerando PNG...'
                        : 'Baixar Imagem PNG (HD)'}
                    </span>
                  </button>

                  {/* Download JPEG Button */}
                  <button
                    onClick={handleDownloadJpeg}
                    disabled={isExporting !== null}
                    className="flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold py-2.5 px-4 rounded-xl transition-all cursor-pointer text-xs border border-slate-200"
                  >
                    <Download className="w-3.5 h-3.5 text-slate-600" />
                    <span>Baixar em JPEG</span>
                  </button>

                  {/* Copy HTML Code Button */}
                  <button
                    onClick={handleCopyHtml}
                    className="flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold py-2.5 px-4 rounded-xl transition-all cursor-pointer text-xs border border-slate-200"
                  >
                    <Code2 className="w-3.5 h-3.5 text-slate-600" />
                    <span>Copiar Código HTML</span>
                  </button>
                </div>
              </div>

              {/* Quick tip box */}
              <div className="bg-blue-50/70 border border-blue-100 rounded-2xl p-4 flex items-start gap-3 text-xs text-blue-950">
                <div className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center shrink-0 mt-0.5 font-bold">
                  💡
                </div>
                <div className="space-y-1">
                  <strong>Dica para o Gmail ou Outlook:</strong>
                  <p className="text-blue-900/80">
                    Você pode simplesmente clicar em <strong>"Copiar Imagem"</strong> e ir nas configurações de assinatura do seu email e dar <strong>Ctrl + V</strong>. É o método mais rápido e fica perfeito!
                  </p>
                </div>
              </div>
            </div>

            {/* Side-by-side comparison section (if toggled) */}
            {showComparison && (
              <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4 animate-fade-in">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                    <Layers className="w-4 h-4 text-blue-600" />
                    Exemplos de Preenchimento
                  </h4>
                  <span className="text-xs text-slate-500">
                    Modelos de referência
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  {/* Example 1 */}
                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/80 space-y-2">
                    <span className="font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md border border-blue-100 inline-block">
                      Exemplo: Tecnologia da Informação
                    </span>
                    <ul className="space-y-1 text-slate-600">
                      <li>• <strong>Nome:</strong> Lucas Barros</li>
                      <li>• <strong>Setor:</strong> T.I / Suporte</li>
                      <li>• <strong>Celular:</strong> (19) 98773-6899 (WhatsApp)</li>
                      <li>• <strong>Email:</strong> lucasb@galassi.com.br</li>
                    </ul>
                  </div>

                  {/* Example 2 */}
                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/80 space-y-2">
                    <span className="font-bold text-slate-700 bg-slate-200/70 px-2 py-0.5 rounded-md border border-slate-300/60 inline-block">
                      Exemplo: Financeiro
                    </span>
                    <ul className="space-y-1 text-slate-600">
                      <li>• <strong>Nome:</strong> João Santos</li>
                      <li>• <strong>Setor:</strong> Financeiro • Contas a pagar</li>
                      <li>• <strong>Celular:</strong> (19) 99800-7445 (WhatsApp)</li>
                      <li>• <strong>Email:</strong> financeiro@galassi.com.br</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Customizer Controls (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <SignatureControls
              data={data}
              onChange={setData}
              onResetToDefaults={handleResetToDefaults}
            />

            {/* Quick Presets / Formatting Helper */}
            <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs space-y-4">
              <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-blue-600" />
                Formatos Rápidos do Telefone / WhatsApp
              </h4>

              <div className="grid grid-cols-1 gap-2">
                <button
                  onClick={() =>
                    setData({
                      ...data,
                      phone: '19-99800-7445 Whatsapp',
                      phoneLabel: 'Celular',
                    })
                  }
                  className="text-left p-2.5 rounded-xl border border-slate-200 hover:border-blue-300 hover:bg-blue-50/50 transition-all text-xs flex items-center justify-between group"
                >
                  <div>
                    <span className="font-semibold text-slate-800 group-hover:text-blue-700">
                      19-99800-7445 Whatsapp
                    </span>
                    <p className="text-slate-500 text-[11px]">
                      Exatamente como digitado no pedido
                    </p>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600" />
                </button>

                <button
                  onClick={() =>
                    setData({
                      ...data,
                      phone: '(19) 99800-7445 (Whatsapp)',
                      phoneLabel: 'Celular / Whatsapp',
                    })
                  }
                  className="text-left p-2.5 rounded-xl border border-slate-200 hover:border-blue-300 hover:bg-blue-50/50 transition-all text-xs flex items-center justify-between group"
                >
                  <div>
                    <span className="font-semibold text-slate-800 group-hover:text-blue-700">
                      (19) 99800-7445 (Whatsapp)
                    </span>
                    <p className="text-slate-500 text-[11px]">
                      Formato padrão com parênteses e DDD
                    </p>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600" />
                </button>

                <button
                  onClick={() =>
                    setData({
                      ...data,
                      phone: '(19) 99800-7445',
                      phoneLabel: 'Whatsapp',
                    })
                  }
                  className="text-left p-2.5 rounded-xl border border-slate-200 hover:border-blue-300 hover:bg-blue-50/50 transition-all text-xs flex items-center justify-between group"
                >
                  <div>
                    <span className="font-semibold text-slate-800 group-hover:text-blue-700">
                      Whatsapp: (19) 99800-7445
                    </span>
                    <p className="text-slate-500 text-[11px]">
                      Formato direto WhatsApp
                    </p>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600" />
                </button>
              </div>
            </div>

            {/* Information Card */}
            <div className="bg-slate-900 text-white rounded-2xl p-5 shadow-xs space-y-3">
              <div className="flex items-center gap-2 text-blue-400">
                <Building2 className="w-4 h-4" />
                <span className="text-xs font-bold tracking-wider uppercase">
                  Grupo Galassi — Padrão Corporativo
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Esta assinatura segue a cartilha visual oficial com cores institucionais (Azul Royal, Borgonha e Vermelho), tipografia legível e texto de responsabilidade socioambiental.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Modals */}
      <EmailPreviewModal
        isOpen={showPreviewModal}
        onClose={() => setShowPreviewModal(false)}
        data={data}
      />

      <InstructionsModal
        isOpen={showInstructionsModal}
        onClose={() => setShowInstructionsModal(false)}
      />
    </div>
  );
}

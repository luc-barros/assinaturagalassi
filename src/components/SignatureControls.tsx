import React, { useRef } from 'react';
import { SignatureData } from '../types';
import { User, Briefcase, Phone, Mail, FileText, Sparkles, Sliders, ShieldCheck, Upload, Trash2, Image as ImageIcon, RotateCcw } from 'lucide-react';

interface SignatureControlsProps {
  data: SignatureData;
  onChange: (data: SignatureData) => void;
  onResetToDefaults: () => void;
}

export const SignatureControls: React.FC<SignatureControlsProps> = ({
  data,
  onChange,
  onResetToDefaults,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const updateField = <K extends keyof SignatureData>(key: K, value: SignatureData[K]) => {
    onChange({
      ...data,
      [key]: value,
    });
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          updateField('customLogoUrl', event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div
      className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/80 shadow-xs space-y-5"
      id="signature-controls-panel"
    >
      <div className="flex items-center justify-between pb-3 border-b border-slate-100 flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
            <Sliders className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 text-base">
              Personalizar Informações
            </h3>
            <p className="text-xs text-slate-500">
              Preencha os dados do colaborador para a assinatura
            </p>
          </div>
        </div>

        <button
          onClick={onResetToDefaults}
          className="text-xs font-medium text-slate-600 hover:text-blue-600 bg-slate-100 hover:bg-blue-50 px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 border border-slate-200/80"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Restaurar Padrão</span>
        </button>
      </div>

      {/* Logo Selector / Uploader */}
      <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/80 space-y-2.5">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
            <ImageIcon className="w-3.5 h-3.5 text-blue-600" />
            Logotipo da Assinatura
          </span>
          {data.customLogoUrl && (
            <button
              onClick={() => updateField('customLogoUrl', undefined)}
              className="text-[11px] font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1"
            >
              <Sparkles className="w-3 h-3" /> Restaurar Logo Padrão
            </button>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={() => updateField('customLogoUrl', undefined)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
              !data.customLogoUrl
                ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                : 'bg-white text-slate-700 hover:bg-slate-100 border-slate-200'
            }`}
          >
            Logo Oficial Galassi
          </button>

          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            accept="image/*"
            className="hidden"
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 flex items-center gap-1.5 transition-all"
          >
            <Upload className="w-3 h-3 text-slate-500" />
            <span>Carregar Outro Arquivo</span>
          </button>
        </div>
      </div>

      {/* Inputs Form */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Name */}
        <div className="min-w-0 sm:col-span-2">
          <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
            <User className="w-3.5 h-3.5 text-blue-600" />
            Nome Completo do Colaborador
          </label>
          <input
            type="text"
            value={data.name}
            onChange={(e) => updateField('name', e.target.value)}
            className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all font-medium text-slate-900"
            placeholder="Digite o nome (Ex: Lucas Silva, Maria Santos...)"
          />
        </div>

        {/* Department */}
        <div className="min-w-0">
          <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
            <Briefcase className="w-3.5 h-3.5 text-blue-600" />
            Departamento / Setor Principal
          </label>
          <input
            type="text"
            value={data.department}
            onChange={(e) => updateField('department', e.target.value)}
            className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all text-slate-900"
            placeholder="Ex: Financeiro, T.I, Comercial..."
          />
        </div>

        {/* Sub-Department / Specialty */}
        <div className="min-w-0">
          <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
            <FileText className="w-3.5 h-3.5 text-blue-600" />
            Subdepartamento / Função
          </label>
          <input
            type="text"
            value={data.subDepartment}
            onChange={(e) => updateField('subDepartment', e.target.value)}
            className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all text-slate-900"
            placeholder="Ex: Contas a receber, Suporte..."
          />
        </div>

        {/* Phone / Whatsapp - Perfectly Contained */}
        <div className="min-w-0 sm:col-span-2">
          <div className="flex items-center justify-between mb-1">
            <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-blue-600" />
              Telefone / WhatsApp
            </label>
            <div className="flex items-center gap-1.5">
              <span className="text-[11px] text-slate-400">Rótulo:</span>
              <select
                value={data.phoneLabel}
                onChange={(e) => updateField('phoneLabel', e.target.value)}
                className="text-[11px] py-1 px-2 bg-slate-100 border border-slate-200 rounded-lg text-slate-700 font-medium focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer"
              >
                <option value="Celular">Celular</option>
                <option value="Whatsapp">WhatsApp</option>
                <option value="Celular / Whatsapp">Celular / WhatsApp</option>
                <option value="Telefone">Telefone</option>
              </select>
            </div>
          </div>
          <input
            type="text"
            value={data.phone}
            onChange={(e) => updateField('phone', e.target.value)}
            className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all text-slate-900"
            placeholder="Ex: (19) 91234-5678 (WhatsApp)"
          />
        </div>

        {/* Email */}
        <div className="min-w-0 sm:col-span-2">
          <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
            <Mail className="w-3.5 h-3.5 text-blue-600" />
            E-mail Corporativo
          </label>
          <input
            type="email"
            value={data.email}
            onChange={(e) => updateField('email', e.target.value)}
            className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all text-slate-900"
            placeholder="Ex: nome@galassi.com.br"
          />
        </div>
      </div>

      {/* Toggles */}
      <div className="pt-3 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-3">
        <label className="flex items-center gap-3 p-3 rounded-xl border border-slate-200/80 bg-slate-50/50 hover:bg-slate-50 cursor-pointer transition-colors">
          <input
            type="checkbox"
            checked={data.showDisclaimer}
            onChange={(e) => updateField('showDisclaimer', e.target.checked)}
            className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 border-slate-300"
          />
          <div className="text-xs">
            <div className="font-semibold text-slate-800">
              Aviso Ambiental e Jurídico
            </div>
            <div className="text-slate-500 text-[11px]">
              Texto oficial de confidencialidade e meio ambiente
            </div>
          </div>
        </label>

        <label className="flex items-center gap-3 p-3 rounded-xl border border-slate-200/80 bg-slate-50/50 hover:bg-slate-50 cursor-pointer transition-colors">
          <input
            type="checkbox"
            checked={data.showEmail}
            onChange={(e) => updateField('showEmail', e.target.checked)}
            className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 border-slate-300"
          />
          <div className="text-xs">
            <div className="font-semibold text-slate-800">Exibir Linha de E-mail</div>
            <div className="text-slate-500 text-[11px]">
              Exibe o endereço de e-mail na assinatura
            </div>
          </div>
        </label>
      </div>
    </div>
  );
};

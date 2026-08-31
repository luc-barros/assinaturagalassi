export interface SignatureData {
  name: string;
  department: string;
  subDepartment: string;
  phone: string;
  phoneLabel: string;
  email: string;
  website: string;
  companyName: string;
  slogan: string;
  showDisclaimer: boolean;
  showEmail: boolean;
  showSubDepartment: boolean;
  colorTheme: 'classic' | 'modern' | 'compact';
  customLogoUrl?: string;
}

export type ExportFormat = 'png' | 'jpeg' | 'clipboard' | 'html';

import { toPng, toJpeg, toBlob } from 'html-to-image';
import confetti from 'canvas-confetti';
import { SignatureData } from '../types';

export const downloadImage = async (
  elementId: string,
  filename: string,
  format: 'png' | 'jpeg' = 'png',
  pixelRatio: number = 3
) => {
  const node = document.getElementById(elementId);
  if (!node) {
    throw new Error('Elemento da assinatura não encontrado.');
  }

  const options = {
    pixelRatio,
    quality: 0.98,
    backgroundColor: '#ffffff',
    cacheBust: true,
    skipFonts: true,
    fontEmbedCSS: '',
  };

  let dataUrl: string;
  if (format === 'jpeg') {
    dataUrl = await toJpeg(node, options);
  } else {
    dataUrl = await toPng(node, options);
  }

  const link = document.createElement('a');
  link.download = `${filename}.${format}`;
  link.href = dataUrl;
  link.click();

  confetti({
    particleCount: 60,
    spread: 55,
    origin: { y: 0.8 },
  });
};

export const copyImageToClipboard = async (
  elementId: string,
  pixelRatio: number = 2
): Promise<boolean> => {
  const node = document.getElementById(elementId);
  if (!node) {
    throw new Error('Elemento não encontrado.');
  }

  const blob = await toBlob(node, {
    pixelRatio,
    backgroundColor: '#ffffff',
    cacheBust: true,
    skipFonts: true,
    fontEmbedCSS: '',
  });

  if (!blob) {
    throw new Error('Falha ao gerar imagem.');
  }

  try {
    const item = new ClipboardItem({ 'image/png': blob });
    await navigator.clipboard.write([item]);
    
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.85 },
    });
    return true;
  } catch (err) {
    console.error('Clipboard write failed:', err);
    return false;
  }
};

export const generateHtmlSignature = (data: SignatureData): string => {
  return `
<table cellpadding="0" cellspacing="0" border="0" style="font-family: 'Segoe UI', Arial, sans-serif; font-size: 13px; color: #555555; background-color: #ffffff; padding: 10px; max-width: 580px;">
  <tr>
    <!-- Logo Column -->
    <td valign="middle" align="center" style="padding-right: 18px; border-right: 2px solid #1d70b8; text-align: center; width: 145px;">
      <div style="font-size: 24px; font-weight: 900; color: #172c6e; font-family: 'Arial Black', Arial, sans-serif; letter-spacing: -0.5px; margin-bottom: 2px;">
        <span style="display: inline-block; width: 36px; height: 36px; line-height: 36px; background-color: #0060aa; color: #ffffff; border-radius: 50%; font-size: 22px; font-weight: bold; margin-bottom: 4px; text-align: center; border-top: 5px solid #172c6e;">G</span><br/>
        GALASSI
      </div>
      <div style="font-size: 7.5px; font-weight: bold; color: #6e7379; letter-spacing: 2px; text-transform: uppercase;">
        SUPERMERCADOS
      </div>
      <div style="font-size: 13px; font-style: italic; color: #0a4c9e; margin-top: 4px; font-family: 'Brush Script MT', cursive, sans-serif;">
        Amigos servindo amigos
      </div>
    </td>

    <!-- Contact Info Column -->
    <td valign="middle" style="padding-left: 18px;">
      <div style="font-size: 19px; font-weight: bold; color: #8b1e22; margin-bottom: 4px; font-family: 'Segoe UI', Arial, sans-serif;">
        ${data.name}
      </div>
      <div style="font-size: 13.5px; color: #4a5568; margin-bottom: 3px; font-weight: 500;">
        ${data.department} ${data.showSubDepartment && data.subDepartment ? `• ${data.subDepartment}` : ''}
      </div>
      <div style="font-size: 13px; color: #4a5568; margin-bottom: 3px;">
        <strong style="color: #2b394e;">${data.phoneLabel}:</strong> ${data.phone}
      </div>
      ${
        data.showEmail && data.email
          ? `<div style="font-size: 13px; color: #4a5568;">
              <strong style="color: #2b394e;">Email:</strong> <a href="mailto:${data.email}" style="color: #1d70b8; text-decoration: none;">${data.email}</a>
            </div>`
          : ''
      }
    </td>
  </tr>

  ${
    data.showDisclaimer
      ? `
  <!-- Divider -->
  <tr>
    <td colspan="2" style="padding-top: 14px; padding-bottom: 10px;">
      <div style="border-top: 1.5px solid #1d70b8; width: 100%;"></div>
    </td>
  </tr>

  <!-- Environmental & Legal Footer -->
  <tr>
    <td colspan="2" style="font-size: 9px; color: #1d70b8; text-align: justify; line-height: 1.35; padding-top: 2px;">
      <div style="font-weight: bold; text-align: center; margin-bottom: 5px; letter-spacing: 0.3px;">
        ANTES DE IMPRIMIR, PENSE EM SUA RESPONSABILIDADE E COMPROMISSO COM O MEIO AMBIENTE.
      </div>
      <div>
        O conteúdo desta mensagem é de propriedade do Grupo Galassi e seu teor é dirigido apenas para conhecimento do seu destinatário. Não implica em assunção de responsabilidade ou contratação de qualquer espécie, as quais sempre serão feitas por escrito e através de instrumento próprio. A divulgação indevida do conteúdo desta mensagem é crime nos termos da legislação vigente. Não sendo o destinatário da mesma, favor inutilizá-la, sob riscos de sofrer penalidades.
      </div>
    </td>
  </tr>

  <tr>
    <td colspan="2" style="padding-top: 8px;">
      <div style="border-top: 1.5px solid #1d70b8; width: 100%;"></div>
    </td>
  </tr>
  `
      : ''
  }
</table>
`.trim();
};

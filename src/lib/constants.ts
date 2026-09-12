export const DEFAULT_WHATSAPP_NUMBER = '6281234567890';

export function getWhatsAppNumber(): string {
  return process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || DEFAULT_WHATSAPP_NUMBER;
}

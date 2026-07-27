import api from './api';

export interface TamaraPreview {
  totalAmount: number;
  currency: string;
  instalments: number;
  amountPerInstalment: number;
}

export interface TamaraCheckoutCustomer {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
}

export interface TamaraCheckoutResult {
  checkoutUrl: string;
  orderId: string;
}

export async function getTamaraPreview(
  itemType: 'Program' | 'Offer',
  itemId: string
): Promise<TamaraPreview> {
  const res = await api.get('/api/payments/tamara/preview', {
    params: { itemType, itemId },
  });
  return res.data;
}

export async function createTamaraCheckout(
  itemType: 'Program' | 'Offer',
  itemId: string,
  customer: TamaraCheckoutCustomer
): Promise<TamaraCheckoutResult> {
  const res = await api.post('/api/payments/tamara/checkout', {
    itemType,
    itemId,
    customerFirstName: customer.firstName,
    customerLastName: customer.lastName,
    customerPhone: customer.phone,
    customerEmail: customer.email,
  });
  return res.data;
}
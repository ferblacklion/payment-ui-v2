import { API_URL } from '../constants';
import { Payment } from '../types';
type SaveImage = {
  success: boolean;
  image_url: string;
};
export async function saveImage(file: File): Promise<SaveImage | null> {
  const formData = new FormData();
  formData.append('file', file);

  try {
    const result = await fetch(`${API_URL}/media/`, {
      method: 'POST',
      body: formData,
      headers: {
        Authorization: 'Bearer 1234',
      },
    });
    if (result.ok) {
      const image = await result.json();
      return image;
    }
    return null;
  } catch (error) {
    console.log('saveImage', error);
    return null;
  }
}

export async function savePayment(
  data: Partial<Payment>,
  file?: File,
): Promise<{
  id: string;
  success: boolean;
} | null> {
  try {
    const formData = new FormData();
    formData.append('name', data.name || '');
    formData.append('person', data.person || '');
    if (file) formData.append('file', file);
    return await fetch(`${API_URL}/payment`, {
      method: 'POST',
      headers: {
        Authorization: 'Bearer 1234',
      },
      body: formData,
    }).then((r) => r.json());
  } catch (error) {
    console.log('savePayment', error);
    return null;
  }
}

export async function updatePayment(id: string, image: string) {
  try {
    await fetch(`${API_URL}/payment/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer 1234',
      },
      body: JSON.stringify({
        image,
      }),
    }).then((r) => r.json());
  } catch (error) {
    console.log('updatePayment', error);
  }
}

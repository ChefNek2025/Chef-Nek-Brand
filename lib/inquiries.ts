/**
 * Saves contact-form inquiries to the existing Chef Nek Pro Firebase project
 * (collection: `inquiries`) and drops an admin notification — the same pattern
 * the chefnekpro.com staff-request form already uses.
 *
 * Firestore rules must allow *create only* on `inquiries` (see README).
 * Firebase web config is public by design; security comes from the rules.
 */
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY ?? 'AIzaSyCbX-lJSCX2XU4UKOA-6RvvOdBiU_CFTl0',
  authDomain: 'chef-nek-pro-dad86.firebaseapp.com',
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ?? 'chef-nek-pro-dad86',
  storageBucket: 'chef-nek-pro-dad86.firebasestorage.app',
  messagingSenderId: '469202547359',
  appId: '1:469202547359:web:214359c14023908961e8aa',
};

export type Inquiry = {
  name: string;
  email: string;
  type: string;
  organization?: string;
  message: string;
};

export async function sendInquiry(data: Inquiry) {
  const [{ initializeApp, getApps }, { getFirestore, collection, addDoc, serverTimestamp }] = await Promise.all([
    import('firebase/app'),
    import('firebase/firestore/lite'),
  ]);
  const app = getApps().find((a) => a.name === 'brand') ?? initializeApp(firebaseConfig, 'brand');
  const db = getFirestore(app);
  await addDoc(collection(db, 'inquiries'), {
    ...data,
    source: 'chefnek-brand-site',
    status: 'new',
    createdAt: serverTimestamp(),
  });
  // Best effort: surface it in the Chef Nek Pro admin bell. Ignore if rules block it.
  try {
    await addDoc(collection(db, 'notifications'), {
      type: 'inquiry',
      message: `✉️ NEW ${data.type} inquiry from ${data.name} (${data.email})`,
      restaurantId: 'admin',
      read: false,
      createdAt: serverTimestamp(),
    });
  } catch {}
}

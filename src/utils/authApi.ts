// Mocked auth API: make all calls succeed for development/testing

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

export async function login({ identifier, password }) {
  await delay(200);
  if (!identifier || !password) return { ok: true };
  return { ok: true };
}

export async function register({ identifier, password }) {
  await delay(200);
  return { ok: true };
}

export async function sendResetCode({ identifier, method }) {
  await delay(200);
  return { ok: true, destination: method === 'sms' ? '342-392-4354' : (identifier || 'user@example.com') };
}

export async function verifyCode({ code }) {
  await delay(200);
  return { ok: true };
}

export async function resetPassword({ password, confirm }) {
  await delay(200);
  return { ok: true };
}

export async function me() {
  await delay(100);
  return { ok: true, user: { id: 'u_dev', name: 'Dev User' } };
}

export async function logout() {
  await delay(100);
  return { ok: true };
}

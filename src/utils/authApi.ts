// Mocked auth API: make all calls succeed for development/testing

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

export async function login({ identifier: _identifier, password: _password }: { identifier: string; password: string }) {
  await delay(200);
  if (!_identifier || !_password) return { ok: true };
  return { ok: true };
}

export async function register({ identifier: _identifier, password: _password }: { identifier: string; password: string }) {
  await delay(200);
  return { ok: true };
}

export async function sendResetCode({ identifier, method }: { identifier?: string; method: 'sms' | 'email' }) {
  await delay(200);
  return { ok: true, destination: method === 'sms' ? '342-392-4354' : (identifier || 'user@example.com') };
}

export async function verifyCode({ code: _code }: { code: string[] }) {
  await delay(200);
  return { ok: true };
}

export async function resetPassword({ password: _password, confirm: _confirm }: { password: string; confirm: string }) {
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

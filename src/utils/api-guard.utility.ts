export function apiGuard() {
  return new Response(JSON.stringify({ message: 'Access Denied' }), {
    status: 403,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

export function isValidSecret(secret: string) {
  return secret === process.env.SELF_SECRET;
}

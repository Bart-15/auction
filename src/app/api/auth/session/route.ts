import { getSession } from '@auth0/nextjs-auth0';

export async function GET() {
  try {
    const userSession = await getSession();

    return new Response(JSON.stringify(userSession), { status: 200 });
  } catch (e) {
    return new Response('Could not get user session', {
      status: 500,
    });
  }
}

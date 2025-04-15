import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const basicAuth = req.headers.get('authorization');
  if (basicAuth) {
    const [scheme, encoded] = basicAuth.split(' ');
    if (scheme === 'Basic') {
      const decoded = atob(encoded);
      const [username, password] = decoded.split(':');
      if (username === 'master' && password === 'password123') {
        const response = NextResponse.next();
        response.headers.set('x-user-role', 'master');
        return response;
      }
    }
  }

  return new NextResponse('Unauthorized', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Secure Area"',
    },
  });
}

export const config = {
  matcher: '/admin/:path*',
};

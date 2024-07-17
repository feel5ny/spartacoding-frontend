import { setupServer } from 'msw/node';
import { http, HttpResponse } from 'msw';

export const SIGN_UP_URL = import.meta.env.VITE_SUPABASE_URL + '/rest/v1/user';

export const server = setupServer(
  http.post(SIGN_UP_URL, () => {
    return HttpResponse.json({ key: 'test' }, { status: 200 });
  })
);

server.listen();

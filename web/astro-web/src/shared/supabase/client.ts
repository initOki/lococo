import { createBrowserClient } from '@supabase/ssr';

const env1 = 'https://dhnwffoqpvqipoyiirtx.supabase.co/';
const env2 =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRobndmZm9xcHZxaXBveWlpcnR4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQ5Nzg3MDUsImV4cCI6MjAzMDU1NDcwNX0.LUXjNrJ2f3SJwpKykakGOOc-_zcRbmftyQcAXnE0Y3E';

const createClient = () => createBrowserClient(env1, env2);

export const supabase = createClient();

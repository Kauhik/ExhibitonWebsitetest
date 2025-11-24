import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://nzgtsfaajhxhnfvwwunb.supabase.co';
const supabaseAnonKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im56Z3RzZmFhamh4aG5mdnd3dW5iIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI0ODE4ODEsImV4cCI6MjA3ODA1Nzg4MX0.5z_ZUFpIMwXopq6De7Yok5COFDADXe3oiwRnm_1UkTA';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: false,
  },
});
  
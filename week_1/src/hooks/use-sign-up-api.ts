import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import supabase from '../server/supabase';

type SignUpRequest = { email: string; password: string };

export const useSignUpApi = (
  options: UseMutationOptions<void, null, SignUpRequest>
) => {
  return useMutation({
    mutationFn: async ({ email, password }: SignUpRequest) => {
      await supabase
        .from('user')
        .insert([
          {
            email,
            password,
          },
        ])
        .select();
    },
    ...options,
  });
};

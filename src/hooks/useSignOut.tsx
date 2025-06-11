import { useMutation } from "@tanstack/react-query";

import { supabase } from "@/supabaseClient";

import { useAuth } from "./useAuth";

export const useSignOut = () => {
  const { user } = useAuth();

  return useMutation({
    mutationFn: async () => {
      if (!user) return;
      await supabase.auth.signOut();
    },
  });
};

import { User } from "@/types/db";
import { create } from "zustand";

type State = {
  user: Partial<User> | null;
}

type Action = {
  updateUser: (user: State["user"]) => void;
}

const useUserStore = create<State & Action>((set) => ({
  user: {
    id: "",
    name: "",
    email: "",
  },
  updateUser: (user) => set({ user }),
}))

export { useUserStore };
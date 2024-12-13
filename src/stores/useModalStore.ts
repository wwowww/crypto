import { create } from "zustand";
import { ReactNode } from "react";

type ModalConfig = {
  title: string;
  description?: string;
  content?: ReactNode;
  footer?: ReactNode;
};

type State = {
  open: boolean;
  config?: ModalConfig;
};

type Action = {
  openModal: (config: ModalConfig) => void;
  closeModal: () => void;
};

export const useModalStore = create<State & Action>((set) => ({
  open: false,
  config: undefined,
  openModal: (config) =>
    set({
      open: true,
      config,
    }),
  closeModal: () =>
    set({
      open: false,
      config: undefined,
    }),
}));

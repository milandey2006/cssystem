import { create } from "zustand";

function makeId() {
  if (typeof crypto !== "undefined" && crypto.randomUUID) return crypto.randomUUID();
  return `id-${Math.random().toString(36).slice(2)}-${Date.now()}`;
}

export function defaultGroup(overrides = {}) {
  return {
    id: makeId(),
    quantity: 4,
    brandId: "generic",
    resolutionKey: "2MP",
    codec: "H265",
    fps: 25,
    quality: "medium",
    recordingMode: "continuous",
    motionActivityPercent: 35,
    scheduleHoursPerDay: 8,
    audioEnabled: false,
    ...overrides,
  };
}

export const defaultSettings = {
  retentionDays: 30,
  unitSystem: "decimal",
  overheadMarginPercent: 5,
  preferredDriveSizeTB: "auto",
};

export const defaultNvr = {
  enabled: false,
  maxChannels: 16,
  maxIncomingBandwidthMbps: 80,
  hddBays: 4,
  maxHddSizePerBayTB: 8,
  raidLevel: "none",
};

export const useCalculatorStore = create((set) => ({
  groups: [defaultGroup()],
  settings: defaultSettings,
  nvr: defaultNvr,
  mode: "forward",
  reverseAvailableTB: 32,
  hydrated: false,

  addGroup: () => set((state) => ({ groups: [...state.groups, defaultGroup()] })),

  duplicateGroup: (id) =>
    set((state) => {
      const group = state.groups.find((g) => g.id === id);
      if (!group) return state;
      const index = state.groups.findIndex((g) => g.id === id);
      const copy = { ...group, id: makeId() };
      const groups = [...state.groups];
      groups.splice(index + 1, 0, copy);
      return { groups };
    }),

  removeGroup: (id) =>
    set((state) => {
      if (state.groups.length <= 1) return state;
      return { groups: state.groups.filter((g) => g.id !== id) };
    }),

  updateGroup: (id, patch) =>
    set((state) => ({
      groups: state.groups.map((g) => (g.id === id ? { ...g, ...patch } : g)),
    })),

  updateSettings: (patch) => set((state) => ({ settings: { ...state.settings, ...patch } })),

  updateNvr: (patch) => set((state) => ({ nvr: { ...state.nvr, ...patch } })),

  setMode: (mode) => set({ mode }),

  setReverseAvailableTB: (tb) => set({ reverseAvailableTB: tb }),

  loadState: (state) => set({ ...state, hydrated: true }),

  markHydrated: () => set({ hydrated: true }),
}));

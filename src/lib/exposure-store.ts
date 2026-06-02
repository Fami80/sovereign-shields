import { useSyncExternalStore } from "react";

export type ContractType = "limited" | "unlimited";
export type CompanyType = "mohre" | "difc";
export type DisputeReason = "arbitrary" | "notice" | "gratuity" | "noncompete";

export interface ExposureState {
  contract: ContractType;
  company: CompanyType;
  salary: number;
  years: number;
  reason: DisputeReason;
  eosg: number;
  dispute: number;
  total: number;
  riskLabel: "Low Risk" | "Moderate Risk" | "Critical Exposure";
  penaltyApplied: boolean;
}

const DEFAULT: ExposureState = {
  contract: "unlimited",
  company: "mohre",
  salary: 25000,
  years: 4,
  reason: "arbitrary",
  eosg: 0,
  dispute: 0,
  total: 0,
  riskLabel: "Low Risk",
  penaltyApplied: false,
};

let state: ExposureState = DEFAULT;
const listeners = new Set<() => void>();

export function setExposureSnapshot(next: ExposureState) {
  state = next;
  listeners.forEach((l) => l());
}

export function getExposureSnapshot(): ExposureState {
  return state;
}

export function useExposureSnapshot(): ExposureState {
  return useSyncExternalStore(
    (cb) => {
      listeners.add(cb);
      return () => listeners.delete(cb);
    },
    () => state,
    () => DEFAULT,
  );
}

export const DISPUTE_LABELS: Record<DisputeReason, string> = {
  arbitrary: "Arbitrary / Unfair Dismissal",
  notice: "Redundancy Notice Non-Compliance",
  gratuity: "Unpaid Gratuity / Wages",
  noncompete: "Non-Compete Violation Claim",
};

export const COMPANY_LABELS: Record<CompanyType, string> = {
  mohre: "MOHRE Mainland",
  difc: "DIFC / ADGM Freezone",
};

export const CONTRACT_LABELS: Record<ContractType, string> = {
  limited: "Limited / Fixed Term",
  unlimited: "Unlimited / Flexible",
};

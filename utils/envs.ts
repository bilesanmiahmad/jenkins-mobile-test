export const AUTH_API = process.env.EXPO_PUBLIC_AUTH_API as string;

export type EnvironmentType = "auth";

type Environments = "LOCAL" | "STAGING" | "PRODUCTION";

// eslint-disable-next-line no-shadow
export enum ENVIRONMENT {
  local = "LOCAL",
  staging = "STAGING",
  production = "PRODUCTION",
}

export const EnvironmentApiUrls: Record<EnvironmentType, string> = {
  auth: AUTH_API,
};

export function getEnvironmentApiUrl(env: EnvironmentType): string {
  return EnvironmentApiUrls[env];
}

// @ts-ignore
export const APP_ENV: Environments = process.env.REACT_APP;

export const isLocal = () => APP_ENV === ENVIRONMENT.local;
export const isProduction = () => APP_ENV === ENVIRONMENT.production;
export const isStaging = () => APP_ENV === ENVIRONMENT.staging;

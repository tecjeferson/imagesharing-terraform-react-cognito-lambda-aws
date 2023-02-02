export interface AuthScheme {
  name: string;
  signingName: string;
  signingScope: string;
  properties: Record<string, unknown>;
}

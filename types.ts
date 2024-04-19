export type Recordable<T = any> = Record<string, T>;

export interface ErrorField {
  field: string;
  message: string;
}

export type PresetRules = Recordable<PresetRuleDescription>;

interface PresetRuleDescription {
  pattern: RegExp;
  message: string;
}

export type Rules = Recordable<RuleDescription[]>;

export interface RuleDescription {
  required?: boolean;
  rule?: string | RegExp;
  validator?: CustomValidator;
  message?: string;
}

export interface CustomValidator {
  (value: any): boolean | string;
}

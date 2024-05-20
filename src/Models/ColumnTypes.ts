export type BuiltInColumnTypes = {
  label: string;
  width?: number;
};

export type ColumnTypes = {
  key: string;
  label?: string;
  width?: number;
};

export type ExtendedColumnTypes = ColumnTypes & {
  isDate?: boolean;
  maxLength?: number;
  extraKeys?: string[];
};

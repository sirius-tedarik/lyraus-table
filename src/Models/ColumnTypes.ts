export type BuiltInColumnTypes = {
  label?: string;
  width?: number;
};

export type ColumnTypes = BuiltInColumnTypes & {
  key: string;
};

export type ExtendedColumnTypes = ColumnTypes & {
  isDate?: boolean;
  maxLength?: number;
  extraKeys?: string[];
  dontDisplay?: boolean;
  center?: boolean;
};

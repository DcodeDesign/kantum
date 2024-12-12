export interface noteMenu {
  name: string;
  children?: noteMenu[];
  action?:  ((param?: string | undefined) => void) | undefined;
  icon?: string;
}

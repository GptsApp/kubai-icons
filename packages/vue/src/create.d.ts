import type { DefineComponent } from 'vue';
import type { KubaiIconData } from 'kubai-icons';

export interface KubaiIconProps {
  size?: number | string;
  color?: string;
  variant?: 'color' | 'soft';
  badgeColor?: string;
  trigger?: 'hover' | 'parent' | 'none';
  hover?: boolean;
  active?: boolean;
  defaultActive?: boolean;
  title?: string;
}
export type KubaiIconComponent = DefineComponent<KubaiIconProps>;
export declare const KubaiIcon: DefineComponent<KubaiIconProps & { icon: KubaiIconData }>;
export declare function createKubaiIcon(name: string, icon: KubaiIconData): KubaiIconComponent;

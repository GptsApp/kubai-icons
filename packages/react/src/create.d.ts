import type { ForwardRefExoticComponent, RefAttributes, SVGProps } from 'react';
import type { KubaiIconData } from 'kubai-icons';

export interface KubaiIconProps extends Omit<SVGProps<SVGSVGElement>, 'ref' | 'color'> {
  /** Width and height in pixels. Default 24. */
  size?: number | string;
  /** Accent colour; defaults to the surrounding text colour (currentColor). */
  color?: string;
  /** 'color' (default) or 'soft': lifted fills, deeper outlines, deep marks. */
  variant?: 'color' | 'soft';
  /** Ink of the corner badge: any CSS colour, or 'semantic' for its own colour (green add, red remove …). Default: black and white. */
  badgeColor?: string | 'semantic';
  /** What plays the hover motion: the icon itself, a parent ([data-kubai-trigger] or the parent element), or nothing. */
  trigger?: 'hover' | 'parent' | 'none';
  /** Controlled hover: true plays the motion, false plays it back. */
  hover?: boolean;
  /** Controlled toggle state for tap icons such as bookmark. */
  active?: boolean;
  defaultActive?: boolean;
  onActiveChange?: (active: boolean) => void;
  /** Accessible name; without it the icon is aria-hidden. */
  title?: string;
}
export type KubaiIconComponent = ForwardRefExoticComponent<KubaiIconProps & RefAttributes<SVGSVGElement>>;
export declare const KubaiIcon: ForwardRefExoticComponent<KubaiIconProps & { icon: KubaiIconData } & RefAttributes<SVGSVGElement>>;
export declare function createKubaiIcon(displayName: string, icon: KubaiIconData): KubaiIconComponent;

/** A built icon: rest markup with an id placeholder, and the motion that animates it. */
export interface KubaiIconData {
  readonly name: string;
  readonly markup: string;
  readonly target: (hover: boolean, state: Record<string, unknown>) => Record<string, unknown>;
  readonly draw: (params: any, elements: Record<string, Element>, instance: object) => void;
  /** True when a click toggles the `active` state, as on the bookmark. */
  readonly tap: boolean;
  /** For badged icons: the badge's semantic colour. */
  readonly tone?: string;
}

export type KubaiVariant = 'color' | 'soft';
export type KubaiTrigger = 'hover' | 'parent' | 'none';

export interface KubaiSvgOptions {
  /** Width and height in pixels. Default 24. */
  size?: number | string;
  /** Accent colour, any CSS colour. Defaults to currentColor. */
  color?: string;
  /** 'color' (default) or 'soft', the clear look with lifted fills and deep marks. */
  variant?: KubaiVariant;
  /** Ink of the corner badge: any CSS colour, or 'semantic'. Default: black and white. */
  badgeColor?: string;
  /** Accessible name. Without it the icon is aria-hidden. */
  title?: string;
  className?: string;
  /** Id suffix for the icon's gradients and masks; unique per page. */
  id?: string;
  attrs?: Record<string, string | number>;
}

export interface KubaiController {
  hover(on: boolean, instant?: boolean): void;
  state(next: Record<string, unknown>, instant?: boolean): void;
  readonly hovered: boolean;
  readonly active: boolean;
  readonly svg: Element;
  destroy(): void;
}

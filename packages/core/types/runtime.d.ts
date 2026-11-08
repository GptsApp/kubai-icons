import type { KubaiIconData, KubaiController, KubaiVariant } from './types.js';
export declare function animate(svg: SVGSVGElement | Element, icon: Pick<KubaiIconData, 'target' | 'draw'>, options?: { state?: Record<string, unknown> }): KubaiController;
export declare function bindTrigger(target: Element, controller: KubaiController, icon: Pick<KubaiIconData, 'tap'>, onToggle?: (active: boolean) => void): () => void;
export declare function badgeStyle(icon: Pick<KubaiIconData, 'tone'>, badgeColor?: string): Record<string, string>;
export declare function uid(): string;
export declare const VARIANTS: Record<KubaiVariant, Record<string, string>>;
/** Sets the variant for every icon inside `root` that does not choose its own. */
export declare function setVariant(root: HTMLElement | SVGElement, variant: KubaiVariant): void;

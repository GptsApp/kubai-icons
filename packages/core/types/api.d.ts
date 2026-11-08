import type { KubaiController, KubaiSvgOptions, KubaiTrigger } from './types.js';
export declare const VIEWBOX: string;
/** A drop shadow's filter primitives in the form design tools read as a shadow effect. */
export declare function portableShadow(color: string, opacity: number): string;
export declare const VARIANTS: Record<'color' | 'soft', Record<string, string>>;
/** Sets the variant for every icon inside `root` that does not choose its own. */
export declare function setVariant(root: HTMLElement | SVGElement, variant: 'color' | 'soft'): void;
export declare function uid(): string;
export declare function badgeStyle(icon: KubaiIconData, badgeColor?: string): Record<string, string>;
/** Full SVG markup for one icon instance (server rendering, innerHTML, strings). */
export declare function toSvg(icon: KubaiIconData, options?: KubaiSvgOptions): string;
export declare function animate(svg: Element, icon: Pick<KubaiIconData, 'target' | 'draw'>, options?: { state?: Record<string, unknown> }): KubaiController;
export declare function bindTrigger(target: Element, controller: KubaiController, icon: Pick<KubaiIconData, 'tap'>, onToggle?: (active: boolean) => void): () => void;
/** Creates an animated <svg> element. */
export declare function createIcon(icon: KubaiIconData, options?: KubaiSvgOptions & { trigger?: KubaiTrigger; active?: boolean }): SVGSVGElement & { kubai?: KubaiController };
/** Replaces elements with data-kubai="<name>" by their icons. */
export declare function replaceIcons(options: { icons: Record<string, KubaiIconData>; root?: ParentNode; attr?: string }): void;

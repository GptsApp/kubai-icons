import type { ReactElement, ReactNode } from 'react';
import type { IconName } from 'kubai-icons/dynamic';
import type { KubaiIconProps } from './create.js';
export declare function DynamicIcon(props: KubaiIconProps & { name: IconName | (string & {}); fallback?: ReactNode }): ReactElement;

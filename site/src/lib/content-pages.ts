// The English documentation pages that other languages are built from.
import * as page0 from "@/app/(content)/docs/accessibility/page";
import * as page1 from "@/app/(content)/docs/analytics/page";
import * as page2 from "@/app/(content)/docs/contributing/page";
import * as page3 from "@/app/(content)/docs/customize/page";
import * as page4 from "@/app/(content)/docs/design/page";
import * as page5 from "@/app/(content)/docs/javascript/page";
import * as page6 from "@/app/(content)/docs/page";
import * as page7 from "@/app/(content)/docs/performance/page";
import * as page8 from "@/app/(content)/docs/react/page";
import * as page9 from "@/app/(content)/docs/static/page";
import * as page10 from "@/app/(content)/docs/vue/page";
import * as page11 from "@/app/(content)/license/page";
import * as page12 from "@/app/(content)/skill/page";
import type { Metadata } from "next";
import type { ReactNode } from "react";

export const CONTENT_PAGES: Record<string, { default: () => ReactNode; metadata: Metadata }> = {
  "docs/accessibility": page0,
  "docs/analytics": page1,
  "docs/contributing": page2,
  "docs/customize": page3,
  "docs/design": page4,
  "docs/javascript": page5,
  "docs": page6,
  "docs/performance": page7,
  "docs/react": page8,
  "docs/static": page9,
  "docs/vue": page10,
  "license": page11,
  "skill": page12,
};

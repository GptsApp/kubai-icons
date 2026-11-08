"use client";
import { useState } from "react";
import { CopyButton } from "./copy-button";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/utils";
import { card } from "./kit/styles";
import { Glide } from "./kit/glide";

const PKGS = [
  { id: "react", label: "React", cmd: "npm i kubai-icons-react" },
  { id: "vue", label: "Vue", cmd: "npm i kubai-icons-vue" },
  { id: "js", label: "JS", cmd: "npm i kubai-icons" },
  { id: "svg", label: "SVG", cmd: "npm i kubai-icons-static" },
];

export function InstallTabs() {
  const [cur, setCur] = useState(PKGS[0]);
  return (
    <div className={cn("max-w-md overflow-hidden", card)}>
      <div className="relative isolate flex gap-1 border-b px-1.5 pt-2">
        {PKGS.map((p) => (
          <button
            key={p.id}
            type="button"
            aria-pressed={cur.id === p.id}
            onClick={() => setCur(p)}
            className={cn("-mb-px border-b-2 px-2.5 pb-1.5 text-caption transition-colors pointer-coarse:pt-2 pointer-coarse:pb-3", cur.id === p.id ? "border-foreground text-foreground in-[[data-glide]]:border-transparent" : "border-transparent text-muted-foreground hover:text-foreground")}
          >
            {p.label}
          </button>
        ))}
        <Glide line selector="[aria-pressed=true]" className="-bottom-px h-0.5 bg-foreground" />
      </div>
      <div className="flex items-center justify-between gap-2 py-1.5 pr-1.5 pl-4">
        <code key={cur.id} className="swap-in font-mono text-control">{cur.cmd}</code>
        <CopyButton text={cur.cmd} onCopy={() => track("install_copy", { pkg: cur.id })} />
      </div>
    </div>
  );
}

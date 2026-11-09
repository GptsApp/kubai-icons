"use client";
import { useEffect, useRef, useState } from "react";
import { RiAddLine, RiCloseLine, RiErrorWarningLine, RiExternalLinkLine, RiFileCodeLine, RiUploadLine } from "@remixicon/react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { copyText } from "@/components/copy-button";
import { track } from "@/lib/analytics";
import { loadIndex } from "@/lib/icons";
import { submitUrl } from "@/lib/site";
import { MAX_BYTES, nameProblem, submissionFiles, svgProblems } from "@/lib/submission";
import { cn } from "@/lib/utils";
import { useLocale, useTr } from "@/lib/use-locale";

type Picked = { file: string; text: string };

const isSource = (file: File) => /\.m?js$/i.test(file.name);
const SIZES = [16, 24, 32, 48];

/** Takes an icon's files, checks them here in the browser and hands them to a GitHub issue. */
export function SubmitForm() {
  const locale = useLocale();
  const tr = useTr();
  const [svg, setSvg] = useState<Picked | null>(null);
  const [source, setSource] = useState<Picked | null>(null);
  const [name, setName] = useState("");
  const [motion, setMotion] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [dragging, setDragging] = useState(false);
  const [sent, setSent] = useState(false);
  const taken = useRef(new Set<string>());
  /** The last name taken from a file name; only that one is replaced by the next file. */
  const filled = useRef("");

  useEffect(() => {
    loadIndex().then((index) => { taken.current = new Set(index.icons.map((i) => i.name)); }).catch(() => { /* a name clash is caught when the issue is reviewed */ });
  }, []);

  const take = async (files: File[]) => {
    setSent(false);
    setError(null);
    for (const file of files) {
      if (file.size > MAX_BYTES) { setError(`${file.name} is larger than ${MAX_BYTES / 1000} KB.`); continue; }
      if (isSource(file)) {
        setSource({ file: file.name, text: await file.text() });
      } else if (/\.svg$/i.test(file.name) || file.type === "image/svg+xml") {
        const text = await file.text();
        setSvg({ file: file.name, text });
        const stem = file.name.replace(/\.svg$/i, "");
        const usable = /^[a-z0-9]+(-[a-z0-9]+)*$/.test(stem) && !svgProblems(text).length;
        setName((current) => {
          if (current !== filled.current) return current;
          filled.current = usable ? stem : "";
          return filled.current;
        });
      } else {
        setError(`${file.name} is not an .svg or .js file.`);
      }
    }
  };
  const fromInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    take([...(e.target.files ?? [])]);
    e.target.value = "";
  };

  const problems = svg ? svgProblems(svg.text, locale) : [];
  const badName = nameProblem(name, taken.current, locale);
  const tooLarge = new Blob([svg?.text ?? "", source?.text ?? ""]).size > MAX_BYTES;
  const ready = svg && !problems.length && !badName && motion.trim() && !tooLarge;
  const preview = svg && !problems.length ? `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg.text)}` : null;

  const files = () => submissionFiles(svg!.text, source?.text ?? null);
  const send = () => {
    copyText(files());
    window.open(submitUrl(name, motion.trim()), "_blank", "noopener");
    setSent(true);
    track("icon_submit", { motion: Boolean(source) });
  };

  return (
    <div
      className="grid grid-cols-[minmax(0,1fr)] overflow-hidden rounded-panel border sm:grid-cols-[17rem_minmax(0,1fr)]"
      onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
      onDragLeave={(e) => { if (e.currentTarget === e.target) setDragging(false); }}
      onDrop={(e) => { e.preventDefault(); setDragging(false); take([...e.dataTransfer.files]); }}
    >
      <label className={cn("relative grid min-h-56 cursor-pointer place-items-center bg-surface p-panel text-center transition-colors focus-area", dragging && "bg-surface-hover")}>
        <input type="file" multiple accept=".svg,.js,.mjs,image/svg+xml" className="sr-only" onChange={fromInput} aria-label={tr("Choose icon files", "选择图标文件")} />
        {preview ? (
          <div className="space-y-6">
            {/* An SVG used as an image cannot run scripts or load other files. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={preview} alt="" width={128} height={128} className="mx-auto" />
            <div className="flex items-end justify-center gap-4">
              {SIZES.map((s) => (
                <div key={s} className="flex flex-col items-center gap-1.5">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={preview} alt="" width={s} height={s} />
                  <span className="text-caption text-muted-foreground tabular-nums">{s}</span>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-2 text-muted-foreground">
            <RiUploadLine className="mx-auto size-6" />
            <p className="text-control text-foreground">{tr("Drop your SVG here", "拖入 SVG 文件")}</p>
            <p className="text-caption">{tr("or tap to choose a file", "或点击选择文件")}</p>
          </div>
        )}
      </label>

      <div className="flex min-w-0 flex-col gap-5 p-panel">
        <div className="space-y-1.5">
          <label htmlFor="submit-name" className="text-caption font-medium text-muted-foreground">{tr("Name", "名称")}</label>
          <Input id="submit-name" value={name} onChange={(e) => { setName(e.target.value); setSent(false); }} placeholder="snow-globe" spellCheck={false} autoCapitalize="none" className="h-10" />
        </div>
        <div className="space-y-1.5">
          <label htmlFor="submit-motion" className="text-caption font-medium text-muted-foreground">{tr("What it does on hover", "悬停动效")}</label>
          <Input id="submit-motion" value={motion} onChange={(e) => { setMotion(e.target.value); setSent(false); }} placeholder={tr("The globe shakes and the snow swirls.", "水晶球摇晃，雪花飞舞")} className="h-10" />
        </div>
        <div className="space-y-1.5">
          <p className="text-caption font-medium text-muted-foreground">{tr("Motion source (optional)", "动效源码（可选）")}</p>
          {source ? (
            <div className="flex h-10 items-center gap-2 text-control">
              <RiFileCodeLine className="size-4 shrink-0 text-muted-foreground" />
              <span className="min-w-0 truncate">{source.file}</span>
              <Button variant="ghost" size="icon-sm" className="ms-auto text-muted-foreground" onClick={() => setSource(null)} aria-label={tr("Remove motion source", "移除动效源码")}><RiCloseLine /></Button>
            </div>
          ) : (
            <label className={cn(buttonVariants({ variant: "outline" }), "w-fit cursor-pointer has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-1 has-[:focus-visible]:outline-(--focus)")}>
              <input type="file" accept=".js,.mjs" className="sr-only" onChange={fromInput} aria-label={tr("Choose motion source", "选择动效源码")} />
              <RiAddLine data-icon="inline-start" />{tr("Add .js file", "添加 .js 文件")}
            </label>
          )}
        </div>

        {(error || problems.length > 0 || tooLarge) && (
          <ul className="space-y-1 text-control text-destructive">
            {[...(error ? [error] : []), ...problems, ...(tooLarge ? [tr("The files are larger than {size} KB in total.", `文件总大小超过 {size} KB`, { size: MAX_BYTES / 1000 })] : [])].map((p) => (
              <li key={p} className="flex gap-1.5"><RiErrorWarningLine className="mt-0.5 size-4 shrink-0" />{p}</li>
            ))}
          </ul>
        )}
        {svg && name && badName && <p className="text-control text-destructive">{badName}</p>}

        <div className="mt-auto space-y-3">
          <Button size="xl" className="w-full" disabled={!ready} onClick={send}>
            {tr("Copy files and open GitHub", "复制文件并打开 GitHub")}<RiExternalLinkLine data-icon="inline-end" />
          </Button>
          {sent ? (
            <p className="text-control text-muted-foreground">
              {tr("Your files are on the clipboard. Paste them into the Files field on GitHub.", "文件已复制到剪贴板，请粘贴到 GitHub 的 Files 字段")}{" "}
              <button type="button" onClick={() => copyText(files())} className="tap relative text-foreground underline underline-offset-3">{tr("Copy again", "再次复制")}</button>
            </p>
          ) : (
            <p className="text-caption text-muted-foreground">{tr("Posting needs a GitHub account.", "提交需要 GitHub 账号")}</p>
          )}
        </div>
      </div>
    </div>
  );
}

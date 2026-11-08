import { pageMeta } from "@/lib/seo";
import Link from "next/link";
import { Prose, Title, Code } from "@/components/docs/prose";
import { REPO } from "@/lib/site";

export const metadata = pageMeta({ title: "Agent skill for drawing icons", path: "/skill/", description: "An agent skill that draws new animated icons in the style of the Kubai Icons library, in Claude Code, Codex and other coding agents." });

export default function Page() {
  return (
    <Prose>
      <Title lead={"The Kubai Icons skill draws new icons in the style of the library. It works with Claude Code, Codex and other coding agents."}>
        Kubai Icons skill
      </Title>
      <div className="my-5 space-y-5">
          <h2>Overview</h2>
          <p>The skill reads a product&apos;s code or feature list, assigns an everyday object and a hover action to each feature, and draws the icons. Each icon is checked at 24 and 28 pixels against a written specification that covers canvas, layers, outlines, light, color, marks and motion.</p>
          <h2>Install</h2>
          <p>The skill is a folder of instructions and scripts, so any coding agent that can read files and run commands can use it, including <a href="https://claude.com/claude-code">Claude Code</a> and <a href="https://developers.openai.com/codex">Codex</a>. We recommend Claude, which the skill was developed and tested with. Its self-check also needs Node 18 or later and Chrome.</p>
          <p>Paste the following into your agent:</p>
        </div>
      <Code code={`Install the Kubai Icons skill for me:
clone ${REPO} into your skills folder as kubai-icons
(~/.claude/skills in Claude Code, ~/.agents/skills in Codex;
if it's already there, pull the latest version instead),
make sure SKILL.md exists in that folder, and tell me when it's ready.`} />
      <div className="my-5 space-y-5">
          <h2>Use</h2>
          <p>Once the skill is installed, ask your agent to draw icons for your project, for example: &quot;Use the Kubai Icons skill to draw icons for the features in this repository.&quot; An agent without skill support can read <code>SKILL.md</code> from the cloned folder and follow it.</p>
          <h2>Share your icons</h2>
          <p>Icons you draw can join the library. <Link href="/icons/submit/">Submit an icon</Link> and it will be reviewed against the design rules; accepted icons are published under the MIT License, credited to you.</p>
          <h2>License</h2>
          <p>The skill is source-available under the <Link href="/license/">Kubai Icons License</Link>. Icons drawn with it belong to their author.</p>
        </div>
    </Prose>
  );
}

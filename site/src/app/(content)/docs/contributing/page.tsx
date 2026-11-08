import { pageMeta } from "@/lib/seo";
import Link from "next/link";
import { Prose, Title, Code } from "@/components/docs/prose";
import { REPO } from "@/lib/site";

export const metadata = pageMeta({ title: "Contributing icons", path: "/docs/contributing/", description: "Request a new icon or contribute one to Kubai Icons: what a request needs, how to run the project, and how icons are checked." });

export default function Page() {
  return (
    <Prose>
      <Title lead={"This page describes how to request an icon, report an icon bug and contribute a drawing."}>
        Contributing
      </Title>
      <div className="my-5 space-y-5">
          <h2>Request an icon</h2>
          <p>Open an <a href={`${REPO}/issues/new?template=icon-request.yml`}>icon request</a> that states what the icon is for, the everyday object that represents it and its hover motion. Requests with a clear object are drawn first.</p>
          <h2>Report an icon bug</h2>
          <p>To report a problem such as visible seams, blurry marks at small sizes or incorrect motion, open an <a href={`${REPO}/issues/new?template=icon-bug.yml`}>icon bug</a> and attach a screenshot.</p>
          <h2 id="submit-an-icon">Submit an icon</h2>
          <p>If you drew an icon with the skill or by hand and do not want to open a pull request, use the <Link href="/icons/submit/">submission page</Link>. It checks your files in the browser and prepares a GitHub issue. Files stay in the browser until you post the issue.</p>
          <p>Export the drawing as SVG. With the skill, run <code>node scripts/export.mjs</code>. To have the motion reviewed too, add the icon&apos;s source file.</p>
          <p>A maintainer reviews each submission against the design rules. Logos, trademarks and anything traced from another icon set cannot be accepted. Accepted icons join the library under the MIT License, credited to you.</p>
          <h2>Draw an icon</h2>
          <p>Icons are stored in <code>icons/</code>, one ES module per icon. Draw them with the <Link href="/skill/">Kubai Icons skill</Link> or by hand, following <a href={`${REPO}/blob/master/PROMPT.md`}>PROMPT.md</a> and <a href={`${REPO}/blob/master/docs/authoring.md`}>docs/authoring.md</a>. To check your work, replace <code>my-icon</code> below with your icon&apos;s name:</p>
        </div>
      <Code lang="bash" code={`git clone ${REPO}
cd kubai-icons && npm install
node tools/check.mjs --only my-icon --with folder,mail   # contact sheets in check-out/lib
npm run validate                                          # names, metadata, markup
npm run build:packages
npm test`} />
      <div className="my-5 space-y-5">
          <p><code>tools/check.mjs</code> generates contact sheets, which are preview images that show your icon next to the existing icons listed with <code>--with</code>. Attach them to your pull request. CI renders the changed icons again and runs the tests, and a maintainer reviews how well the icon fits the set.</p>
          <h2>License</h2>
          <p>Contributed icons and package code are released under the MIT License. Changes to the website and the skill follow their own terms, listed on the <Link href="/license/">License</Link> page.</p>
        </div>
    </Prose>
  );
}

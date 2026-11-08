import { pageMeta } from "@/lib/seo";
import { Prose, Title } from "@/components/docs/prose";
import { REPO } from "@/lib/site";

export const metadata = pageMeta({ title: "License", path: "/license/", description: "Licensing for Kubai Icons: the icons and packages are MIT licensed, the website is all rights reserved, and the agent skill is source-available." });

export default function Page() {
  return (
    <Prose>
      <Title lead={"The icons and packages are MIT licensed, the website is all rights reserved, and the skill is source-available."}>License</Title>
      <div className="my-5 space-y-5">
          <h2>Icons and packages</h2>
          <p>The icons and the packages <code>kubai-icons</code>, <code>kubai-icons-react</code>, <code>kubai-icons-vue</code> and <code>kubai-icons-static</code> are released under the <a href={`${REPO}/blob/master/LICENSE-ICONS`}>MIT License</a>. Commercial use, modification and redistribution are permitted, provided the copyright notice is retained with the source. Attribution in shipped products is not required.</p>
          <h2>Website</h2>
          <p>The website, including its code, text, design and layout, is <a href={`${REPO}/blob/master/LICENSE-SITE`}>all rights reserved</a>. Its source may be read and run locally to prepare a contribution. Copying, hosting or redistributing it requires written permission. The icons on the website remain under the MIT License.</p>
          <h2>Skill</h2>
          <p>The skill is source-available under the <a href={`${REPO}/blob/master/LICENSE`}>Kubai Icons License</a>. It may be installed and run, including for commercial work. Icons drawn with it belong to their author.</p>
          <p>The license that applies to each file is listed in <a href={`${REPO}/blob/master/LICENSING.md`}>LICENSING.md</a>.</p>
          <h2>Trademarks</h2>
          <p>The Kubai and Lumno names and logos are not covered by any of these licenses.</p>
        </div>
    </Prose>
  );
}

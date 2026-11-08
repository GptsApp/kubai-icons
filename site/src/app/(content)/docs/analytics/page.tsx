import { pageMeta } from "@/lib/seo";
import { Prose, Title } from "@/components/docs/prose";

export const metadata = pageMeta({ title: "Privacy", path: "/docs/analytics/", description: "What the Kubai Icons packages and website collect: the npm packages and CDN files contain no tracking or telemetry." });

export default function Page() {
  return (
    <Prose>
      <Title lead={"This page describes what the Kubai Icons packages and website collect."}>
        Privacy
      </Title>
      <div className="my-5 space-y-5">
          <h2>Packages</h2>
          <p>The npm packages and CDN files contain no tracking or telemetry. The web component makes network requests only to load icon files, from the location it was loaded from.</p>
          <h2>Website</h2>
          <p>The website uses <a href="https://umami.is/privacy">Umami</a> to count page views and the product events below, to identify missing icons and commonly used formats:</p>
          <ul>
            <li>an icon opened, copied (with the format) or downloaded;</li>
            <li>a collection downloaded, with its size and format;</li>
            <li>a search term, and whether it returned results;</li>
            <li>a category filter, or an install command copied;</li>
            <li>an icon requested, with the search term, or an icon submitted;</li>
            <li>the feedback link or the author link opened.</li>
          </ul>
          <p>Umami does not set cookies. It receives the IP address and user agent that accompany any web request. Search terms are sent as typed, so do not enter personal information in the search box.</p>
          <p>Browsers that send Do Not Track or Global Privacy Control do not load the analytics script, so neither their page views nor their events are counted.</p>
          <p>A visitor&apos;s icon collection and display preferences are stored only in that browser. A collection link holds the list in the URL fragment, which browsers do not send to the server, and analytics is set to leave it out.</p>
          <p>The star count in the header is read from GitHub&apos;s public API, so the browser contacts api.github.com for it. See <a href="https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement">GitHub&apos;s privacy statement</a> for how those requests are handled.</p>
        </div>
    </Prose>
  );
}

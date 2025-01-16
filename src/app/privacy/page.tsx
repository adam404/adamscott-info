import type { Metadata } from "next";
import Navigation from "@/components/Navigation";

export const metadata: Metadata = {
  title: "Privacy Policy | Adam Scott",
  description:
    "Privacy policy and data collection practices for adamscott.info",
};

export default function PrivacyPage() {
  return (
    <div className="bg-background min-h-screen">
      <Navigation />
      <div className="container mx-auto px-4 py-24 sm:py-32">
        <div className="max-w-2xl mx-auto">
          <main className="prose dark:prose-invert">
            <h1 className="text-3xl font-bold tracking-tight">
              Privacy Policy
            </h1>
            <p className="text-sm text-muted-foreground">
              Last updated: {new Date().toLocaleDateString()}
            </p>

            <section>
              <h2>Introduction</h2>
              <p>
                This Privacy Policy describes how adamscott.info ("we," "us," or
                "our") collects, uses, and shares information about you when you
                visit our website.
              </p>
            </section>

            <section>
              <h2>Information We Collect</h2>
              <h3>Information Collected Automatically</h3>
              <p>
                When you visit our website, we automatically collect certain
                information about your device and usage of the site through
                Google Analytics, including:
              </p>
              <ul>
                <li>
                  Device information (browser type, operating system, device
                  type)
                </li>
                <li>
                  Usage data (pages visited, time spent on pages, navigation
                  paths)
                </li>
                <li>IP address and approximate location</li>
                <li>Referral sources</li>
              </ul>
            </section>

            <section>
              <h2>How We Use Google Analytics</h2>
              <p>
                We use Google Analytics to understand how visitors interact with
                our website. This service uses cookies and similar technologies
                to collect and analyze information about website usage. Google
                Analytics may collect:
              </p>
              <ul>
                <li>Pages you view</li>
                <li>How long you stay on pages</li>
                <li>How you got to our site</li>
                <li>What you click on while visiting our site</li>
              </ul>
              <p>
                You can learn more about how Google uses your data at:{" "}
                <a
                  href="https://policies.google.com/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:text-primary/80"
                >
                  Google Privacy & Terms
                </a>
              </p>
            </section>

            <section>
              <h2>Your Rights and Choices</h2>
              <p>
                You can opt out of Google Analytics tracking by using the Google
                Analytics Opt-out Browser Add-on, available at:{" "}
                <a
                  href="https://tools.google.com/dlpage/gaoptout"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:text-primary/80"
                >
                  Google Analytics Opt-out Browser Add-on
                </a>
              </p>
            </section>

            <section>
              <h2>Data Retention</h2>
              <p>
                We retain the data collected via Google Analytics according to
                our internal policies and as required by law. Analytics data is
                typically retained for 26 months.
              </p>
            </section>

            <section>
              <h2>Changes to This Privacy Policy</h2>
              <p>
                We may update this Privacy Policy from time to time. We will
                notify you of any changes by posting the new Privacy Policy on
                this page and updating the "Last updated" date at the top of
                this policy.
              </p>
            </section>

            <section>
              <h2>Intellectual Property Rights</h2>
              <p>
                All content on this website, including but not limited to text,
                graphics, logos, button icons, images, audio clips, digital
                downloads, data compilations, and software, is the property of
                adamscott.info or its content suppliers and is protected by
                international copyright laws.
              </p>
              <p>
                Third-party trademarks, logos, brand names, products, and
                services mentioned on this website are the property of their
                respective owners. The use of these properties does not imply
                endorsement or affiliation with adamscott.info.
              </p>
            </section>

            <section>
              <h2>Contact Us</h2>
              <p>
                If you have any questions about this Privacy Policy, please
                contact us through the contact form on our website.
              </p>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
}

import Link from "next/link";

export default function TermsPage() {
  return (

    <main className="mx-auto max-w-5xl px-4 py-6">

      {/* HEADER */}

      <div className="mb-6 flex items-center justify-between">

        <div>

          <h1 className="text-2xl font-bold">
            terms
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            platform responsibilities, safety, and usage guidelines
          </p>

        </div>

        <Link
          href="/projects"
          className="
            border border-gray-300
            px-4 py-2
            text-sm
            transition
            hover:bg-gray-50
          "
        >
          browse projects
        </Link>

      </div>

      {/* CONTENT */}

      <div className="border border-gray-300 bg-white">

        <div className="space-y-4 p-6 text-sm leading-7 text-gray-800">

          <p>
            by using switchwaters.com, you agree to use the platform
            responsibly, lawfully, and in good faith.
          </p>

          <p>
            switchwaters exists as an open discovery habitat
            for opportunities, collaborations, hiring, contractual work,
            and professional movement across modern internet ecosystems.
          </p>

          {/* USER RESPONSIBILITY */}

          <div className="border-t border-gray-300 pt-6">

            <h2 className="mb-3 font-medium">
              users are responsible for
            </h2>

            <ul className="ml-5 list-disc space-y-2">

              <li>
                accuracy of listings, profiles, portfolios,
                and shared information
              </li>

              <li>
                communication and agreements made off-platform
              </li>

              <li>
                independently verifying clients, candidates,
                companies, and opportunities
              </li>

              <li>
                handling invoices, payments, taxes,
                contracts, and compliance independently
              </li>

              <li>
                ensuring content posted does not violate
                intellectual property, privacy, or applicable laws
              </li>

            </ul>

          </div>

          {/* PLATFORM ROLE */}

          <div className="border-t border-gray-300 pt-6">

            <h2 className="mb-3 font-medium">
              platform role
            </h2>

            <p>
              switchwaters acts only as a publishing,
              discovery, and networking platform.
            </p>

            <p className="mt-3">
              we are not involved in employment relationships,
              freelancer agreements, contracts, payments,
              negotiations, hiring decisions, or disputes between users.
            </p>

          </div>

          {/* GOOGLE AUTH */}

          <div className="border-t border-gray-300 pt-6">

            <h2 className="mb-3 font-medium">
              authentication and account safety
            </h2>

            <p>
              switchwaters currently supports sign-in
              using google authentication only.
            </p>

            <p className="mt-3">
              this decision is intentional and helps reduce:
            </p>

            <ul className="ml-5 mt-3 list-disc space-y-2">

              <li>spam and fake account creation</li>
              <li>phishing and impersonation attempts</li>
              <li>duplicate or disposable account misuse</li>
              <li>credential-related security risks</li>
              <li>low-trust or anonymous platform activity</li>

            </ul>

            <p className="mt-4">
              by limiting authentication providers during early platform growth,
              we aim to maintain a more trustworthy ecosystem
              for hiring, collaboration, and communication.
            </p>

            <p className="mt-3">
              users are responsible for maintaining the security
              of their google account and associated access credentials.
            </p>


  <div className="mt-5 border border-gray-300 bg-gray-50 p-4 text-xs leading-6 text-gray-600">

    <p>
      switchwaters uses google authentication services
      for account sign-in and identity verification support.
    </p>

    <p className="mt-3">
      by continuing to sign in using google,
      you authorize the platform to access basic profile data
      made available through your google account,
      such as your name, email address, and profile image,
      subject to your google account permissions and consent settings.
    </p>

    <p className="mt-3">
      switchwaters is not affiliated with, endorsed by,
      or officially connected to google llc.
      google trademarks, logos, and brand assets
      remain the property of google llc.
    </p>

    <p className="mt-3">
      use of google authentication is also subject to
      google&apos;s own terms, privacy policies,
      and authentication security practices.
    </p>

  </div>

          </div>

          {/* CONTENT + CONDUCT */}

          <div className="border-t border-gray-300 pt-6">

            <h2 className="mb-3 font-medium">
              prohibited activity
            </h2>

            <ul className="ml-5 list-disc space-y-2">

              <li>fraudulent or misleading listings</li>

              <li>spam, phishing, or scam-related activity</li>

              <li>harassment, abuse, or intimidation</li>

              <li>malicious links or harmful content</li>

              <li>scraping, automated abuse, or platform exploitation</li>

              <li>impersonation of individuals or organizations</li>

            </ul>

          </div>

          {/* MODERATION */}

          <div className="border-t border-gray-300 pt-6">

            <h2 className="mb-3 font-medium">
              moderation
            </h2>

            <p>
              switchwaters reserves the right to remove listings,
              accounts, messages, usernames, or platform activity
              that violates these guidelines or harms ecosystem trust.
            </p>

            <p className="mt-3">
              moderation actions may occur without prior notice
              in cases involving safety, abuse, impersonation,
              spam, or malicious behavior.
            </p>

          </div>

          {/* LIABILITY */}

          <div className="border-t border-gray-300 pt-6">

            <h2 className="mb-3 font-medium">
              limitation of liability
            </h2>

            <p>
              switchwaters is provided on an “as available” basis.
            </p>

            <p className="mt-3">
              we do not guarantee:
            </p>

            <ul className="ml-5 mt-3 list-disc space-y-2">

              <li>job placement outcomes</li>

              <li>client or candidate authenticity</li>

              <li>platform uptime or uninterrupted access</li>

              <li>financial outcomes or hiring success</li>

              <li>compatibility between users or teams</li>

            </ul>

          </div>

          {/* FINAL */}

          <div className="border-t border-gray-300 pt-6">

            <p className="text-gray-600">
              continued use of switchwaters indicates acceptance
              of these terms and future platform policy updates.
            </p>

          </div>

        </div>

      </div>

    </main>
  );
}
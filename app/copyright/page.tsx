import Link from 'next/link'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Copyright Policy | Yohanes Wenanta',
  description: 'Copyright policy and terms of use for Yohanes Wenanta portfolio.',
}

export default function CopyrightPage() {
  return (
    <main className="min-h-screen bg-[var(--scene-hero)] text-[var(--text-primary)] px-6 py-24 md:px-24 flex flex-col items-center">
      <div className="max-w-4xl w-full">
        <div className="mb-16">
          <Link href="/" className="font-mono text-sm tracking-widest text-[var(--text-secondary)] hover:text-[var(--accent-warm)] transition-colors inline-flex items-center gap-2">
            <span>←</span> BACK TO HOME
          </Link>
        </div>

        <h1 className="font-display text-4xl md:text-6xl text-[var(--accent-warm)] mb-8 tracking-tight">
          COPYRIGHT POLICY
        </h1>
        
        <div className="space-y-12 font-sans text-base md:text-lg leading-relaxed text-[var(--text-secondary)]">
          <section>
            <h2 className="font-mono text-sm tracking-widest text-[var(--text-primary)] uppercase mb-4">1. Ownership of Content</h2>
            <p>
              All content on this portfolio, including but not limited to text, graphics, logos, images, audio clips, digital downloads, data compilations, and software (collectively, the "Content"), is the property of Yohanes Wenanta or its content suppliers and protected by international copyright laws.
            </p>
          </section>

          <section>
            <h2 className="font-mono text-sm tracking-widest text-[var(--text-primary)] uppercase mb-4">2. Use of Portfolio Materials</h2>
            <p>
              The materials provided on this website are intended for demonstration, portfolio review, and evaluation purposes only. You may view and print pages from the website for your own personal use, subject to restrictions set in these terms and conditions.
            </p>
            <p className="mt-4">
              You must not:
            </p>
            <ul className="list-disc pl-6 mt-4 space-y-2">
              <li>Republish material from this website without prior consent.</li>
              <li>Sell, rent, or sub-license material from the website.</li>
              <li>Reproduce, duplicate, or copy material from this website for commercial purposes.</li>
              <li>Redistribute content from Yohanes Wenanta (unless content is specifically made for redistribution).</li>
            </ul>
          </section>

          <section>
            <h2 className="font-mono text-sm tracking-widest text-[var(--text-primary)] uppercase mb-4">3. Third-Party Trademarks and Technologies</h2>
            <p>
              All trademarks, service marks, and trade names of third parties (such as Next.js, React, Cloudflare, Figma, and others) used herein are trademarks or registered trademarks of their respective owners. Their inclusion does not imply any affiliation with or endorsement by them.
            </p>
          </section>

          <section>
            <h2 className="font-mono text-sm tracking-widest text-[var(--text-primary)] uppercase mb-4">4. Project Case Studies and Client Work</h2>
            <p>
              Certain projects, case studies, and visual assets displayed on this website represent work completed for specific clients, companies, or organizations. The intellectual property rights of the final products, source code (if proprietary), and brand identities remain with the respective clients or organizations. These assets are showcased here purely as evidence of past experience and skill.
            </p>
          </section>

          <section>
            <h2 className="font-mono text-sm tracking-widest text-[var(--text-primary)] uppercase mb-4">5. Contact</h2>
            <p>
              If you have any questions regarding this Copyright Policy, or if you believe any material on this site infringes on your own copyright, please contact me immediately via email at <a href="mailto:yohaneswenanta2410@gmail.com" className="text-[var(--accent-warm)] hover:underline">yohaneswenanta2410@gmail.com</a>.
            </p>
          </section>

          <div className="pt-16 border-t border-[var(--border)] font-mono text-xs tracking-widest uppercase">
            Last Updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </div>
        </div>
      </div>
    </main>
  )
}

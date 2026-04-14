import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions — Lone & Co",
  description: "Terms and conditions governing services provided by Lone & Co Ltd.",
};

export default function TermsAndConditions() {
  const lastUpdated = "April 2025";
  const font = {
    serif: { fontFamily: "var(--font-display), serif" },
    sans: { fontFamily: "var(--font-body), sans-serif" },
    mono: { fontFamily: "var(--font-heading), sans-serif" },
  };

  const sections = [
    {
      num: "1",
      title: "About These Terms",
      paras: [
        "These terms and conditions ('Terms') apply to all services provided by Lone & Co Ltd ('we', 'us', 'our'), a company registered in England and Wales, to the client ('you', 'your').",
        "By engaging our services, you confirm that you have read, understood, and agree to these Terms.",
        "We may update these Terms from time to time. The version in effect at the date of your most recent agreement or statement of work will apply to that engagement.",
      ],
    },
    {
      num: "2",
      title: "Services",
      paras: [
        "We provide AI consulting, AI integration, website design and development, website optimisation, and related digital services as described in your proposal or statement of work.",
        "The specific scope, deliverables, timeline, and fees for each engagement will be set out in a proposal, statement of work, or email confirmation ('SOW') agreed between both parties before work begins.",
        "Any work requested outside the agreed SOW will be treated as additional work and quoted separately before we proceed.",
      ],
    },
    {
      num: "3",
      title: "Discovery Calls and Free Audits",
      paras: [
        "We offer free discovery calls and free website audits at our discretion. These carry no obligation for either party.",
        "Any recommendations, findings, or advice shared during a free call or audit remain our intellectual property until a paid engagement is agreed.",
        "We reserve the right to withdraw or modify free services at any time without notice.",
      ],
    },
    {
      num: "4",
      title: "Proposals and Acceptance",
      paras: [
        "Proposals are valid for 30 days from the date of issue unless otherwise stated.",
        "A proposal is accepted when you confirm acceptance in writing (including email) or make the first payment, whichever occurs first.",
        "Once accepted, the proposal together with these Terms forms the complete agreement between us for that engagement.",
      ],
    },
    {
      num: "5",
      title: "Fees and Payment",
      paras: [
        "All fees are quoted in pounds sterling (GBP) and are exclusive of VAT unless stated otherwise.",
        "For project work, we require a 50% deposit before work begins, with the remaining balance due on completion unless otherwise agreed in the SOW.",
        "For monthly retainers, payment is due in advance on the first working day of each month.",
        "Invoices are payable within 14 days of the invoice date unless otherwise agreed.",
        "We reserve the right to charge interest on overdue payments at 4% above the Bank of England base rate, in accordance with the Late Payment of Commercial Debts (Interest) Act 1998.",
        "If payment is more than 30 days overdue, we reserve the right to suspend or cease work until the outstanding balance is settled.",
      ],
    },
    {
      num: "6",
      title: "Client Responsibilities",
      paras: [
        "You agree to provide all content, access credentials, brand assets, and information we reasonably need to deliver the agreed services, in a timely manner.",
        "You will designate a single point of contact who has authority to provide feedback, approve deliverables, and make decisions on your behalf.",
        "Delays caused by late provision of materials, feedback, or approvals by you may result in revised timelines and, where reasonable, additional charges.",
        "You are responsible for ensuring that any content or materials you provide to us do not infringe any third party's intellectual property rights.",
      ],
    },
    {
      num: "7",
      title: "Intellectual Property",
      paras: [
        "Upon receipt of full payment, we assign to you all intellectual property rights in the final deliverables created specifically for you, except as stated in clauses 7.2 and 7.3.",
        "We retain ownership of all pre-existing tools, frameworks, code libraries, templates, and methodologies that we use in delivering the services ('Our Tools'). We grant you a non-exclusive, perpetual licence to use Our Tools as incorporated into your deliverables.",
        "Any open source or third party software included in the deliverables is subject to its own licence terms.",
        "We reserve the right to showcase the work in our portfolio and marketing materials unless you request otherwise in writing.",
      ],
    },
    {
      num: "8",
      title: "Confidentiality",
      paras: [
        "Both parties agree to keep confidential any information that is clearly identified as confidential or that would reasonably be understood to be confidential.",
        "This obligation does not apply to information that is already publicly available, was known to the receiving party before disclosure, or is required to be disclosed by law.",
        "This confidentiality obligation survives the termination of any engagement for a period of two years.",
      ],
    },
    {
      num: "9",
      title: "Data Protection",
      paras: [
        "Both parties will comply with their respective obligations under the UK General Data Protection Regulation (UK GDPR) and the Data Protection Act 2018.",
        "Where we process personal data on your behalf in delivering the services, we will do so only in accordance with your documented instructions and will implement appropriate technical and organisational measures to protect that data.",
        "We will not share your personal data with third parties except where necessary to deliver the agreed services (for example, hosting providers), and any such third parties will be bound by equivalent data protection obligations.",
        "Our Privacy Policy, available on our website, sets out how we collect and use personal data.",
      ],
    },
    {
      num: "10",
      title: "Third Party Services",
      paras: [
        "Our services may involve the use of third party platforms, APIs, hosting providers, or software (for example, AI model providers, domain registrars, analytics tools).",
        "We are not responsible for the availability, performance, pricing changes, or terms of any third party service.",
        "Where third party services require separate agreements or subscriptions, you are responsible for entering into and maintaining those agreements directly.",
        "Any ongoing costs for third party services (such as hosting, domain renewals, or API usage fees) are your responsibility unless explicitly included in a retainer agreement.",
      ],
    },
    {
      num: "11",
      title: "AI Specific Terms",
      paras: [
        "AI outputs (including text, images, code, and recommendations generated by artificial intelligence tools) are provided as a starting point and may require human review, editing, and judgement before use.",
        "We do not guarantee the accuracy, completeness, or fitness for any particular purpose of AI generated outputs. You are responsible for reviewing and approving all AI generated content before it is published or relied upon.",
        "We will inform you where AI tools are used as a material part of the service delivery.",
        "AI models and services provided by third parties (such as OpenAI, Anthropic, or Google) are subject to their own terms of use and acceptable use policies.",
      ],
    },
    {
      num: "12",
      title: "Warranties and Liability",
      paras: [
        "We will perform the services with reasonable skill and care, consistent with generally accepted industry standards.",
        "Except as expressly stated in these Terms, all warranties, conditions, and representations, whether express or implied, are excluded to the fullest extent permitted by law.",
        "We do not guarantee specific results, rankings, traffic levels, revenue increases, or other business outcomes.",
        "Our total liability to you for any claim arising out of or in connection with an engagement shall not exceed the total fees paid by you for that engagement.",
        "Neither party shall be liable for any indirect, consequential, or special loss, including but not limited to loss of profit, loss of revenue, loss of data, or loss of business opportunity.",
        "Nothing in these Terms excludes or limits liability for death or personal injury caused by negligence, fraud or fraudulent misrepresentation, or any other liability that cannot be excluded by law.",
      ],
    },
    {
      num: "13",
      title: "Termination",
      paras: [
        "Either party may terminate an engagement by giving 14 days written notice to the other party.",
        "We may terminate immediately if you fail to pay any invoice within 30 days of its due date, or if you materially breach these Terms and fail to remedy the breach within 14 days of being notified.",
        "Upon termination, you will pay for all work completed up to the date of termination and any non-recoverable costs incurred on your behalf.",
        "The deposit is non-refundable once work has commenced, except where we terminate for our own convenience and no work has been delivered.",
        "On termination, we will provide you with all completed deliverables for which payment has been received. We may retain copies for our records and portfolio use, subject to clause 7.4.",
      ],
    },
    {
      num: "14",
      title: "Force Majeure",
      paras: [
        "Neither party shall be liable for any failure or delay in performing their obligations where that failure or delay arises from circumstances beyond their reasonable control, including but not limited to natural disasters, pandemic, government action, power failure, internet disruption, or third party service outages.",
      ],
    },
    {
      num: "15",
      title: "General",
      paras: [
        "These Terms, together with the applicable SOW, constitute the entire agreement between us and supersede all prior discussions, representations, and agreements.",
        "If any provision of these Terms is found to be invalid or unenforceable, the remaining provisions will continue in full force and effect.",
        "A failure by either party to exercise any right under these Terms does not constitute a waiver of that right.",
        "These Terms are governed by the laws of England and Wales, and both parties submit to the exclusive jurisdiction of the courts of England and Wales.",
        "Nothing in these Terms creates a partnership, joint venture, or employment relationship between the parties.",
      ],
    },
    {
      num: "16",
      title: "Modern Slavery",
      paras: [
        "We have a zero tolerance approach to modern slavery and human trafficking. We are committed to acting ethically and with integrity in all our business dealings and relationships.",
        "We expect the same standards from our suppliers, contractors, and business partners.",
      ],
    },
  ];

  return (
    <>
      <section className="bg-obsidian pt-40 pb-16 lg:pt-52 lg:pb-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[.04] pointer-events-none" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")", backgroundSize: "200px" }} />
        <div className="hidden lg:block absolute pointer-events-none" style={{
          top: "-10%", right: "-15%", width: "65%", height: "120%",
          background: "linear-gradient(160deg, var(--slate) 0%, #7B8AF7 40%, var(--slate) 100%)",
          clipPath: "polygon(20% 0%, 100% 0%, 100% 100%, 0% 100%)",
          zIndex: 0,
        }} />
        <div className="relative z-10 max-w-[1200px] mx-auto px-6 sm:px-10">
          <p className="text-[.65rem] font-semibold tracking-[.2em] uppercase text-gold mb-4" style={font.mono}>Legal</p>
          <h1 className="text-4xl sm:text-5xl lg:text-[4.5rem] font-bold text-white leading-[1.05]" style={font.serif}>Terms &amp; Conditions</h1>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gold/10" />
      </section>

      <section className="bg-[#FAF8F4] py-16 lg:py-20">
        <div className="max-w-6xl mx-auto px-6 sm:px-10">
          <div className="max-w-[680px] bg-white border border-[#E8E4DE] rounded-xl p-8 lg:p-12 space-y-10" style={font.sans}>

            <div>
              <p className="text-sm text-[#404048]/70 leading-relaxed">
                These terms and conditions govern all services provided by <strong className="text-[#1E1E24]">Lone &amp; Co Ltd</strong>, a company registered in England and Wales. By engaging our services you agree to these terms. Questions? Email <a href="mailto:hello@loneco.co.uk" className="text-[#C5A55A] underline">hello@loneco.co.uk</a>.
              </p>
            </div>

            {sections.map((sec) => (
              <div key={sec.num}>
                <h2 className="text-xl font-bold text-[#1E1E24] mb-4" style={font.serif}>
                  {sec.num}. {sec.title}
                </h2>
                <div className="space-y-3">
                  {sec.paras.map((para, i) => (
                    <p key={i} className="text-sm text-[#404048]/70 leading-relaxed">
                      <span className="text-[#1E1E24] font-semibold mr-1.5">{sec.num}.{i + 1}</span>
                      {para}
                    </p>
                  ))}
                </div>
              </div>
            ))}

            <div>
              <h2 className="text-xl font-bold text-[#1E1E24] mb-4" style={font.serif}>17. Contact</h2>
              <p className="text-sm text-[#404048]/70 leading-relaxed mb-3">For any questions about these Terms, please contact us:</p>
              <div className="space-y-1">
                <p className="text-sm text-[#404048]/70"><strong className="text-[#1E1E24]">Lone &amp; Co Ltd</strong></p>
                <p className="text-sm text-[#404048]/70">Email: <a href="mailto:hello@loneco.co.uk" className="text-[#C5A55A] underline">hello@loneco.co.uk</a></p>
                <p className="text-sm text-[#404048]/70">Location: London, United Kingdom</p>
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}

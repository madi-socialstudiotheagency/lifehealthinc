export default function PrivacyPage() {
  return (
    <div className="min-h-screen" style={{ background: '#0D1B3E' }}>
      <div className="max-w-4xl mx-auto px-6 py-16">
        {/* Header */}
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-bold mb-2" style={{ color: '#FFFFFF' }}>Privacy Policy</h1>
          <p className="text-sm" style={{ color: '#94a3b8' }}>Effective Date: January 1st, 2026</p>
        </div>

        <div className="space-y-10 text-sm leading-relaxed" style={{ color: '#cbd5e1' }}>

          {/* Important Notice */}
          <div className="rounded-xl p-6 border" style={{ background: 'rgba(255,255,255,0.05)', borderColor: 'rgba(255,255,255,0.1)' }}>
            <h2 className="text-base font-bold uppercase tracking-wide mb-3" style={{ color: '#F4F6FA' }}>
              IMPORTANT NOTICE REGARDING TEXT MESSAGING & DATA
            </h2>
            <p style={{ color: '#cbd5e1' }}>
              LifeHealthInc ("we," "us," or "our") <strong style={{ color: '#FFFFFF' }}>DOES NOT</strong> share customer opt-in information, including phone numbers and consent records, with any affiliates or third parties for marketing, promotional, or any other purposes unrelated to providing our direct services. All text messaging originator opt-in data is kept strictly confidential.
            </p>
          </div>

          {/* Section 1 */}
          <section>
            <h2 className="text-lg font-bold mb-4" style={{ color: '#FFFFFF' }}>1. Information We Collect</h2>
            <p className="mb-3">We collect the following types of information:</p>

            <h3 className="font-semibold mb-2" style={{ color: '#F4F6FA' }}>Personal Information:</h3>
            <ul className="list-disc pl-6 space-y-1 mb-4">
              <li>Name, email address, phone number, physical address</li>
              <li>Payment information when you make a purchase or request a quote</li>
              <li>Opt-in records and timestamps for all communication channels (SMS, email, etc.)</li>
            </ul>

            <h3 className="font-semibold mb-2" style={{ color: '#F4F6FA' }}>Non-Personal Information:</h3>
            <ul className="list-disc pl-6 space-y-1 mb-4">
              <li>IP address, browser type, device information</li>
              <li>Website usage patterns and analytics</li>
              <li>Cookies and similar technologies</li>
            </ul>

            <h3 className="font-semibold mb-2" style={{ color: '#F4F6FA' }}>Customer Communication:</h3>
            <ul className="list-disc pl-6 space-y-1">
              <li>Records of inquiries and service requests</li>
              <li>Appointment details and preferences</li>
              <li>Service history and feedback</li>
            </ul>
          </section>

          {/* Section 2 */}
          <section>
            <h2 className="text-lg font-bold mb-4" style={{ color: '#FFFFFF' }}>2. How We Use Your Information</h2>
            <p className="mb-3">We use collected data for:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Providing and improving our services</li>
              <li>Processing transactions and payments</li>
              <li>Communicating with you about your inquiries, appointments, and promotions</li>
              <li>Enhancing website functionality and user experience</li>
              <li>Ensuring security and fraud prevention</li>
              <li>Maintaining records of your communication preferences and consent</li>
            </ul>
          </section>

          {/* Section 3 */}
          <section>
            <h2 className="text-lg font-bold mb-4" style={{ color: '#FFFFFF' }}>3. SMS Messaging &amp; Compliance</h2>
            <h3 className="font-semibold mb-3" style={{ color: '#F4F6FA' }}>Text Message Program Terms &amp; Conditions</h3>
            <p className="mb-4">By opting into our SMS messaging services, you agree to receive text messages related to our services, including appointment reminders, customer support, and important updates.</p>

            <h3 className="font-semibold mb-2" style={{ color: '#F4F6FA' }}>Opt-In &amp; Consent:</h3>
            <ul className="list-disc pl-6 space-y-1 mb-4">
              <li>You will only receive messages if you have explicitly opted in</li>
              <li>We maintain timestamped records of all opt-in actions</li>
              <li>We comply with the Telephone Consumer Protection Act (TCPA) and all applicable laws</li>
            </ul>

            <h3 className="font-semibold mb-2" style={{ color: '#F4F6FA' }}>Opt-Out Instructions:</h3>
            <ul className="list-disc pl-6 space-y-1 mb-4">
              <li>You can cancel SMS notifications at any time by replying "STOP"</li>
              <li>You will receive a final confirmation message, and no further messages will be sent unless you re-opt in</li>
              <li>All opt-out requests are processed immediately.</li>
            </ul>

            <h3 className="font-semibold mb-2" style={{ color: '#F4F6FA' }}>Message Frequency &amp; Content:</h3>
            <ul className="list-disc pl-6 space-y-1 mb-4">
              <li>Message frequency varies based on your interactions with our business</li>
              <li>Messages will be directly related to the services you have requested</li>
              <li>We do not send promotional content without specific consent</li>
            </ul>

            <h3 className="font-semibold mb-2" style={{ color: '#F4F6FA' }}>Help &amp; Support:</h3>
            <ul className="list-disc pl-6 space-y-1 mb-4">
              <li>Reply "HELP" for assistance or contact us at info@lifehealthinc.org</li>
              <li>Customer support is available during regular business hours</li>
            </ul>

            <h3 className="font-semibold mb-2" style={{ color: '#F4F6FA' }}>Carrier Information:</h3>
            <ul className="list-disc pl-6 space-y-1 mb-6">
              <li>Standard message and data rates may apply</li>
              <li>Carriers are not liable for delayed or undelivered messages</li>
              <li>Supported carriers include AT&amp;T, Verizon, T-Mobile, Sprint, and most regional carriers</li>
            </ul>

            <div className="rounded-lg p-4 border" style={{ background: 'rgba(255,255,255,0.04)', borderColor: 'rgba(255,255,255,0.08)' }}>
              <h3 className="font-semibold mb-2" style={{ color: '#F4F6FA' }}>SMS Data Protection Statement</h3>
              <p className="mb-2">
                No mobile information will be shared with third parties/affiliates for marketing/promotional purposes. Information sharing to subcontractors in support services, such as customer service is permitted. All other use case categories exclude text messaging originator opt-in data and consent; this information will not be shared with any third parties.
              </p>
              <p>We implement strict data protection measures to safeguard your SMS opt-in information and consent records.</p>
            </div>
          </section>

          {/* Section 4 */}
          <section>
            <h2 className="text-lg font-bold mb-4" style={{ color: '#FFFFFF' }}>4. Information Sharing &amp; Disclosure</h2>
            <p className="mb-4">We do not sell, rent, or trade personal information. We may share information with:</p>

            <h3 className="font-semibold mb-2" style={{ color: '#F4F6FA' }}>Service Providers:</h3>
            <ul className="list-disc pl-6 space-y-1 mb-4">
              <li>Third-party vendors who assist in our operations (e.g., payment processing, appointment scheduling)</li>
              <li>SMS aggregators and providers solely for the purpose of delivering messages you've consented to receive</li>
              <li>All service providers are contractually obligated to maintain confidentiality and security</li>
            </ul>

            <h3 className="font-semibold mb-2" style={{ color: '#F4F6FA' }}>Legal Compliance:</h3>
            <ul className="list-disc pl-6 space-y-1 mb-4">
              <li>If required by law, legal process, or to protect our rights</li>
              <li>In response to valid law enforcement requests or court orders</li>
            </ul>

            <h3 className="font-semibold mb-2" style={{ color: '#F4F6FA' }}>Business Transfers:</h3>
            <ul className="list-disc pl-6 space-y-1 mb-4">
              <li>In case of mergers, acquisitions, or sale of assets</li>
              <li>In such cases, your data remains protected under the terms of this policy</li>
            </ul>

            <p className="italic" style={{ color: '#94a3b8' }}>
              All the above categories exclude text messaging originator opt-in data and consent; this information will not be shared with any third parties, excluding aggregators and providers of the Text Message services.
            </p>
          </section>

          {/* Section 5 */}
          <section>
            <h2 className="text-lg font-bold mb-4" style={{ color: '#FFFFFF' }}>5. Data Security</h2>
            <p className="mb-3">We implement and maintain reasonable security measures to protect your personal information:</p>
            <ul className="list-disc pl-6 space-y-1 mb-4">
              <li>Encryption of sensitive data in transit and at rest</li>
              <li>Secure access controls and authentication mechanisms</li>
              <li>Regular security assessments and updates</li>
              <li>Employee training on data protection</li>
              <li>Breach notification protocols in accordance with applicable laws</li>
              <li>Secure backup systems and disaster recovery procedures</li>
            </ul>
            <p>Despite these measures, no method of transmission over the Internet or electronic storage is 100% secure. We strive to use commercially acceptable means to protect your personal information but cannot guarantee absolute security.</p>
          </section>

          {/* Section 6 */}
          <section>
            <h2 className="text-lg font-bold mb-4" style={{ color: '#FFFFFF' }}>6. Cookies &amp; Tracking Technologies</h2>
            <p className="mb-3">We use cookies and similar technologies to:</p>
            <ul className="list-disc pl-6 space-y-1 mb-4">
              <li>Analyze site traffic and user behavior</li>
              <li>Remember your preferences</li>
              <li>Improve website functionality and user experience</li>
              <li>Measure the effectiveness of our services</li>
            </ul>
            <p>You may control cookies through your browser settings. Disabling cookies may limit your ability to use certain features of our website.</p>
          </section>

          {/* Section 7 */}
          <section>
            <h2 className="text-lg font-bold mb-4" style={{ color: '#FFFFFF' }}>7. Your Rights &amp; Choices</h2>
            <p className="mb-3">You have the right to:</p>
            <ul className="list-disc pl-6 space-y-1 mb-4">
              <li>Access, update, or delete your personal information</li>
              <li>Opt-out of marketing emails by clicking "unsubscribe" in our emails</li>
              <li>Opt-out of SMS messages by replying "STOP"</li>
              <li>Request information on how we process your data</li>
              <li>Withdraw consent at any time for future communications</li>
              <li>Lodge a complaint with a supervisory authority if you believe your rights have been violated</li>
            </ul>
            <p>To exercise these rights, please contact us using the information in Section 10.</p>
          </section>

          {/* Section 8 */}
          <section>
            <h2 className="text-lg font-bold mb-4" style={{ color: '#FFFFFF' }}>8. Third-Party Links</h2>
            <p>Our website may contain links to third-party websites. We are not responsible for their privacy practices and encourage you to review their policies. This privacy policy applies only to information collected by LifeHealthInc.</p>
          </section>

          {/* Section 9 */}
          <section>
            <h2 className="text-lg font-bold mb-4" style={{ color: '#FFFFFF' }}>9. Changes to This Privacy Policy</h2>
            <p>We may update this policy periodically. The latest version will always be available on our website with the effective date. For significant changes, we will notify you by email or through a notice on our website.</p>
          </section>

          {/* Section 10 */}
          <section>
            <h2 className="text-lg font-bold mb-4" style={{ color: '#FFFFFF' }}>10. Contact Us</h2>
            <p className="mb-4">If you have questions about this Privacy Policy or how your information is handled, contact us at:</p>
            <div className="rounded-xl p-5 border" style={{ background: 'rgba(255,255,255,0.05)', borderColor: 'rgba(255,255,255,0.1)' }}>
              <p className="font-bold text-base mb-3" style={{ color: '#FFFFFF' }}>LifeHealthInc</p>
              <p className="mb-1"><span style={{ color: '#94a3b8' }}>Phone:</span> <a href="tel:9545430853" style={{ color: '#60a5fa' }}>(954) 543-0853</a></p>
              <p className="mb-1"><span style={{ color: '#94a3b8' }}>Email:</span> <a href="mailto:info@lifehealthinc.org" style={{ color: '#60a5fa' }}>info@lifehealthinc.org</a></p>
              <p><span style={{ color: '#94a3b8' }}>Website:</span> <a href="https://lifehealthinc.org" style={{ color: '#60a5fa' }}>lifehealthinc.org</a></p>
            </div>
          </section>

          {/* Footer consent line */}
          <div className="pt-4 border-t text-center" style={{ borderColor: 'rgba(255,255,255,0.1)', color: '#64748b' }}>
            <p>By using our website and services, you consent to this Privacy Policy.</p>
          </div>

        </div>
      </div>
    </div>
  );
}

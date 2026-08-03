export default function TermsPage() {
  return (
    <div className="min-h-screen" style={{ background: '#0D1B3E' }}>
      <div className="max-w-4xl mx-auto px-6 py-16">

        {/* Header */}
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-bold mb-2" style={{ color: '#FFFFFF' }}>Terms of Service</h1>
          <p className="text-sm" style={{ color: '#94a3b8' }}>Effective Date: January 1st, 2026</p>
        </div>

        <div className="space-y-10 text-sm leading-relaxed" style={{ color: '#cbd5e1' }}>

          {/* SMS Section */}
          <section>
            <h2 className="text-xl font-bold mb-6" style={{ color: '#FFFFFF' }}>SMS Messaging Terms &amp; Compliance</h2>

            <div className="space-y-5">
              <div>
                <h3 className="font-semibold mb-2" style={{ color: '#F4F6FA' }}>1. Program Description</h3>
                <p>
                  This messaging program sends appointment confirmation and reminder messages to customers who have booked an appointment with LifeHealthInc through our website at lifehealthinc.org, or via our scheduling forms, and have explicitly opted in to receive SMS notifications. Opt-in is collected via web forms with a dedicated checkbox for SMS consent. Messages include scheduling confirmations, appointment reminders, rescheduling updates, and customer support communications.
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-2" style={{ color: '#F4F6FA' }}>2. Cancellation Instructions</h3>
                <p>
                  You can cancel the SMS service at any time. Simply text "STOP" to the same number that sent you messages. Upon sending "STOP," we will confirm your unsubscribe status via SMS. Following this confirmation, you will no longer receive SMS messages from us. To rejoin, sign up as you did initially, and we will resume sending SMS messages to you.
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-2" style={{ color: '#F4F6FA' }}>3. Support Information</h3>
                <p>
                  If you experience issues with the messaging program, reply with the keyword "HELP" for more assistance, or reach out directly to{' '}
                  <a href="mailto:info@lifehealthinc.org" style={{ color: '#60a5fa' }}>info@lifehealthinc.org</a>{' '}
                  or call{' '}
                  <a href="tel:9545430853" style={{ color: '#60a5fa' }}>(954) 543-0853</a>{' '}
                  during business hours.
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-2" style={{ color: '#F4F6FA' }}>4. Carrier Liability</h3>
                <p>Carriers are not liable for delayed or undelivered messages.</p>
              </div>

              <div>
                <h3 className="font-semibold mb-2" style={{ color: '#F4F6FA' }}>5. Message &amp; Data Rates</h3>
                <p>
                  Message and data rates may apply for messages sent to you from us and to us from you. Message frequency varies based on your service usage and appointment schedule. For questions about your text plan or data plan, contact your wireless provider.
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-2" style={{ color: '#F4F6FA' }}>6. Supported Carriers</h3>
                <p>Our SMS program works with all major U.S. wireless carriers, including AT&amp;T, T-Mobile, Verizon, Sprint, and most regional carriers.</p>
              </div>

              <div>
                <h3 className="font-semibold mb-2" style={{ color: '#F4F6FA' }}>7. Age Restriction</h3>
                <p>You must be 18 years or older to participate in our SMS program.</p>
              </div>

              <div>
                <h3 className="font-semibold mb-2" style={{ color: '#F4F6FA' }}>8. Privacy Policy</h3>
                <p>
                  For privacy-related inquiries, please refer to our Privacy Policy at{' '}
                  <a href="https://lifehealthinc.org/privacy-policy" style={{ color: '#60a5fa' }}>lifehealthinc.org/privacy-policy</a>
                </p>
              </div>

              <div className="rounded-lg p-4 border" style={{ background: 'rgba(255,255,255,0.04)', borderColor: 'rgba(255,255,255,0.08)' }}>
                <p>
                  We comply with all applicable laws and regulations, including the Telephone Consumer Protection Act (TCPA) and CTIA guidelines, regarding the use of SMS communications.
                </p>
              </div>
            </div>
          </section>

          <hr style={{ borderColor: 'rgba(255,255,255,0.1)' }} />

          {/* General Terms */}
          <section>
            <h2 className="text-xl font-bold mb-6" style={{ color: '#FFFFFF' }}>General Terms</h2>
            <p className="mb-4">
              This website (the "Site") is owned and operated by LifeHealthInc ("COMPANY," "we" or "us"). By using the Site, you agree to be bound by these Terms of Service and to use the Site in accordance with these Terms of Service, our Privacy Policy, and any additional terms and conditions that may apply to specific sections of the Site or to products and services available through the Site or from LifeHealthInc.
            </p>
            <p className="mb-4">
              Accessing the Site, in any manner, whether automated or otherwise, constitutes use of the Site and your agreement to be bound by these Terms of Service.
            </p>
            <p>
              We reserve the right to change these Terms of Service or to impose new conditions on the use of the Site from time to time, in which case we will post the revised Terms of Service on this website. By continuing to use the Site after we post any such changes, you accept the Terms of Service, as modified.
            </p>
          </section>

          <hr style={{ borderColor: 'rgba(255,255,255,0.1)' }} />

          {/* Intellectual Property */}
          <section>
            <h2 className="text-xl font-bold mb-6" style={{ color: '#FFFFFF' }}>Intellectual Property Rights</h2>

            <h3 className="font-semibold mb-2" style={{ color: '#F4F6FA' }}>Our Limited License to You</h3>
            <p className="mb-4">
              This Site and all the materials available on the Site are the property of LifeHealthInc and/or our affiliates or licensors and are protected by copyright, trademark, and other intellectual property laws. The Site is provided solely for your personal non-commercial use.
            </p>
            <p className="mb-4">
              You may not use the Site or the materials available on the Site in a manner that constitutes an infringement of our rights or that has not been authorized by us.
            </p>
            <p className="mb-6">
              Unless explicitly authorized, you may not modify, copy, reproduce, republish, upload, post, transmit, translate, sell, create derivative works, exploit, or distribute in any manner or medium any material from the Site. However, you may download and/or print one copy of individual pages for your personal, non-commercial use, provided that you keep intact all copyright and other proprietary notices.
            </p>

            <h3 className="font-semibold mb-2" style={{ color: '#F4F6FA' }}>Your License to Us</h3>
            <p>
              By posting or submitting any material (including comments, blog entries, social media posts, photos, and videos) to us via the Site, internet groups, or other digital venues, you represent that you own the material or have obtained the necessary permissions. You grant us a royalty-free, perpetual, irrevocable, non-exclusive, worldwide license to use, modify, transmit, sell, exploit, create derivative works from, distribute, and publicly perform or display such material.
            </p>
          </section>

          <hr style={{ borderColor: 'rgba(255,255,255,0.1)' }} />

          {/* Disclaimers */}
          <section>
            <h2 className="text-xl font-bold mb-4" style={{ color: '#FFFFFF' }}>Disclaimers</h2>
            <p className="mb-4">
              Throughout the Site, we may provide links and pointers to Internet sites maintained by third parties. Our linking to such third-party sites does not imply an endorsement or sponsorship of such sites or the information, products, or services offered on or through the sites.
            </p>
            <p className="mb-4">
              The information, products, and services offered on or through the Site are provided "as is" and without warranties of any kind, either express or implied. To the fullest extent permissible pursuant to applicable law, we disclaim all warranties, including implied warranties of merchantability and fitness for a particular purpose.
            </p>
            <p>
              You agree at all times to indemnify and hold harmless LifeHealthInc, its affiliates, and their respective officers, directors, agents, and employees from any claims, causes of action, damages, liabilities, costs, and expenses arising out of or related to your breach of any obligation, warranty, or representation under these Terms of Service.
            </p>
          </section>

          <hr style={{ borderColor: 'rgba(255,255,255,0.1)' }} />

          {/* Online Commerce */}
          <section>
            <h2 className="text-xl font-bold mb-4" style={{ color: '#FFFFFF' }}>Online Commerce</h2>
            <p className="mb-4">
              Certain sections of the Site may allow you to purchase products and services from third-party vendors. We are not responsible for the quality, accuracy, timeliness, reliability, or any other aspect of these products and services. If you make a purchase from a third party linked through the Site, the information obtained during your visit, including payment information, may be collected by both the merchant and us.
            </p>
            <p>
              Your participation in any dealings with third-party vendors is solely between you and the third party. LifeHealthInc shall not be responsible for any loss or damage incurred as a result of such dealings.
            </p>
          </section>

          <hr style={{ borderColor: 'rgba(255,255,255,0.1)' }} />

          {/* Registration */}
          <section>
            <h2 className="text-xl font-bold mb-4" style={{ color: '#FFFFFF' }}>Registration &amp; Passwords</h2>
            <p className="mb-4">
              To access certain features of the Site, you may be required to register and create an account. You agree to provide accurate, current, and complete information during the registration process. You are responsible for maintaining the confidentiality of your login credentials and for all activities conducted under your account.
            </p>
            <p>
              If you suspect unauthorized use of your account, notify us immediately at{' '}
              <a href="mailto:info@lifehealthinc.org" style={{ color: '#60a5fa' }}>info@lifehealthinc.org</a>.
              {' '}We are not liable for any loss or damage arising from your failure to comply with this obligation.
            </p>
          </section>

          <hr style={{ borderColor: 'rgba(255,255,255,0.1)' }} />

          {/* Termination */}
          <section>
            <h2 className="text-xl font-bold mb-4" style={{ color: '#FFFFFF' }}>Termination</h2>
            <p>
              We reserve the right to terminate or suspend your access to the Site, without notice, if we determine that you have violated these Terms of Service or engaged in conduct that we deem inappropriate or unlawful. Upon termination, you must cease all use of the Site and any content obtained from it.
            </p>
          </section>

          <hr style={{ borderColor: 'rgba(255,255,255,0.1)' }} />

          {/* Governing Law */}
          <section>
            <h2 className="text-xl font-bold mb-4" style={{ color: '#FFFFFF' }}>Governing Law</h2>
            <p>
              These Terms of Service shall be governed by and construed in accordance with the laws of the state in which LifeHealthInc operates. Any dispute arising under these Terms shall be resolved exclusively through binding arbitration in that jurisdiction.
            </p>
          </section>

          <hr style={{ borderColor: 'rgba(255,255,255,0.1)' }} />

          {/* Changes */}
          <section>
            <h2 className="text-xl font-bold mb-4" style={{ color: '#FFFFFF' }}>Changes to Terms of Service</h2>
            <p className="mb-6">
              We may update these Terms of Service from time to time. The latest version will always be available on our website with the effective date.
            </p>
            <p className="mb-4">For any questions regarding these Terms of Service, please contact us at:</p>
            <div className="rounded-xl p-5 border" style={{ background: 'rgba(255,255,255,0.05)', borderColor: 'rgba(255,255,255,0.1)' }}>
              <p className="font-bold text-base mb-3" style={{ color: '#FFFFFF' }}>LifeHealthInc</p>
              <p className="mb-1"><span style={{ color: '#94a3b8' }}>Phone:</span> <a href="tel:9545430853" style={{ color: '#60a5fa' }}>(954) 543-0853</a></p>
              <p className="mb-1"><span style={{ color: '#94a3b8' }}>Email:</span> <a href="mailto:info@lifehealthinc.org" style={{ color: '#60a5fa' }}>info@lifehealthinc.org</a></p>
              <p><span style={{ color: '#94a3b8' }}>Website:</span> <a href="https://lifehealthinc.org" style={{ color: '#60a5fa' }}>lifehealthinc.org</a></p>
            </div>
          </section>

          {/* Footer */}
          <div className="pt-4 border-t text-center" style={{ borderColor: 'rgba(255,255,255,0.1)', color: '#64748b' }}>
            <p>By using our website and services, you consent to these Terms of Service.</p>
          </div>

        </div>
      </div>
    </div>
  );
}
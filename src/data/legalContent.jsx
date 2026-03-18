import React from 'react';

export const policies = {
    privacy: {
        title: "Privacy Policy",
        content: (
            <div className="space-y-6 text-[#5C5C5C]">
                <section>
                    <h4 className="text-primary-dark font-bold mb-2">1. Information Collection</h4>
                    <p>We collect information you provide directly to us when you create an account, make a purchase, or sign up for our newsletter. This may include your name, email address, phone number, and payment information.</p>
                </section>
                <section>
                    <h4 className="text-primary-dark font-bold mb-2">2. Use of Information</h4>
                    <p>We use the information we collect to provide, maintain, and improve our services, process your transactions, and communicate with you about products and offers.</p>
                </section>
                <section>
                    <h4 className="text-primary-dark font-bold mb-2">3. Data Protection</h4>
                    <p>We implement a variety of security measures to maintain the safety of your personal information. Your personal data is contained behind secured networks and is only accessible by a limited number of persons who have special access rights.</p>
                </section>
                <section>
                    <h4 className="text-primary-dark font-bold mb-2">4. Cookies</h4>
                    <p>We use cookies to enhance your experience, gather general visitor information, and track visits to our website. You can choose to have your computer warn you each time a cookie is being sent.</p>
                </section>
            </div>
        )
    },
    terms: {
        title: "Terms of Use / Terms & Conditions",
        content: (
            <div className="space-y-6 text-[#5C5C5C]">
                <section>
                    <h4 className="text-primary-dark font-bold mb-2">1. Acceptance of Terms</h4>
                    <p>By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement.</p>
                </section>
                <section>
                    <h4 className="text-primary-dark font-bold mb-2">2. Product Information</h4>
                    <p>We attempt to be as accurate as possible with our product descriptions. However, we do not warrant that product descriptions or other content is accurate, complete, reliable, current, or error-free.</p>
                </section>
                <section>
                    <h4 className="text-primary-dark font-bold mb-2">3. User Conduct</h4>
                    <p>You agree not to use the website for any purpose that is unlawful or prohibited by these Terms. You may not use the website in any manner that could damage, disable, or impair the site.</p>
                </section>
                <section>
                    <h4 className="text-primary-dark font-bold mb-2">4. Governing Law</h4>
                    <p>Any claim relating to The Africa Tea Company website shall be governed by the laws of Ghana without regard to its conflict of law provisions.</p>
                </section>
            </div>
        )
    },
    disclaimer: {
        title: "Disclaimer",
        content: (
            <div className="space-y-6 text-[#5C5C5C]">
                <section>
                    <h4 className="text-primary-dark font-bold mb-2">1. Health Information</h4>
                    <p>The information provided on this website is for informational purposes only and is not intended as a substitute for advice from your physician or other health care professional.</p>
                </section>
                <section>
                    <h4 className="text-primary-dark font-bold mb-2">2. Natural Variations</h4>
                    <p>As our products are natural, there may be variations in color, taste, and aroma between batches. These variations do not affect the quality or efficacy of the product.</p>
                </section>
                <section>
                    <h4 className="text-primary-dark font-bold mb-2">3. Limitation of Liability</h4>
                    <p>In no event shall The Africa Tea Company be liable for any direct, indirect, special, punitive, incidental, or consequential damages arising out of your use of this website.</p>
                </section>
            </div>
        )
    },
    cookies: {
        title: "Cookie Policy",
        content: (
            <div className="space-y-6 text-[#5C5C5C]">
                <section>
                    <h4 className="text-primary-dark font-bold mb-2">1. What Are Cookies</h4>
                    <p>Cookies are small text files that are stored on your computer or mobile device when you visit our website. They are widely used to make websites work more efficiently and provide a better user experience.</p>
                </section>
                <section>
                    <h4 className="text-primary-dark font-bold mb-2">2. How We Use Cookies</h4>
                    <p>We use cookies for essential site functionality, such as remembering your shopping cart items and login status. We also use analytical cookies to help us understand how visitors use our site, and marketing cookies to provide relevant offers.</p>
                </section>
                <section>
                    <h4 className="text-primary-dark font-bold mb-2">3. Types of Cookies We Use</h4>
                    <ul className="list-disc pl-5 space-y-2">
                        <li><strong>Essential Cookies:</strong> Required for basic site operations.</li>
                        <li><strong>Analytical Cookies:</strong> Help us improve site performance by tracking usage patterns.</li>
                        <li><strong>Functional Cookies:</strong> Remember your preferences (like language or region).</li>
                    </ul>
                </section>
                <section>
                    <h4 className="text-primary-dark font-bold mb-2">4. Your Choices</h4>
                    <p>Most web browsers allow you to control cookies through their settings. However, if you limit the ability of websites to set cookies, you may worsen your overall user experience or lose access to certain features.</p>
                </section>
            </div>
        )
    }
};

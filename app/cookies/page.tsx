import SectionHeader from "@/components/shared/SectionHeader";

export const metadata = {
  title: "Cookie Policy | SLEDMC Recruitment",
  description: "Information about how cookies are used on the SLEDMC Recruitment website.",
};

export default function CookiesPage() {
  return (
    <div>
      <section style={{ background: "linear-gradient(160deg, #0A1628 0%, #112240 100%)", padding: "130px 0 70px" }}>
        <div className="container">
          <SectionHeader
            label="Digital Privacy"
            title="Cookie Policy"
            subtitle="How we use cookies to improve your browsing experience."
            center
            light
          />
        </div>
      </section>

      <section className="section bg-white">
        <div className="container-narrow" style={{ display: "flex", flexDirection: "column", gap: 24, lineHeight: 1.7, color: "var(--gray-700)" }}>
          <h2 style={{ color: "var(--navy)" }}>1. What Are Cookies</h2>
          <p>Cookies are small text files stored on your browser to enhance site performance, remember preferences, and analyze website traffic.</p>

          <h2 style={{ color: "var(--navy)" }}>2. How We Use Cookies</h2>
          <p>We use essential cookies to enable smooth site navigation, search functionality, and secure application form submissions.</p>
        </div>
      </section>
    </div>
  );
}

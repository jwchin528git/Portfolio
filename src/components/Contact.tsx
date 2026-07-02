import Reveal from "./Reveal";
import Footer from "./Footer";

export default function Contact() {
  return (
    <section id="contact" className="section" style={{ padding: "80px 48px 40px" }}>
      <Reveal className="contact-card">
        <div className="contact-inner">
          <div className="contact-kicker">Open transmission</div>
          <h2 className="contact-title">Let's build something.</h2>
          <p className="contact-copy">
            Have a product idea or a tool your business needs? I take on
            freelance projects — let's talk.
          </p>
          <div className="contact-actions">
            <a href="mailto:cjwchin528@gmail.com" className="btn btn-primary">
              cjwchin528@gmail.com
            </a>
            <a
              href="https://www.linkedin.com/in/jia-wen-chin-a9721b255"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ghost"
            >
              LinkedIn ↗
            </a>
            <a
              href="/Jia-Wen-Chin-Resume.pdf"
              download="Jia-Wen-Chin-Resume.pdf"
              className="btn btn-ghost"
            >
              Resume &darr; 
            </a>
          </div>
        </div>
      </Reveal>
      <Footer />
    </section>
  );
}

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Reveal from "./Reveal";
import ImageSlot from "./ImageSlot";

interface ProjectImage {
  src: string;
  alt: string;
  label: string;
  orientation?: "desktop" | "mobile";
}

interface Project {
  no: string;
  path: string;
  placeholder: string;
  title: string;
  meta: string;
  desc: string;
  tags: string[];
  flip?: boolean;
  images?: ProjectImage[];
}

const schoolImages: ProjectImage[] = [
  {
    src: new URL("../../assets/School Management Platform/ttb dashboard.png", import.meta.url).href,
    alt: "School Management Platform dashboard screen",
    label: "Dashboard",
    orientation: "desktop",
  },
  {
    src: new URL("../../assets/School Management Platform/ttb lesson.png", import.meta.url).href,
    alt: "School Management Platform lessons calendar screen",
    label: "Lessons",
    orientation: "desktop",
  },
  {
    src: new URL("../../assets/School Management Platform/ttb invoice.png", import.meta.url).href,
    alt: "School Management Platform invoices and payments screen",
    label: "Invoices",
    orientation: "desktop",
  },
  {
    src: new URL("../../assets/School Management Platform/ttb inventory.png", import.meta.url).href,
    alt: "School Management Platform inventory screen",
    label: "Inventory",
    orientation: "desktop",
  },
  {
    src: new URL("../../assets/School Management Platform/ttb parent.png", import.meta.url).href,
    alt: "School Management Platform parent app home screen",
    label: "Parent app",
    orientation: "mobile",
  },
  {
    src: new URL("../../assets/School Management Platform/ttb parent1.png", import.meta.url).href,
    alt: "School Management Platform parent app schedule screen",
    label: "Schedule",
    orientation: "mobile",
  },
];

const businessImages: ProjectImage[] = [
  {
    src: new URL("../../assets/FSG/fsg1_fixed.png", import.meta.url).href,
    alt: "Business Web Application member search screen",
    label: "Find member",
    orientation: "desktop",
  },
  {
    src: new URL("../../assets/FSG/fsg2_fixed.png", import.meta.url).href,
    alt: "Business Web Application member profile screen",
    label: "Member profile",
    orientation: "desktop",
  },
  {
    src: new URL("../../assets/FSG/fsg4_fixed.png", import.meta.url).href,
    alt: "Business Web Application add member screen",
    label: "Add member",
    orientation: "desktop",
  },
];

const PROJECTS: Project[] = [
  {
    no: "01",
    path: "school-platform / admin",
    placeholder: "Dashboard / app screenshot",
    title: "School Management Platform",
    meta: "EdTech SaaS · one backend, four apps",
    desc: "A single backend powering four connected apps: an admin web dashboard, a parent and student app, a teacher app, and an admin mobile app. Handles enrollment, scheduling, and communication across every role.",
    tags: ["Flutter", "Laravel", "PostgreSQL", "REST API"],
    images: schoolImages,
  },
  {
    no: "02",
    path: "business-app / members",
    placeholder: "Business app screenshot",
    title: "Business Web Application",
    meta: "Client project · system integration",
    desc: "A third-party web application integrated with a main enterprise system. Clean tools for business users to manage member data, points, and redemptions: reliable enough to run day to day.",
    tags: ["Flutter", "Java"],
    flip: true,
    images: businessImages,
  },
];

function Chrome({
  path,
  placeholder,
  images,
  onOpen,
}: {
  path: string;
  placeholder: string;
  images?: ProjectImage[];
  onOpen?: () => void;
}) {
  const heroImage = images?.[0];

  return (
    <div className="work-img">
      <div className="work-chrome">
        <span className="dot-r" />
        <span className="dot-y" />
        <span className="dot-g" />
        <span className="work-path">{path}</span>
      </div>
      <div className="work-preview">
        <ImageSlot
          placeholder={placeholder}
          src={heroImage?.src}
          alt={heroImage?.alt ?? ""}
          height={320}
        />
        {images && images.length > 1 && (
          <button className="gallery-open" type="button" onClick={onOpen}>
            View gallery
            <span>{images.length} screens</span>
          </button>
        )}
      </div>
    </div>
  );
}

function Text({ p }: { p: Project }) {
  return (
    <div className="work-text">
      <div className="work-no">{p.no}</div>
      <h3 className="work-title">{p.title}</h3>
      <div className="work-meta">{p.meta}</div>
      <p className="work-desc">{p.desc}</p>
      <div className="tag-row">
        {p.tags.map((t) => <span key={t} className="tag">{t}</span>)}
      </div>
    </div>
  );
}

function ProjectGallery({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  const images = project.images ?? [];
  const [active, setActive] = useState(0);
  const activeImage = images[active];

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowRight") setActive((value) => (value + 1) % images.length);
      if (event.key === "ArrowLeft") setActive((value) => (value - 1 + images.length) % images.length);
    };

    document.body.classList.add("modal-open");
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.classList.remove("modal-open");
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [images.length, onClose]);

  if (!activeImage) return null;

  return createPortal(
    <div className="gallery-modal" role="dialog" aria-modal="true" aria-label={`${project.title} gallery`}>
      <button className="gallery-backdrop" type="button" aria-label="Close gallery" onClick={onClose} />
      <div className="gallery-shell">
        <div className="gallery-head">
          <div>
            <div className="gallery-kicker">{project.path}</div>
            <h3>{project.title}</h3>
          </div>
          <button className="gallery-close" type="button" onClick={onClose} aria-label="Close gallery">
            Close
          </button>
        </div>

        <div className={`gallery-stage ${activeImage.orientation === "mobile" ? "mobile-shot" : ""}`}>
          <img src={activeImage.src} alt={activeImage.alt} />
        </div>

        <div className="gallery-foot">
          <div>
            <div className="gallery-count">
              {String(active + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}
            </div>
            <div className="gallery-label">{activeImage.label}</div>
          </div>
          <div className="gallery-thumbs" aria-label="Gallery thumbnails">
            {images.map((image, index) => (
              <button
                key={image.label}
                className={`gallery-thumb${index === active ? " active" : ""}`}
                type="button"
                onClick={() => setActive(index)}
                aria-label={`Show ${image.label}`}
              >
                <img src={image.src} alt="" />
                <span>{image.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}

export default function Projects() {
  const [galleryProject, setGalleryProject] = useState<Project | null>(null);

  return (
    <section id="work" className="section">
      <Reveal className="sec-head" style={{ marginBottom: 54 }}>
        <div>
          <div className="sec-index">02 — Selected work</div>
          <h2 className="sec-title">Things I've coded</h2>
        </div>
        <div className="sec-note">From database to interface — owned end to end.</div>
      </Reveal>

      {PROJECTS.map((p) => (
        <Reveal key={p.no} className={`work-row${p.flip ? " flip" : ""}`}>
          <Chrome
            path={p.path}
            placeholder={p.placeholder}
            images={p.images}
            onOpen={() => setGalleryProject(p)}
          />
          <Text p={p} />
        </Reveal>
      ))}

      {galleryProject && (
        <ProjectGallery project={galleryProject} onClose={() => setGalleryProject(null)} />
      )}
    </section>
  );
}

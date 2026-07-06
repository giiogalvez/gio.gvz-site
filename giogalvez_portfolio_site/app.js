const safeSetHash = (hash) => {
  try { history.replaceState(null, "", hash); } catch (_) {}
};

document.addEventListener("DOMContentLoaded", () => {
  const links = Array.from(document.querySelectorAll(".nav-link"));
  const panels = Array.from(document.querySelectorAll(".panel"));

  const setActive = (id, replace = true) => {
    links.forEach(link => {
      link.classList.toggle("active", link.getAttribute("href") === "#" + id);
    });
    if (replace) safeSetHash("#" + id);
  };

  let activeId = panels[0]?.id || "home";

  const observer = new IntersectionObserver((entries) => {
    const visible = entries
      .filter(entry => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

    if (!visible) return;

    const id = visible.target.id;
    if (id === activeId) return;

    activeId = id;
    setActive(id, true);
  }, {
    root: null,
    threshold: 0.25,
    rootMargin: "-72px 0px -40% 0px"
  });

  panels.forEach(panel => observer.observe(panel));

  links.forEach(link => {
    link.addEventListener("click", (event) => {
      event.preventDefault();

      const href = link.getAttribute("href");
      const target = document.querySelector(href);
      if (!target) return;

      target.scrollIntoView({ behavior: "smooth", block: "start" });

      const id = href.slice(1);
      activeId = id;
      setActive(id, false);

      try { history.pushState(null, "", href); } catch (_) {}
    });
  });

  if (location.hash) {
    const start = document.querySelector(location.hash);
    if (start) {
      start.scrollIntoView({ behavior: "auto", block: "start" });
      setActive(location.hash.slice(1), false);
    }
  }

  const timelineData = {
    usmc: {
      title: "Security Manager & Intelligence Analyst",
      description:
        "Oversaw clearance and security compliance for 1,100+ service members, delivered security briefings, and maintained operational readiness. Performed intelligence collection and multi-source threat assessments, conducted OSINT/SIPR research supporting tactical planning and decision-making, and supervised UAS operations during ISR missions."
    },
    raytheon: {
      title: "Industrial Security Analyst",
      description:
        "Managed security operations aligned with NISPOM (32 CFR Part 117) and government security policies. Controlled classified documents and secure handling for more than 5,500 sensitive materials. Implemented security policy and personnel access management, provided risk mitigation strategies and compliance, and utilized intrusion detection systems and access management tools to enhance security monitoring."
    },
    triadic: {
      title: "Cybersecurity Threat & Network Analyst",
      description:
        "Designed and implemented network infrastructure with multiple VLANs for client isolation, guest access and administrative control. Configured open source router firmware and physical firewalls to manage DHCP relay, firewall rules, NAT and DMZ isolation. Coordinated rack-mounted equipment and created policy documentation aligned with NIST frameworks and ISO/IEC 27001."
    }
  };

  const jobTitleEl = document.getElementById("job-title");
  const jobDescEl = document.getElementById("job-description");
  const timelineButtons = Array.from(document.querySelectorAll(".timeline-btn"));

  timelineButtons.forEach(button => {
    button.addEventListener("click", () => {
      const data = timelineData[button.dataset.role];
      if (!data || !jobTitleEl || !jobDescEl) return;

      timelineButtons.forEach(btn => {
        btn.classList.remove("active");
        btn.setAttribute("aria-selected", "false");
      });

      button.classList.add("active");
      button.setAttribute("aria-selected", "true");

      jobTitleEl.textContent = data.title;
      jobDescEl.textContent = data.description;
    });
  });

  const contactForm = document.getElementById("contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const name = contactForm.name.value.trim();
      const email = contactForm.email.value.trim();
      const message = contactForm.message.value.trim();

      if (!name || !email || !message) {
        alert("Please fill out all fields before sending your message.");
        return;
      }

      alert("Thanks for your message! I look forward to speaking with you!");
      contactForm.reset();
    });
  }
});

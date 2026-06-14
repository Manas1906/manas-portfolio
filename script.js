// --- DOM Content Loaded ---
document.addEventListener("DOMContentLoaded", () => {
  initMobileMenu();
  initTypingEffect();
  initArchitectureTabs();
  initApiConsole();
  initSmoothScroll();
});

// --- Mobile Navigation Menu ---
function initMobileMenu() {
  const toggle = document.getElementById("menu-toggle");
  const navLinks = document.getElementById("nav-links");

  if (toggle && navLinks) {
    toggle.addEventListener("click", () => {
      toggle.classList.toggle("open");
      navLinks.classList.toggle("show");
    });

    // Close menu when links are clicked
    document.querySelectorAll("#nav-links a").forEach((link) => {
      link.addEventListener("click", () => {
        toggle.classList.remove("open");
        navLinks.classList.remove("show");
      });
    });
  }
}

// --- Smooth Scrolling for Hashes ---
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");
      if (targetId === "#") return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        targetElement.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      }
    });
  });
}

// --- Dynamic Role Typing Animation ---
function initTypingEffect() {
  const roles = [
    "Java Backend Developer",
    "Spring Boot Specialist",
    "REST API Engineer",
    "MySQL & Hibernate Developer"
  ];
  
  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const typedElement = document.getElementById("typed");
  
  if (!typedElement) return;

  function type() {
    const currentRole = roles[roleIndex];
    
    if (isDeleting) {
      typedElement.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typedElement.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
    }

    let typingSpeed = isDeleting ? 40 : 80;

    if (!isDeleting && charIndex === currentRole.length) {
      // Pause at full word
      typingSpeed = 1500;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      // Pause before typing next word
      typingSpeed = 400;
    }

    setTimeout(type, typingSpeed);
  }

  // Start typing
  type();
}

// --- System Architecture Tabs ---
function initArchitectureTabs() {
  const tabs = document.querySelectorAll(".arch-tab");
  const panes = document.querySelectorAll(".arch-pane");

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      // Remove active from all tabs & panes
      tabs.forEach((t) => t.classList.remove("active"));
      panes.forEach((p) => p.classList.remove("active"));

      // Add active to current
      tab.classList.add("active");
      const targetId = `${tab.getAttribute("data-tab")}-pane`;
      const targetPane = document.getElementById(targetId);
      if (targetPane) {
        targetPane.classList.add("active");
      }
    });
  });
}

// --- REST API Explorer Client ---
function initApiConsole() {
  const endpoints = document.querySelectorAll(".endpoint-item");
  const methodInd = document.getElementById("console-method");
  const urlInput = document.getElementById("console-url");
  const sendBtn = document.getElementById("console-send");
  const statusInd = document.getElementById("console-status");
  const loader = document.getElementById("console-loader");
  const jsonOutput = document.querySelector("#console-json-output code");
  const formContainer = document.getElementById("mock-form-container");

  // Simulated Endpoint Repositories
  const mockDatabase = {
    "/api/v1/profile": {
      "name": "Manas Acharya",
      "title": "Java Backend Developer",
      "experience": "1+ Years",
      "location": "India",
      "contact": {
        "email": "manasacharya051@gmail.com",
        "linkedin": "https://www.linkedin.com/in/acharya-manas",
        "github": "https://github.com/Manas1906"
      },
      "summary": "Focusing on Spring Boot services, microservices authentication patterns, and database scaling."
    },
    "/api/v1/skills": {
      "languages": ["Java SE/EE", "SQL", "JavaScript", "HTML/CSS"],
      "frameworks": ["Spring Boot", "Spring Data JPA", "Spring Security", "Hibernate ORM", "JUnit"],
      "databases": ["MySQL", "PostgreSQL", "Redis Cache"],
      "tools": ["Git & GitHub", "Maven Build Tool", "Docker Containerization", "Postman APIs", "Netlify"]
    },
    "/api/v1/projects": [
      {
        "id": 1,
        "name": "AllReach Campus",
        "role": "Lead Backend Engineer",
        "stack": ["Java", "Spring Boot", "MySQL", "JWT Auth", "Maven"],
        "highlights": [
          "Developed stateless authorization filter using JWT verification",
          "Engineered bulk document managers and file mapping schemas",
          "Created modular PDF/Excel transaction summary exporter engines"
        ]
      },
      {
        "id": 2,
        "name": "All Veg Application",
        "role": "Java Developer",
        "stack": ["Spring Boot", "Hibernate ORM", "JPA Repository", "MySQL"],
        "highlights": [
          "Designed hierarchical domain mapping tables for farmers/managers",
          "Managed data normalization constraints for document storage tables",
          "Wrote index-optimized custom JPA database fetch specifications"
        ]
      },
      {
        "id": 3,
        "name": "Employee Attendance System",
        "role": "Backend Architect",
        "stack": ["Java SE", "MySQL Database", "Spring REST Schedulers"],
        "highlights": [
          "Integrated automated daily check-in cron scripts",
          "Optimized relational query lookups reducing admin dashboard load times",
          "Secured HTTP request channels mapping clean controller mappings"
        ]
      }
    ]
  };

  let activeEndpoint = "/api/v1/profile";
  let activeMethod = "GET";

  // Endpoint item selection
  endpoints.forEach((item) => {
    item.addEventListener("click", () => {
      endpoints.forEach((e) => e.classList.remove("active"));
      item.classList.add("active");

      activeMethod = item.getAttribute("data-method");
      activeEndpoint = item.getAttribute("data-path");

      // Update Header Display
      methodInd.textContent = activeMethod;
      methodInd.className = `method-indicator ${activeMethod.toLowerCase()}`;
      urlInput.value = `https://manasacharya.in${activeEndpoint}`;

      // Reset Output
      statusInd.textContent = "Status: ---";
      statusInd.style.color = "hsl(var(--text-secondary))";
      jsonOutput.textContent = `// Click 'Send Request' to query ${activeEndpoint}`;

      // Toggle form panel visibility based on method type
      if (activeMethod === "POST") {
        formContainer.style.display = "block";
        jsonOutput.parentNode.style.display = "none";
      } else {
        formContainer.style.display = "none";
        jsonOutput.parentNode.style.display = "block";
      }
    });
  });

  // Execute Request Button Handler
  sendBtn.addEventListener("click", () => {
    // Show Loading Panel
    loader.style.flexDirection = "column";
    loader.style.display = "flex";

    setTimeout(() => {
      loader.style.display = "none";
      statusInd.textContent = "Status: 200 OK";
      statusInd.style.color = "#98c379";

      if (activeMethod === "GET") {
        // Retrieve and format database content
        const resBody = mockDatabase[activeEndpoint];
        jsonOutput.textContent = JSON.stringify(resBody, null, 2);

      } else if (activeMethod === "POST" && activeEndpoint === "/api/v1/contact") {
        // Read form inputs
        const nameInput = document.getElementById("api-name");
        const emailInput = document.getElementById("api-email");
        const msgInput = document.getElementById("api-message");

        if (!nameInput.value || !emailInput.value || !msgInput.value) {
          statusInd.textContent = "Status: 400 Bad Request";
          statusInd.style.color = "#e06c75";
          
          formContainer.style.display = "block";
          jsonOutput.parentNode.style.display = "block";
          
          jsonOutput.textContent = JSON.stringify({
            "timestamp": new Date().toISOString(),
            "status": 400,
            "error": "Bad Request",
            "message": "Validation Failed: name, email, and message fields must not be empty.",
            "path": "/api/v1/contact"
          }, null, 2);
          return;
        }

        // Send actual payload to Netlify forms via AJAX
        const formData = new URLSearchParams();
        formData.append("form-name", "contact");
        formData.append("name", nameInput.value);
        formData.append("email", emailInput.value);
        formData.append("message", msgInput.value);

        fetch("/", {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: formData.toString()
        })
        .then(() => {
          // Output request response payload
          statusInd.textContent = "Status: 201 Created";
          statusInd.style.color = "#98c379";
          
          formContainer.style.display = "none";
          jsonOutput.parentNode.style.display = "block";

          const successResponse = {
            "status": 201,
            "message": "Message received successfully. Transaction committed to DB.",
            "transactionId": `tx-${Math.random().toString(36).substr(2, 9)}-jpa`,
            "timestamp": new Date().toISOString(),
            "payloadTransmitted": {
              "name": nameInput.value,
              "email": emailInput.value,
              "message": msgInput.value
            }
          };

          jsonOutput.textContent = JSON.stringify(successResponse, null, 2);
          
          // Reset the form fields
          nameInput.value = "";
          emailInput.value = "";
          msgInput.value = "";
        })
        .catch(err => {
          statusInd.textContent = "Status: 500 Internal Server Error";
          statusInd.style.color = "#e06c75";
          
          formContainer.style.display = "block";
          jsonOutput.parentNode.style.display = "block";
          
          jsonOutput.textContent = JSON.stringify({
            "timestamp": new Date().toISOString(),
            "status": 500,
            "error": "Internal Server Error",
            "message": "Failed to transmit message: " + err.message,
            "path": "/api/v1/contact"
          }, null, 2);
        });
      }
    }, 600); // 600ms latency simulation
  });
}

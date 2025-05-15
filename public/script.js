document.addEventListener("DOMContentLoaded", () => {
  // Mobile Navigation
  const hamburger = document.getElementById("hamburger")
  const navLinks = document.getElementById("navLinks")

  if (hamburger) {
    hamburger.addEventListener("click", () => {
      navLinks.classList.toggle("active")
    })
  }

  // Close mobile menu when clicking outside
  document.addEventListener("click", (e) => {
    if (navLinks && navLinks.classList.contains("active") && !e.target.closest(".navbar")) {
      navLinks.classList.remove("active")
    }
  })

  // Theme Toggle
  const themeToggle = document.getElementById("theme-toggle")
  const htmlElement = document.documentElement

  // Check for saved theme preference
  const savedTheme = localStorage.getItem("theme")
  if (savedTheme) {
    htmlElement.setAttribute("data-theme", savedTheme)
    updateThemeIcon(savedTheme)
  }

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const currentTheme = htmlElement.getAttribute("data-theme") || "dark"
      const newTheme = currentTheme === "dark" ? "light" : "dark"

      htmlElement.setAttribute("data-theme", newTheme)
      localStorage.setItem("theme", newTheme)

      updateThemeIcon(newTheme)
    })
  }

  function updateThemeIcon(theme) {
    if (!themeToggle) return

    const icon = themeToggle.querySelector("i")
    if (theme === "light") {
      icon.className = "fas fa-moon"
    } else {
      icon.className = "fas fa-sun"
    }
  }

  // Market Tabs
  const tabBtns = document.querySelectorAll(".tab-btn")
  const marketPanels = document.querySelectorAll(".market-panel")

  tabBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const market = btn.getAttribute("data-market")

      // Update active tab
      tabBtns.forEach((b) => b.classList.remove("active"))
      btn.classList.add("active")

      // Show corresponding panel
      marketPanels.forEach((panel) => {
        panel.classList.remove("active")
        if (panel.id === market) {
          panel.classList.add("active")
        }
      })
    })
  })

  // Newsletter Form
  const newsletterForm = document.getElementById("newsletter-form")
  const newsletterMessage = document.getElementById("newsletter-message")

  if (newsletterForm) {
    newsletterForm.addEventListener("submit", (e) => {
      e.preventDefault()
      const email = newsletterForm.querySelector("input").value

      // Simulate form submission
      newsletterMessage.innerHTML =
        '<div class="success-message">Thank you for subscribing! You will receive our updates soon.</div>'

      // Reset form
      newsletterForm.reset()

      // Clear success message after 5 seconds
      setTimeout(() => {
        newsletterMessage.innerHTML = ""
      }, 5000)
    })
  }

  // Sidebar Toggle for Charts Page
  const sidebarToggle = document.getElementById("sidebarToggle")
  const sidebar = document.getElementById("sidebar")
  const chartWidget = window.chartWidget // Declare chartWidget variable

  if (sidebarToggle && sidebar) {
    // Check for saved sidebar state
    const sidebarState = localStorage.getItem("sidebarCollapsed")
    if (sidebarState === "true") {
      sidebar.classList.add("collapsed")
      updateSidebarToggleIcon(true)
    }

    sidebarToggle.addEventListener("click", () => {
      const isCollapsed = sidebar.classList.toggle("collapsed")
      localStorage.setItem("sidebarCollapsed", isCollapsed)
      updateSidebarToggleIcon(isCollapsed)
    })
  }

  function updateSidebarToggleIcon(isCollapsed) {
    if (!sidebarToggle) return

    const icon = sidebarToggle.querySelector("i")
    if (isCollapsed) {
      icon.className = "fas fa-chevron-right"
    } else {
      icon.className = "fas fa-chevron-left"
    }
  }

  // Add mobile sidebar toggle for charts page
  if (sidebar) {
    const mobileToggle = document.createElement("button")
    mobileToggle.className = "mobile-sidebar-toggle"
    mobileToggle.innerHTML = '<i class="fas fa-bars"></i>'
    document.querySelector(".chart-content")?.prepend(mobileToggle)

    mobileToggle.addEventListener("click", () => {
      sidebar.classList.toggle("active")
    })

    // Close sidebar when clicking outside on mobile
    document.addEventListener("click", (e) => {
      if (
        window.innerWidth <= 768 &&
        sidebar.classList.contains("active") &&
        !e.target.closest(".sidebar") &&
        !e.target.closest(".mobile-sidebar-toggle")
      ) {
        sidebar.classList.remove("active")
      }
    })
  }

  // Chart resize handler
  function handleChartResize() {
    const chartContainer = document.getElementById("tradingview_chart")
    if (chartContainer && chartWidget) {
      chartWidget.resize(chartContainer.clientWidth, chartContainer.clientHeight)
    }
  }

  // Add resize event listener
  window.addEventListener("resize", handleChartResize)

  // Add a function to toggle mobile sidebar
  function setupMobileSidebar() {
    const sidebar = document.getElementById("sidebar")
    if (!sidebar) return

    // Create mobile toggle button if it doesn't exist
    if (!document.querySelector(".mobile-sidebar-toggle")) {
      const mobileToggle = document.createElement("button")
      mobileToggle.className = "mobile-sidebar-toggle"
      mobileToggle.innerHTML = '<i class="fas fa-bars"></i>'
      document.body.appendChild(mobileToggle)

      mobileToggle.addEventListener("click", () => {
        sidebar.classList.toggle("active")
      })
    }

    // Close sidebar when clicking outside on mobile
    document.addEventListener("click", (e) => {
      if (
        window.innerWidth <= 768 &&
        sidebar.classList.contains("active") &&
        !e.target.closest(".sidebar") &&
        !e.target.closest(".mobile-sidebar-toggle")
      ) {
        sidebar.classList.remove("active")
      }
    })
  }

  setupMobileSidebar()
})

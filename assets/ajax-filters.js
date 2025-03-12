class AjaxFilters {
    constructor() {
      this.form = document.querySelector("[data-filter-form]");
      this.resultsContainer = document.querySelector("[data-product-grid]");
      this.bindEvents();
    }
  
    bindEvents() {
      this.form.addEventListener("change", this.debounce(this.handleFilter.bind(this), 300));
    }
  
    async handleFilter() {
      const formData = new FormData(this.form);
      const searchParams = new URLSearchParams(formData).toString();
      
      try {
        const response = await fetch(`${window.location.pathname}?${searchParams}&section_id=main-product-grid`);
        const html = await response.text();
        this.resultsContainer.innerHTML = this.extractProductGrid(html);
        history.replaceState({}, "", `?${searchParams}`);
      } catch (error) {
        console.error("Filter error:", error);
      }
    }
  
    extractProductGrid(html) {
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, "text/html");
      return doc.querySelector("[data-product-grid]").innerHTML;
    }
  
    debounce(fn, delay) {
      let timeout;
      return (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => fn.apply(this, args), delay);
      };
    }
  }
  
  document.addEventListener("DOMContentLoaded", () => {
    if (document.querySelector("[data-filter-form]")) {
      new AjaxFilters();
    }
  });
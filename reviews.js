(function () {
  "use strict";

  const ALLOWED_PHOTO_TYPES = new Set(["image/jpeg", "image/png", "image/webp"]);
  const state = {
    page: 1,
    reviews: [],
    hasMore: false,
    totalApproved: 0,
    averageRating: null,
    uiState: "idle",
    initialized: false,
    submitting: false
  };
  const elements = {};

  function translate(key) {
    const value = window.SiteI18n?.translate(`reviews.${key}`);
    return typeof value === "string" ? value : key;
  }

  function interpolate(template, values) {
    return Object.entries(values).reduce(
      (result, [key, value]) => result.replaceAll(`{${key}}`, String(value)),
      template
    );
  }

  function reviewConfig() {
    return SITE_CONFIG.reviews || {};
  }

  function functionUrl(kind) {
    const config = reviewConfig();
    const explicit = kind === "list" ? config.listFunctionUrl : config.submitFunctionUrl;
    if (typeof explicit === "string" && explicit.trim()) return explicit.trim();

    const projectUrl = SITE_CONFIG.supabase?.projectUrl?.trim().replace(/\/+$/, "");
    const functionName = kind === "list" ? config.listFunctionName : config.submitFunctionName;
    return projectUrl && functionName
      ? `${projectUrl}/functions/v1/${encodeURIComponent(functionName)}`
      : "";
  }

  function requestHeaders() {
    const anonKey = SITE_CONFIG.supabase?.anonKey?.trim();
    return anonKey ? { apikey: anonKey } : {};
  }

  function isConfigured() {
    return Boolean(functionUrl("list") && functionUrl("submit") && SITE_CONFIG.supabase?.anonKey?.trim());
  }

  function setListState(kind) {
    state.uiState = kind;
    renderListState();
  }

  function renderListState() {
    if (!elements.listState) return;
    const keyByState = {
      loading: "loading",
      empty: "empty",
      error: "error",
      unavailable: "unavailable"
    };
    const key = keyByState[state.uiState];
    elements.listState.hidden = !key;
    elements.listState.className = `reviews-state reviews-state--${state.uiState}`;
    elements.listState.setAttribute("role", state.uiState === "error" ? "alert" : "status");
    elements.listStateText.textContent = key ? translate(key) : "";
    elements.retry.hidden = state.uiState !== "error";
    elements.retry.textContent = window.SiteI18n?.translate("buttons.retry") || "Tentar novamente";
  }

  function validPhotoUrl(value) {
    if (typeof value !== "string" || !value) return "";
    try {
      const url = new URL(value, window.location.href);
      return url.protocol === "https:" || url.protocol === "http:" ? url.href : "";
    } catch (error) {
      return "";
    }
  }

  function normalizeReview(review) {
    const rating = Number(review?.rating);
    if (!review || typeof review.name !== "string" || typeof review.comment !== "string" || !Number.isFinite(rating)) return null;
    return {
      id: String(review.id || crypto.randomUUID?.() || `${Date.now()}-${Math.random()}`),
      name: review.name.trim().slice(0, 80),
      rating: Math.max(1, Math.min(5, Math.round(rating))),
      comment: review.comment.trim().slice(0, reviewConfig().maxCommentLength || 400),
      createdAt: typeof review.createdAt === "string" ? review.createdAt : "",
      photoUrl: validPhotoUrl(review.photoUrl)
    };
  }

  function formatDate(value) {
    if (!value) return "";
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "";
    const locale = window.SiteI18n?.getLanguage() === "ja" ? "ja-JP" : "pt-BR";
    return new Intl.DateTimeFormat(locale, { year: "numeric", month: "long" }).format(date);
  }

  function createStars(rating) {
    const stars = document.createElement("span");
    stars.className = "review-card__stars";
    stars.setAttribute("role", "img");
    stars.setAttribute("aria-label", interpolate(translate("cardRating"), { rating }));
    stars.textContent = `${"★".repeat(rating)}${"☆".repeat(5 - rating)}`;
    return stars;
  }

  function createReviewCard(review) {
    const article = document.createElement("article");
    article.className = "review-card";
    article.dataset.reviewId = review.id;

    const header = document.createElement("header");
    header.className = "review-card__header";

    const identity = document.createElement("div");
    identity.className = "review-card__identity";
    const avatar = document.createElement("span");
    avatar.className = "review-card__avatar";
    avatar.setAttribute("aria-hidden", "true");
    if (review.photoUrl) {
      const avatarImage = document.createElement("img");
      avatarImage.src = review.photoUrl;
      avatarImage.alt = "";
      avatarImage.loading = "lazy";
      avatarImage.decoding = "async";
      avatar.appendChild(avatarImage);
    } else {
      avatar.textContent = review.name.charAt(0).toLocaleUpperCase() || "•";
    }
    const name = document.createElement("h3");
    name.textContent = review.name;
    identity.append(avatar, name);

    const meta = document.createElement("div");
    meta.className = "review-card__meta";
    meta.appendChild(createStars(review.rating));
    const formattedDate = formatDate(review.createdAt);
    if (formattedDate) {
      const time = document.createElement("time");
      time.dateTime = review.createdAt;
      time.textContent = formattedDate;
      meta.appendChild(time);
    }
    header.append(identity, meta);

    const comment = document.createElement("p");
    comment.textContent = review.comment;
    article.append(header, comment);

    return article;
  }

  function renderReviews() {
    if (!elements.list) return;
    elements.list.replaceChildren(...state.reviews.map(createReviewCard));
  }

  function renderSummary() {
    if (!elements.average || !elements.summaryText) return;

    let average = Number(state.averageRating);
    let count = Number(state.totalApproved);
    let usesGlobalSummary = Number.isFinite(average) && count > 0;

    if (!usesGlobalSummary && state.reviews.length) {
      average = state.reviews.reduce((sum, review) => sum + review.rating, 0) / state.reviews.length;
      count = state.reviews.length;
    }

    if (!Number.isFinite(average) || count < 1) {
      elements.average.textContent = "—";
      elements.summaryText.textContent = translate("summaryEmpty");
      return;
    }

    const rounded = average.toFixed(1).replace(".", window.SiteI18n?.getLanguage() === "pt" ? "," : ".");
    elements.average.textContent = rounded;
    const key = usesGlobalSummary
      ? (count === 1 ? "summaryAllOne" : "summaryAll")
      : (count === 1 ? "summaryLoadedOne" : "summaryLoaded");
    elements.summaryText.textContent = interpolate(translate(key), { average: rounded, count });
  }

  function renderLoadMore() {
    if (!elements.loadMore) return;
    elements.loadMore.hidden = !state.hasMore || state.uiState === "loading";
    elements.loadMore.disabled = state.uiState === "loading";
    elements.loadMore.textContent = window.SiteI18n?.translate("buttons.loadMore") || "Carregar mais avaliações";
  }

  async function readJson(response) {
    try { return await response.json(); }
    catch (error) { return null; }
  }

  async function loadReviews(page = 1) {
    if (!isConfigured()) {
      state.reviews = [];
      state.totalApproved = 0;
      state.averageRating = null;
      renderReviews();
      renderSummary();
      setListState("unavailable");
      renderLoadMore();
      return;
    }

    setListState("loading");
    renderLoadMore();

    try {
      const pageSize = reviewConfig().pageSize || 6;
      const separator = functionUrl("list").includes("?") ? "&" : "?";
      const url = `${functionUrl("list")}${separator}page=${page}&limit=${pageSize}`;
      const response = await fetch(url, { headers: requestHeaders() });
      const payload = await readJson(response);
      if (!response.ok || !payload || !Array.isArray(payload.reviews)) throw new Error("reviews_fetch_failed");

      const incoming = payload.reviews.map(normalizeReview).filter(Boolean);
      state.page = page;
      state.reviews = page === 1 ? incoming : [...state.reviews, ...incoming];
      state.hasMore = Boolean(payload.pagination?.hasMore);
      state.totalApproved = Number(payload.summary?.totalApproved ?? payload.pagination?.total ?? 0);
      state.averageRating = payload.summary?.averageRating == null ? null : Number(payload.summary.averageRating);

      renderReviews();
      renderSummary();
      setListState(state.reviews.length ? "idle" : "empty");
      renderLoadMore();
    } catch (error) {
      console.warn("Não foi possível carregar as avaliações.", error);
      if (page === 1) {
        state.reviews = [];
        renderReviews();
        renderSummary();
      }
      setListState("error");
      renderLoadMore();
    }
  }

  function setFormStatus(kind, message) {
    elements.formStatus.className = `review-status review-status--${kind}`;
    elements.formStatus.textContent = message;
    elements.formStatus.setAttribute("role", kind === "error" ? "alert" : "status");
  }

  function clearCustomValidity() {
    elements.form.querySelectorAll("input, textarea").forEach((field) => field.setCustomValidity(""));
  }

  function invalidate(field, key) {
    const message = translate(`validation.${key}`);
    field.setCustomValidity(message);
    field.focus();
    field.reportValidity();
    setFormStatus("error", message);
    return false;
  }

  function validateForm() {
    clearCustomValidity();
    const name = elements.form.elements.name;
    const email = elements.form.elements.email;
    const rating = elements.form.querySelector('input[name="rating"]:checked');
    const comment = elements.form.elements.comment;
    const consent = elements.form.elements.consent;
    const photo = elements.form.elements.photo.files[0];

    if (name.value.trim().length < 2) return invalidate(name, "name");
    if (!email.validity.valid) return invalidate(email, "email");
    if (!rating) return invalidate(elements.form.querySelector('input[name="rating"]'), "rating");
    if (comment.value.trim().length < 10 || comment.value.trim().length > (reviewConfig().maxCommentLength || 400)) {
      return invalidate(comment, "comment");
    }
    if (!consent.checked) return invalidate(consent, "consent");
    if (photo && photo.size > (reviewConfig().maxPhotoBytes || 2 * 1024 * 1024)) return invalidate(elements.form.elements.photo, "photoSize");
    if (photo && !ALLOWED_PHOTO_TYPES.has(photo.type)) return invalidate(elements.form.elements.photo, "photoType");
    return true;
  }

  function setSubmitting(submitting) {
    state.submitting = submitting;
    elements.submit.disabled = submitting || !isConfigured();
    elements.form.setAttribute("aria-busy", String(submitting));
    elements.submit.textContent = submitting
      ? translate("sending")
      : (window.SiteI18n?.translate("buttons.sendReview") || "Enviar avaliação");
  }

  async function submitReview(event) {
    event.preventDefault();
    if (state.submitting) return;
    if (!isConfigured()) {
      setFormStatus("error", translate("unavailable"));
      return;
    }
    if (!validateForm()) return;

    if (elements.form.elements.website.value) {
      elements.form.reset();
      setFormStatus("success", translate("success"));
      return;
    }

    const formData = new FormData(elements.form);
    formData.set("name", elements.form.elements.name.value.trim());
    formData.set("email", elements.form.elements.email.value.trim());
    formData.set("comment", elements.form.elements.comment.value.trim());
    formData.set("consent", "true");
    if (!elements.form.elements.photo.files.length) formData.delete("photo");

    setSubmitting(true);
    setFormStatus("pending", translate("sending"));

    try {
      const response = await fetch(functionUrl("submit"), {
        method: "POST",
        headers: requestHeaders(),
        body: formData
      });
      const payload = await readJson(response);
      if (!response.ok || payload?.success !== true) throw new Error(payload?.error?.code || "review_submit_failed");

      elements.form.reset();
      elements.characterCount.textContent = `0 / ${reviewConfig().maxCommentLength || 400}`;
      elements.photoSelection.textContent = "";
      setFormStatus("success", translate("success"));
    } catch (error) {
      console.warn("Não foi possível enviar a avaliação.", error);
      setFormStatus("error", translate("validation.generic"));
    } finally {
      setSubmitting(false);
    }
  }

  function updateCharacterCount() {
    const current = elements.form.elements.comment.value.length;
    elements.characterCount.textContent = `${current} / ${reviewConfig().maxCommentLength || 400}`;
  }

  function updatePhotoSelection() {
    const file = elements.form.elements.photo.files[0];
    elements.photoSelection.textContent = file
      ? interpolate(translate("photoSelected"), { name: file.name })
      : "";
  }

  function updateDynamicLanguage() {
    if (!state.initialized) return;
    elements.ratingLabels.forEach((label) => {
      label.setAttribute("aria-label", interpolate(translate("ratingAria"), { rating: label.dataset.rating }));
    });
    renderReviews();
    renderSummary();
    renderListState();
    renderLoadMore();
    updatePhotoSelection();
    setSubmitting(state.submitting);
  }

  function setupReviews() {
    const section = document.getElementById("avaliacoes");
    if (!section) return;

    Object.assign(elements, {
      list: document.getElementById("reviews-list"),
      listState: document.getElementById("reviews-state"),
      listStateText: document.getElementById("reviews-state-text"),
      retry: document.getElementById("reviews-retry"),
      loadMore: document.getElementById("reviews-load-more"),
      average: document.getElementById("reviews-average"),
      summaryText: document.getElementById("reviews-summary-text"),
      form: document.getElementById("review-form"),
      formStatus: document.getElementById("review-status"),
      submit: document.getElementById("review-submit"),
      characterCount: document.getElementById("review-character-count"),
      photoSelection: document.getElementById("review-photo-selection"),
      ratingLabels: [...section.querySelectorAll(".rating-input label")]
    });

    state.initialized = true;
    elements.form.addEventListener("submit", submitReview);
    elements.retry.addEventListener("click", () => loadReviews(1));
    elements.loadMore.addEventListener("click", () => loadReviews(state.page + 1));
    elements.form.elements.comment.addEventListener("input", updateCharacterCount);
    elements.form.elements.photo.addEventListener("change", updatePhotoSelection);
    elements.form.querySelectorAll("input, textarea").forEach((field) => {
      field.addEventListener("input", () => field.setCustomValidity(""));
      field.addEventListener("change", () => field.setCustomValidity(""));
    });

    if (!isConfigured()) {
      elements.submit.disabled = true;
      setFormStatus("error", translate("unavailable"));
    }

    updateDynamicLanguage();
    updateCharacterCount();
    loadReviews(1);
  }

  document.addEventListener("DOMContentLoaded", setupReviews);
  document.addEventListener("site:languagechange", updateDynamicLanguage);
  window.SiteReviews = { reload: () => loadReviews(1) };
})();

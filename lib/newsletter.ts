const DJANGO_API_URL =
  process.env.DJANGO_API_URL ??
  process.env.NEXT_PUBLIC_DJANGO_API_URL ??
  "http://127.0.0.1:8000/api";

const DJANGO_NEWSLETTER_SUBSCRIBE_URL =
  process.env.DJANGO_NEWSLETTER_SUBSCRIBE_URL ??
  process.env.NEWSLETTER_SUBSCRIBE_URL;

type NewsletterResponse = Record<string, unknown>;
const NEWSLETTER_REQUEST_TIMEOUT_MS = 8000;
type NewsletterRequestCandidate = {
  body: BodyInit;
  headers: Record<string, string>;
};

function getApiOrigin() {
  return new URL(DJANGO_API_URL).origin;
}

function normalizeUrl(path: string) {
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }

  return `${getApiOrigin()}${path.startsWith("/") ? path : `/${path}`}`;
}

function getSubscribeCandidates() {
  if (DJANGO_NEWSLETTER_SUBSCRIBE_URL) {
    return [normalizeUrl(DJANGO_NEWSLETTER_SUBSCRIBE_URL)];
  }

  return [];
}

function getPayloadCandidates(email: string): NewsletterRequestCandidate[] {
  const payloads = [
    { email },
    { email, subscribed: true },
    { subscriber_email: email },
  ];

  return payloads.flatMap((payload) => {
    const formData = new URLSearchParams();

    for (const [key, value] of Object.entries(payload)) {
      formData.set(key, String(value));
    }

    return [
      {
        body: JSON.stringify(payload),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      },
      {
        body: formData.toString(),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
        },
      },
    ];
  });
}

function getStringValue(payload: NewsletterResponse, keys: string[]) {
  for (const key of keys) {
    const value = payload[key];

    if (typeof value === "string" && value.trim().length > 0) {
      return value.trim();
    }
  }

  return undefined;
}

function getErrorMessage(payload: unknown) {
  if (!payload || typeof payload !== "object") {
    return "Unable to subscribe right now. Please try again.";
  }

  const record = payload as Record<string, unknown>;
  const directMessage = getStringValue(record, [
    "detail",
    "message",
    "error",
    "non_field_errors",
  ]);

  if (directMessage) {
    return directMessage;
  }

  for (const [key, value] of Object.entries(record)) {
    if (Array.isArray(value) && typeof value[0] === "string") {
      return `${key}: ${value[0]}`;
    }

    if (typeof value === "string" && value.trim().length > 0) {
      return `${key}: ${value.trim()}`;
    }

    if (value && typeof value === "object" && !Array.isArray(value)) {
      const nestedMessage = getErrorMessage(value);

      if (nestedMessage !== "Unable to subscribe right now. Please try again.") {
        return `${key}: ${nestedMessage}`;
      }
    }
  }

  return "Unable to subscribe right now. Please try again.";
}

function getSuccessMessage(payload: NewsletterResponse | null) {
  if (!payload) {
    return "Thanks for subscribing. Please check your email for confirmation.";
  }

  return (
    getStringValue(payload, ["detail", "message", "success"]) ??
    "Thanks for subscribing. Please check your email for confirmation."
  );
}

export async function subscribeToNewsletter(email: string) {
  const normalizedEmail = email.trim().toLowerCase();

  if (!normalizedEmail || !normalizedEmail.includes("@")) {
    throw new Error("Enter a valid email address.");
  }

  const endpoints = getSubscribeCandidates();
  const payloads = getPayloadCandidates(normalizedEmail);
  let lastErrorMessage =
    "Set DJANGO_NEWSLETTER_SUBSCRIBE_URL in your .env to the Django newsletter endpoint.";

  if (endpoints.length === 0) {
    throw new Error(lastErrorMessage);
  }

  for (const endpoint of endpoints) {
    for (const payload of payloads) {
      let response: Response;
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), NEWSLETTER_REQUEST_TIMEOUT_MS);

      try {
        response = await fetch(endpoint, {
          method: "POST",
          headers: payload.headers,
          body: payload.body,
          cache: "no-store",
          signal: controller.signal,
        });
      } catch (error) {
        lastErrorMessage =
          error instanceof Error && error.name === "AbortError"
            ? `The Django newsletter endpoint at ${endpoint} took too long to respond.`
            : error instanceof Error
              ? `Unable to reach Django newsletter endpoint at ${endpoint}. ${error.message}`
              : `Unable to reach Django newsletter endpoint at ${endpoint}.`;
        continue;
      } finally {
        clearTimeout(timeoutId);
      }

      let responseData: NewsletterResponse | null = null;

      try {
        responseData = (await response.json()) as NewsletterResponse;
      } catch {
        responseData = null;
      }

      if (response.ok) {
        return {
          email: normalizedEmail,
          message: getSuccessMessage(responseData),
        };
      }

      if (response.status === 404 || response.status === 405) {
        continue;
      }

      lastErrorMessage = getErrorMessage(responseData);

      if (response.status === 400 || response.status === 409) {
        continue;
      }
    }
  }

  throw new Error(lastErrorMessage);
}

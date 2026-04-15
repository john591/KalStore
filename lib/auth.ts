const DJANGO_API_URL =
  process.env.NEXT_PUBLIC_DJANGO_API_URL ??
  process.env.DJANGO_API_URL ??
  "http://127.0.0.1:8000/api";

const DJANGO_AUTH_LOGIN_URL = process.env.NEXT_PUBLIC_DJANGO_AUTH_LOGIN_URL;

export type AuthUser = {
  id?: number;
  email?: string;
  username?: string;
  firstName?: string;
  lastName?: string;
  [key: string]: unknown;
};

export type LoginResult = {
  accessToken?: string;
  refreshToken?: string;
  user: AuthUser;
};

type DjangoAuthResponse = Record<string, unknown>;

function getApiOrigin() {
  return new URL(DJANGO_API_URL).origin;
}

function normalizePath(path: string) {
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }

  return `${getApiOrigin()}${path.startsWith("/") ? path : `/${path}`}`;
}

function getLoginCandidates() {
  if (DJANGO_AUTH_LOGIN_URL) {
    return [normalizePath(DJANGO_AUTH_LOGIN_URL)];
  }

  return [
    `${getApiOrigin()}/api/auth/login/`,
    `${getApiOrigin()}/auth/login/`,
    `${getApiOrigin()}/api/token/`,
    `${getApiOrigin()}/api/token/pair/`,
  ];
}

function getPayloadCandidates(email: string, password: string) {
  return [
    { email, password },
    { username: email, password },
    { email, username: email, password },
  ];
}

function getStringValue(payload: DjangoAuthResponse, keys: string[]) {
  for (const key of keys) {
    const value = payload[key];

    if (typeof value === "string" && value.length > 0) {
      return value;
    }
  }

  return undefined;
}

function getUserFromPayload(payload: DjangoAuthResponse, email: string): AuthUser {
  const nestedUser = payload.user;

  if (nestedUser && typeof nestedUser === "object" && !Array.isArray(nestedUser)) {
    const userRecord = nestedUser as Record<string, unknown>;

    return {
      ...userRecord,
      id: typeof userRecord.id === "number" ? userRecord.id : undefined,
      email: typeof userRecord.email === "string" ? userRecord.email : email,
      username:
        typeof userRecord.username === "string" ? userRecord.username : undefined,
      firstName:
        typeof userRecord.first_name === "string"
          ? userRecord.first_name
          : typeof userRecord.firstName === "string"
            ? userRecord.firstName
            : undefined,
      lastName:
        typeof userRecord.last_name === "string"
          ? userRecord.last_name
          : typeof userRecord.lastName === "string"
            ? userRecord.lastName
            : undefined,
    };
  }

  return {
    email,
    username: getStringValue(payload, ["username"]),
    firstName: getStringValue(payload, ["first_name", "firstName"]),
    lastName: getStringValue(payload, ["last_name", "lastName"]),
  };
}

function getErrorMessage(payload: unknown) {
  if (!payload || typeof payload !== "object") {
    return "Echec de la connexion. Veuillez vérifier vos identifiants.";
  }

  const record = payload as Record<string, unknown>;
  const directMessage = getStringValue(record, [
    "detail",
    "message",
    "error",
    "non_field_errors",
  ]);

  if (directMessage) {
    if (
      directMessage.includes("No active account found with the given credentials")
    ) {
      return "Aucun compte actif trouvé avec ces identifiants. Essayez votre nom d'utilisateur si l'email ne fonctionne pas.";
    }

    return directMessage;
  }

  for (const value of Object.values(record)) {
    if (Array.isArray(value) && typeof value[0] === "string") {
      return value[0];
    }
  }

  return "Echec de la connexion. Veuillez vérifier vos identifiants.";
}

export async function loginWithDjango(
  email: string,
  password: string,
): Promise<LoginResult> {
  const endpoints = getLoginCandidates();
  const payloads = getPayloadCandidates(email, password);
  let lastErrorMessage = "UVerifier vos connexion a la base de donnees.";

  for (const endpoint of endpoints) {
    for (const payload of payloads) {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      let responseData: DjangoAuthResponse | null = null;

      try {
        responseData = (await response.json()) as DjangoAuthResponse;
      } catch {
        responseData = null;
      }

      if (response.ok) {
        return {
          accessToken: responseData
            ? getStringValue(responseData, ["access", "token", "key"])
            : undefined,
          refreshToken: responseData
            ? getStringValue(responseData, ["refresh"])
            : undefined,
          user: getUserFromPayload(responseData ?? {}, email),
        };
      }

      if (response.status === 404 || response.status === 405) {
        continue;
      }

      lastErrorMessage = getErrorMessage(responseData);

      if (response.status === 400 || response.status === 401) {
        continue;
      }
    }
  }

  throw new Error(lastErrorMessage);
}

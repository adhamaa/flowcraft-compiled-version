/**
 * Array of routes which don't require authentication
 * These routes don't require authentication
 * @type {string[]}
 */
export const publicRoutes = ["/"];
export type PublicRoutes = typeof publicRoutes;
/**
 * An array of routes which are protected
 * These routes are protected and require authentication
 * @type {string[]}
 */
export const protectedRoutes = [
  ...(process.env.WITH_AUTH ? ["/cycle"] : []),
  "/profile",
  "/documentation",
  "/maintenance",
  "/manage-claim"
];
export type ProtectedRoutes = typeof protectedRoutes;
/**
 * An array of routes which are used for authentication
 * These routes used to redirect the authenticated users to the /settings
 * @type {string[]}
 */
export const authRoutes = ["/auth/signin", "/auth/signup"];
export type AuthRoutes = typeof authRoutes;

/**
 * A prefix for api authentication routes
 * Routes that start with this prefix are used for api authentication
 * @type {string}
 */
export const apiAuthPrefix = "/api/auth";
export type ApiAuthPrefix = typeof apiAuthPrefix;

export const DEFAULT_LOGIN_REDIRECT = "/cycle";
export type DefaultLoginRedirect = typeof DEFAULT_LOGIN_REDIRECT;
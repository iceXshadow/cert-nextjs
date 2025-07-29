import type { NextAuthConfig } from "next-auth";

export const authConfig = {
	providers: [], // Add your providers here, e.g., [GoogleProvider({...})]
	pages: {
		signIn: "/login",
	},
	callbacks: {
		authorized({ auth, request: { nextUrl } }) {
			const isLoggedIn = !!auth?.user;
			const isOnDashboard = nextUrl.pathname.startsWith("/dashboard");
			if (isOnDashboard) {
				if (isLoggedIn) return true;
				return false; // Redirect unauthenticated users to login page
			} else if (isLoggedIn) {
				return Response.redirect(new URL("/dashboard", nextUrl));
			}
			return true;
		},
	},
} satisfies NextAuthConfig;

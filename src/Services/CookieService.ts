export class CookieService {
	private readonly cookieName = 'userAuth';

	saveUser(userId: string, code: string): void {
		const data = JSON.stringify({ userId, code });
		const expires = new Date();
		expires.setFullYear(expires.getFullYear() + 1);
		document.cookie = `${this.cookieName}=${encodeURIComponent(
			data
		)}; expires=${expires.toUTCString()}; path=/`;
	}

	getUser(): { userId: string; code: string } | null {
		const cookies = document.cookie.split(';');
		const prefix = `${this.cookieName}=`;

		for (const cookie of cookies) {
			const trimmed = cookie.trim();
			if (trimmed.startsWith(prefix)) {
				try {
					const value = decodeURIComponent(trimmed.substring(prefix.length));
					const userData = JSON.parse(value) as {
						userId: string;
						code: string;
					};
					if (userData.userId && userData.code) {
						return userData;
					}
				} catch {
					return null;
				}
			}
		}

		return null;
	}

	clearUser(): void {
		document.cookie = `${this.cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
	}
}

/**
 * CookieService - сервис для работы с cookie
 *
 * Требование: объект класса CookieService должен быть доступен только объекту класса LogicService.
 *
 * Сохраняет данные пользователя (userId и PIN код) в cookie в формате JSON:
 * {"userId":"1289", "code": "2389"}
 */
export class CookieService {
	private readonly cookieName = 'userAuth';

	/**
	 * Сохраняет ID пользователя и PIN код в cookie
	 * @param userId - ID пользователя
	 * @param code - PIN код
	 */
	saveUser(userId: string, code: string): void {
		const userData = {
			userId: userId,
			code: code,
		};
		const jsonData = JSON.stringify(userData);

		// Устанавливаем cookie с максимальным сроком действия (1 год)
		const expirationDate = new Date();
		expirationDate.setFullYear(expirationDate.getFullYear() + 1);
		const expires = `expires=${expirationDate.toUTCString()}`;

		document.cookie = `${this.cookieName}=${encodeURIComponent(
			jsonData
		)}; ${expires}; path=/`;
	}

	/**
	 * Получает данные пользователя из cookie
	 * @returns объект с userId и code, или null если cookie не найдена
	 */
	getUser(): { userId: string; code: string } | null {
		const cookies = document.cookie.split(';');

		for (let i = 0; i < cookies.length; i++) {
			let cookie = cookies[i].trim();

			if (cookie.indexOf(this.cookieName + '=') === 0) {
				const cookieValue = cookie.substring(this.cookieName.length + 1);
				try {
					const decodedValue = decodeURIComponent(cookieValue);
					const userData = JSON.parse(decodedValue) as {
						userId: string;
						code: string;
					};

					if (userData.userId && userData.code) {
						return userData;
					}
				} catch (error) {
					console.error('Ошибка при парсинге cookie:', error);
					return null;
				}
			}
		}

		return null;
	}

	/**
	 * Удаляет cookie с данными пользователя
	 */
	clearUser(): void {
		// Удаляем cookie, устанавливая дату истечения в прошлом
		document.cookie = `${this.cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
	}
}

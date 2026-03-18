import { BROWSER } from 'esm-env';

type Language = 'hu' | 'en';

// Helper function to get initial language
function getInitialLanguage(): Language {
	if (!BROWSER) {
		return 'en'; // Default to English on the server
	}
	const savedLang = localStorage.getItem('app-language');
	if (savedLang === 'hu' || savedLang === 'en') {
		return savedLang as Language;
	}
	return 'en'; // Default to English
}

class LanguageManager {
	#current = $state<Language>(getInitialLanguage());

	get current() {
		return this.#current;
	}

	set current(value: Language) {
		this.#current = value;
		if (BROWSER) {
			localStorage.setItem('app-language', value);
		}
	}

	toggle = () => {
		this.current = this.current === 'hu' ? 'en' : 'hu';
	};
}

// Export a singleton instance
export const language = new LanguageManager();

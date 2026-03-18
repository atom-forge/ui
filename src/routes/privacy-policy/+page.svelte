<script lang="ts">
	import {Button} from "$lib";
	import {language} from "../../language.svelte";
	import DocSubtitle from "../../components/doc/DocSubtitle.svelte";
	import DocText from "../../components/doc/DocText.svelte";
	import DocTitle from "../../components/doc/DocTitle.svelte";

	const translations = {
		en: {
			title: 'Privacy Policy',
			intro: 'We inform you that our website uses cookies to ensure proper functioning and improve user experience. Cookies are divided into two groups based on their function:',
			section1Title: '1. Strictly Necessary Cookies',
			section1Text1: 'These cookies are technically necessary for you to browse the site and use its functions (e.g., maintaining session, secure login).',
			section1LegalBasis: 'Legal Basis: The Act on Electronic Commerce Services, and the legitimate interest of the Data Controller (GDPR Article 6(1)(f)).',
			section1Consent: 'Consent: Your prior consent is not required for the use of these cookies.',
			section2Title: '2. Statistical and Analytical Cookies (Google Analytics)',
			section2Text1: 'Our website uses Google Analytics to measure traffic and analyze user behavior. This data helps us improve the site\'s operation.',
			section2DataCollected: 'What data is collected? Anonymized IP address, browser type, visit duration, pages viewed.',
			section2Provider: 'Provider: Google Ireland Limited (Gordon House, Barrow Street, Dublin 4, Ireland).',
			section2LegalBasis: 'Legal Basis: Your voluntary, explicit consent (GDPR Article 6(1)(a)).',
			section2Operation: 'Operation: These cookies are only placed on your device if you have explicitly given permission for this in the pop-up window (Cookie Banner) ("Accept All").',
			section2DataTransfer: 'Data Transfer: When using Google Analytics, data may be transferred to servers located in the United States of America. Google ensures adequate protection of data. Details in Google\'s privacy policy: ',
			googlePrivacyPolicyLink: 'https://policies.google.com/privacy',
			withdrawalTitle: 'Withdrawal of Consent',
			withdrawalText: 'You have the right to withdraw your consent to statistical cookies at any time. You can do this by clicking on the \'Manage Cookie Preferences\' button below, where you can modify your preferences. Withdrawal does not affect the lawfulness of data processing carried out before the withdrawal.',
			manageCookiesButton: 'Manage Cookie Preferences',
			langSwitchLabel: 'Magyar'
		},
		hu: {
			title: 'Adatvédelmi Szabályzat',
			intro: 'Tájékoztatjuk, hogy weboldalunk a megfelelő működés és a felhasználói élmény javítása érdekében sütiket (cookie-kat) használ. A sütiket funkciójuk szerint két csoportra osztjuk:',
			section1Title: '1. Működéshez elengedhetetlen (Szükséges) sütik',
			section1Text1: 'Ezek a sütik technikailag szükségesek ahhoz, hogy Ön böngészhesse az oldalt és használhassa annak funkcióit (pl. munkamenet fenntartása, biztonságos bejelentkezés).',
			section1LegalBasis: 'Jogalap: Az elektronikus kereskedelmi szolgáltatásokról szóló törvény, valamint az Adatkezelő jogos érdeke (GDPR 6. cikk (1) bekezdés f) pont).',
			section1Consent: 'Hozzájárulás: Ezek használatához nem szükséges a felhasználó előzetes hozzájárulása.',
			section2Title: '2. Statisztikai és elemzési célú sütik (Google Analytics)',
			section2Text1: 'Weboldalunk a Google Analytics szolgáltatást használja a látogatottság mérésére és a felhasználói szokások elemzésére. Ezek az adatok segítenek nekünk abban, hogy fejlesszük az oldal működését.',
			section2DataCollected: 'Milyen adatokat gyűjt? Anonimizált IP cím, böngésző típusa, látogatás időtartama, megtekintett oldalak.',
			section2Provider: 'Szolgáltató: Google Ireland Limited (Gordon House, Barrow Street, Dublin 4, Írország).',
			section2LegalBasis: 'Jogalap: Az Ön önkéntes, kifejezett hozzájárulása (GDPR 6. cikk (1) bekezdés a) pont).',
			section2Operation: 'Működés: Ezeket a sütiket a rendszer kizárólag akkor helyezi el az Ön eszközén, ha Ön a felugró ablakban (Cookie Banner) erre kifejezetten engedélyt adott ("Összes elfogadása").',
			section2DataTransfer: 'Az adattovábbításról: A Google Analytics használata során az adatok továbbításra kerülhetnek az Amerikai Egyesült Államokban található szerverekre. A Google biztosítja az adatok megfelelő védelmét. Részletek a Google adatvédelmi tájékoztatójában: ',
			googlePrivacyPolicyLink: 'https://policies.google.com/privacy',
			withdrawalTitle: 'A hozzájárulás visszavonása',
			withdrawalText: 'Önnek bármikor joga van visszavonni a statisztikai sütikhez adott hozzájárulását. Ezt megteheti az alábbi \'Süti beállítások módosítása\' gombra kattintva, ahol módosíthatja preferenciáit. A visszavonás nem érinti a visszavonás előtt végrehajtott adatkezelés jogszerűségét.',
			manageCookiesButton: 'Süti beállítások módosítása',
			langSwitchLabel: 'English'
		}
	};
</script>

<div class="relative">
	<DocTitle class="flex flex-row justify-between">{translations[language.current].title}
		<Button
			label={translations[language.current].langSwitchLabel}
			light
			compact
			onclick={() => language.toggle()}
		/>
	</DocTitle>
	<DocText>{translations[language.current].intro}</DocText>

	<div class="mt-8">
		<DocSubtitle>{translations[language.current].section1Title}</DocSubtitle>
		<DocText>{translations[language.current].section1Text1}</DocText>
		<DocText>{translations[language.current].section1LegalBasis}</DocText>
		<DocText>{translations[language.current].section1Consent}</DocText>
	</div>

	<div class="mt-8">
		<DocSubtitle>{translations[language.current].section2Title}</DocSubtitle>
		<DocText>{translations[language.current].section2Text1}</DocText>
		<DocText>{translations[language.current].section2DataCollected}</DocText>
		<DocText>{translations[language.current].section2Provider}</DocText>
		<DocText>{translations[language.current].section2LegalBasis}</DocText>
		<DocText>{translations[language.current].section2Operation}</DocText>
		<DocText>
			{translations[language.current].section2DataTransfer}
			<a href={translations[language.current].googlePrivacyPolicyLink} target="_blank" rel="noopener noreferrer" class="text-blue-500 hover:underline">
				{translations[language.current].googlePrivacyPolicyLink}
			</a>
		</DocText>
	</div>

	<div class="mt-8">
		<DocSubtitle>{translations[language.current].withdrawalTitle}</DocSubtitle>
		<DocText>{translations[language.current].withdrawalText}</DocText>
		<div class="mt-4">
			<Button
				label={translations[language.current].manageCookiesButton}
				onclick={() => { localStorage.removeItem('cookie-consent'); location.reload(); }}
			/>
		</div>
	</div>
</div>

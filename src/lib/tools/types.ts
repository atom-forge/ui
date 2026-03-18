import type {Snippet} from "svelte";

export type AtLeastOne<T> = { [K in keyof T]-?: Required<Pick<T, K>> & Partial<Omit<T, K>>; }[keyof T];

// type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };
// export type XOR<T, U> = (T | U) extends object ? (Without<T, U> & U) | (Without<U, T> & T) : T | U;
// let a: XOR<{}, XOR<{ a:boolean }, {b:boolean}>> = {a: true}

type AllKeys<T> = T extends unknown ? keyof T : never;
type Exclusive<T, Union> = T extends unknown
	? T & { [K in Exclude<AllKeys<Union>, keyof T>]?: never }
	: never;

export type XOR<
	T1,
	T2,
	T3 = never,
	T4 = never,
	T5 = never,
	T6 = never,
	T7 = never,
	T8 = never
> = Exclusive<
	T1 | T2 | T3 | T4 | T5 | T6 | T7 | T8, // A 'T' (aktuális elem)
	T1 | T2 | T3 | T4 | T5 | T6 | T7 | T8  // A 'Union' (teljes halmaz)
>;

export type ChildrenProp<Parameters extends unknown[] = []> = { children: Snippet<Parameters> };
export type ChildrenPropOptional<Parameters extends unknown[] = []> = { children?: Snippet<Parameters> };
export type ClassProp = { class?: string }
export type AnyProp = { [key: string]: any }

export function variantMap<T extends Record<string, boolean | undefined>, D extends string>(
	map: T,
	defaultValue: D
): Extract<keyof T, string> | D {
	for (const [key, val] of Object.entries(map)) {
		if (val) return key as Extract<keyof T, string>;
	}
	return defaultValue;
}

export function debounce<T extends (...args: any[]) => void>(
	fn: T,
	delay = 300
): (...args: Parameters<T>) => void {
	let timeoutId: ReturnType<typeof setTimeout>;

	return (...args: Parameters<T>) => {
		clearTimeout(timeoutId);
		timeoutId = setTimeout(() => fn(...args), delay);
	};
}

export function debounceAsync<T extends (...args: any[]) => Promise<any>>(
	fn: T,
	delay = 300
): (...args: Parameters<T>) => Promise<Awaited<ReturnType<T>>> {
	let timeoutId: ReturnType<typeof setTimeout>;

	return (...args: Parameters<T>) => {
		clearTimeout(timeoutId);
		return new Promise((resolve) => {
			timeoutId = setTimeout(async () => {
				const result = await fn(...args);
				resolve(result);
			}, delay);
		});
	};
}
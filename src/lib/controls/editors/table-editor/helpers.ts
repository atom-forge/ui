import type {TableData} from "./types.ts";

export function makeDefaultTableData(): TableData {
	return {
		rows: Array.from({length: 4}, () => ['', '', '', '']),
		colStyles: Array.from({length: 4}, () => ({align: 'left' as const, prefix: '', postfix: '', sumDecorator: false})),
		headingRow: false, headingCol: false, sumRow: false, sumCol: false,
	};
}
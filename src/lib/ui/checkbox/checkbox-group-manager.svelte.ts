import {getContext, setContext} from "svelte";

type ChangeState = (state: "checked" | "unchecked" | "some") => void;

export class NamedCheckboxGroupManager {
	masters = new Map<string, { changeState: ChangeState }>();
	values = new Map<string, { changeState: ChangeState, value: boolean }>();

	registerMaster(id: string, changeState: ChangeState) {
		this.masters.set(id, {changeState});
		this.updateMasterState();
	}
	unregisterMaster(id: string) { this.masters.delete(id); }

	registerValue(id: string, value: boolean, changeState: ChangeState) {
		this.values.set(id, {value, changeState});
		this.updateMasterState();
	}
	unregisterValue(id: string) { this.values.delete(id); }

	updateMasterState() {
		if (this.masters.size === 0) return;
		if (this.isAllChecked()) { this.masters.forEach(m => m.changeState("checked")); return; }
		if (this.isAllUnchecked()) { this.masters.forEach(m => m.changeState("unchecked")); return; }
		this.masters.forEach(m => m.changeState("some"));
	}

	isAllChecked() {
		if (this.values.size === 0) return false;
		return Array.from(this.values.values()).every(({value}) => value);
	}
	isAllUnchecked() {
		if (this.values.size === 0) return false;
		return Array.from(this.values.values()).every(({value}) => !value);
	}

	set(id: string, value: boolean) {
		if (!this.values.has(id)) return;
		this.values.get(id)!.value = value;
		this.values.get(id)!.changeState(value ? "checked" : "unchecked");
		this.updateMasterState();
	}

	toggleAll() {
		if (this.isAllChecked()) {
			this.values.forEach(v => { v.value = false; v.changeState("unchecked"); });
			this.masters.forEach(m => m.changeState("unchecked"));
		} else {
			this.values.forEach(v => { v.value = true; v.changeState("checked"); });
			this.masters.forEach(m => m.changeState("checked"));
		}
	}
}

export class CheckboxGroupManager {
	groups = new Map<string, NamedCheckboxGroupManager>();

	registerMaster(name: string, id: string, changeState: ChangeState) {
		if (!this.groups.has(name)) this.groups.set(name, new NamedCheckboxGroupManager());
		const group = this.groups.get(name)!;
		group.registerMaster(id, changeState);
		return group;
	}
	unregisterMaster(name: string, id: string) {
		const group = this.groups.get(name);
		if (!group) return;
		group.unregisterMaster(id);
		if (group.masters.size === 0 && group.values.size === 0) this.groups.delete(name);
	}
	registerValue(name: string, id: string, value: boolean, changeState: ChangeState) {
		if (!this.groups.has(name)) this.groups.set(name, new NamedCheckboxGroupManager());
		const group = this.groups.get(name)!;
		group.registerValue(id, value, changeState);
		return group;
	}
	unregisterValue(name: string, id: string) {
		const group = this.groups.get(name);
		if (!group) return;
		group.unregisterValue(id);
		if (group.masters.size === 0 && group.values.size === 0) this.groups.delete(name);
	}
}

const KEY = Symbol('ui:checkbox-group-manager');

export function createCheckboxGroupManager() {
	const manager = new CheckboxGroupManager();
	setContext(KEY, manager);
}

export const getCheckboxGroupManager = () => getContext<CheckboxGroupManager>(KEY);

<script lang="ts">
	import { getToastManager, ToastContainer } from '@atom-forge/ui';
	import CustomToast from '../../routes/(site)/ui/overlays/toast/examples/CustomToast.svelte';
	const toast = getToastManager();
	let id = '';
	id = toast.showCustom(CustomToast, {
		name: 'Contract User',
		onclose: () => toast.dismiss(id),
	}, { duration: 0 });
	const state = toast.toasts.find(entry => entry.id === id);
	if (!state || state.props?.name !== 'Contract User' || 'id' in state.props) {
		throw new Error('Re-audit custom toast props: 0.0.34 passes only explicit props, without an injected id.');
	}
</script>

<ToastContainer />

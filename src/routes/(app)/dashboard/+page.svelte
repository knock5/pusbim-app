<script lang="ts">
	import { resolve } from '$app/paths';

	let { data } = $props();
</script>

<h1>Dashboard Pusat Bimbel</h1>

<p>Halo, {data.user.fullName}!</p>
<p>Role: {data.user.role}</p>

<div>
	<a href={resolve('/logout')}>Logout</a>
</div>

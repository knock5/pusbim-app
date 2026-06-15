<script lang="ts">
	import { page } from '$app/state';

	let { children } = $props();
</script>

<div class="flex min-h-screen">
	<aside class="w-64 border-r p-4">
		<h2 class="text-xl font-bold mb-4">Pusat Bimbel</h2>
		<nav class="space-y-2">
			<a href={page.url.pathname === '/dashboard'} class="block px-3 py-2 rounded hover:bg-gray-200"
				>Dashboard</a
			>
			<a href={page.url.pathname === '/subjects'} class="block px-3 py-2 rounded hover:bg-gray-200"
				>Mata Pelajaran</a
			>
			<a href={page.url.pathname === '/chapters'} class="block px-3 py-2 rounded hover:bg-gray-200"
				>Bab</a
			>
			<a href={page.url.pathname === '/questions'} class="block px-3 py-2 rounded hover:bg-gray-200"
				>Soal</a
			>
			<a href={page.url.pathname === '/exams'} class="block px-3 py-2 rounded hover:bg-gray-200"
				>Try Out</a
			>
			<a href="/logout" class="block px-3 py-2 rounded hover:bg-gray-200">Logout</a>
		</nav>
	</aside>

	<main class="flex-1 p-6">
		{@render children()}
	</main>
</div>

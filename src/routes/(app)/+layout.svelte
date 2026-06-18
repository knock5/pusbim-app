<script lang="ts">
	import { resolve } from '$app/paths';

	let { children } = $props();
</script>

<div class="flex min-h-screen">
	<aside class="w-64 border-r p-4">
		<h2 class="text-xl font-bold mb-4">Pusat Bimbel</h2>
		<nav class="space-y-2">
			<a href={resolve('/dashboard')} class="block px-3 py-2 rounded hover:bg-gray-200">Dashboard</a
			>
			<a href={resolve('/subjects')} class="block px-3 py-2 rounded hover:bg-gray-200"
				>Mata Pelajaran</a
			>
			<a href={resolve('/chapters')} class="block px-3 py-2 rounded hover:bg-gray-200">Bab</a>
			<a href={resolve('/questions')} class="block px-3 py-2 rounded hover:bg-gray-200">Soal</a>
			<a href={resolve('/exams')} class="block px-3 py-2 rounded hover:bg-gray-200">Try Out</a>
			<a href={resolve('/logout')} class="block px-3 py-2 rounded hover:bg-gray-200">Logout</a>
		</nav>
	</aside>

	<main class="flex-1 p-6">
		{@render children()}
	</main>
</div>

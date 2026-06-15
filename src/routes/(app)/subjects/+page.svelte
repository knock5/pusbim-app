<script lang="ts">
	let { data, form } = $props();
</script>

{#if form?.error}
	<div class="bg-red-100 text-red-700 p-4 mb-4 rounded">
		{form.error}
	</div>
{/if}

<h1 class="text-2xl font-bold mb-6">Data Pelajaran</h1>

<form method="POST" action="?/create">
	<input type="text" name="name" placeholder="Nama Mata Pelajaran" class="border p-2" />

	<button type="submit" class="bg-blue-500 text-white p-2 rounded">Tambah</button>
</form>

<hr class="my-6" />

<ul>
	{#each data.subjects as subject (subject.id)}
		<li>
			{subject.name}
		</li>
	{/each}
</ul>

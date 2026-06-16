<script lang="ts">
	let { data, form } = $props();
</script>

<h1 class="text-2xl font-bold mb-6">Edit Mata Pelajaran</h1>

{#if form?.error}
	<p class="text-red-500 mb-4">
		{form.error}
	</p>
{/if}

<form method="POST" action="?/update" class="space-y-4">
	<div>
		<label for="name">Nama</label>

		<input id="name" name="name" value={data.subject.name} class="border p-2 w-full" />
	</div>

	<div>
		<label for="description">Deskripsi</label>

		<textarea id="description" name="description" class="border p-2 w-full"
			>{data.subject.description ?? ''}</textarea
		>
	</div>

	<button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded"> Simpan </button>
</form>

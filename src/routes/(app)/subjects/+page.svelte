<script lang="ts">
	import { resolve } from '$app/paths';

	let { data, form } = $props();
</script>

{#if form?.error}
	<div class="bg-red-100 text-red-700 p-4 mb-4 rounded">
		{form.error}
	</div>
{/if}

<h1 class="text-2xl font-bold mb-6">Data Pelajaran</h1>

<form method="POST" action="?/create">
	<label for="name" class="block mb-2 font-medium">Nama Mata Pelajaran</label>
	<input type="text" name="name" placeholder="Nama Mata Pelajaran" class="border p-2" />

	<label for="description" class="block mb-2 font-medium">Deskripsi</label>
	<textarea name="description" placeholder="Deskripsi Mata Pelajaran" class="border p-2"></textarea>

	<button type="submit" class="bg-blue-500 text-white p-2 rounded">Tambah</button>
</form>

<hr class="my-6" />

<ul class="space-y-4">
	{#each data.subjects as subject (subject.id)}
		<li class="border p-4 rounded flex items-center justify-between">
			<div>
				<p class="font-semibold">{subject.name}</p>

				{#if subject.description}
					<p class="text-sm text-gray-500">
						{subject.description}
					</p>
				{/if}
			</div>

			<div class="flex gap-2">
				<a
					href={resolve(`/subjects/${subject.id}/edit`)}
					class="bg-yellow-500 text-white px-3 py-2 rounded"
				>
					Edit
				</a>

				<form method="POST" action="?/delete">
					<input type="hidden" name="id" value={subject.id} />

					<button type="submit" class="bg-red-500 text-white px-3 py-2 rounded"> Hapus </button>
				</form>
			</div>
		</li>
	{/each}
</ul>

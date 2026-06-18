<script lang="ts">
	import { resolve } from '$app/paths';
	import type { PageData } from './$types';

	let { data, form } = $props<{ data: PageData; form?: unknown }>();
</script>

<h1 class="text-2xl font-bold mb-6">Data Bab</h1>

{#if form?.error}
	<p class="text-red-500 mb-4">
		{form.error}
	</p>
{/if}

<form method="POST" action="?/create" class="space-y-4">
	<div>
		<select name="subjectId" class="border p-2 w-full">
			<option value=""> Pilih Mata Pelajaran </option>

			{#each data.subjects as subject (subject.id)}
				<option value={subject.id}>
					{subject.name}
				</option>
			{/each}
		</select>
	</div>

	<div>
		<input name="name" placeholder="Nama Bab" class="border p-2 w-full" />
	</div>

	<div>
		<textarea id="description" name="description" placeholder="Deskripsi" class="border p-2 w-full"
		></textarea>
	</div>

	<button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded"> Tambah </button>
</form>

<hr class="my-6" />

<table class="w-full border">
	<thead>
		<tr>
			<th class="border p-2">Mata Pelajaran</th>
			<th class="border p-2">Bab</th>
		</tr>
	</thead>

	<tbody>
		{#each data.chapters as chapter (chapter.id)}
			<tr>
				<td class="border p-2">
					{chapter.subject.name}
				</td>

				<td class="border p-2">
					{chapter.name}
				</td>
				<td class="border p-2 flex gap-2">
					<a
						href={resolve(`/chapters/${chapter.id}/edit`)}
						class="bg-yellow-500 text-white px-2 py-1 rounded"
					>
						Edit
					</a>
					<form method="POST" action="?/delete">
						<input type="hidden" name="id" value={chapter.id} />
						<button type="submit" class="bg-red-500 text-white px-2 py-1 rounded"> Hapus </button>
					</form>
				</td>
			</tr>
		{/each}
	</tbody>
</table>

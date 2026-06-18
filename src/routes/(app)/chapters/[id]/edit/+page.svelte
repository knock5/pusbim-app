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
	<select name="subjectId" class="border p-2 w-full">
		{#each data.subjects as subject (subject.id)}
			<option value={subject.id} selected={subject.id === data.chapter.subjectId}>
				{subject.name}
			</option>
		{/each}
	</select>

	<input name="name" value={data.chapter.name} />

	<textarea name="description">{data.chapter.description ?? ''}</textarea>

	<button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded"> Simpan </button>
</form>

<script lang="ts">
	import type { PageData } from './$types';

	let { data, form } = $props<{ data: PageData; form?: { error?: string } }>();

	let selectedSubjectId = $state('');
	let selectedChapterId = $state('');

	const filteredChapters = $derived(
		selectedSubjectId
			? data.chapters.filter(
					(chapter: PageData['chapters'][number]) => chapter.subjectId === selectedSubjectId
				)
			: []
	);
</script>

{#if form?.error}
	<p class="mb-4 text-red-500">{form.error}</p>
{/if}

<form method="POST" action="?/create" class="space-y-4">
	<select
		bind:value={selectedSubjectId}
		onchange={() => {
			selectedChapterId = '';
		}}
		name="subjectId"
		class="border p-2 w-full"
		required
	>
		<option value="" disabled>Pilih Mata Pelajaran</option>
		{#each data.subjects as subject (subject.id)}
			<option value={subject.id}>{subject.name}</option>
		{/each}
	</select>

	<select
		bind:value={selectedChapterId}
		name="chapterId"
		class="border p-2 w-full"
		required
		disabled={!selectedSubjectId}
	>
		<option value="" disabled>Pilih Bab</option>
		{#each filteredChapters as chapter (chapter.id)}
			<option value={chapter.id}>{chapter.name}</option>
		{/each}
	</select>

	<select name="difficulty" class="border p-2 w-full" required>
		<option value="EASY" selected>Easy</option>
		<option value="MEDIUM">Medium</option>
		<option value="HARD">Hard</option>
	</select>

	<textarea name="questionText" class="border p-2 w-full" placeholder="Tulis soal" required
	></textarea>

	<input name="optionA" class="border p-2 w-full" placeholder="Pilihan A" required />
	<input name="optionB" class="border p-2 w-full" placeholder="Pilihan B" required />
	<input name="optionC" class="border p-2 w-full" placeholder="Pilihan C" required />
	<input name="optionD" class="border p-2 w-full" placeholder="Pilihan D" required />

	<select name="correctAnswer" class="border p-2 w-full" required>
		<option value="" disabled>Pilih Jawaban Benar</option>
		<option value="A">A</option>
		<option value="B">B</option>
		<option value="C">C</option>
		<option value="D">D</option>
	</select>

	<textarea name="explanation" class="border p-2 w-full" placeholder="Pembahasan"></textarea>

	<button type="submit" class="bg-blue-500 px-4 py-2 rounded text-white hover:bg-blue-600">
		Simpan Soal
	</button>
</form>

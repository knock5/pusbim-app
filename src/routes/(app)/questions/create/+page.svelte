<script lang="ts">
	let { data } = $props();

	let selectedSubjectId = $state('');
	let selectedChapterId = $state('');

	const filteredChapters = $derived(
		selectedSubjectId
			? data.chapters.filter((chapter) => chapter.subjectId === selectedSubjectId)
			: []
	);
</script>

<div class="space-y-4">
	<select
		bind:value={selectedSubjectId}
		onchange={() => {
			selectedChapterId = '';
		}}
		name="subjectId"
		class="border p-2 w-full"
		required
	>
		<option value="" disabled>-- Pilih Mata Pelajaran --</option>
		{#each data.subjects as subject (subject.id)}
			<option value={subject.id}>
				{subject.name}
			</option>
		{/each}
	</select>

	<select
		bind:value={selectedChapterId}
		name="chapterId"
		class="border p-2 w-full"
		required
		disabled={!selectedSubjectId}
	>
		<option value="" disabled>-- Pilih Bab --</option>
		{#each filteredChapters as chapter (chapter.id)}
			<option value={chapter.id}>
				{chapter.name}
			</option>
		{/each}
	</select>

	<select name="difficulty" class="border p-2 w-full" required>
		<option value="EASY">Easy</option>
		<option value="MEDIUM">Medium</option>
		<option value="HARD">Hard</option>
	</select>

	<textarea name="questionText" class="border p-2 w-full" placeholder="Tulis soal"></textarea>

	<input name="optionA" class="border p-2 w-full" placeholder="Pilihan A" />
	<input name="optionB" class="border p-2 w-full" placeholder="Pilihan B" />
	<input name="optionC" class="border p-2 w-full" placeholder="Pilihan C" />
	<input name="optionD" class="border p-2 w-full" placeholder="Pilihan D" />

	<select name="correctAnswer" class="border p-2 w-full" required>
		<option value="" disabled selected>-- Pilih Jawaban Benar --</option>
		<option value="A">A</option>
		<option value="B">B</option>
		<option value="C">C</option>
		<option value="D">D</option>
	</select>

	<textarea name="explanation" class="border p-2 w-full" placeholder="Pembahasan"></textarea>
</div>

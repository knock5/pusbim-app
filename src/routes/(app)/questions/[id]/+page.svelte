<script lang="ts">
	let { data } = $props();
</script>

<h1 class="text-2xl font-bold mb-6">Detail Soal</h1>

<div class="space-y-4">
	<p>
		<b>Mapel:</b>
		{data.question.subject.name}
	</p>

	<p>
		<b>Bab:</b>
		{data.question.chapter?.name}
	</p>

	<p>
		<b>Kesulitan:</b>
		{data.question.difficulty}
	</p>

	<hr />

	<p>
		{data.question.questionText}
	</p>

	<ul class="space-y-2">
		{#each data.question.options as option (option.id)}
			<li>
				<b>{option.label}.</b>
				{option.text}

				{#if option.isCorrect}
					<span class="text-green-600"> ✓ Jawaban Benar </span>
				{/if}
			</li>
		{/each}
	</ul>

	<hr />

	<p>
		<b>Pembahasan:</b>
	</p>

	<p>
		{data.question.explanation}
	</p>
</div>

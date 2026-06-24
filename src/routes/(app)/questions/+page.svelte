<script lang="ts">
	import { resolve } from '$app/paths';

	let { data } = $props();

	function truncate(text: string, max = 80) {
		return text.length > max ? text.substring(0, max) + '...' : text;
	}
</script>

<div class="flex justify-between items-center mb-6">
	<h1 class="text-2xl font-bold">Bank Soal</h1>

	<a href={resolve('/questions/create')} class="bg-blue-500 text-white px-4 py-2 rounded">
		Tambah Soal
	</a>
</div>

<table class="w-full border">
	<thead>
		<tr>
			<th class="border p-2">Mapel</th>
			<th class="border p-2">Bab</th>
			<th class="border p-2">Level</th>
			<th class="border p-2">Soal</th>
			<th class="border p-2">Pembuat</th>
			<th class="border p-2">Aksi</th>
		</tr>
	</thead>

	<tbody>
		{#each data.questions as question (question.id)}
			<tr>
				<td class="border p-2">
					{question.subject.name}
				</td>

				<td class="border p-2">
					{question.chapter?.name}
				</td>

				<td class="border p-2">
					{question.difficulty}
				</td>

				<td class="border p-2">
					{truncate(question.questionText)}
				</td>

				<td class="border p-2">
					{question.createdBy.fullName}
				</td>

				<td class="border p-2">
					<div class="flex gap-2">
						<a
							href={resolve(`/questions/${question.id}`)}
							class="bg-green-500 text-white px-2 py-1 rounded"
						>
							Lihat
						</a>

						<a
							href={resolve(`/questions/${question.id}/edit`)}
							class="bg-yellow-500 text-white px-2 py-1 rounded"
						>
							Edit
						</a>

						<form method="POST" action="?/delete">
							<input type="hidden" name="id" value={question.id} />

							<button type="submit" class="bg-red-500 text-white px-2 py-1 rounded"> Hapus </button>
						</form>
					</div>
				</td>
			</tr>
		{/each}
	</tbody>
</table>

<script>
	import { goto } from '$app/navigation';

	// Placeholder state until we integrate the draft store
	let content = '';
</script>

<div class="mx-auto flex max-w-2xl flex-col gap-6 px-6 py-12">
	<h1 class="text-3xl font-bold">New Journal Entry</h1>

	<!-- Textarea for writing -->
	<textarea
		bind:value={content}
		class="h-64 w-full rounded-lg border border-gray-300 p-4 focus:ring-2 focus:ring-blue-500 focus:outline-none"
		placeholder="Start writing your thoughts..."
	></textarea>

	<div class="flex gap-4">
		<!-- Submit button -->
		<button
			class="rounded-lg bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700"
			on:click={() => {
				// TEMP: redirect back home for now
				console.log('Submit clicked, content:', content);
				goto('/');
			}}
		>
			Save Entry
		</button>

		<!-- Discard button -->
		<button
			class="rounded-lg bg-gray-300 px-4 py-2 font-medium text-gray-900 hover:bg-gray-400"
			on:click={() => {
				content = '';
			}}
		>
			Discard
		</button>
	</div>
</div>

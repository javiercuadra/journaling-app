<script>
	import { goto } from '$app/navigation';
</script>

<div class="flex flex-col items-center gap-6 py-16">
	<h1 class="text-3xl font-bold">Journal App</h1>

	<p class="text-gray-600">Welcome to your journaling application.</p>

	<div class="flex w-full max-w-sm flex-col gap-4">
		<button
			class="rounded-lg bg-blue-600 py-3 font-medium text-white hover:bg-blue-700"
			on:click={() => goto('/new')}
		>
			✏️ Create New Entry
		</button>

		<button
			class="rounded-lg bg-gray-800 py-3 font-medium text-white hover:bg-gray-900"
			on:click={() => goto('/entries')}
		>
			📓 View All Entries
		</button>
	</div>
</div>

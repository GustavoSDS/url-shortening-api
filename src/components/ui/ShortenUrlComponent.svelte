<script>
	import { onMount } from "svelte";
	let urlInput = "";
	let shortUrl = null;
	let error = null;

	async function submit(e) {
		e.preventDefault();
		const formData = new FormData(e.currentTarget);
		const response = await fetch("/api/shorten", {
			method: "POST",
			body: formData,
		});
		if (response.ok) {
			const data = await response.json();
			shortUrl = data.result;
			error = null;
		} else {
			const { message } = await response.json();
			error = message;
		}
	}
</script>

<div
	class="absolute flex flex-col items-center justify-center w-full px-6 gap-4 p-6 mx-auto -translate-x-1/2 -top-20 left-1/2 right-1/2 max-w-full overflow-x-hidden"
>
	<form
		class="w-full flex flex-col items-center justify-center gap-4 bg-primary-darkViolet rounded-xl min-h-40 p-6"
		on:submit={submit}
	>
		<div class="w-full">
			<input
				type="text"
				name="url"
				id="url"
				bind:value={urlInput}
				placeholder="https://www.google.com"
				class="w-full py-3 pl-4 text-lg rounded-md outline-none placeholder:text-neutral-grayishViolet"
			/>
			{#if error}
				<p class="w-full text-secondary-red mt-2 italic">{error}</p>
			{/if}
		</div>

		<button
			type="submit"
			class="block w-full px-10 py-3 text-xl font-bold text-center text-white rounded-md bg-primary-cyan hover:bg-primary-cyan/80"
		>
			Shorten it!
		</button>
	</form>

</div>

<div class="w-full h-40 flex flex-col items-start p-4 gap-4 bg-white rounded-xl">
	<h1 class="border-b border-b-neutral-grayishViolet w-full text-left">Shortened URL</h1>
	<div class="px-1 w-full flex flex-col items-start gap-y-2">
		<p class="text-primary-cyan">https://rel.in/ijh3092fj</p>
		<button
			class="w-full px-10 py-3 text-xl font-bold text-center text-white rounded-md bg-primary-cyan hover:bg-primary-cyan/80"
		>
			Copy
		</button>
	</div>
</div>

<script>
	import { onMount } from "svelte";
	let urlInput = null;
	let urlInputArray = [
		"https://www.frontendmentor.io",
		"https://twitter.com/frontendmentor",
	];
	let shortUrl = [
		"https://cleanuri.com/ZB0kZL",
		"https://cleanuri.com/MED9pl",
	];
	let error = null;
	let loading = false;

	async function submit(e) {
		e.preventDefault();
		loading = true;
		urlInputArray.push(urlInput);
		const formData = new FormData(e.currentTarget);
		const response = await fetch("/api/shorten", {
			method: "POST",
			body: formData,
		});
		if (response.ok) {
			const data = await response.json();
			shortUrl.push(data.result.result_url);
			error = null;
		} else {
			const { message } = await response.json();
			error = message;
		}
		loading = false;
	}
</script>

<div
	class="absolute flex flex-col items-center justify-center w-full px-6 gap-4 mx-auto -translate-x-1/2 -top-24 left-1/2 right-1/2 max-w-full overflow-x-hidden"
>
	<form
		class="w-full flex flex-col items-center justify-center gap-4 bg-primary-darkViolet rounded-xl h-40 p-6"
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
				<p class="w-full text-left text-secondary-red mt-2 italic">{error}</p>
			{/if}
		</div>

		<button
			type="submit"
			disabled={loading}
			class="block w-full px-10 py-3 text-xl font-bold text-center text-white rounded-md bg-primary-cyan hover:bg-primary-cyan/80 disabled:bg-neutral-grayishViolet disabled:cursor-not-allowed transition-all duration-300 ease-in-out"
		>
			Shorten it!
		</button>
	</form>
</div>

{#if shortUrl.length >= 0 && !loading && !error}
	<div class="flex flex-col gap-y-6 w-full mb-20">
		{#each shortUrl as url, i}
			<div
				class="w-full min-h-40 flex flex-col items-start p-4 gap-4 bg-white rounded-xl overflow-hidden"
			>
				<h1 class="border-b border-b-neutral-grayishViolet w-full text-left text-ellipsis whitespace-nowrap overflow-hidden">
					{urlInputArray[i]}
				</h1>
				<div class="px-1 w-full flex flex-col items-start gap-y-2">
					<p class="text-primary-cyan text-clip">{url}</p>
					<button
						on:click={(e) => {
							navigator.clipboard.writeText(url);
							e.currentTarget.innerText = "Copied!";
							e.currentTarget.classList.add("bg-primary-darkViolet");
							e.currentTarget.classList.add("hover:bg-primary-darkViolet/80");
						}}
						class="w-full px-10 py-3 text-xl font-bold text-center text-white rounded-md bg-primary-cyan hover:bg-primary-cyan/80 transition-all duration-300 ease-in-out"
					>
						Copy
					</button>
				</div>
			</div>
		{/each}
	</div>
{/if}

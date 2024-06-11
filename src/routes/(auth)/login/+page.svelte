<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { applyAction, deserialize } from '$app/forms';
	import { invalidateAll } from '$app/navigation';
	import { cn } from '$lib/utils';
	import { Loader } from 'lucide-svelte';

	export let form;
	let email = form?.email;
	let password = form?.password;

	let isLoading = false;

	async function onSubmit(event: Event) {
		isLoading = true;

		const formData = new FormData(event.currentTarget as HTMLFormElement);

		const response = await fetch((event.currentTarget as HTMLFormElement).action, {
			method: 'POST',
			body: formData
		});

		const result = deserialize(await response.text());

		if (result.type === 'success') {
			// rerun all `load` functions, following the successful update
			await invalidateAll();
		}

		isLoading = false;
		applyAction(result);
	}
</script>

<div class="grid h-screen grid-cols-2">
	<div class="col-span-1">
		<div class="h-full w-full bg-foreground" />
	</div>
	<div class="flex flex-col justify-center lg:p-8">
		<div class="mx-auto -mt-12 flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
			<!-- Login Page Header -->
			<div class="flex flex-col text-center">
				<h1 class="text-2xl font-semibold tracking-tight">Login to your account</h1>
			</div>
			<!-- Login Form -->
			<div class={cn('grid gap-6')} {...$$restProps}>
				<form method="POST" on:submit|preventDefault={onSubmit}>
					<div class="mb-6 grid gap-2">
						<div class="grid gap-1">
							<Label class="sr-only" for="email">Email</Label>
							<Input
								name="email"
								placeholder="Email"
								type="email"
								autocapitalize="none"
								autocorrect="off"
								bind:value={email}
								disabled={isLoading}
							/>
							{#if form?.emailError}
								<span class="block text-red-600 dark:text-red-500">{form.emailError}</span>
							{/if}
						</div>
						<div class="grid gap-1">
							<Label class="sr-only" for="password">Password</Label>
							<Input
								name="password"
								placeholder="Enter password"
								type="password"
								autocapitalize="none"
								autocorrect="off"
								bind:value={password}
								disabled={isLoading}
							/>
							{#if form?.passwordError}
								<span class="block text-red-600 dark:text-red-500">{form.passwordError}</span>
							{/if}
						</div>

						<div class="flex justify-end">
							<a class="text-xs underline" href="/">Forgot Password?</a>
						</div>

						<Button class="mb-10 mt-4" disabled={isLoading} type="submit">
							{#if isLoading}
								<Loader class="mr-2 h-4 w-4 animate-spin" />
							{/if}
							Log In
						</Button>

						<div class="text-center text-base">
							Don't have an account? <a class="underline" href="/">Sign Up</a>
						</div>
					</div>
				</form>
			</div>
		</div>
	</div>
</div>

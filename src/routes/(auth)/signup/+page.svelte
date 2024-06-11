<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { cn } from '$lib/utils';
	import { Loader } from 'lucide-svelte';
	import toast from 'svelte-french-toast';
	import { applyAction, deserialize } from '$app/forms';
	import { invalidateAll } from '$app/navigation';
	import type { ActionResult } from '@sveltejs/kit';

	export let form;
	let email = form?.email;
	let password = form?.password;
	let passwordConfirm = form?.password;
	let error = form?.error;

	let isLoading = false;

	async function onSubmit(event: Event) {
		isLoading = true;

		const formData = new FormData(event.currentTarget as HTMLFormElement);

		const response = await fetch((event.currentTarget as HTMLFormElement).action, {
			method: 'POST',
			body: formData
		});

		const result: ActionResult = deserialize(await response.text());

		if (result.type === 'success') {
			toast.success(
				'Success! You should receive a link via e-mail to validate your account and login.',
				{ position: 'bottom-left' }
			);
			// rerun all `load` functions, following the successful update
			await invalidateAll();
		} else if (result.type === 'failure') {
			error = result?.data?.error;
			toast.error('Error creating your account!', { position: 'bottom-left' });
		}

		isLoading = false;
		applyAction(result);
	}
</script>

<div class="grid grid-cols-2 h-screen">
	<div class="col-span-1">
		<div class="bg-foreground h-full w-full" />
	</div>
	<div class="flex flex-col justify-center lg:p-8">
		<div class="mx-auto flex w-full flex-col -mt-12 justify-center space-y-6 sm:w-[350px]">
			<!-- Signup Page Header -->
			<div class="flex flex-col text-center">
				<h1 class="text-2xl font-semibold tracking-tight">Signup for an account</h1>
			</div>
			<!-- Signup Form -->
			<div class={cn('grid gap-6')} {...$$restProps}>
				<form method="POST" on:submit|preventDefault={onSubmit}>
					<div class="grid gap-2 mb-6">
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
								aria-invalid={error?.email ? true : undefined}
							/>
							{#if error?.email && error.email !== ''}
								<span class="block text-red-600 dark:text-red-500">{error.email}</span>
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
								aria-invalid={error?.password ? true : undefined}
							/>
							{#if error?.password}
								<span class="block text-red-600 dark:text-red-500">{error.password}</span>
							{/if}
						</div>
						<div class="grid gap-1">
							<Label class="sr-only" for="passwordConfirm">Confirm Password</Label>
							<Input
								name="passwordConfirm"
								placeholder="Confirm password"
								type="password"
								autocapitalize="none"
								autocorrect="off"
								bind:value={passwordConfirm}
								disabled={isLoading}
								aria-invalid={error?.passwordConfirm ? true : undefined}
							/>
							{#if error?.passwordConfirm}
								<span class="block text-red-600 dark:text-red-500">{error.passwordConfirm}</span>
							{/if}
						</div>
						{#if error?.signUp}
							<span class="block text-red-600 dark:text-red-500">{error.signUp}</span>
						{/if}
						<Button class="mt-2" disabled={isLoading} type="submit">
							{#if isLoading}
								<Loader class="mr-2 h-4 w-4 animate-spin" />
							{/if}
							Sign Up
						</Button>
					</div>
				</form>
			</div>
		</div>
	</div>
</div>

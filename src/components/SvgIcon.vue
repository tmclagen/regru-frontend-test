<template>
	<svg class="icon">
		<use :xlink:href="`#${icon}`" />
	</svg>
</template>

<script>
export default {
	name: 'SvgIcon',
	props: {
		icon: {
			type: String,
			required: true,
		},
	},
};
</script>

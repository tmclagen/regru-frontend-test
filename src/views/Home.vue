<template>
  <div class="container">
    <AppIssues :issues="issues" />
  </div>
</template>

<script>
import AppIssues from '@/components/Issues';

export default {
  components: {
    AppIssues,
  },
  computed: {
    issues() {
      return this.$store.getters.issues;
    },
  },
}
</script>

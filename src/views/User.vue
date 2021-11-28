<template>
  <div class="container">
    <AppIssues :issues="userIssues" />
  </div>
</template>

<script>
import AppIssues from '@/components/Issues';

export default {
  props: {
    id: {
      type: String,
    },
  },
  components: {
    AppIssues,
  },
  computed: {
    issues() {
      return this.$store.getters.issues;
    },
    userIssues() {
      return this.issues.filter(issue => issue.responsible.id == this.id);
    },
  },
}
</script>

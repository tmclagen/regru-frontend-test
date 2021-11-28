<template>
  <div class="container">
    <div class="issue">
      <h2 class="issue__heading">
        <span :class="['chip', `chip--${issue.status.title}`]" v-if="issue.status.title">
          {{ issue.status.title }}
        </span>
        {{ title }}
      </h2>
      <h3 class="issue__title">{{ issue.title }}</h3>
      <p class="issue__description">{{ issue.description }}</p>
      <p class="issue__responsible" v-if="issue.responsible">
        <strong>Ответственный:</strong>
        <router-link  class="issue__responsible-link" :to="{ name: 'User', params: { id: issue.responsible.id }}"
                      v-if="issue.responsible.id">
          {{ issue.responsible.name }}
        </router-link>
      </p>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { GET_ISSUE } from '@/store/issues/types';

export default {
  inheritAttrs: false,
  props: {
    id: {
      type: String,
    },
  },
  computed: {
    ...mapGetters({
      originalIssue: 'issue',
      issuesStatuses: 'issuesStatuses',
      users: 'users',
    }),
    originalIssue() {
      return this.$store.getters.issue;
    },
    issue() {
      const issue = JSON.parse(JSON.stringify(this.originalIssue));
      issue.status = {...this.issuesStatuses.find(item => item.id === issue.status)};
      issue.responsible = {...this.users.find(user => user.name === issue.responsible)}
      return issue;
    },
    title() {
      return this.issue.id ? `Инцидент ${this.issue.id}` : '';
    },
  },
  mounted() {
    this.$store.dispatch(GET_ISSUE, this.id);
  },
}
</script>

<style scoped>
.issue {
  background-color: #fff;
  border: 1px solid hsl(0, 0%, 90%);
  border-radius: .375rem;
  margin: 50px auto 100px;
  max-width: 600px;
  padding: 30px 30px 50px;
}
.issue__heading {
  align-items: center;
  display: flex;
  gap: .5em;
  margin-bottom: 30px;
}
.issue__title {
  font-weight: 600;
  margin-bottom: 1em;
}
.issue__description {
  white-space: pre-line;
  word-break: break-all;
}
.issue__responsible {
  margin-top: 2em;
}
.issue__responsible-link {
  border-bottom: 1px solid;
  color: inherit;
  opacity: 0.5;
  margin-left: 0.25em;
  text-decoration: none;
}
</style>
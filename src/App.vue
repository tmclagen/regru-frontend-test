<template>
  <div id="app">
    <div class="loader" :class="{'loader--visible': isPageLoading}">
      <AppSvgIcon icon="loader-puff" class="loader__icon" />
    </div>
    <router-view :key="$route.path" />
    <AppIconsSprite />
  </div>
</template>

<script>
import './assets/styles/reset.css';
import { mapGetters } from 'vuex';
import { GET_ISSUES, GET_ISSUES_STATUSES } from '@/store/issues/types';
import { GET_USERS } from '@/store/user/types';
import AppIconsSprite from '@/components/SvgIconsSprite';

export default {
  components: {
    AppIconsSprite,
  },
  created() {
    this.$store.dispatch(GET_ISSUES);
    this.$store.dispatch(GET_ISSUES_STATUSES);
    this.$store.dispatch(GET_USERS);
  },
  computed: {
    ...mapGetters([
      'issueStatus',
      'issuesStatus',
      'issuesStatusesStatus',
      'usersStatus',
    ]),
    isPageLoading() {
      return  this.issueStatus.type === 'loading'
              || this.issuesStatus.type === 'loading'
              || this.issuesStatusesStatus.type === 'loading'
              || this.usersStatus.type === 'loading';
    },
  },
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap');

body {
  --color-error: #F44336;
  --color-warning: #FFC107;
  --color-grey: hsla(0, 0%, 0%, 0.1);

  background: hsl(215deg 25% 97%);
  font-family: 'Roboto', sans-serif;
}
h2 {
  font-size: 1.55rem;
}
strong {
  font-weight: 500;
}

.container {
  padding: 20px;
  margin: 0 auto;
  max-width: 1200px;
}

.chip {
  background: var(--color-grey);
  border-radius: 1em;
  display: block;
  font-size: 0.85rem;
  line-height: 1rem;
  padding: .25em .75em;
  width: max-content;
}
.chip--critical {
  background-color: var(--color-error);
  color: #fff;
}
.chip--bug {
  background-color: var(--color-warning);
}

.loader {
  align-items: center;
  background-color: #fff;
  display: flex;
  height: 100%;
  justify-content: center;
  left: 0;
  opacity: 0;
  pointer-events: none;
  position: fixed;
  top: 0;
  transition: .15s .35s ease;
  visibility: hidden;
  width: 100%;
  z-index: 100;
}
.loader--visible {
  opacity: 1;
  transition: none;
  visibility: visible;
  pointer-events: all;
}
.loader__icon {
  height: 4rem;
  width: 4rem;
}
</style>
<template>
  <div class="issues">
    <table class="issues__table">
      <thead class="issues__header">
        <th class="issues__title">
          <button class="issues__sort-btn" type="button" @click="switchSorting(sortById)">
            ID
            <i class="issues__sort-btn-icon">
              <AppSvgIcon icon="arrow-up-circle-outline" v-show="sortById.current === 'asc'" />
              <AppSvgIcon icon="arrow-down-circle-outline" v-show="sortById.current === 'desc'" />
            </i>
          </button>
        </th>
        <th class="issues__title">Название</th>
        <th class="issues__title">
          <button class="issues__sort-btn" type="button" @click="switchSorting(sortByStatus)">
            Статус
            <i class="issues__sort-btn-icon">
              <AppSvgIcon icon="warning-outline" v-show="sortByStatus.current === 'critical'" class="is-critical" />
              <AppSvgIcon icon="alert-circle-outline" v-show="sortByStatus.current === 'bug'" class="is-bug" />
              <AppSvgIcon icon="information-circle-outline" v-show="sortByStatus.current === 'info'" class="is-info" />
            </i>
          </button>
        </th>
        <th class="issues__title">Исполнитель</th>
      </thead>
      <tbody>
        <tr class="issues__row" @click="$router.push({ name: 'Issue', params: { id: issue.id }})"
            v-for="issue in issuesFiltered" :key="issue.id" :class="[`issues__row--${issue.status.title}`]">
          <td class="issues__column">{{ issue.id }}</td>
          <td class="issues__column">{{ issue.title }} </td>
          <td class="issues__column issues__status">
            <span :class="['chip', `chip--${issue.status.title}`]" v-if="issue.status.title">
              {{ issue.status.title }}
            </span>
          </td>
          <td class="issues__column issues__responsible">
            <router-link  class="issues__responsible-link" :to="{ name: 'User', params: { id: issue.responsible.id }}"
                          v-if="issue.responsible.id">
              {{ issue.responsible.name }}
            </router-link>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  props: {
    issues: {
      type: Array,
    },
  },
  data: () => ({
    sortById: {
      current: '',
      types: ['', 'asc', 'desc'],
    },
    sortByStatus: {
      current: '',
      types: ['', 'critical', 'bug', 'info'],
    },
  }),
  computed: {
    issuesFiltered() {
      const issues = [...this.issues];

      // sort by id first
      issues.sort((issueA, issueB) => {
        switch(this.sortById.current) {
          case 'asc':
            if (issueA.id < issueB.id) {
              return -1;
            }
            if (issueA.id > issueB.id) {
              return 1;
            }
            return 0;

          case 'desc':
            if (issueA.id < issueB.id) {
              return 1;
            }
            if (issueA.id > issueB.id) {
              return -1;
            }
            return 0;

          default:
            return 0;
        }
      });

      // sort by status
      issues.sort((issueA, issueB) => {
        const sortType = this.sortByStatus.current;
        const isAMatches = issueA.status.title === sortType;
        const isBMatches = issueB.status.title === sortType;
        if (isAMatches && !isBMatches) {
          return -1;
        }
        if (!isAMatches && isBMatches) {
          return 1;
        }
        return 0;
      });

      return issues;
    },
  },
  methods: {
    switchSorting(sorting) {
      const types = sorting.types;
      const currentType = types.findIndex(item => item === sorting.current);
      sorting.current = types[currentType + 1] || types[0];
    },
  },
}
</script>

<style scoped>
.issues {
  background-color: #fff;
  border: 1px solid hsl(0, 0%, 90%);
  border-radius: .375rem;
  margin-bottom: 100px;
  margin-top: 50px;
  overflow: hidden;
}
.issues__table {
  width: 100%;
}
.issues__sort-btn {
  align-items: center;
  appearance: none;
  background: none;
  border: none;
  color: inherit;
  cursor: pointer;
  display: flex;
  font: inherit;
  padding: 0;
  text-transform: inherit;
  width: 100%;
}
.issues__sort-btn-icon {
  height: 1.65em;
  margin-left: 0.5em;
  width: 1.65em;
}
.issues__sort-btn-icon svg {
  height: 100%;
  width: 100%;
}
.issues__sort-btn-icon .is-critical {
  color: var(--color-error);
}
.issues__sort-btn-icon .is-bug {
  color: var(--color-warning);
}
.issues__title {
  font-size: 0.75rem;
  font-weight: 700;
  line-height: 1em;
  padding: 1.5rem 1rem;
  text-align: start;
  text-transform: uppercase;
}
.issues__row {
  border-top: 1px solid var(--color-grey);
  cursor: pointer;
}
.issues__row--critical td {
  background-color: #FFEBEE;
}
.issues__row--bug td {
  background-color: #FFF8E1;
}
.issues__column {
  padding: 1rem;
}
.issues__responsible-link {
  border-bottom: 1px solid;
  color: inherit;
  text-decoration: none;
}
</style>
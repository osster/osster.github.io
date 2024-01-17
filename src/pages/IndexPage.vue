<template>
  <q-page class="fit row justify-center items-start content-start">
    <div
        class="col-12 col-md-8 shadow-8"
        :class="{ 'q-my-none': $q.platform.is.mobile, 'q-my-xl': !$q.platform.is.mobile }"
    >
      <div class="row">
        <div class="col-12 col-md-4 bg-cyan-6 text-grey-2">

          <div class="row q-pa-md">
            <div class="col-5 col-md-12 flex flex-center">
              <q-avatar
                  :size="$q.platform.is.mobile ? '120px' : '320px'"
                  :class="{ 'q-ma-lg': !$q.platform.is.mobile }"
                  class="shadow-8"
              >
                <q-img src="~/assets/logo.jpeg" />
              </q-avatar>
            </div>
            <div class="col-7 col-md-12">
              <div
                  class="q-mb-md"
                  :class="{ 'q-mx-lg text-center': !$q.platform.is.mobile }"
              >
                <div v-if="data" class="text-h4 q-mt-md q-mb-sm">{{ data.name }}</div>
                <div v-if="data" class="text-h6">{{ data.role }}</div>
              </div>
            </div>
          </div>

          <q-separator/>

          <div class="row q-pa-md">
            <div class="col">
              <div class="text-h6 q-pl-md">
                {{ $t('cv.contactLabel') }}
              </div>
              <q-list v-if="data" class="q-mt-sm">
                <q-item>
                  <q-item-section>
                    <q-item-label>{{ $t('cv.emailLabel') }}</q-item-label>
                    <q-item-label overline>{{ data.contacts.email }}</q-item-label>
                  </q-item-section>
                </q-item>
                <q-item>
                  <q-item-section>
                    <q-item-label>{{ $t('cv.linkedLabel') }}</q-item-label>
                    <q-item-label overline>
                      <a :href="data.contacts.linkedin.url" target="_blank">
                        {{ data.contacts.linkedin.label }}
                      </a>
                    </q-item-label>
                  </q-item-section>

                </q-item>
              </q-list>
            </div>
          </div>

          <q-separator/>

          <div class="row q-pa-md">
            <div class="col">
              <div class="text-h6 q-pl-md">
                {{ $t('cv.skillsLabel') }}
              </div>
              <q-list v-if="data" class="q-mt-sm">
                <q-item v-for="(skill, i) in data.topSkills" :key="i">
                  <q-item-section>
                    <q-item-label overline>{{ skill }}</q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </div>
          </div>

          <q-separator/>

          <div class="row q-pa-md">
            <div class="col">
              <div class="text-h6 q-pl-md">
                {{ $t('cv.downloadsLabel') }}
              </div>


              <q-list v-if="data" class="q-mt-sm">
                <q-item>
                  <q-item-section v-for="(item, i) in data.downloads" :key="i">
                    <q-item-label overline>
                      <a :href="item.url" target="_blank">
                        {{ item.label }}
                      </a>
                    </q-item-label>
                  </q-item-section>

                </q-item>
              </q-list>
            </div>
          </div>
          <q-separator/>

        </div>
        <div class="col-12 col-md-8">
          <div class="q-pa-lg">
            <div class="text-h3 q-mx-lg q-mt-lg">{{ $t('cv.summaryLabel') }}</div>
            <div v-if="data" class="q-ma-lg text-body1 text-weight-regular">
              <p v-for="(p, i) in data.summary" :key="i" v-html="p" />
            </div>

            <q-space />
            <div class="q-px-lg q-py-md">
              <q-timeline v-if="data" color="secondary">
                <q-timeline-entry heading>
                  {{ $t('cv.experienceLabel') }}
                </q-timeline-entry>

                <q-timeline-entry
                    v-for="(item, i) in data.experience"
                    :key="i"
                    :title="`${item.title} - ${item.role}`"
                    :subtitle="stringifyRange(item.range)"
                >
                  <div>
                    <div class="text-grey-6 q-mb-sm">
                      <span>{{ item.location }}</span>
                    </div>
                    <div
                        v-if="item.skills"
                        class="text-grey-8 q-mb-sm"
                    >
                      <span
                          v-for="(item, i) in item.skills"
                          :key="i"
                          :class="{'q-ml-sm': i > 0}"
                      >
                        <span v-if="i > 0" class="q-mr-sm">-</span>
                        {{ item }}
                      </span>
                    </div>
                    <div v-html="item.description" class=" text-body2 text-weight-regular" />
                  </div>
                </q-timeline-entry>

              </q-timeline>
            </div>

            <q-space />
            <div
                v-if="data"
                class="q-px-lg q-py-md"
            >
              <q-timeline color="secondary">
                <q-timeline-entry heading>
                  {{ $t('cv.educationLabel') }}
                </q-timeline-entry>

                <q-timeline-entry
                    v-for="(item, i) in data.education"
                    :key="i"
                    :title="`${item.title}`"
                    :subtitle="stringifyRangeYears(item.range)"
                >
                  <div>
                    <div v-html="item.degree" class=" text-body2 text-weight-regular q-mb-sm" />
                    <div v-html="item.location" class="text-grey-6 q-mb-sm" />
                  </div>
                </q-timeline-entry>

              </q-timeline>
            </div>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { useQuasar } from 'quasar';
import { api } from 'boot/axios';

export default defineComponent({
  name: 'IndexPage',
  components: { },
  setup() {
    console.log('SETUP');
    const $q = useQuasar();
    const data = ref(null);

    api.get('/data/cv.json')
      .then((response) => {
        data.value = response.data;
      })
      .catch(() => {
        $q.notify({
          color: 'negative',
          position: 'top',
          message: 'Loading failed',
          icon: 'report_problem',
        });
      });

    return {
      data,
    };
  },

  mounted() {
    // const $q = useQuasar();
    console.log('MOUNTED');
  },

  methods: {
    stringifyRange(rangeArray = []) {
      if (rangeArray.length === 1) {
        // until present
        const from = new Date(rangeArray[0]);
        const to = new Date();
        let years = to.getFullYear() - from.getFullYear();
        let months = to.getMonth() - from.getMonth() + 1;
        if (months < 0) {
          months = 12 + months;
          years -= 1;
        }
        const fromStr = from.toLocaleString('en-us',{month:'short', year:'numeric'});
        const toStr = to.toLocaleString('en-us',{month:'short', year:'numeric'});
        const ageStr = `${years > 0 ? `${years} ${ this.$t('year', years)} ` : ''}${months > 0 ? `${months} ${ this.$t('month', months)}` : ''}`;

        return `${fromStr} - ${this.$t('present_time')} (${ageStr})`;
      } else if (rangeArray.length === 2) {
        const from = new Date(rangeArray[0]);
        const to = new Date(rangeArray[1]);
        let years = to.getFullYear() - from.getFullYear();
        let months = to.getMonth() - from.getMonth() + 1;
        if (months < 0) {
          months = 12 + months;
          years -= 1;
        }
        const fromStr = from.toLocaleString('en-us',{month:'short', year:'numeric'});
        const toStr = to.toLocaleString('en-us',{month:'short', year:'numeric'});
        const ageStr = `${years > 0 ? `${years} ${ this.$t('year', years)} ` : ''}${months > 0 ? `${months} ${this.$t('month', months)}` : ''}`;

        return `${fromStr} - ${toStr} (${ageStr})`;
      }
      return ""
    },
    stringifyRangeYears(rangeArray = []) {
      if (rangeArray.length === 1) {
        // until present
        const from = new Date(rangeArray[0]);
        const to = new Date();
        const years = to.getFullYear() - from.getFullYear();
        const fromStr = from.toLocaleString('en-us',{month:'short', year:'numeric'});
        const toStr = to.toLocaleString('en-us',{month:'short', year:'numeric'});
        const ageStr = `${years > 0 ? `${years} ${ this.$t('year', years)} ` : ''}`;

        return `${fromStr} - ${toStr} (${ageStr})`;
      } else if (rangeArray.length === 2) {
        const from = new Date(rangeArray[0]);
        const to = new Date(rangeArray[1]);
        const years = to.getFullYear() - from.getFullYear();
        const fromStr = from.toLocaleString('en-us',{month:'short', year:'numeric'});
        const toStr = to.toLocaleString('en-us',{month:'short', year:'numeric'});
        const ageStr = `${years > 0 ? `${years} ${ this.$t('year', years)} ` : ''}`;

        return `${fromStr} - ${toStr} (${ageStr})`;
      }
      return ""
    },
  },

});
</script>

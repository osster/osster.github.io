<template>
  <q-layout view="hHh lpR fFf">

    <!--
    <q-header elevated className="bg-primary text-white">
      <q-toolbar>
        <q-toolbar-title>
          {{ $t('layout.title') }}
        </q-toolbar-title>

        <q-btn dense flat round icon="menu" @click="toggleRightDrawer"/>
      </q-toolbar>
    </q-header>
    <q-drawer show-if-above v-model="rightDrawerOpen" side="right" behavior="desktop" elevated>
    </q-drawer>
    -->

    <q-page-container>
      <router-view/>
    </q-page-container>

    <assistant-chat />

    <!--
    <q-footer elevated className="bg-grey-8 text-white text-center">
      <q-toolbar>
        <q-toolbar-title>
          <div>
            <span class="text-subtitle1 q-mr-sm">{{ $t('layout.title') }}</span>
            <span class="text-overline">© 2009 - {{ year }}</span></div>
        </q-toolbar-title>
      </q-toolbar>
    </q-footer>
    -->

  </q-layout>
</template>

<script>
import { ref } from 'vue';
import AssistantChat from 'components/AssistantChat.vue'

export default {
  components: { AssistantChat },
  setup() {
    const year = ref(new Date().getFullYear());

    return {
      year,
    };
  },
};
</script>

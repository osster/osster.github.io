const routes = [
  {
    path: '/',
    // eslint-disable-next-line import/no-unresolved
    component: () => import('layouts/MainLayout.vue'),
    children: [
      // eslint-disable-next-line import/no-unresolved
      { path: '', component: () => import('pages/IndexPage.vue') },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    // eslint-disable-next-line import/no-unresolved
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;

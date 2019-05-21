import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
	linkActiveClass: 'active',
	routes: [
		{
			path: '/case',
			name: 'case-page',
			component: require('@/pages/case/index').default,
			meta: {
				requireAuth: true
			},
			children: [
				{
					path: '/',
					redirect: 'await',
					meta: {
						requireAuth: true
					},
				},
				{
					path: 'await',
					component: require('@/pages/case/Await').default,
					meta: {
						requireAuth: true
					},
				},
				{
					path: 'pay',
					component: require('@/pages/case/Pay').default,
					meta: {
						requireAuth: true
					},
				},
				{
					path: 'scheme',
					component: require('@/pages/case/Scheme').default,
					meta: {
						requireAuth: true
					}
				},
				{
					path: 'advisory',
					component: require('@/pages/case/Advisory').default,
					meta: {
						requireAuth: true
					}
				},
				{
					path: 'complete',
					component: require('@/pages/case/Complete').default,
					meta: {
						requireAuth: true
					}
				},
				{
					path: 'AuditFailure',
					component: require('@/pages/case/AuditFailure').default,
					meta: {
						requireAuth: true
					}
				}				
			]
		},
		{
			path: '/create',
			name: 'create',
			component: require('@/pages/create/index').default,
			meta: {
				requireAuth: true
			},
			children: [
				{
					path: '/',
					redirect: 'basic',
					meta: {
						requireAuth: true
					},
				},
				{
					path: 'basic',
					component: require('@/pages/Create/Basic').default,
					meta: {
						requireAuth: true
					},
				},
				{
					path: 'examine',
					component: require('@/pages/Create/Examine').default,
					meta: {
						requireAuth: true
					},
				},
				{
					path: 'photo',
					component: require('@/pages/Create/Photo').default,
					meta: {
						requireAuth: true
					},
				}
			]
		},
		{
			path: "/details",
			component: require('@/pages/details/index').default,
			meta: {
				requireAuth: true
			},
			children: [
				{
					path: 'info',
					component: require('@/pages/details/Content').default,
					meta: {
						requireAuth: true
					},
					children: [
						{
							path: 'case',
							component: require('@/pages/details/CaseInfo').default,
							meta: {
								requireAuth: true
							}
						},
						{
							path: 'scheme',
							component: require('@/pages/details/SchemeInfo').default,
							meta: {
								requireAuth: true
							}
						},
					]
				},
				{
					path: 'pay',
					component: require('@/pages/details/PayInfo').default,
					meta: {
						requireAuth: true
					}
				}
			]
		},
		{
			path: '/patient',
			name: 'patient-page',
			component: require('@/pages/patient/index').default,
			meta: {
				requireAuth: true
			},
		},
		{
			path: '/login',
			name: 'login',
			component: require('@/pages/login/index').default
		},
		{
			path: '*',
			redirect: '/case',
			meta: {
				requireAuth: true
			},
		}
	]
})

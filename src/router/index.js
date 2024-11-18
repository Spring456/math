import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { useUserStore } from '@/stores/user'
import { ElMessage } from 'element-plus'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/course',
    name: 'course',
    component: () => import('../views/CourseView.vue'),
    children: [
      {
        path: 'primary',
        name: 'primary',
        component: () => import('../views/course/PrimaryCourseView.vue')
      },
      {
        path: 'junior',
        name: 'junior',
        component: () => import('../views/course/JuniorCourseView.vue')
      },
      {
        path: 'special',
        name: 'special',
        component: () => import('../views/course/SpecialCourseView.vue')
      }
    ]
  },
  {
    path: '/exercise',
    name: 'exercise',
    component: () => import('../views/ExerciseView.vue')
  },
  {
    path: '/exercise/:id',
    name: 'exercise-detail',
    component: () => import('../views/exercise/ExerciseDetailView.vue'),
    props: true
  },
  {
    path: '/exercise/:id/exam',
    name: 'exercise-exam',
    component: () => import('../views/exercise/ExerciseExamView.vue'),
    props: true,
    meta: { requiresAuth: true }
  },
  {
    path: '/funmath',
    name: 'funmath',
    component: () => import('../views/FunMathView.vue')
  },
  {
    path: '/community',
    name: 'community',
    component: () => import('../views/CommunityView.vue')
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/AboutView.vue')
  },
  {
    path: '/profile',
    name: 'profile',
    component: () => import('../views/user/ProfileView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/settings',
    name: 'settings',
    component: () => import('../views/user/SettingsView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/course/:type/:id/learn',
    name: 'course-learning',
    component: () => import('../views/course/CourseLearningView.vue'),
    props: true
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// 路由守卫
router.beforeEach((to, from, next) => {
  const userStore = useUserStore()
  
  if (to.meta.requiresAuth && !userStore.isLoggedIn) {
    ElMessage.warning('请先登录')
    next('/')
  } else {
    next()
  }
})

export default router 
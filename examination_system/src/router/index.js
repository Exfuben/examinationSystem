import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('../views/Home/index.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login/index.vue')
  },
  {
    path: '/manager',
    name: 'Manager',
    // redirect: '/manager/userForm',
    component: () => import('../views/Manager/index.vue'),
    children: [
      {
        path: 'userForm',
        name: 'UserForm',
        component: () => import('../views/Manager/UserManage/UserForm.vue')
      },
      {
        path: 'queForm',
        name: 'QuerForm',
        component: () => import('../views/Manager/queManage/queForm.vue')
      }
    ]
  },
  {
    path: '/teather',
    name: 'Teather',
    component: () => import('../views/Teather/index.vue'),
    children: [
      {
        path: 'teaCourse',
        name: 'TeaCourse',
        component: () => import('../views/Teather/teatherCourse/course.vue')
      },
      {
        path: 'quesManage',
        name: 'QuesManage',
        component: () => import('../views/Teather/quesManage/questions.vue')
      },
      {
        path: 'paperManage',
        name: 'PaperManage',
        component: () => import('../views/Teather/paperManage/papers.vue')
      },
      {
        path: 'stuPaperManage',
        name: 'StuPaperManage',
        component: () => import('../views/Teather/stuPaperManage/stuPaperManage.vue')
      }
    ]
  },
  {
    path: '/student',
    name: 'Student',
    component: () => import('../views/Student/index.vue'),
    children: [
      {
        path: 'exams',
        name: 'Exams',
        component: () => import('../views/Student/exams/exams.vue')
      },
      {
        path: 'answers',
        name: 'Answers',
        component: () => import('../views/Student/answers/answers.vue')
      },
      {
        path: 'course',
        name: 'Course',
        component: () => import('../views/Student/course/course.vue')
      }
    ]
  },
  {
    path: '/exam',
    name: 'Exam',
    component: () => import('../views/Student/exams/exam.vue')
  },
  {
    path: '/answer',
    name: 'Answer',
    component: () => import('../views/Student/answers/answer.vue')
  },
  {
    path: '/paper',
    name: 'Paper',
    component: () => import('../views/Teather/paperManage/paper.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router

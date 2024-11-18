<template>
  <div class="hot-content">
    <el-card>
      <template #header>
        <div class="header">
          <div class="title">
            <el-icon><Star /></el-icon>
            <span>热门推荐</span>
          </div>
          <el-button text @click="handleViewMore">
            更多
            <el-icon><ArrowRight /></el-icon>
          </el-button>
        </div>
      </template>

      <el-row :gutter="20">
        <el-col :xs="24" :sm="12" :md="8" v-for="item in hotItems" :key="item.id">
          <el-card class="course-card" :body-style="{ padding: '0px' }">
            <el-image :src="item.image" class="course-image" fit="cover" />
            <div class="course-info">
              <h3 class="course-title">{{ item.title }}</h3>
              <p class="course-desc">{{ item.description }}</p>
              <div class="course-footer">
                <el-tag size="small" :type="item.tagType">{{ item.tag }}</el-tag>
                <el-button type="primary" size="small" text @click="startLearning(item)">
                  立即学习
                  <el-icon><ArrowRight /></el-icon>
                </el-button>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Star, ArrowRight } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const hotItems = ref([
  {
    id: 1,
    title: '小学数学思维训练',
    description: '通过趣味故事培养数学思维，让孩子爱上数学',
    image: 'https://picsum.photos/400/300?random=1',
    tag: '思维训练',
    tagType: 'success',
    courseType: 'primary',
    courseId: '1'
  },
  {
    id: 2,
    title: '初中几何专题',
    description: '系统讲解几何证明方法，图形与证明的奥秘',
    image: 'https://picsum.photos/400/300?random=2',
    tag: '几何',
    tagType: 'warning',
    courseType: 'junior',
    courseId: '2'
  },
  {
    id: 3,
    title: '奥数精选题',
    description: '精选奥数经典题目，培养数学竞赛能力',
    image: 'https://picsum.photos/400/300?random=3',
    tag: '奥数',
    tagType: 'danger',
    courseType: 'special',
    courseId: '3'
  }
])

const startLearning = (course) => {
  switch (course.courseType) {
    case 'primary':
      router.push({
        path: '/course/primary',
        query: { courseId: course.courseId }
      })
      break
    case 'junior':
      router.push({
        path: '/course/junior',
        query: { courseId: course.courseId }
      })
      break
    case 'special':
      router.push({
        path: '/course/special',
        query: { courseId: course.courseId }
      })
      break
    default:
      router.push('/course')
  }
}

const handleViewMore = () => {
  router.push('/course')
}
</script>

<style scoped>
.hot-content {
  margin-bottom: 20px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.title {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 16px;
  font-weight: bold;
}

.course-card {
  margin-bottom: 20px;
  transition: all 0.3s;
  cursor: pointer;
}

.course-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 2px 12px 0 rgba(0,0,0,0.1);
}

.course-image {
  width: 100%;
  height: 160px;
}

.course-info {
  padding: 14px;
}

.course-title {
  margin: 0;
  font-size: 16px;
  font-weight: bold;
  color: var(--el-text-color-primary);
}

.course-desc {
  margin: 8px 0;
  font-size: 13px;
  color: var(--el-text-color-secondary);
  line-height: 1.5;
  height: 40px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.course-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
}
</style> 
<template>
  <div class="special-course">
    <el-card class="course-section">
      <template #header>
        <div class="section-header">
          <div class="title">
            <el-icon><Trophy /></el-icon>
            <span>奥数精选课程</span>
          </div>
        </div>
      </template>

      <el-row :gutter="20">
        <el-col 
          v-for="course in courses" 
          :key="course.id"
          :xs="24"
          :sm="12"
          :md="8"
          :lg="6"
        >
          <el-card class="course-card" shadow="hover">
            <div class="course-icon">
              <el-icon :size="40" :color="course.iconColor">
                <component :is="course.icon" />
              </el-icon>
            </div>
            <h3 class="course-title">{{ course.title }}</h3>
            <p class="course-desc">{{ course.description }}</p>
            <div class="course-footer">
              <el-tag size="small" :type="course.tagType">{{ course.tag }}</el-tag>
              <el-button type="primary" size="small" @click="startLearning(course)">
                开始学习
              </el-button>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { Trophy } from '@element-plus/icons-vue'

const route = useRoute()

// 处理路由参数
onMounted(() => {
  const courseId = route.query.courseId
  if (courseId) {
    console.log('加载特殊课程:', courseId)
    // TODO: 根据courseId加载具体课程内容
  }
})

const courses = ref([
  {
    id: 1,
    title: '小学奥数入门',
    description: '培养数学思维，提升解题能力',
    icon: 'Operation',
    iconColor: '#409EFF',
    tag: '入门',
    tagType: 'primary'
  },
  {
    id: 2,
    title: '初中奥数进阶',
    description: '系统学习奥数解题技巧',
    icon: 'Histogram',
    iconColor: '#67C23A',
    tag: '进阶',
    tagType: 'success'
  },
  {
    id: 3,
    title: '数学竞赛专题',
    description: '针对各类数学竞赛的专项训练',
    icon: 'Trophy',
    iconColor: '#E6A23C',
    tag: '竞赛',
    tagType: 'warning'
  },
  {
    id: 4,
    title: '数学思维训练',
    description: '提升数学逻辑思维能力',
    icon: 'DataLine',
    iconColor: '#F56C6C',
    tag: '思维',
    tagType: 'danger'
  }
])

const startLearning = (course) => {
  // TODO: 实现课程学习逻辑
  console.log('开始学习课程:', course.title)
}
</script>

<style scoped>
.special-course {
  padding: 20px;
}

.course-section {
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.title {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 18px;
  font-weight: bold;
}

.course-card {
  margin-bottom: 20px;
  height: 100%;
  transition: all 0.3s;
}

.course-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.course-icon {
  text-align: center;
  margin-bottom: 15px;
}

.course-title {
  margin: 0 0 10px;
  font-size: 16px;
  color: var(--el-text-color-primary);
}

.course-desc {
  margin: 0 0 15px;
  font-size: 14px;
  color: var(--el-text-color-secondary);
  line-height: 1.5;
  min-height: 42px;
}

.course-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style> 
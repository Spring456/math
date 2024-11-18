<template>
  <div class="grade-list">
    <div v-for="grade in grades" :key="grade.grade" class="grade-section">
      <h3 class="grade-title">{{ grade.grade }}</h3>
      <el-row :gutter="20">
        <el-col 
          v-for="course in grade.courses" 
          :key="course.id"
          :xs="24"
          :sm="12"
          :md="8"
          :lg="6"
        >
          <el-card class="course-card" shadow="hover">
            <div class="course-icon">
              <el-icon :size="40"><component :is="course.icon" /></el-icon>
            </div>
            <h4 class="course-title">{{ course.title }}</h4>
            <el-button type="primary" text>
              开始学习
              <el-icon><ArrowRight /></el-icon>
            </el-button>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script setup>
import { ArrowRight } from '@element-plus/icons-vue'

defineProps({
  grades: {
    type: Array,
    required: true
  }
})
</script>

<style scoped>
.grade-section {
  margin-bottom: 30px;
}

.grade-title {
  font-size: 18px;
  margin-bottom: 20px;
  padding-left: 10px;
  border-left: 4px solid var(--el-color-primary);
}

.course-card {
  height: 160px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  margin-bottom: 20px;
  cursor: pointer;
  transition: all 0.3s;
}

.course-card:hover {
  transform: translateY(-5px);
}

.course-icon {
  color: var(--el-color-primary);
  margin-bottom: 10px;
}

.course-title {
  margin: 10px 0;
  font-size: 16px;
  color: var(--el-text-color-primary);
}
</style> 
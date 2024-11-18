<template>
  <div class="exercise-detail">
    <el-card class="exercise-info">
      <template #header>
        <div class="header">
          <h2>{{ exercise.title }}</h2>
          <el-tag :type="exercise.difficulty">{{ exercise.difficultyText }}</el-tag>
        </div>
      </template>
      
      <p class="description">{{ exercise.description }}</p>
      <div class="meta">
        <span>题目数量：{{ exercise.questionCount }}</span>
        <span>预计用时：{{ exercise.estimatedTime }}分钟</span>
      </div>

      <div class="actions">
        <el-button type="primary" @click="startExam">开始答题</el-button>
        <el-button @click="goBack">返回列表</el-button>
      </div>
    </el-card>

    <!-- 练习说明 -->
    <el-card class="instructions">
      <template #header>
        <div class="header">
          <h3>练习说明</h3>
        </div>
      </template>
      <ol>
        <li>本练习共{{ exercise.questionCount }}道题目</li>
        <li>题目类型包括：选择题、填空题、计算题</li>
        <li>答题过程中可以随时保存进度</li>
        <li>完成后可以查看详细解析</li>
      </ol>
    </el-card>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

// 练习数据映射
const exerciseMap = {
  1: {
    title: '一年级加减法练习',
    description: '针对20以内的加减法运算训练，通过生动有趣的题目帮助学生掌握基础运算。',
    difficulty: 'success',
    difficultyText: '简单',
    questionCount: 20,
    estimatedTime: 30,
    type: 'primary'
  },
  2: {
    title: '几何图形专项练习',
    description: '针对三角形、四边形的性质与计算进行专项训练，帮助学生掌握几何图形的基本概念。',
    difficulty: 'warning',
    difficultyText: '中等',
    questionCount: 15,
    estimatedTime: 25,
    type: 'geometry'
  }
}

const exercise = ref({})

onMounted(() => {
  const exerciseId = route.params.id
  // 根据ID加载对应的练习内容
  exercise.value = exerciseMap[exerciseId] || exerciseMap[1]
})

const startExam = () => {
  router.push({
    path: `/exercise/${route.params.id}/exam`,
    query: { type: exercise.value.type }
  })
}

const goBack = () => {
  router.push('/exercise')
}
</script>

<style scoped>
.exercise-detail {
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
}

.exercise-info {
  margin-bottom: 20px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header h2 {
  margin: 0;
  font-size: 20px;
}

.description {
  color: var(--el-text-color-regular);
  line-height: 1.6;
  margin: 20px 0;
}

.meta {
  display: flex;
  gap: 20px;
  color: var(--el-text-color-secondary);
  margin-bottom: 20px;
}

.actions {
  display: flex;
  gap: 10px;
  justify-content: center;
  margin-top: 30px;
}

.instructions ol {
  color: var(--el-text-color-regular);
  line-height: 1.8;
  padding-left: 20px;
}
</style> 
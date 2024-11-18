<template>
  <div class="profile-view">
    <el-row :gutter="20">
      <!-- 左侧用户信息 -->
      <el-col :span="8">
        <el-card class="user-card">
          <div class="user-info">
            <el-avatar :size="100" :src="userStore.userInfo?.avatar" />
            <h2>{{ userStore.userInfo?.username }}</h2>
            <p class="user-type">{{ userTypeText }}</p>
            <div class="user-stats">
              <div class="stat-item">
                <div class="stat-value">{{ userStats.courses }}</div>
                <div class="stat-label">学习课程</div>
              </div>
              <div class="stat-item">
                <div class="stat-value">{{ userStats.exercises }}</div>
                <div class="stat-label">完成练习</div>
              </div>
              <div class="stat-item">
                <div class="stat-value">{{ userStats.posts }}</div>
                <div class="stat-label">发布讨论</div>
              </div>
            </div>
          </div>
        </el-card>
      </el-col>

      <!-- 右侧内容区 -->
      <el-col :span="16">
        <!-- 学习进度 -->
        <el-card class="progress-card">
          <template #header>
            <div class="card-header">
              <span>学习进度</span>
            </div>
          </template>
          <div class="progress-list">
            <div v-for="course in recentCourses" :key="course.id" class="progress-item">
              <div class="course-info">
                <h4>{{ course.title }}</h4>
                <p>{{ course.description }}</p>
              </div>
              <div class="progress-bar">
                <el-progress
                  :percentage="course.progress"
                  :status="course.progress === 100 ? 'success' : ''"
                />
              </div>
            </div>
          </div>
        </el-card>

        <!-- 最近活动 -->
        <el-card class="activity-card">
          <template #header>
            <div class="card-header">
              <span>最近活动</span>
            </div>
          </template>
          <el-timeline>
            <el-timeline-item
              v-for="activity in recentActivities"
              :key="activity.id"
              :timestamp="activity.time"
              :type="activity.type"
            >
              {{ activity.content }}
            </el-timeline-item>
          </el-timeline>
        </el-card>

        <!-- 练习记录 -->
        <el-card class="exercise-records">
          <template #header>
            <div class="card-header">
              <span>练习记录</span>
              <div class="stats">
                <el-tag type="success">总练习次数：{{ exerciseStore.totalExercises }}</el-tag>
                <el-tag type="warning">平均正确率：{{ exerciseStore.correctRate }}%</el-tag>
              </div>
            </div>
          </template>
          
          <el-table :data="exerciseStore.exerciseRecords" style="width: 100%">
            <el-table-column prop="date" label="日期" width="180">
              <template #default="scope">
                {{ new Date(scope.row.date).toLocaleString() }}
              </template>
            </el-table-column>
            <el-table-column prop="title" label="练习名称" />
            <el-table-column prop="type" label="类型" width="100" />
            <el-table-column prop="score" label="得分" width="80">
              <template #default="scope">
                <span :class="{ 'text-success': scope.row.score >= 60 }">
                  {{ scope.row.score }}
                </span>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="100">
              <template #default="scope">
                <el-button 
                  link 
                  type="primary" 
                  @click="showExerciseDetail(scope.row)"
                >
                  查看详情
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>
    </el-row>

    <!-- 练习详情对话框 -->
    <el-dialog
      v-model="detailDialogVisible"
      title="练习详情"
      width="60%"
    >
      <template v-if="selectedExercise">
        <div class="exercise-detail">
          <div class="detail-header">
            <h3>{{ selectedExercise.title }}</h3>
            <div class="detail-meta">
              <span>得分：{{ selectedExercise.score }}</span>
              <span>正确：{{ selectedExercise.correctCount }}/{{ selectedExercise.totalQuestions }}</span>
            </div>
          </div>
          
          <div class="questions-list">
            <div 
              v-for="(question, index) in selectedExercise.questions" 
              :key="index"
              class="question-item"
            >
              <div class="question-header">
                <span class="question-number">第 {{ index + 1 }} 题</span>
                <el-tag 
                  :type="selectedExercise.answers[index] === question.answer ? 'success' : 'danger'"
                >
                  {{ selectedExercise.answers[index] === question.answer ? '正确' : '错误' }}
                </el-tag>
              </div>
              <p class="question-title">{{ question.title }}</p>
              <div class="answer-info">
                <p>你的答案：{{ selectedExercise.answers[index] || '未作答' }}</p>
                <p>正确答案：{{ question.answer }}</p>
              </div>
            </div>
          </div>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useUserStore } from '@/stores/user'
import { useExerciseStore } from '@/stores/exercise'

const userStore = useUserStore()
const exerciseStore = useExerciseStore()
const detailDialogVisible = ref(false)
const selectedExercise = ref(null)

// 用户类型文本
const userTypeText = computed(() => {
  const typeMap = {
    student: '学生',
    parent: '家长',
    teacher: '教师'
  }
  return typeMap[userStore.userInfo?.userType] || '用户'
})

// 用户统计数据
const userStats = ref({
  courses: 12,
  exercises: 156,
  posts: 8
})

// 最近课程
const recentCourses = ref([
  {
    id: 1,
    title: '小学数学思维训练',
    description: '通过趣味故事培养数学思维',
    progress: 80
  },
  {
    id: 2,
    title: '初中几何专题',
    description: '图形与证明的奥秘',
    progress: 45
  },
  {
    id: 3,
    title: '奥数精选题',
    description: '挑战你的数学极限',
    progress: 100
  }
])

// 最近活动
const recentActivities = ref([
  {
    id: 1,
    content: '完成了《小学数学思维训练》第三章的学习',
    time: '2024-03-15 10:30',
    type: 'success'
  },
  {
    id: 2,
    content: '参与了"24点游戏"挑战',
    time: '2024-03-14 15:45',
    type: 'primary'
  },
  {
    id: 3,
    content: '在社区发布了一个问题讨论',
    time: '2024-03-13 09:15',
    type: 'info'
  }
])

const showExerciseDetail = (exercise) => {
  selectedExercise.value = exercise
  detailDialogVisible.value = true
}
</script>

<style scoped>
.profile-view {
  padding: 20px;
}

.user-card {
  text-align: center;
  padding: 20px;
}

.user-info h2 {
  margin: 15px 0 5px;
}

.user-type {
  color: var(--el-text-color-secondary);
  margin-bottom: 20px;
}

.user-stats {
  display: flex;
  justify-content: space-around;
  margin-top: 30px;
  border-top: 1px solid var(--el-border-color-lighter);
  padding-top: 20px;
}

.stat-item {
  text-align: center;
}

.stat-value {
  font-size: 24px;
  font-weight: bold;
  color: var(--el-color-primary);
}

.stat-label {
  font-size: 14px;
  color: var(--el-text-color-secondary);
  margin-top: 5px;
}

.progress-card,
.activity-card {
  margin-bottom: 20px;
}

.progress-item {
  margin-bottom: 20px;
}

.course-info h4 {
  margin: 0 0 5px;
  font-size: 16px;
}

.course-info p {
  margin: 0 0 10px;
  font-size: 14px;
  color: var(--el-text-color-secondary);
}

.card-header {
  font-weight: bold;
}

.exercise-records {
  margin-top: 20px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.stats {
  display: flex;
  gap: 10px;
}

.text-success {
  color: var(--el-color-success);
}

.exercise-detail {
  padding: 20px;
}

.detail-header {
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 1px solid var(--el-border-color-lighter);
}

.detail-meta {
  display: flex;
  gap: 20px;
  color: var(--el-text-color-secondary);
  margin-top: 10px;
}

.question-item {
  margin-bottom: 20px;
  padding: 15px;
  border: 1px solid var(--el-border-color-lighter);
  border-radius: 4px;
}

.question-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.question-number {
  font-weight: bold;
}

.question-title {
  margin: 10px 0;
}

.answer-info {
  margin-top: 10px;
  color: var(--el-text-color-regular);
}
</style> 
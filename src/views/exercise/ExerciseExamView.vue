<template>
  <div class="exercise-exam">
    <!-- 顶部进度条 -->
    <el-progress 
      :percentage="progress" 
      :format="progressFormat"
      class="progress-bar"
    />

    <!-- 题目内容 -->
    <el-card class="question-card">
      <div class="question-header">
        <span class="question-number">第 {{ currentIndex + 1 }} 题</span>
        <el-tag>{{ currentQuestion.type }}</el-tag>
      </div>

      <div class="question-content">
        <h3>{{ currentQuestion.title }}</h3>
        
        <!-- 显示题目图片 -->
        <div v-if="currentQuestion.image" class="question-image">
          <el-image 
            :src="currentQuestion.image" 
            fit="contain"
            :preview-src-list="[currentQuestion.image]"
          />
        </div>
        
        <!-- 选择题 -->
        <template v-if="currentQuestion.type === '选择题'">
          <el-radio-group v-model="userAnswer" class="options-list">
            <el-radio 
              v-for="(option, index) in currentQuestion.options" 
              :key="index"
              :label="option.value"
              class="option-item"
            >
              <!-- 显示选项图片 -->
              <div class="option-content">
                <img 
                  v-if="option.image" 
                  :src="option.image" 
                  class="option-image"
                />
                <span>{{ option.label }}</span>
              </div>
            </el-radio>
          </el-radio-group>
        </template>

        <!-- 填空题 -->
        <template v-else-if="currentQuestion.type === '填空题'">
          <el-input
            v-model="userAnswer"
            placeholder="请输入答案"
            class="answer-input"
          />
        </template>

        <!-- 计算题 -->
        <template v-else>
          <el-input
            v-model="userAnswer"
            type="textarea"
            rows="4"
            placeholder="请输入答案和计算过程"
            class="answer-input"
          />
        </template>
      </div>
    </el-card>

    <!-- 底部操作栏 -->
    <div class="action-bar">
      <el-button @click="previousQuestion" :disabled="currentIndex === 0">
        上一题
      </el-button>
      <el-button type="primary" @click="nextQuestion" v-if="!isLastQuestion">
        下一题
      </el-button>
      <el-button type="success" @click="submitExam" v-else>
        提交答案
      </el-button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ElMessageBox, ElMessage } from 'element-plus'
import { useExerciseStore } from '@/stores/exercise'

const route = useRoute()
const router = useRouter()
const exerciseStore = useExerciseStore()

// 几何练习题目
const geometryQuestions = ref([
  {
    id: 1,
    type: '选择题',
    title: '下列图形中，属于三角形的是（ ）',
    image: '/images/geometry/shapes.svg',
    options: [
      { label: 'A. 正方形', value: 'A', image: '/images/geometry/square.svg' },
      { label: 'B. 等腰三角形', value: 'B', image: '/images/geometry/isosceles.svg' },
      { label: 'C. 长方形', value: 'C', image: '/images/geometry/rectangle.svg' },
      { label: 'D. 圆形', value: 'D', image: '/images/geometry/circle.svg' }
    ],
    answer: 'B'
  },
  {
    id: 2,
    type: '选择题',
    title: '三角形的内角和等于（ ）',
    options: [
      { label: 'A. 90度', value: 'A' },
      { label: 'B. 120度', value: 'B' },
      { label: 'C. 180度', value: 'C' },
      { label: 'D. 360度', value: 'D' }
    ],
    answer: 'C'
  },
  {
    id: 3,
    type: '选择题',
    title: '等腰三角形的两个底角（ ）',
    options: [
      { label: 'A. 相等', value: 'A' },
      { label: 'B. 不相等', value: 'B' },
      { label: 'C. 都是直角', value: 'C' },
      { label: 'D. 都是钝角', value: 'D' }
    ],
    answer: 'A'
  },
  {
    id: 4,
    type: '填空题',
    title: '直角三角形的两个锐角互为（ ）',
    answer: '余角'
  },
  {
    id: 5,
    type: '填空题',
    title: '三角形中，最大的角对着最长的（ ）',
    answer: '边'
  },
  {
    id: 6,
    type: '选择题',
    title: '下列三角形中，哪个是直角三角形（ ）',
    options: [
      { label: 'A. 等边三角形', value: 'A' },
      { label: 'B. 锐角三角形', value: 'B' },
      { label: 'C. 一个角是90度的三角形', value: 'C' },
      { label: 'D. 钝角三角形', value: 'D' }
    ],
    answer: 'C'
  },
  {
    id: 7,
    type: '计算题',
    title: '一个三角形的三个内角分别是30度、60度和90度，求这个三角形的最大内角是多少度？',
    answer: '90'
  },
  {
    id: 8,
    type: '选择题',
    title: '等边三角形的三个内角都等于（ ）',
    options: [
      { label: 'A. 30度', value: 'A' },
      { label: 'B. 45度', value: 'B' },
      { label: 'C. 60度', value: 'C' },
      { label: 'D. 90度', value: 'D' }
    ],
    answer: 'C'
  },
  {
    id: 9,
    type: '填空题',
    title: '三角形的三个外角和等于（ ）度',
    answer: '360'
  },
  {
    id: 10,
    type: '计算题',
    title: '一个等腰三角形的顶角是36度，求它的底角是多少度？',
    answer: '72'
  },
  {
    id: 11,
    type: '选择题',
    title: '关于三角形的说法，错误是（ ）',
    options: [
      { label: 'A. 三角形有三个顶点', value: 'A' },
      { label: 'B. 三角形有三条边', value: 'B' },
      { label: 'C. 三角形的三个内角和等于360度', value: 'C' },
      { label: 'D. 三角形有三个内角', value: 'D' }
    ],
    answer: 'C'
  },
  {
    id: 12,
    type: '填空题',
    title: '直角三角形的斜边是最（ ）的边',
    answer: '长'
  },
  {
    id: 13,
    type: '计算题',
    title: '一个三角形的两个内角分别是45度和45度，求第三个内角的度数。',
    answer: '90'
  },
  {
    id: 14,
    type: '选择题',
    title: '等腰三角形至少有（ ）条相等的边',
    options: [
      { label: 'A. 1', value: 'A' },
      { label: 'B. 2', value: 'B' },
      { label: 'C. 3', value: 'C' },
      { label: 'D. 4', value: 'D' }
    ],
    answer: 'B'
  },
  {
    id: 15,
    type: '计算题',
    title: '一个三角形的一个外角是150度，它的内角是多少度？',
    answer: '30'
  }
])

// 更新题目数据
const questions = ref([
  {
    id: 1,
    type: '选择题',
    title: '在20以内的数中，比12大且比15小的数是（ ）',
    options: [
      { label: 'A. 11', value: 'A' },
      { label: 'B. 13', value: 'B' },
      { label: 'C. 16', value: 'C' },
      { label: 'D. 14', value: 'D' }
    ],
    answer: 'B'
  },
  {
    id: 2,
    type: '选择题',
    title: '下列数中，最大的数是（ ）',
    options: [
      { label: 'A. 12', value: 'A' },
      { label: 'B. 15', value: 'B' },
      { label: 'C. 9', value: 'C' },
      { label: 'D. 18', value: 'D' }
    ],
    answer: 'D'
  },
  {
    id: 3,
    type: '填空题',
    title: '7+8=（ ）',
    answer: '15'
  },
  {
    id: 4,
    type: '填空题',
    title: '20-6=（ ）',
    answer: '14'
  },
  {
    id: 5,
    type: '填空题',
    title: '13+5=（ ）',
    answer: '18'
  },
  {
    id: 6,
    type: '选择题',
    title: '下列算式中，结果最小的是（ ）',
    options: [
      { label: 'A. 5+8', value: 'A' },
      { label: 'B. 20-8', value: 'B' },
      { label: 'C. 15-7', value: 'C' },
      { label: 'D. 15-2', value: 'D' }
    ],
    answer: 'A'
  },
  {
    id: 7,
    type: '填空题',
    title: '16-9=（ ）',
    answer: '7'
  },
  {
    id: 8,
    type: '选择题',
    title: '下列数中，比10小的数是（ ）',
    options: [
      { label: 'A. 14', value: 'A' },
      { label: 'B. 15', value: 'B' },
      { label: 'C. 8', value: 'C' },
      { label: 'D. 18', value: 'D' }
    ],
    answer: 'C'
  },
  {
    id: 9,
    type: '填空题',
    title: '9+7=（ ）',
    answer: '16'
  },
  {
    id: 10,
    type: '填空题',
    title: '12-5=（ ）',
    answer: '7'
  },
  {
    id: 11,
    type: '计算题',
    title: '小明有15个贴纸，送给了小红6个，请问小明还剩几个贴纸？',
    answer: '9'
  },
  {
    id: 12,
    type: '选择题',
    title: '下列数中，最小的数是（ ）',
    options: [
      { label: 'A. 8', value: 'A' },
      { label: 'B. 12', value: 'B' },
      { label: 'C. 6', value: 'C' },
      { label: 'D. 10', value: 'D' }
    ],
    answer: 'C'
  },
  {
    id: 13,
    type: '填空题',
    title: '6+9=（ ）',
    answer: '15'
  },
  {
    id: 14,
    type: '填空题',
    title: '17-8=（ ）',
    answer: '9'
  },
  {
    id: 15,
    type: '计算题',
    title: '小红有12个气球，又买了5个，请问小红现在有多少个气球？',
    answer: '17'
  },
  {
    id: 16,
    type: '选择题',
    title: '20减去一个数等于13，这个数是（ ）',
    options: [
      { label: 'A. 6', value: 'A' },
      { label: 'B. 7', value: 'B' },
      { label: 'C. 8', value: 'C' },
      { label: 'D. 9', value: 'D' }
    ],
    answer: 'B'
  },
  {
    id: 17,
    type: '填空题',
    title: '8+7=（ ）',
    answer: '15'
  },
  {
    id: 18,
    type: '计算题',
    title: '小明有10个苹果，吃掉了3个，请问还剩几个苹果？',
    answer: '7'
  },
  {
    id: 19,
    type: '选择题',
    title: '下列算式中，结果最大的是（ ）',
    options: [
      { label: 'A. 8+9', value: 'A' },
      { label: 'B. 20-3', value: 'B' },
      { label: 'C. 11+6', value: 'C' },
      { label: 'D. 16-1', value: 'D' }
    ],
    answer: 'B'
  },
  {
    id: 20,
    type: '计算题',
    title: '小明和小红一共有18个贴纸，小明有10个，那么小红有多少个贴纸？',
    answer: '8'
  }
])

const currentIndex = ref(0)
const userAnswer = ref('')
const userAnswers = ref([])

// 计算当前题目
const currentQuestion = computed(() => questions.value[currentIndex.value])

// 计算是否为最后一题
const isLastQuestion = computed(() => currentIndex.value === questions.value.length - 1)

// 计算进度百分比
const progress = computed(() => {
  return Math.round(((currentIndex.value + 1) / questions.value.length) * 100)
})

const progressFormat = (percentage) => {
  return `${currentIndex.value + 1}/${questions.value.length}`
}

// 上一题
const previousQuestion = () => {
  if (currentIndex.value > 0) {
    saveCurrentAnswer()
    currentIndex.value--
    loadSavedAnswer()
  }
}

// 下一题
const nextQuestion = () => {
  if (currentIndex.value < questions.value.length - 1) {
    saveCurrentAnswer()
    currentIndex.value++
    loadSavedAnswer()
  }
}

// 保存当前答案
const saveCurrentAnswer = () => {
  userAnswers.value[currentIndex.value] = userAnswer.value
}

// 加载已保存的答案
const loadSavedAnswer = () => {
  userAnswer.value = userAnswers.value[currentIndex.value] || ''
}

// 提交答案
const submitExam = () => {
  saveCurrentAnswer()
  ElMessageBox.confirm(
    '确定要提交答案吗？提交后将无法修改',
    '提示',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }
  ).then(() => {
    // 计算得分
    let correctCount = 0
    questions.value.forEach((question, index) => {
      if (userAnswers.value[index] === question.answer) {
        correctCount++
      }
    })

    // 添加练习记录
    exerciseStore.addExerciseRecord({
      title: route.query.type === 'geometry' ? '几何图形专项练习' : '一年级加减法练习',
      type: route.query.type === 'geometry' ? '专项练习' : '同步练习',
      totalQuestions: questions.value.length,
      correctCount,
      score: Math.round((correctCount / questions.value.length) * 100),
      answers: userAnswers.value,
      questions: questions.value
    })

    ElMessage.success(`练习完成！正确率：${Math.round((correctCount / questions.value.length) * 100)}%`)
    router.push('/profile')
  })
}

onMounted(() => {
  // 根据练习类型选择题目
  const exerciseType = route.query.type
  if (exerciseType === 'geometry') {
    questions.value = geometryQuestions.value
  }
  // 初始化答案数组
  userAnswers.value = new Array(questions.value.length).fill('')
})
</script>

<style scoped>
.exercise-exam {
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
}

.progress-bar {
  margin-bottom: 20px;
}

.question-card {
  margin-bottom: 20px;
}

.question-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.question-number {
  font-size: 18px;
  font-weight: bold;
}

.question-content {
  margin: 20px 0;
}

.question-content h3 {
  margin-bottom: 20px;
  line-height: 1.6;
}

.options-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.option-item {
  margin-left: 0;
}

.answer-input {
  width: 100%;
  margin-top: 10px;
}

.action-bar {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 30px;
}

/* 添加图片相关样式 */
.question-image {
  margin: 20px 0;
  text-align: center;
}

.question-image img {
  max-width: 100%;
  max-height: 300px;
  object-fit: contain;
}

.option-content {
  display: flex;
  align-items: center;
  gap: 10px;
}

.option-image {
  width: 60px;
  height: 60px;
  object-fit: contain;
}
</style> 
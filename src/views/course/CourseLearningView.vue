<template>
  <div class="course-learning">
    <el-card class="content-card">
      <template #header>
        <div class="header">
          <h2>{{ course.title }}</h2>
          <el-tag :type="course.tagType">{{ course.tag }}</el-tag>
        </div>
      </template>

      <!-- 课程内容 -->
      <div class="course-content">
        <div class="section" v-for="(section, index) in course.sections" :key="index">
          <h3>{{ section.title }}</h3>
          <div class="section-content">
            <!-- 文本内容 -->
            <p v-html="section.content"></p>
            
            <!-- 图片内容 -->
            <div v-if="section.image" class="section-image">
              <el-image 
                :src="section.image" 
                fit="contain"
                :preview-src-list="[section.image]"
              />
            </div>

            <!-- 示例 -->
            <div v-if="section.examples" class="examples">
              <h4>例题</h4>
              <div v-for="(example, idx) in section.examples" :key="idx" class="example-item">
                <p>{{ example.question }}</p>
                <div class="solution">
                  <el-button type="primary" text @click="example.showSolution = !example.showSolution">
                    {{ example.showSolution ? '隐藏解答' : '查看解答' }}
                  </el-button>
                  <div v-show="example.showSolution" class="solution-content">
                    {{ example.solution }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 底部操作栏 -->
      <div class="actions">
        <el-button @click="goBack">返回课程</el-button>
        <el-button type="primary" @click="startPractice">
          开始练习
        </el-button>
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

// 模拟课程数据
const course = ref({
  title: '20以内加减法',
  tag: '运算',
  tagType: 'success',
  sections: [
    {
      title: '1. 认识加法',
      content: '加法是把两个或两个以上的数加在一起得到一个和的运算。<br>例如：3个苹果和2个苹果放在一起，一共是5个苹果，写作：3 + 2 = 5',
      image: '/images/course/addition.png',
      examples: [
        {
          question: '小明有4个球，小红给他2个球，小明现在有多少个球？',
          solution: '解：4 + 2 = 6，所以小明现在有6个球。',
          showSolution: false
        }
      ]
    },
    {
      title: '2. 认识减法',
      content: '减法是从一个数中减去另一个数得到差的运算。<br>例如：5个苹果吃掉2个，还剩3个苹果，写作：5 - 2 = 3',
      image: '/images/course/subtraction.png',
      examples: [
        {
          question: '小红有7个气球，送给小明3个，小红还剩多少个气球？',
          solution: '解：7 - 3 = 4，所以小红还剩4个气球。',
          showSolution: false
        }
      ]
    }
  ]
})

const goBack = () => {
  router.push('/course/primary')
}

const startPractice = () => {
  router.push({
    path: `/exercise/1`,
    query: { type: 'primary' }
  })
}
</script>

<style scoped>
.course-learning {
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header h2 {
  margin: 0;
}

.course-content {
  margin: 20px 0;
}

.section {
  margin-bottom: 30px;
}

.section h3 {
  margin-bottom: 15px;
  padding-left: 10px;
  border-left: 4px solid var(--el-color-primary);
}

.section-content {
  line-height: 1.8;
  color: var(--el-text-color-regular);
}

.section-image {
  margin: 20px 0;
  text-align: center;
}

.section-image img {
  max-width: 100%;
  max-height: 300px;
}

.examples {
  margin-top: 20px;
  padding: 15px;
  background-color: var(--el-fill-color-light);
  border-radius: 4px;
}

.example-item {
  margin-bottom: 15px;
}

.solution {
  margin-top: 10px;
}

.solution-content {
  margin-top: 10px;
  padding: 10px;
  background-color: #fff;
  border-radius: 4px;
}

.actions {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 30px;
  padding-top: 20px;
  border-top: 1px solid var(--el-border-color-lighter);
}
</style> 
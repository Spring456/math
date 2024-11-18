<template>
  <div class="exercise-view">
    <el-row :gutter="20">
      <!-- 左侧练习分类 -->
      <el-col :span="6">
        <el-card class="category-card">
          <template #header>
            <div class="category-header">
              <span>练习分类</span>
            </div>
          </template>
          <el-menu
            :default-active="activeCategory"
            class="category-menu"
            @select="handleCategorySelect"
          >
            <el-menu-item index="sync">
              <el-icon><Connection /></el-icon>
              <span>同步练习</span>
            </el-menu-item>
            <el-menu-item index="special">
              <el-icon><Collection /></el-icon>
              <span>专项练习</span>
            </el-menu-item>
            <el-menu-item index="exam">
              <el-icon><DocumentCopy /></el-icon>
              <span>模拟考试</span>
            </el-menu-item>
          </el-menu>
        </el-card>
      </el-col>

      <!-- 右侧练习列表 -->
      <el-col :span="18">
        <el-card class="exercise-list">
          <template #header>
            <div class="list-header">
              <h3>{{ categoryTitle }}</h3>
              <el-input
                v-model="searchText"
                placeholder="搜索练习题"
                prefix-icon="Search"
                clearable
                class="search-input"
              />
            </div>
          </template>

          <el-empty v-if="!exercises.length" description="暂无练习内容" />
          
          <div v-else class="exercise-grid">
            <el-card
              v-for="exercise in filteredExercises"
              :key="exercise.id"
              class="exercise-item"
              shadow="hover"
            >
              <div class="exercise-info">
                <h4>{{ exercise.title }}</h4>
                <p>{{ exercise.description }}</p>
                <div class="exercise-meta">
                  <el-tag size="small" :type="exercise.difficulty">
                    {{ exercise.difficultyText }}
                  </el-tag>
                  <span class="count">题目数量: {{ exercise.questionCount }}</span>
                </div>
              </div>
              <div class="exercise-action">
                <el-button type="primary" @click="startExercise(exercise.id)">
                  开始练习
                </el-button>
              </div>
            </el-card>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { Connection, Collection, DocumentCopy } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const activeCategory = ref('sync')
const searchText = ref('')

const categoryMap = {
  sync: '同步练习',
  special: '专项练习',
  exam: '模拟考试'
}

const categoryTitle = computed(() => categoryMap[activeCategory.value] || '')

const exercises = ref([
  {
    id: 1,
    title: '一年级加减法练习',
    description: '针对20以内的加减法运算训练',
    difficulty: 'success',
    difficultyText: '简单',
    questionCount: 20,
    category: 'sync'
  },
  {
    id: 2,
    title: '几何图形专项练习',
    description: '三角形、四边形性质与计算',
    difficulty: 'warning',
    difficultyText: '中等',
    questionCount: 15,
    category: 'special'
  },
  // 更多练习...
])

const filteredExercises = computed(() => {
  return exercises.value.filter(exercise => {
    const matchCategory = exercise.category === activeCategory.value
    const matchSearch = searchText.value
      ? exercise.title.toLowerCase().includes(searchText.value.toLowerCase())
      : true
    return matchCategory && matchSearch
  })
})

const handleCategorySelect = (key) => {
  activeCategory.value = key
}

const startExercise = (exerciseId) => {
  router.push(`/exercise/${exerciseId}`)
}
</script>

<style scoped>
.exercise-view {
  min-height: calc(100vh - 180px);
}

.category-card {
  margin-bottom: 20px;
}

.category-menu {
  border-right: none;
}

.list-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.search-input {
  width: 250px;
}

.exercise-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  padding: 10px 0;
}

.exercise-item {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.exercise-info h4 {
  margin: 0 0 10px;
  font-size: 16px;
}

.exercise-info p {
  color: var(--el-text-color-secondary);
  font-size: 14px;
  margin: 0 0 15px;
}

.exercise-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

.count {
  font-size: 13px;
  color: var(--el-text-color-secondary);
}

.exercise-action {
  text-align: right;
}
</style> 
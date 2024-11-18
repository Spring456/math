<template>
  <div class="primary-course">
    <el-tabs v-model="activeGrade" class="grade-tabs">
      <el-tab-pane
        v-for="grade in grades"
        :key="grade.id"
        :label="grade.name"
        :name="grade.id"
      >
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
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const activeGrade = ref('grade1')

const grades = ref([
  {
    id: 'grade1',
    name: '一年级',
    courses: [
      {
        id: 1,
        title: '数字认识',
        description: '认识1-100的数字，掌握基本的数字概念',
        icon: 'Operation',
        iconColor: '#409EFF',
        tag: '基础',
        tagType: 'primary',
        exerciseId: 1  // 添加练习ID
      },
      {
        id: 2,
        title: '20以内加减法',
        description: '掌握20以内的加减法运算',
        icon: 'Plus',
        iconColor: '#67C23A',
        tag: '运算',
        tagType: 'success',
        exerciseId: 1  // 添加练习ID
      },
      {
        id: 3,
        title: '认识图形',
        description: '认识基本的平面图形',
        icon: 'Histogram',
        iconColor: '#E6A23C',
        tag: '图形',
        tagType: 'warning',
        exerciseId: 2  // 添加练习ID
      }
    ]
  },
  {
    id: 'grade2',
    name: '二年级',
    courses: [
      {
        id: 4,
        title: '乘法口诀',
        description: '学习和掌握乘法口诀表',
        icon: 'Grid',
        iconColor: '#409EFF',
        tag: '运算',
        tagType: 'success',
        exerciseId: 3  // 添加练习ID
      },
      {
        id: 5,
        title: '100以内加减法',
        description: '掌握100以内的加减法运算',
        icon: 'Operation',
        iconColor: '#67C23A',
        tag: '运算',
        tagType: 'success',
        exerciseId: 4  // 添加练习ID
      }
    ]
  }
])

const startLearning = (course) => {
  router.push({
    path: `/course/primary/${course.id}/learn`
  })
}
</script>

<style scoped>
.primary-course {
  padding: 20px;
}

.grade-tabs {
  background-color: #fff;
  padding: 20px;
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
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
<template>
  <div class="junior-course">
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
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

// 处理路由参数
onMounted(() => {
  const courseId = route.query.courseId
  if (courseId) {
    // TODO: 根据courseId加载具体课程内容
    console.log('加载课程:', courseId)
  }
})

const activeGrade = ref('grade7')

const grades = ref([
  {
    id: 'grade7',
    name: '初一',
    courses: [
      {
        id: 1,
        title: '有理数运算',
        description: '掌握有理数的四则运算及其应用',
        icon: 'Operation',
        iconColor: '#409EFF',
        tag: '基础',
        tagType: 'primary'
      },
      {
        id: 2,
        title: '整式运算',
        description: '学习整式的加减乘除运算',
        icon: 'Plus',
        iconColor: '#67C23A',
        tag: '代数',
        tagType: 'success'
      },
      {
        id: 3,
        title: '一元一次方程',
        description: '掌握一元一次方程的解法及应用',
        icon: 'Equals',
        iconColor: '#E6A23C',
        tag: '方程',
        tagType: 'warning'
      },
      {
        id: 4,
        title: '几何图形初步',
        description: '认识基本几何图形及其性质',
        icon: 'Histogram',
        iconColor: '#F56C6C',
        tag: '几何',
        tagType: 'danger'
      }
    ]
  },
  {
    id: 'grade8',
    name: '初二',
    courses: [
      {
        id: 5,
        title: '三角形全等',
        description: '学习三角形全等的判定方法',
        icon: 'Grid',
        iconColor: '#409EFF',
        tag: '几何',
        tagType: 'primary'
      },
      {
        id: 6,
        title: '一次函数',
        description: '理解一次函数的图像和性质',
        icon: 'TrendCharts',
        iconColor: '#67C23A',
        tag: '函数',
        tagType: 'success'
      },
      {
        id: 7,
        title: '二次根式',
        description: '掌握二次根式的运算',
        icon: 'Operation',
        iconColor: '#E6A23C',
        tag: '代数',
        tagType: 'warning'
      }
    ]
  },
  {
    id: 'grade9',
    name: '初三',
    courses: [
      {
        id: 8,
        title: '二次函数',
        description: '学习二次函数的图像和性质',
        icon: 'DataLine',
        iconColor: '#409EFF',
        tag: '函数',
        tagType: 'primary'
      },
      {
        id: 9,
        title: '圆的性质',
        description: '掌握圆的基本性质和定理',
        icon: 'CirclePlus',
        iconColor: '#67C23A',
        tag: '几何',
        tagType: 'success'
      },
      {
        id: 10,
        title: '相似三角形',
        description: '学习三角形相似的判定和性质',
        icon: 'Grid',
        iconColor: '#E6A23C',
        tag: '几何',
        tagType: 'warning'
      },
      {
        id: 11,
        title: '中考复习',
        description: '系统复习初中数学知识点',
        icon: 'Reading',
        iconColor: '#F56C6C',
        tag: '复习',
        tagType: 'danger'
      }
    ]
  }
])

const startLearning = (course) => {
  // TODO: 实现课程学习逻辑
  console.log('开始学习课程:', course.title)
}
</script>

<style scoped>
.junior-course {
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
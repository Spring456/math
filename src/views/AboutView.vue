<template>
  <div class="about-view">
    <el-row :gutter="20">
      <!-- 左侧内容 -->
      <el-col :span="16">
        <!-- 网站介绍 -->
        <el-card class="intro-section">
          <template #header>
            <div class="section-header">
              <el-icon><School /></el-icon>
              <span>关于我们</span>
            </div>
          </template>
          <div class="intro-content">
            <h2>数学学习平台</h2>
            <p class="mission">
              我们致力于为小学和初中学生提供优质的数学学习资源，
              通过趣味性和互动性的方式，激发学生学习数学的兴趣，
              培养良好的数学思维能力。
            </p>
            <div class="features">
              <el-row :gutter="20">
                <el-col :span="8" v-for="feature in features" :key="feature.title">
                  <div class="feature-item">
                    <el-icon :size="40" :color="feature.color">
                      <component :is="feature.icon" />
                    </el-icon>
                    <h3>{{ feature.title }}</h3>
                    <p>{{ feature.description }}</p>
                  </div>
                </el-col>
              </el-row>
            </div>
          </div>
        </el-card>

        <!-- 团队介绍 -->
        <el-card class="team-section">
          <template #header>
            <div class="section-header">
              <el-icon><UserFilled /></el-icon>
              <span>团队介绍</span>
            </div>
          </template>
          <el-row :gutter="20">
            <el-col :span="8" v-for="member in teamMembers" :key="member.name">
              <el-card class="member-card" shadow="hover">
                <el-avatar :size="80" :src="member.avatar" />
                <h3>{{ member.name }}</h3>
                <p class="member-title">{{ member.title }}</p>
                <p class="member-desc">{{ member.description }}</p>
              </el-card>
            </el-col>
          </el-row>
        </el-card>
      </el-col>

      <!-- 右侧信息 -->
      <el-col :span="8">
        <!-- 联系方式 -->
        <el-card class="contact-section">
          <template #header>
            <div class="section-header">
              <el-icon><Message /></el-icon>
              <span>联系我们</span>
            </div>
          </template>
          <div class="contact-list">
            <div class="contact-item">
              <el-icon><Location /></el-icon>
              <span>地址：北京市海淀区XX路XX号</span>
            </div>
            <div class="contact-item">
              <el-icon><Phone /></el-icon>
              <span>电话：010-12345678</span>
            </div>
            <div class="contact-item">
              <el-icon><Message /></el-icon>
              <span>邮箱：contact@mathlearning.com</span>
            </div>
          </div>
          <el-divider />
          <el-form :model="contactForm" label-width="80px">
            <el-form-item label="姓名">
              <el-input v-model="contactForm.name" placeholder="请输入您的姓名" />
            </el-form-item>
            <el-form-item label="邮箱">
              <el-input v-model="contactForm.email" placeholder="请输入您的邮箱" />
            </el-form-item>
            <el-form-item label="留言">
              <el-input
                v-model="contactForm.message"
                type="textarea"
                rows="4"
                placeholder="请输入您的留言"
              />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitContact">提交留言</el-button>
            </el-form-item>
          </el-form>
        </el-card>

        <!-- 版权声明 -->
        <el-card class="copyright-section">
          <template #header>
            <div class="section-header">
              <el-icon><InfoFilled /></el-icon>
              <span>版权声明</span>
            </div>
          </template>
          <div class="copyright-content">
            <p>本网站所有内容版权归数学学习平台所有。</p>
            <p>未经许可，不得进行商业用途的复制和传播。</p>
            <p>© 2024 数学学习平台 版权所有</p>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import {
  School,
  UserFilled,
  Message,
  Location,
  Phone,
  InfoFilled,
  Reading,
  Trophy,
  DataLine
} from '@element-plus/icons-vue'

const features = [
  {
    icon: 'Reading',
    title: '优质课程',
    description: '精心设计的课程体系，满足不同层次学习需求',
    color: '#409EFF'
  },
  {
    icon: 'Trophy',
    title: '趣味学习',
    description: '通过游戏和互动，让学习变得有趣',
    color: '#67C23A'
  },
  {
    icon: 'DataLine',
    title: '学习跟踪',
    description: '科学的学习进度跟踪和成绩分析',
    color: '#E6A23C'
  }
]

const teamMembers = [
  {
    name: '张教授',
    title: '教学总监',
    description: '从事数学教育20年，专注于数学思维培养',
    avatar: 'https://picsum.photos/200?random=1'
  },
  {
    name: '李博士',
    title: '课程设计师',
    description: '教育学博士，擅长课程体系设计',
    avatar: 'https://picsum.photos/200?random=2'
  },
  {
    name: '王工程师',
    title: '技术总监',
    description: '10年教育软件开发经验',
    avatar: 'https://picsum.photos/200?random=3'
  }
]

const contactForm = ref({
  name: '',
  email: '',
  message: ''
})

const submitContact = () => {
  // TODO: 实现留言提交逻辑
  console.log('提交留言:', contactForm.value)
}
</script>

<style scoped>
.about-view {
  min-height: calc(100vh - 180px);
}

.section-header {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 18px;
  font-weight: bold;
}

.intro-section {
  margin-bottom: 20px;
}

.intro-content {
  text-align: center;
  padding: 20px 0;
}

.mission {
  font-size: 16px;
  color: var(--el-text-color-regular);
  line-height: 1.8;
  margin: 20px 0;
}

.features {
  margin-top: 40px;
}

.feature-item {
  text-align: center;
  padding: 20px;
}

.feature-item h3 {
  margin: 15px 0 10px;
  font-size: 18px;
}

.feature-item p {
  color: var(--el-text-color-secondary);
  font-size: 14px;
}

.team-section {
  margin-bottom: 20px;
}

.member-card {
  text-align: center;
  padding: 20px;
}

.member-card h3 {
  margin: 15px 0 5px;
  font-size: 16px;
}

.member-title {
  color: var(--el-color-primary);
  font-size: 14px;
  margin-bottom: 10px;
}

.member-desc {
  color: var(--el-text-color-secondary);
  font-size: 13px;
}

.contact-section {
  margin-bottom: 20px;
}

.contact-list {
  margin-bottom: 20px;
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 15px;
  color: var(--el-text-color-regular);
}

.copyright-content {
  color: var(--el-text-color-secondary);
  font-size: 14px;
  line-height: 1.8;
}
</style> 
<template>
  <div class="community-view">
    <el-row :gutter="20">
      <!-- 左侧内容区 -->
      <el-col :span="16">
        <el-card class="post-section">
          <template #header>
            <div class="section-header">
              <el-tabs v-model="activeTab">
                <el-tab-pane label="最新讨论" name="latest">
                  <template #label>
                    <el-icon><Timer /></el-icon>
                    <span>最新讨论</span>
                  </template>
                </el-tab-pane>
                <el-tab-pane label="热门话题" name="hot">
                  <template #label>
                    <el-icon><HotWater /></el-icon>
                    <span>热门话题</span>
                  </template>
                </el-tab-pane>
              </el-tabs>
              <el-button type="primary" @click="showPostDialog">
                <el-icon><Edit /></el-icon>
                发布讨论
              </el-button>
            </div>
          </template>

          <div class="post-list">
            <el-card
              v-for="post in posts"
              :key="post.id"
              class="post-item"
              shadow="hover"
            >
              <div class="post-header">
                <div class="user-info">
                  <el-avatar :size="40" :src="post.avatar" />
                  <div class="user-meta">
                    <span class="username">{{ post.username }}</span>
                    <span class="post-time">{{ post.time }}</span>
                  </div>
                </div>
                <el-tag size="small" :type="post.tagType">{{ post.tag }}</el-tag>
              </div>
              <h3 class="post-title">{{ post.title }}</h3>
              <p class="post-content">{{ post.content }}</p>
              <div class="post-footer">
                <div class="interactions">
                  <el-button text type="primary">
                    <el-icon><ChatLineRound /></el-icon>
                    {{ post.comments }} 评论
                  </el-button>
                  <el-button text>
                    <el-icon><Star /></el-icon>
                    {{ post.likes }} 点赞
                  </el-button>
                  <el-button text>
                    <el-icon><Share /></el-icon>
                    分享
                  </el-button>
                </div>
              </div>
            </el-card>
          </div>
        </el-card>
      </el-col>

      <!-- 右侧信息栏 -->
      <el-col :span="8">
        <!-- 用户信息卡片 -->
        <el-card class="user-card" v-if="isLoggedIn">
          <div class="user-profile">
            <el-avatar :size="60" :src="userInfo.avatar" />
            <h3>{{ userInfo.username }}</h3>
            <p>{{ userInfo.bio }}</p>
            <div class="user-stats">
              <div class="stat-item">
                <div class="stat-value">{{ userInfo.posts }}</div>
                <div class="stat-label">讨论</div>
              </div>
              <div class="stat-item">
                <div class="stat-value">{{ userInfo.followers }}</div>
                <div class="stat-label">关注者</div>
              </div>
              <div class="stat-item">
                <div class="stat-value">{{ userInfo.following }}</div>
                <div class="stat-label">关注</div>
              </div>
            </div>
          </div>
        </el-card>

        <!-- 热门标签 -->
        <el-card class="tag-card">
          <template #header>
            <div class="card-header">
              <span>热门标签</span>
            </div>
          </template>
          <div class="tag-cloud">
            <el-tag
              v-for="tag in hotTags"
              :key="tag.name"
              :type="tag.type"
              class="tag-item"
              effect="light"
            >
              {{ tag.name }} ({{ tag.count }})
            </el-tag>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <!-- 发布讨论对话框 -->
    <el-dialog
      v-model="dialogVisible"
      title="发布讨论"
      width="50%"
    >
      <el-form :model="postForm" label-width="80px">
        <el-form-item label="标题">
          <el-input v-model="postForm.title" placeholder="请输入标题" />
        </el-form-item>
        <el-form-item label="内容">
          <el-input
            v-model="postForm.content"
            type="textarea"
            rows="6"
            placeholder="请输入内容"
          />
        </el-form-item>
        <el-form-item label="标签">
          <el-select
            v-model="postForm.tag"
            placeholder="选择标签"
          >
            <el-option
              v-for="tag in hotTags"
              :key="tag.name"
              :label="tag.name"
              :value="tag.name"
            />
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handlePost">
            发布
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import {
  Timer,
  HotWater,
  Edit,
  ChatLineRound,
  Star,
  Share
} from '@element-plus/icons-vue'

// 标签页控制
const activeTab = ref('latest')

// 模拟用户数据
const isLoggedIn = ref(true)
const userInfo = ref({
  username: '数学爱好者',
  avatar: 'https://picsum.photos/200',
  bio: '热爱数学，分享知识',
  posts: 42,
  followers: 128,
  following: 96
})

// 模拟帖子数据
const posts = ref([
  {
    id: 1,
    username: '小明',
    avatar: 'https://picsum.photos/200?random=1',
    time: '2小时前',
    title: '求助：如何理解二次函数的图像变换？',
    content: '最近在学习二次函数的图像变换，对于平移和拉伸的概念有些混淆，希望大家能帮忙解释一下...',
    tag: '函数图像',
    tagType: 'warning',
    comments: 15,
    likes: 23
  },
  // 更多帖子...
])

// 热门标签
const hotTags = ref([
  { name: '函数', count: 128, type: 'primary' },
  { name: '几何', count: 96, type: 'success' },
  { name: '代数', count: 85, type: 'warning' },
  { name: '概率', count: 64, type: 'danger' },
  { name: '竞赛', count: 42, type: 'info' }
])

// 发布讨论
const dialogVisible = ref(false)
const postForm = ref({
  title: '',
  content: '',
  tag: ''
})

const showPostDialog = () => {
  dialogVisible.value = true
}

const handlePost = () => {
  // TODO: 实现发布逻辑
  console.log('发布内容:', postForm.value)
  dialogVisible.value = false
}
</script>

<style scoped>
.community-view {
  min-height: calc(100vh - 180px);
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.post-item {
  margin-bottom: 20px;
}

.post-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 10px;
}

.user-meta {
  display: flex;
  flex-direction: column;
}

.username {
  font-weight: bold;
  color: var(--el-text-color-primary);
}

.post-time {
  font-size: 12px;
  color: var(--el-text-color-secondary);
}

.post-title {
  margin: 0 0 10px;
  font-size: 18px;
}

.post-content {
  color: var(--el-text-color-regular);
  margin-bottom: 15px;
  line-height: 1.6;
}

.post-footer {
  border-top: 1px solid var(--el-border-color-lighter);
  padding-top: 15px;
}

.interactions {
  display: flex;
  gap: 20px;
}

.user-card {
  margin-bottom: 20px;
}

.user-profile {
  text-align: center;
}

.user-profile h3 {
  margin: 10px 0 5px;
}

.user-profile p {
  color: var(--el-text-color-secondary);
  margin-bottom: 15px;
}

.user-stats {
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
}

.stat-item {
  text-align: center;
}

.stat-value {
  font-size: 18px;
  font-weight: bold;
  color: var(--el-color-primary);
}

.stat-label {
  font-size: 12px;
  color: var(--el-text-color-secondary);
}

.tag-cloud {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.tag-item {
  cursor: pointer;
}
</style> 
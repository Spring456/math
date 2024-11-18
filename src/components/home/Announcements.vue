<template>
  <el-card class="announcement-card">
    <template #header>
      <div class="header">
        <div class="title">
          <el-icon><Bell /></el-icon>
          <span>最新公告</span>
        </div>
        <el-button text>
          全部
          <el-icon><ArrowRight /></el-icon>
        </el-button>
      </div>
    </template>
    
    <el-scrollbar height="400px">
      <el-timeline>
        <el-timeline-item
          v-for="item in announcements"
          :key="item.id"
          :type="item.type"
          :timestamp="item.date"
          :hollow="true"
          size="large"
        >
          <el-card class="announcement-item" shadow="hover">
            <template #header>
              <div class="item-header">
                <span class="item-title">{{ item.title }}</span>
                <el-tag size="small" :type="item.type">{{ item.category }}</el-tag>
              </div>
            </template>
            <p class="item-content">{{ item.content }}</p>
            <div class="item-footer">
              <span class="time">{{ item.time }}</span>
              <el-button link type="primary" size="small">查看详情</el-button>
            </div>
          </el-card>
        </el-timeline-item>
      </el-timeline>
    </el-scrollbar>
  </el-card>
</template>

<script setup>
import { ref } from 'vue'
import { Bell, ArrowRight } from '@element-plus/icons-vue'

const announcements = ref([
  {
    id: 1,
    title: '暑期数学特训营开始报名',
    content: '针对小学高年级学生，为期两周的数学思维训练营即将开始，课程内容包括数学思维训练、解题技巧指导等...',
    date: '2024-03-15',
    time: '10:30',
    type: 'primary',
    category: '活动通知'
  },
  {
    id: 2,
    title: '系统维护升级通知',
    content: '为了给大家提供更好的学习体验，本周六凌晨2:00-4:00将进行系统维护升级，请提前做好安排...',
    date: '2024-03-14',
    time: '15:45',
    type: 'warning',
    category: '系统通知'
  },
  {
    id: 3,
    title: '春季数学竞赛预告',
    content: '2024年春季数学竞赛将于下月举行，比赛分为小学组和初中组，请有意参加的同学及时报名...',
    date: '2024-03-13',
    time: '09:15',
    type: 'success',
    category: '竞赛通知'
  },
  {
    id: 4,
    title: '新增课程上线通知',
    content: '本周新增"初中代数专题"系列课程，包含一元二次方程、因式分解等重要知识点...',
    date: '2024-03-12',
    time: '14:20',
    type: 'info',
    category: '课程更新'
  }
])
</script>

<style scoped>
.announcement-card {
  height: 100%;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.title {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 16px;
  font-weight: bold;
}

.announcement-item {
  margin-bottom: 16px;
}

.item-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.item-title {
  font-size: 14px;
  font-weight: bold;
  color: var(--el-text-color-primary);
}

.item-content {
  margin: 8px 0;
  font-size: 13px;
  color: var(--el-text-color-regular);
  line-height: 1.6;
}

.item-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 8px;
  font-size: 12px;
}

.time {
  color: var(--el-text-color-secondary);
}

:deep(.el-timeline-item__node) {
  background-color: var(--el-color-primary);
}

:deep(.el-timeline-item__wrapper) {
  padding-left: 20px;
}
</style> 
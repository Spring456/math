<template>
  <div class="funmath-view">
    <el-row :gutter="20">
      <!-- 数学游戏区域 -->
      <el-col :span="16">
        <el-card class="game-section">
          <template #header>
            <div class="section-header">
              <div class="title">
                <el-icon><Monitor /></el-icon>
                <span>数学游戏</span>
              </div>
              <el-button text>
                更多游戏
                <el-icon><ArrowRight /></el-icon>
              </el-button>
            </div>
          </template>
          
          <el-row :gutter="20">
            <el-col :span="8" v-for="game in mathGames" :key="game.id">
              <el-card class="game-card" shadow="hover">
                <el-image :src="game.image" class="game-image" fit="cover" />
                <h4>{{ game.title }}</h4>
                <p>{{ game.description }}</p>
                <div class="game-footer">
                  <el-tag size="small" :type="game.type">{{ game.level }}</el-tag>
                  <el-button type="primary" size="small" @click="startGame(game.id)">
                    开始游戏
                  </el-button>
                </div>
              </el-card>
            </el-col>
          </el-row>
        </el-card>

        <!-- 数学故事区域 -->
        <el-card class="story-section">
          <template #header>
            <div class="section-header">
              <div class="title">
                <el-icon><Collection /></el-icon>
                <span>数学故事</span>
              </div>
            </div>
          </template>
          
          <el-timeline>
            <el-timeline-item
              v-for="story in mathStories"
              :key="story.id"
              :timestamp="story.period"
              placement="top"
            >
              <el-card>
                <h4>{{ story.title }}</h4>
                <p class="story-content">{{ story.content }}</p>
                <el-button text type="primary">阅读全文</el-button>
              </el-card>
            </el-timeline-item>
          </el-timeline>
        </el-card>
      </el-col>

      <!-- 趣味挑战区域 -->
      <el-col :span="8">
        <el-card class="challenge-section">
          <template #header>
            <div class="section-header">
              <div class="title">
                <el-icon><Trophy /></el-icon>
                <span>趣味挑战</span>
              </div>
            </div>
          </template>

          <div class="challenge-list">
            <el-card
              v-for="challenge in challenges"
              :key="challenge.id"
              class="challenge-item"
              shadow="hover"
            >
              <div class="challenge-content">
                <h4>{{ challenge.title }}</h4>
                <p>{{ challenge.description }}</p>
                <div class="challenge-meta">
                  <div class="stats">
                    <el-icon><User /></el-icon>
                    <span>{{ challenge.participants }}人参与</span>
                    <el-icon><Star /></el-icon>
                    <span>{{ challenge.difficulty }}星难度</span>
                  </div>
                  <el-button type="success" size="small">
                    挑战一下
                  </el-button>
                </div>
              </div>
            </el-card>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import {
  Monitor,
  Collection,
  Trophy,
  User,
  Star,
  ArrowRight
} from '@element-plus/icons-vue'

const mathGames = ref([
  {
    id: 1,
    title: '24点游戏',
    description: '使用四个数字和基本运算得到24',
    image: 'https://picsum.photos/300/200?random=1',
    level: '初级',
    type: 'success'
  },
  {
    id: 2,
    title: '数独挑战',
    description: '填充数字，考验逻辑思维',
    image: 'https://picsum.photos/300/200?random=2',
    level: '中级',
    type: 'warning'
  },
  {
    id: 3,
    title: '数学迷宫',
    description: '解决数学问题，找到出口',
    image: 'https://picsum.photos/300/200?random=3',
    level: '高级',
    type: 'danger'
  }
])

const mathStories = ref([
  {
    id: 1,
    title: '阿基米德与皇冠',
    content: '古希腊数学家阿基米德是如何运用数学原理验证皇冠成分的...',
    period: '古希腊时期'
  },
  {
    id: 2,
    title: '高斯的童年故事',
    content: '年仅10岁的高斯是如何快速计算出1到100的和的...',
    period: '18世纪'
  }
])

const challenges = ref([
  {
    id: 1,
    title: '逻辑推理之谜',
    description: '三个人说真话，两个人说假话，你能找出谁在说谎吗？',
    participants: 1234,
    difficulty: 4
  },
  {
    id: 2,
    title: '几何图形探索',
    description: '在这个图形中隐藏着多少个三角形？',
    participants: 856,
    difficulty: 3
  }
])

const startGame = (gameId) => {
  // TODO: 实现游戏启动逻辑
  console.log('开始游戏:', gameId)
}
</script>

<style scoped>
.funmath-view {
  padding: 20px;
}

.section-header {
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

.game-section {
  margin-bottom: 20px;
}

.game-card {
  margin-bottom: 20px;
  height: 100%;
  transition: all 0.3s;
}

.game-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 2px 12px 0 rgba(0,0,0,0.1);
}

.game-image {
  width: 100%;
  height: 150px;
  border-radius: 4px;
}

.game-card h4 {
  margin: 10px 0;
  font-size: 16px;
}

.game-card p {
  color: var(--el-text-color-secondary);
  font-size: 13px;
  margin-bottom: 10px;
}

.game-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.story-content {
  color: var(--el-text-color-regular);
  margin: 10px 0;
}

.challenge-section {
  height: 100%;
}

.challenge-item {
  margin-bottom: 15px;
}

.challenge-content h4 {
  margin: 0 0 8px;
  font-size: 15px;
}

.challenge-content p {
  color: var(--el-text-color-secondary);
  font-size: 13px;
  margin-bottom: 10px;
}

.challenge-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.stats {
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--el-text-color-secondary);
  font-size: 12px;
}

.stats .el-icon {
  margin-right: 2px;
}
</style> 
<template>
  <el-menu
    :default-active="activeIndex"
    class="nav-menu"
    mode="horizontal"
    router
    background-color="#ffffff"
    text-color="#303133"
    active-text-color="#409EFF"
  >
    <div class="logo-container">
      <img :src="logo" alt="Logo" class="logo" />
      <span class="logo-text">数学学习平台</span>
    </div>
    
    <el-menu-item index="/">
      <el-icon><House /></el-icon>
      <span>首页</span>
    </el-menu-item>
    
    <el-sub-menu index="/course">
      <template #title>
        <el-icon><Reading /></el-icon>
        <span>课程资源</span>
      </template>
      <el-menu-item index="/course/primary">小学课程</el-menu-item>
      <el-menu-item index="/course/junior">初中课程</el-menu-item>
    </el-sub-menu>
    
    <el-menu-item index="/exercise">
      <el-icon><Edit /></el-icon>
      <span>在线练习</span>
    </el-menu-item>
    
    <el-menu-item index="/funmath">
      <el-icon><MagicStick /></el-icon>
      <span>趣味数学</span>
    </el-menu-item>
    
    <el-menu-item index="/community">
      <el-icon><ChatDotRound /></el-icon>
      <span>学习社区</span>
    </el-menu-item>
    
    <el-menu-item index="/about">
      <el-icon><InfoFilled /></el-icon>
      <span>关于我们</span>
    </el-menu-item>

    <div class="nav-right">
      <template v-if="!userStore.isLoggedIn">
        <el-button type="primary" @click="showLoginDialog">登录</el-button>
        <el-button @click="showRegisterDialog">注册</el-button>
      </template>
      <template v-else>
        <el-dropdown @command="handleCommand">
          <div class="user-info">
            <el-avatar :size="32" :src="userStore.userInfo?.avatar" />
            <span class="username">{{ userStore.userInfo?.username }}</span>
            <el-icon><CaretBottom /></el-icon>
          </div>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="profile">
                <el-icon><User /></el-icon>个人中心
              </el-dropdown-item>
              <el-dropdown-item command="settings">
                <el-icon><Setting /></el-icon>设置
              </el-dropdown-item>
              <el-dropdown-item divided command="logout">
                <el-icon><SwitchButton /></el-icon>退出登录
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </template>
    </div>
  </el-menu>

  <login-dialog
    v-model:visible="loginDialogVisible"
    @switch-to-register="handleSwitchToRegister"
    @login-success="handleLoginSuccess"
  />
  <register-dialog
    v-model:visible="registerDialogVisible"
    @switch-to-login="handleSwitchToLogin"
    @register-success="handleRegisterSuccess"
  />
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { ElMessageBox } from 'element-plus'
import {
  House,
  Reading,
  Edit,
  MagicStick,
  ChatDotRound,
  InfoFilled,
  User,
  Setting,
  SwitchButton,
  CaretBottom
} from '@element-plus/icons-vue'
import { PLACEHOLDER_LOGO } from '@/utils/constants'
import { useUserStore } from '@/stores/user'
import LoginDialog from '@/components/auth/LoginDialog.vue'
import RegisterDialog from '@/components/auth/RegisterDialog.vue'

const router = useRouter()
const route = useRoute()
const userStore = useUserStore()
const activeIndex = ref(route.path)
const logo = PLACEHOLDER_LOGO

// 对话框控制
const loginDialogVisible = ref(false)
const registerDialogVisible = ref(false)

// 在组件挂载时检查认证状态
onMounted(async () => {
  await userStore.checkAuth()
})

// 显示登录对话框
const showLoginDialog = () => {
  loginDialogVisible.value = true
}

// 显示注册对话框
const showRegisterDialog = () => {
  registerDialogVisible.value = true
}

// 切换到注册
const handleSwitchToRegister = () => {
  loginDialogVisible.value = false
  registerDialogVisible.value = true
}

// 切换到登录
const handleSwitchToLogin = () => {
  registerDialogVisible.value = false
  loginDialogVisible.value = true
}

// 登录成功处理
const handleLoginSuccess = () => {
  loginDialogVisible.value = false
}

// 注册成功处理
const handleRegisterSuccess = () => {
  registerDialogVisible.value = false
  loginDialogVisible.value = true
}

// 处理下拉菜单命令
const handleCommand = (command) => {
  switch (command) {
    case 'profile':
      router.push('/profile')
      break
    case 'settings':
      router.push('/settings')
      break
    case 'logout':
      handleLogout()
      break
  }
}

// 处理退出登录
const handleLogout = () => {
  ElMessageBox.confirm('确定要退出登录吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(async () => {
    await userStore.logout()
    router.push('/')
  })
}
</script>

<style scoped>
.nav-menu {
  position: sticky;
  top: 0;
  z-index: 100;
  border-bottom: solid 1px var(--el-menu-border-color);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12);
  padding: 0 20px;
}

.logo-container {
  display: inline-flex;
  align-items: center;
  padding: 0 20px;
  height: 60px;
}

.logo {
  height: 40px;
  margin-right: 10px;
}

.logo-text {
  font-size: 20px;
  font-weight: bold;
  color: var(--el-text-color-primary);
}

.nav-right {
  float: right;
  height: 60px;
  display: flex;
  align-items: center;
  gap: 10px;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  padding: 5px 10px;
  border-radius: 4px;
  transition: background-color 0.3s;
}

.user-info:hover {
  background-color: var(--el-fill-color-light);
}

.username {
  font-size: 14px;
  color: var(--el-text-color-primary);
}

:deep(.el-menu-item) {
  display: flex;
  align-items: center;
}

:deep(.el-icon) {
  margin-right: 4px;
}

:deep(.el-dropdown-menu__item) {
  display: flex;
  align-items: center;
  gap: 8px;
}
</style> 
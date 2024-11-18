<template>
  <el-config-provider>
    <div class="app-container">
      <NavBar />
      <main class="main-content">
        <router-view v-slot="{ Component }">
          <transition name="fade" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </main>
      <Footer />
      <el-backtop :right="20" :bottom="20" />
    </div>
  </el-config-provider>
</template>

<script setup>
import { ElConfigProvider } from 'element-plus'
import NavBar from '@/components/common/NavBar.vue'
import Footer from '@/components/common/Footer.vue'
</script>

<style>
html, body {
  margin: 0;
  padding: 0;
  height: 100%;
}

.app-container {
  min-height: 100vh;
  background-color: #f5f7fa;
  display: flex;
  flex-direction: column;
}

.main-content {
  flex: 1;
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
  box-sizing: border-box;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style> 
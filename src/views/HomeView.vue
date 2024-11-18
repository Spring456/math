<template>
  <div class="home">
    <Welcome />
    <el-row :gutter="20" class="main-content">
      <el-col :span="16">
        <HotContent />
      </el-col>
      <el-col :span="8">
        <Announcements />
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import Welcome from '@/components/home/Welcome.vue'
import HotContent from '@/components/home/HotContent.vue'
import Announcements from '@/components/home/Announcements.vue'
</script>

<style scoped>
.main-content {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}
</style> 
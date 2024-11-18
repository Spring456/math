<template>
  <footer class="site-footer">
    <div class="footer-content">
      <el-row :gutter="20">
        <!-- 网站信息 -->
        <el-col :span="8">
          <div class="footer-section">
            <h3>数学学习平台</h3>
            <p>让数学学习变得简单有趣</p>
            <div class="social-links">
              <el-button circle>
                <el-icon><Position /></el-icon>
              </el-button>
              <el-button circle>
                <el-icon><Message /></el-icon>
              </el-button>
              <el-button circle>
                <el-icon><Share /></el-icon>
              </el-button>
            </div>
          </div>
        </el-col>

        <!-- 快速链接 -->
        <el-col :span="8">
          <div class="footer-section">
            <h3>快速链接</h3>
            <ul class="footer-links">
              <li v-for="link in quickLinks" :key="link.path">
                <router-link :to="link.path">{{ link.name }}</router-link>
              </li>
            </ul>
          </div>
        </el-col>

        <!-- 联系方式 -->
        <el-col :span="8">
          <div class="footer-section">
            <h3>联系我们</h3>
            <ul class="contact-info">
              <li>
                <el-icon><Location /></el-icon>
                <span>北京市海淀区XX路XX号</span>
              </li>
              <li>
                <el-icon><Phone /></el-icon>
                <span>010-12345678</span>
              </li>
              <li>
                <el-icon><Message /></el-icon>
                <span>contact@mathlearning.com</span>
              </li>
            </ul>
          </div>
        </el-col>
      </el-row>
    </div>

    <div class="footer-bottom">
      <div class="copyright">
        © 2024 数学学习平台 版权所有
      </div>
      <div class="footer-nav">
        <router-link to="/privacy">隐私政策</router-link>
        <router-link to="/terms">使用条款</router-link>
        <router-link to="/sitemap">网站地图</router-link>
      </div>
    </div>
  </footer>
</template>

<script setup>
import {
  Position,
  Message,
  Share,
  Location,
  Phone
} from '@element-plus/icons-vue'

const quickLinks = [
  { name: '课程资源', path: '/course' },
  { name: '在线练习', path: '/exercise' },
  { name: '趣味数学', path: '/funmath' },
  { name: '学习社区', path: '/community' },
  { name: '关于我们', path: '/about' }
]
</script>

<style scoped>
.site-footer {
  background-color: #2c3e50;
  color: #ffffff;
  padding: 40px 0 0;
  margin-top: 40px;
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.footer-section {
  margin-bottom: 30px;
}

.footer-section h3 {
  color: #ffffff;
  font-size: 18px;
  margin-bottom: 20px;
  position: relative;
}

.footer-section h3::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: -8px;
  width: 30px;
  height: 2px;
  background-color: var(--el-color-primary);
}

.social-links {
  margin-top: 20px;
  display: flex;
  gap: 10px;
}

.footer-links {
  list-style: none;
  padding: 0;
  margin: 0;
}

.footer-links li {
  margin-bottom: 10px;
}

.footer-links a {
  color: #ffffff;
  text-decoration: none;
  transition: color 0.3s;
}

.footer-links a:hover {
  color: var(--el-color-primary);
}

.contact-info {
  list-style: none;
  padding: 0;
  margin: 0;
}

.contact-info li {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 15px;
}

.footer-bottom {
  background-color: #1a2634;
  padding: 20px 0;
  margin-top: 40px;
}

.footer-bottom .copyright {
  text-align: center;
  color: #ffffff;
  opacity: 0.8;
  margin-bottom: 10px;
}

.footer-nav {
  text-align: center;
}

.footer-nav a {
  color: #ffffff;
  text-decoration: none;
  margin: 0 15px;
  font-size: 14px;
  opacity: 0.8;
  transition: opacity 0.3s;
}

.footer-nav a:hover {
  opacity: 1;
}

@media (max-width: 768px) {
  .footer-section {
    text-align: center;
  }

  .social-links {
    justify-content: center;
  }

  .footer-section h3::after {
    left: 50%;
    transform: translateX(-50%);
  }

  .contact-info li {
    justify-content: center;
  }
}
</style> 
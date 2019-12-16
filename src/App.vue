<template>
  <div id="app">
    <div class="container">
      <Layout>
        <Sider
          :style="{
            position: 'fixed',
            height: '100vh',
            left: 0,
            overflow: 'auto'
          }"
          :width="240"
          ref="side1"
          hide-trigger
          collapsible
          :collapsed-width="78"
          v-model="isCollapsed"
        >
          <Menu
            theme="dark"
            width="auto"
            :active-name="$route.name"
            :class="menuitemClasses"
          >
            <MenuItem name="personal" to="/personal">
              <Icon type="md-bookmark"></Icon>
              <span>个人文献</span>
            </MenuItem>
            <MenuItem name="public" to="/public">
              <Icon type="md-book"></Icon>
              <span>公共文献</span>
            </MenuItem>
            <MenuItem name="task" to="/task">
              <Icon type="md-list-box"></Icon>
              <span>任务列表</span>
            </MenuItem>
            <MenuItem name="information" to="/information">
              <Icon type="md-person"></Icon>
              <span>个人信息</span>
            </MenuItem>
          </Menu>
        </Sider>

        <Layout
          :style="{
            marginLeft: leftMargin + 'px',
            transition: '.3s'
          }"
        >
          <Header
            :style="{
              background: '#fff',
              boxShadow: '0 1px 4px rgba(0, 21, 41, 0.08)',
              padding: 0
            }"
          >
            <Icon
              @click.native="collapsedSider"
              :class="rotateIcon"
              :style="{
                margin: '0 20px'
              }"
              type="md-menu"
              size="24"
            ></Icon>
            <span class="login-button">
              <Button type="primary" @click="exitLogin">退出登录</Button>
            </span>
          </Header>
          <Content
            :style="{
              padding: '0 16px 16px 16px',
              minHeight: '260px'
            }"
          >
            <Breadcrumb :style="{ margin: '16px 0' }">
              <BreadcrumbItem>主页</BreadcrumbItem>
              <BreadcrumbItem>个人文献</BreadcrumbItem>
              <!-- <BreadcrumbItem>Layout</BreadcrumbItem> -->
            </Breadcrumb>
            <div style="min-height: 600px">
              <router-view></router-view>
            </div>
          </Content>
        </Layout>
      </Layout>
    </div>
  </div>
</template>

<script>
import "./style/common.less";

export default {
  data() {
    return {
      isCollapsed: false,
      leftMargin: 240
    };
  },
  computed: {
    rotateIcon() {
      return ["menu-icon", this.isCollapsed ? "rotate-icon" : ""];
    },
    menuitemClasses() {
      return ["menu-item", this.isCollapsed ? "collapsed-menu" : ""];
    }
  },
  methods: {
    collapsedSider() {
      this.$refs.side1.toggleCollapse();
      this.leftMargin === 240
        ? (this.leftMargin = 80)
        : (this.leftMargin = 240);
      // this.leftMargin = 100;
    },
    exitLogin() {
      // 从sessionStorage删除保存的数据
      // sessionStorage.removeItem("userStatus");
      this.$Message.info("请重新登录");
      // this.$router.push({
      //   path: "/login"
      // });
    }
  }
};
</script>

<style lang="less">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

.layout {
  border: 1px solid #d7dde4;
  background: #f5f7f9;
  position: relative;
  border-radius: 4px;
  overflow: hidden;
}

.layout-header-bar {
  background: #fff;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
}

.layout-logo-left {
  width: 90%;
  height: 30px;
  background: #5b6270;
  border-radius: 3px;
  margin: 15px auto;
}

.menu-icon {
  transition: all 0.3s;
}

.rotate-icon {
  transform: rotate(-90deg);
}

.menu-item span {
  display: inline-block;
  overflow: hidden;
  width: 69px;
  text-overflow: ellipsis;
  white-space: nowrap;
  vertical-align: bottom;
  transition: width 0.2s ease 0.2s;
}

.menu-item i {
  transform: translateX(0px);
  transition: font-size 0.2s ease, transform 0.2s ease;
  vertical-align: middle;
  font-size: 16px;
}

.collapsed-menu span {
  width: 0px;
  transition: width 0.2s ease;
}

.collapsed-menu i {
  transform: translateX(5px);
  transition: font-size 0.2s ease 0.2s, transform 0.2s ease 0.2s;
  vertical-align: middle;
  font-size: 22px;
}

.login-button {
  float: right;
  margin-right: 30px;
}
</style>

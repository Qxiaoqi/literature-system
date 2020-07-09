<template>
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
          <MenuItem name="personal" to="/personal/index">
            <Icon type="md-bookmark"></Icon>
            <span>个人文献</span>
          </MenuItem>
          <MenuItem name="public" to="/public/index">
            <Icon type="md-book"></Icon>
            <span>公共文献</span>
          </MenuItem>
          <MenuItem name="taskList" to="/task-list/index">
            <Icon type="md-list-box"></Icon>
            <span>任务列表</span>
          </MenuItem>
          <MenuItem v-if="$store.state.user.role === 'admin'" name="statistics" to="/statistics/index">
            <Icon type="md-podium"></Icon>
            <span>图表统计</span>
          </MenuItem>
          <MenuItem name="information" to="/information/index">
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
          <div class="user-button">
            <Dropdown placement="bottom-end" @on-click="userClick">
              <span class="user-name">{{ userInfo.name }}，您好</span>
              <Avatar src="https://i.loli.net/2017/08/21/599a521472424.jpg" />
              <DropdownMenu slot="list">
                <DropdownItem name="exit">退出登录</DropdownItem>
              </DropdownMenu>
            </Dropdown>
            <!-- <Button type="primary" @click="exitLogin">退出登录</Button> -->
          </div>
        </Header>
        <Content
          :style="{
            padding: '0 16px 16px 16px',
            minHeight: '260px'
          }"
        >
          <Breadcrumb :style="{ margin: '16px 0' }">
            <BreadcrumbItem>主页</BreadcrumbItem>
            <BreadcrumbItem>{{ pageName }}</BreadcrumbItem>
            <!-- <BreadcrumbItem>Layout</BreadcrumbItem> -->
          </Breadcrumb>
          <div style="min-height: 600px">
            <router-view></router-view>
          </div>
        </Content>
      </Layout>
    </Layout>
  </div>
</template>

<script>
import "@/styles/common.less";

export default {
  created() {
    console.log(this.$store.state.user.name);
    if (!this.$store.state.user.name) {
      // 两种情况，一种是 cookie未过期，但是 vuex中已经没有数据了（退出后又进入）
      // 第二种情况是 cookie已经过期，这个时候要跳转到登录页
      // 总之都要请求后端获取用户信息
      this.$api.user.getUserInfo()
        .then(res => {
          let data = res.data;
          if (data && data.code === 0) {
            // 获取成功
            console.log(data.data);
            // 提交用户信息
            this.$store.dispatch("getUserInfo", data.data);
          } else {
            console.log("没能获取用户信息");
            // 跳转到登录页
            // this.$Message.info(data.msg);
            // this.$router.push({
            //   name: "login"
            // })
          }
        })
        .catch(err => {
          console.log(err);
        })
    }
  },
  data() {
    return {
      isCollapsed: false,
      leftMargin: 240,
      userInfo: this.$store.state.user
    };
  },
  computed: {
    rotateIcon() {
      return ["menu-icon", this.isCollapsed ? "rotate-icon" : ""];
    },

    menuitemClasses() {
      return ["menu-item", this.isCollapsed ? "collapsed-menu" : ""];
    },

    pageName() {
      const pageNameStr = {
        personal: "个人文献库",
        public: "公共文献库",
        taskList: "任务列表",
        taskRelease: "任务发布",
        taskDetail: "任务详情",
        information: "个人信息",
        statistics: "图表统计"
      }
      return pageNameStr[this.$route.name] || this.$route.name;
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
    userClick(name) {
      console.log("点击退出:", name);
      this.$Message.info("请重新登录");
      switch(name) {
        case "exit":
          this.$router.push({
            name: "login"
          });
          break;
      }

    }
  }
};
</script>

<style lang="less" scoped>
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

.user-name {
  padding-right: 10px;
  vertical-align: -2px;
}

.user-button {
  float: right;
  margin-right: 60px;
  padding: 0 20px;

  &:hover {
    background-color: #f3f3f3;
  }
}
</style>

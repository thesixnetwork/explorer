<template>
  <b-row
    v-if="$route.meta.breadcrumb || $route.meta.pageTitle"
    class="content-header mb-2"
  >
    <!-- Content Left -->
    <b-col class="content-header-left" cols="12" md="9">
      <b-row class="breadcrumbs-top">
        <b-col cols="12">
          <!-- <h4 class="content-header-title float-left pr-1 mb-0">
            {{ $route.meta.pageTitle }}
          </h4> -->
          <div class="breadcrumb-wrapper">
            <b-breadcrumb class="c-pa-0">
              <b-breadcrumb-item to="/">
                <feather-icon
                  icon="HomeIcon"
                  size="16"
                  class="align-text-top customizer-icon"
                />
              </b-breadcrumb-item>
              <b-breadcrumb-item
                v-for="item in $route.meta.breadcrumb"
                :key="item.text"
                :active="item.active"
                :to="item.to"
              >
                {{ item.text }}
              </b-breadcrumb-item>
            </b-breadcrumb>
          </div>
        </b-col>
      </b-row>
    </b-col>

    <!-- Content Right -->
    <b-col
      class="content-header-right text-md-right d-md-block d-none"
      md="3"
      cols="12"
    >
      &nbsp;
    </b-col>
  </b-row>
</template>

<script>
import { BBreadcrumb, BBreadcrumbItem, BRow, BCol } from 'bootstrap-vue';
import Ripple from 'vue-ripple-directive';

export default {
  directives: {
    Ripple
  },
  components: {
    BBreadcrumb,
    BBreadcrumbItem,
    BRow,
    BCol
  }
};
</script>

<style lang="scss" scoped>
@import '~@core/scss/base/bootstrap-extended/include';
@import '~@core/scss/base/components/variables-dark';

.customizer-icon {
  color: $info;

  .dark-layout & {
    color: $primary;
  }
}
</style>

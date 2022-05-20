<template>
  <b-card title="Address" class="align-items-stretch ">
    <!-- address media -->
    <b-media class="mb-1" no-body>
      <b-media-aside class="mr-1">
        <b-avatar rounded variant="link" size="34" class="customizer-icon">
          <feather-icon icon="UserIcon" size="18" />
        </b-avatar>
      </b-media-aside>
      <b-media-body class="text-truncate">
        <h6 class="mb-0">
          Account Address
        </h6>
        <router-link :to="`../account/${accountAddress}`">
          <small>{{ accountAddress }}</small>
        </router-link>
      </b-media-body>
    </b-media>
    <b-media class="mb-1" no-body>
      <b-media-aside class="mr-1">
        <b-avatar rounded variant="link" size="34" class="customizer-icon">
          <feather-icon icon="Link2Icon" size="18" />
        </b-avatar>
      </b-media-aside>
      <b-media-body class="text-truncate">
        <h6 class="mb-0">
          Validator Address
        </h6>
        <small @click="copy(operatorAddress)">{{ operatorAddress }}</small>
      </b-media-body>
    </b-media>
    <b-media class="mb-1" no-body>
      <b-media-aside class="mr-1">
        <b-avatar rounded variant="link" size="34" class="customizer-icon">
          <feather-icon icon="UnlockIcon" size="18" />
        </b-avatar>
      </b-media-aside>
      <b-media-body class="text-truncate">
        <h6 class="mb-0">
          Consensus Public Address
        </h6>
        <small @click="copy(JSON.stringify(consensusPubkey))">
          {{ consensusPubkey }}
        </small>
      </b-media-body>
    </b-media>
    <b-media class="mb-1 text-truncate" no-body>
      <b-media-aside class="mr-1">
        <b-avatar rounded variant="link" size="34" class="customizer-icon">
          <feather-icon icon="HashIcon" size="18" />
        </b-avatar>
      </b-media-aside>
      <b-media-body>
        <h6 class="mb-0">
          Hex Address
        </h6>
        <small @click="copy(hexAddress)">{{ hexAddress }}</small>
      </b-media-body>
    </b-media>
  </b-card>
</template>

<script>
import {
  BCard,
  BAvatar,
  BMedia,
  BMediaAside,
  BMediaBody,
  VBTooltip
} from 'bootstrap-vue';

import ToastificationContent from '@core/components/toastification/ToastificationContent.vue';

export default {
  components: {
    BCard,
    BAvatar,
    BMedia,
    BMediaAside,
    BMediaBody,
    // eslint-disable-next-line vue/no-unused-components
    ToastificationContent
  },
  directives: {
    'b-tooltip': VBTooltip
  },
  props: {
    operatorAddress: {
      type: String,
      default: '-'
    },
    accountAddress: {
      type: String,
      default: '-'
    },
    consensusPubkey: {
      type: [Object, String],
      required: true
    },
    hexAddress: {
      type: String,
      default: '-'
    }
  },
  methods: {
    copy(v) {
      this.$copyText(v).then(
        () => {
          this.$toast({
            component: ToastificationContent,
            props: {
              title: 'Address copied',
              icon: 'BellIcon'
            }
          });
        },
        e => {
          this.$toast({
            component: ToastificationContent,
            props: {
              title: `Failed to copy address! ${e}`,
              icon: 'BellIcon',
              variant: 'danger'
            }
          });
        }
      );
    }
  }
};
</script>

<style lang="scss" scoped>
@import '~@core/scss/base/bootstrap-extended/include';
@import '~@core/scss/base/components/variables-dark';

.media small {
  white-space: nowrap;
  overflow: hidden;
}

.customizer-text {
  color: $info;

  .dark-layout & {
    color: $primary;
  }
}

.customizer-icon {
  color: $info;
  background-color: rgba($info, 0.12);

  .dark-layout & {
    color: $primary;
    background-color: rgba($primary, 0.12);
  }
}
</style>

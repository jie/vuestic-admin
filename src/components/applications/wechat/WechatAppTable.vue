<template>
  <va-card :title="$t('wechat.my_wechat_apps')">
    <template slot="actions">
      <va-button flat small color="info" @click="openAppModal">{{ $t('wechat.create_wechat_app') }}</va-button>
    </template>

    <va-data-table :fields="fields" :data="entities" :per-page="5" v-if="entities.length !== 0">
      <template slot="actions" slot-scope="props">
        <va-button
          flat
          small
          color="gray"
          icon="fa fa-pencil"
          @click="openAppModal($event, props.rowIndex)"
        />
        <va-button flat small color="gray" icon="fa fa-trash" @click="openDeleteAppModal($event, props.rowIndex)"/>
      </template>
    </va-data-table>
    <div class="row" style="justify-content: center;align-items: center; min-height: 400px" v-else>
      <div class="flex">
        <va-button color="info" @click="openAppModal">{{ $t('wechat.create_my_first_wechat_app') }}</va-button>
      </div>
    </div>
    <va-modal
      v-model="showDeleteAppModal"
      :title="$t('wechat.confirm_to_delete_app', {name: showDeleteAppModal?entities[currentAppIndex].name: ''})"
      :okText="$t('wechat.confirm_delete')"
      :cancelText="$t('wechat.cancel_delete')"
      :onOk="confirmDeleteApp"
    >
    </va-modal>
    <va-modal
      v-model="showAppModal"
      :title="currentAppIndex === null ? $t('wechat.create_wechat_app'):$t('wechat.edit_wechat_app')"
      okText
      cancelText
    >
      <div style="min-width: 400px;">
        <div class>
          <div class="field">
            <va-input v-model="appForm.name" :placeholder="$t('wechat.name')" />
          </div>
          <div class="field">
            <va-input
              v-model="appForm.wechatid"
              :placeholder="$t('wechat.wechatid')"
              readonly
              v-if="appForm.wechatid"
            />
          </div>
          <div class="field">
            <va-input
              v-model="appForm.appid"
              :placeholder="$t('wechat.appid')"
              :readonly="currentAppIndex === null?false:true"
            />
          </div>
          <div class="field">
            <va-input v-model="appForm.appsecret" :placeholder="$t('wechat.appsecret')" />
          </div>
          <div class="field">
            <va-input v-model="appForm.echo_token" :placeholder="$t('wechat.echo_token')" />
          </div>
          <div class="field">
            <va-input v-model="appForm.echo_aes_key" :placeholder="$t('wechat.echo_aes_key')" />
          </div>
        </div>
        <div class="operation-wrapper">
          <va-button color="primary" outline @click="showAppModal = false">{{ $t('wechat.cancel') }}</va-button>
          <va-button color="primary" @click="submitAppForm">{{ $t('wechat.submit') }}</va-button>
        </div>
      </div>
    </va-modal>
  </va-card>
</template>

<script>
import { mapState } from 'vuex'
import users from '../../../data/users.json'

export default {
  data () {
    return {
      users: users.slice(),
      showAppModal: false,
      showDeleteAppModal: false,
      currentAppIndex: null,
      submitDisabled: false,
      appForm: {
        name: '',
        wechatid: '',
        appid: '',
        appsecret: '',
        echo_token: '',
        echo_aes_key: ''
      }
    }
  },
  computed: mapState({
    entities: state => state.wechat.entities,
    entity: state => state.wechat.entity,
    isLoading: state => state.wechat.isLoading,
    errMsg: state => state.wechat.errMsg,
    fields: function () {
      return [
        {
          name: 'name',
          title: this.$t('wechat.name'),
          sortField: 'name',
          width: '25%'
        },
        {
          name: 'wechatid',
          title: this.$t('wechat.wechatid'),
          width: '30%'
        },
        {
          name: 'appid',
          title: this.$t('wechat.appid'),
          sortField: 'appid',
          width: '25%'
        },
        {
          name: '__slot:actions',
          dataClass: 'text-right'
        }
      ]
    }
  }),
  mounted () {
    console.log('getEntities:')
    this.getEntities()
  },
  methods: {
    getStarMessage (app) {
      // const actionName = user.starred ? this.$t('tables.unstar') : this.$t('tables.star')
      // return `${actionName} ${user.fullName}`
      return app.name
    },
    getStarColor (user) {
      return user.starred ? 'primary' : 'gray'
    },
    star ({ id }) {
      const i = this.users.findIndex(user => user.id === id)
      this.users[i].starred = !this.users[i].starred
    },
    async getEntities () {
      let result = await this.$store.dispatch('wechat/getApps')
      console.log(result)
    },
    async submitAppForm () {
      this.submitDisabled = true
      let result = null
      if (this.entities.length === 0) {
        result = await this.$store.dispatch('wechat/saveApp', this.appForm)
      } else if (this.entities.length !== 0 && this.currentAppIndex === null) {
        result = await this.$store.dispatch('wechat/applyApp', this.appForm)
      }
      if (this.errMsg) {
        this.showToast(this.errMsg, {
          icon: 'fa-warning',
          position: 'bottom-right',
          duration: 20000,
          fullWidth: false
        })

        setTimeout(() => {
          this.submitDisabled = false
        }, 2000)
      } else {
        this.showToast('get wechat app success', {
          icon: 'lightbulb-o',
          position: 'bottom-right',
          duration: 20000,
          fullWidth: false
        })
        setTimeout(() => {
          this.showAppModal = false
          this.submitDisabled = false
        }, 2000)
      }
    },
    openAppModal (e, index) {
      console.log(e)
      console.log(index)
      if (index !== undefined) {
        this.currentAppIndex = index
        this.appForm = { ...this.entities[index] }
      } else {
        this.currentAppIndex = null
        this.appForm = {
          name: '',
          wechatid: '',
          appid: '',
          appsecret: '',
          echo_token: '',
          echo_aes_key: ''
        }
      }
      this.showAppModal = true
    },
    openDeleteAppModal (e, index) {
      this.currentAppIndex = index
      console.log(this.entities[index])
      this.showDeleteAppModal = true
    },
    async confirmDeleteApp () {
      this.submitDisabled = true
      let result = await this.$store.dispatch('wechat/deleteApp', { id: this.entities[this.currentAppIndex].id })
      if (this.errMsg) {
        this.showToast(this.errMsg, {
          icon: 'fa-warning',
          position: 'bottom-right',
          duration: 20000,
          fullWidth: false
        })

        setTimeout(() => {
          this.submitDisabled = false
        }, 2000)
      } else {
        this.showToast('delete success', {
          icon: 'lightbulb-o',
          position: 'bottom-right',
          duration: 20000,
          fullWidth: false
        })
        setTimeout(() => {
          this.showDeleteAppModal = false
          this.submitDisabled = false
        }, 2000)
      }
    }
  }
}
</script>

<style lang="scss">
.operation-wrapper {
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>

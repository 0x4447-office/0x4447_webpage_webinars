<template>
  <b-container class="p-5">
    <b-row>
      <b-col>
          <Logo />
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <resellers-form />
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <page-footer />
      </b-col>
    </b-row>
  </b-container>
</template>

<script>

import Logo from '@/components/logo'
import ResellersForm from '@/components/resellers/form'

export default {
  transition: 'slide-right',

  components: {
    Logo,
    ResellersForm
  }

}
</script>

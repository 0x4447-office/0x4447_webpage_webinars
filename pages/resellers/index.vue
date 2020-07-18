<template>
  <b-container>
    <b-row>
      <b-col>
          <Logo />
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <resellers-form class="mt-3"/>
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
import PageFooter from '@/components/page-footer'
import ResellersForm from '@/components/resellers/form'

export default {
  transition: 'slide-right',

  components: {
    Logo,
    ResellersForm,
    PageFooter
  }

}
</script>

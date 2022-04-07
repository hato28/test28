<template>
  <footer>
    <!--
    <div class="d-flex mb-3 ml-3" v-for="(item, index) in footer_contents" :key="index">
      <img class="mr-3" :src="getIconPath(item.image)" />
      <div>
        <span class="footer-description">{{item.description}}</span>
        <div class="d-flex">
          <img class="mr-1" src="~/assets/icons/icon-copy.svg" />
          <div class="email-clipboard" v-clipboard:copy="item.email" v-clipboard:success="onCopy">
            {{item.email}}
          </div>
        </div>
      </div>
    </div>-->
    <div class="text-center footer-description">
      For concerns, please file a ticket at our 
    </div>
    <div class="text-center footer-description">
      Official Help Desk
    </div>
    <div class="text-center mt-2">
      <a href = "https://yondu.atlassian.net/servicedesk/customer/portal/74">
      <div class="email-clipboard">
        Pitmasters Help Center
      </div>
      </a>
    </div>
    <div class="text-center mt-4 footer-divider"></div>
    <div class="text-center mt-4 footer-description">
      Join our official Facebook Group
    </div>
    <div class="text-center mt-2">
      <a href = "https://www.facebook.com/groups/965850160637345/">
      <img class="mr-1" src="~/assets/icons/facebook-link.svg" />
      </a>
    </div>
    <b-toast variant="info" id="clipboard-toast" title="Info"  >
      Copied to clipboard
    </b-toast>
  </footer>
</template>

<script>

export default {
  data () {
    return {
      footer_contents: [
        {
          image: 'icon-get_cash',
          description: 'For withdrawal concerns, email us at:',
          email: 'withdraw@sabongpitmasters.com'
        },
        {
          image: 'icon-no_cash',
          description: 'For missing credits, email us at:',
          email: 'bets@sabongpitmasters.com'
        },
        {
          image: 'icon-cash_in_hand',
          description: 'For cash-in/top up concerns, email us at:',
          email: 'cash-in@sabongpitmasters.com'
        },
        {
          image: 'icon-online_support',
          description: 'For other concerns, email us at:',
          email: 'info@sabongpitmasters.com'
        }
      ],
      footer_links: [
        {
          label: 'About Us',
          route: '/about'
        },
        {
          label: 'Contact Us',
          route: '/contact'
        },
        {
          label: 'Terms & Conditions',
          route: '/terms'
        }
      ],
      social_links: [
        {
          label: 'Facebook',
          route: '/facebook'
        },
        {
          label: 'Twitter',
          route: '/twitter'
        },
        {
          label: 'Instagram',
          route: '/instagram'
        }
      ]
    }
  },
  methods: {
    getIconPath (name) {
      return require(`~/assets/icons/${name.toLowerCase()}.svg`)
    },
    onCopy() {
      this.$bvToast.show('clipboard-toast')
    },
 
  }
}
</script>

<style lang="scss">
footer {
  padding: 4rem 1rem;
  font-size: 0.875rem;
  color: $white;
  background: $blue-dark;
  & p {
    margin: 0;
    font-size: 0.875rem;
  }

  & img {
    border-radius: 0.3rem;
  }

  & a {
    color: $white;
    transition: color 0.3s ease-in-out;
    &:hover {
      color: $green;
      text-decoration: none;
    }
  }
}

.footer-description{
  font-weight: bold;
}

.footer-divider{
  border-top: 1px solid #bbb;
  width: 75%;
  margin: auto;
}

.email-clipboard{
  color: #62BBFF;
  cursor: pointer;
  text-decoration: underline;
  font-weight: bold;
}

.toast {
    left: 50%;
    top: 40%;
    position: fixed;
    transform: translate(-50%, 0px);
    z-index: 9999;
}
</style>

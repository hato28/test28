<template>
  <component
    :class="`wpit-type ${elementProps.class} wpit-type--${color} ${elementBold} ${elementUpperCase} ${noMargin ? 'no-margin' : ''} ${manrope ? 'manrope' : ''} ${barlow ? 'barlow' : ''}`"
    :is="elementProps.element"
  >
    <slot />
  </component>
</template>

<script>
export default {
  props: {
    color: {
      type: String,
      default: 'dark'
    },
    heading: {
      type: Boolean,
      default: false
    },
    subheading: {
      type: Boolean,
      default: false
    },
    largetext: {
      type: Boolean,
      default: false
    },
    navigator: {
      type: Boolean,
      default: false
    },
    uppercase: {
      type: Boolean,
      default: false
    },
    bold: {
      type: Boolean,
      default: false
    },
    manrope: {
      type: Boolean,
      default: false
    },
    barlow: {
      type: Boolean,
      default: false
    },
    noMargin: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    elementProps () {
      let variant = 'text'
      if (this.heading) {
        variant = 'heading'
      } else if (this.subheading) {
        variant = 'subheading'
      } else if (this.navigator) {
        variant = 'navigator'
      } else if (this.largetext) {
        variant = 'largetext'
      }
      return this.types[variant]
    },
    elementUpperCase () {
      return this.uppercase ? 'uppercase' : ''
    },
    elementBold () {
      return this.bold ? 'bold': ''
    }
  },
  data () {
    return {
      types: {
        heading: { element: 'h1', class: 'wpit-heading' },
        subheading: { element: 'h2', class: 'wpit-subheading' },
        navigator: { element: 'p', class: 'wpit-text-nav' },
        largetext: { element: 'p', class: 'wpit-largetext' },
        text: { element: 'p', class: 'wpit-text' }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
h1, h2, p {
  @include themed () {
    color: t($text);
  }
  font-weight: 400;
}

h1 {
  margin-bottom: 24px;
  line-height: 110%;
}

h2 {
  margin-bottom: 20px;
  line-height: 105%;
}

p {
  margin-bottom: 16px;
}

h1, h2, p {
  &.no-margin {
    margin-bottom: 0;
  }
}

.wpit-type {
  @include text-colors;
  & a {
    position: relative;
    text-decoration: none;
    color: inherit;
    &:after {
      content: '';
      position: absolute;
      bottom: -10px;
      left: 0;
      width: 0;
      height: 2px;
      transition: width 0.1s ease-in-out;
    }
    &:hover {
      &:after {
        width: 100%;
      }
    }
  }
}

.wpit-heading {
  font-size: 1.25rem;
}

.wpit-subheading {
  font-size: 1rem;
}

.wpit-largetext {
  font-size: 0.625rem;
}

.wpit-text {
  font-size: 0.625rem;
}

.wpit-text-nav {
  font-size: 1rem;
}

.uppercase {
  text-transform: uppercase;
}
.bold {
  font-weight: 700;
}
.manrope {
  font-family: 'Manrope';
}
.barlow {
  font-family: 'Barlow';
}


@media only screen and (max-width: 414px) {
  .wpit-heading { font-size: 1rem; }
  .wpit-subheading { font-size: 0.875rem; }
  .wpit-text { font-size: 0.875rem; }
}
</style>

<template>
  <ul class="listing">
    <li
      v-for="(item, i) in items"
      :key="`listitem_${i}`"
    >
      <a v-if="dynamic" class="listing__link" href="javascript:;" @click="$emit('fire')">
        <b-avatar class="listing__avatar" variant="light" text="AM" :src="require(`~/assets/images/cf${item.id}.png`)" size="2.25rem"></b-avatar>
        <div class="listing__details">
          <Type largetext bold noMargin color="dark" v-html="item.title" />
          <Type largetext noMargin color="grey-dark" v-html="item.content" />
        </div>
        <div class="listing__status">
          <b-avatar v-if="item.live" class="listing__status--live" variant="danger" text=" " size="0.625rem"></b-avatar>
          <svg v-else class="listing__status--replay" :class="`theme theme${GET_MODE ? '--dark' : '--default'}`" width="491" height="481" viewBox="0 0 491 481" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M97.38 287.692V176.229C97.38 151.905 117.172 132.104 141.514 132.104H312.247V151.61C312.247 157.135 315.312 162.2 320.188 164.772C325.072 167.362 330.974 167.001 335.531 163.887L436.419 94.83C440.026 92.355 442.19 88.273 442.207 83.896C442.222 79.519 440.083 75.406 436.485 72.931L335.63 2.956C331.082 -0.190003 325.147 -0.552003 320.247 2.007C315.337 4.564 312.272 9.66 312.272 15.185V34.724H141.515C63.483 34.724 0 98.208 0 176.229V287.692C0 314.573 21.801 336.376 48.689 336.376C75.58 336.376 97.38 314.573 97.38 287.692Z" fill="black"/>
            <path d="M442.199 144.513C415.308 144.513 393.508 166.314 393.508 193.214V304.64C393.508 328.982 373.715 348.783 349.374 348.783H178.641V329.277C178.641 323.754 175.576 318.689 170.7 316.115C165.816 313.543 159.914 313.885 155.357 317.002L54.468 386.056C50.862 388.533 48.697 392.628 48.682 397.007C48.665 401.366 50.804 405.482 54.402 407.972L155.258 477.933C159.806 481.08 165.74 481.437 170.642 478.898C175.55 476.326 178.616 471.244 178.616 465.703V446.164H349.372C427.403 446.164 490.888 382.666 490.888 304.641V193.214C490.89 166.313 469.088 144.513 442.199 144.513Z" fill="black"/>
          </svg>
        </div>
      </a>
      <template v-else>
        <Type largetext bold noMargin color="dark" v-html="item.title" />
        <Type largetext noMargin color="grey-dark" v-html="item.content" />
      </template>
    </li>
  </ul>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  props: {
    items: {
      type: Array,
      required: true
    },
    dynamic: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss" scoped>
.listing {
  padding: 0;
  list-style: none;

  & > li {
    margin-bottom: 1.75rem;
  }

  &__link {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    transition: all 0.15s ease-in-out;
    &:hover {
      text-decoration: none;
      transform: translate(-2px, -2px);
    }
  }
  
  &__avatar {
    margin-right: 1rem;
  }
  &__details {
    flex-grow: 1;
  }
  &__status {
    position: relative;
    margin-top: 0.5rem;
    width: 1rem;
    height: 1rem;
    display: flex;
    justify-content: center;
    align-items: center;

    &--live:after {
      content: '';
      position: absolute;
      width: 1rem;
      height: 1rem;
      border-radius: 50%;
      background: $red;
      opacity: 0;
      transform: scale(1);
      animation: radial 1.8s ease-in-out infinite;
    }
    &--replay {
      &,
      & path {
        width: 0.75rem;
        height: 0.75rem;
        @include themed () {
          fill: t($svg);
        }
      }
    }
  }
}
</style>
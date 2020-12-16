<template>
  <div class="preloader">
    <div class="preloader__wrap">
      <p class="preloader__label">{{ percentLoaded }}% Completed</p>
      <div class="progress-bar">
        <div class="progress-bar__progress" :style="`width: ${percentLoaded}%`"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Preloader',
  props: {
    percentLoaded: {
      required: true,
      type: Number
    }
  }
}
</script>

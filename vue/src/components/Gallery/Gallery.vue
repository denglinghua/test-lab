<template>
  <div className="react-photo-gallery--gallery">
    <div ref="galleryEl" :style="galleryStyle">
      <Photo
        v-for="(thumb, index) in thumbs"
        :key="thumb.key || thumb.src"
        :left="thumb.left"
        :top="thumb.top"
        :containerHeight="thumb.containerHeight"
        :index="index"
        :margin="margin"
        :direction="direction"
        :onClick="onClick ? handleClick : null"
        :photo="thumb"
      />
    </div>
  </div>
</template>
<script setup>
import { ref, defineProps, computed, onMounted, onUnmounted } from "vue";
import ResizeObserver from "resize-observer-polyfill";
import { computeColumnLayout } from "./layouts/columns";
import { computeRowLayout } from "./layouts/justified";
import { findIdealNodeSearch } from "./utils/findIdealNodeSearch";
import Photo from "./Photo";

const props = defineProps({
  photos: {
    type: Array,
    default: [],
  },
  onClick: {
    type: Function,
    default: null,
  },
  direction: {
    type: String,
    default: "row",
  },
  margin: {
    type: Number,
    default: 2,
  },
  limitNodeSearch: {
    default: undefined,
  },
  targetRowHeight: {
    default: 300,
  },
  columns: {
    default: undefined,
  },
  renderImage: {
    type: Function,
    default: null,
  },
});

const containerWidth = ref(800);
const galleryEl = ref(null);
const galleryStyle = ref({});

const thumbs = computed(
  () => {
    // subtract 1 pixel because the browser may round up a pixel
    const conWidth = containerWidth.value;
    const width = conWidth - 1;
    let thumbs;

    let {
      margin,
      direction,
      limitNodeSearch,
      targetRowHeight,
      columns,
      photos,
    } = props;

    if (direction === "row") {
      // allow user to calculate limitNodeSearch from containerWidth
      if (typeof limitNodeSearch === "function") {
        limitNodeSearch = limitNodeSearch(conWidth);
      }
      if (typeof targetRowHeight === "function") {
        targetRowHeight = targetRowHeight(conWidth);
      }
      // set how many neighboring nodes the graph will visit
      if (limitNodeSearch === undefined) {
        limitNodeSearch = 2;
        if (conWidth >= 450) {
          limitNodeSearch = findIdealNodeSearch({
            targetRowHeight : targetRowHeight,
            containerWidth: conWidth,
          });
        }
      }

      galleryStyle.value = {
        display: "flex",
        flexWrap: "wrap",
        flexDirection: "row",
      };
      thumbs = computeRowLayout({
        containerWidth: width,
        limitNodeSearch,
        targetRowHeight,
        margin,
        photos,
      });
    }
    if (direction === "column") {
      // allow user to calculate columns from containerWidth
      if (typeof columns === "function") {
        columns = columns(conWidth);
      }
      // set default breakpoints if user doesn't specify columns prop
      if (columns === undefined) {
        columns = 1;
        if (conWidth >= 500) columns = 2;
        if (conWidth >= 900) columns = 3;
        if (conWidth >= 1500) columns = 4;
      }
      thumbs = computeColumnLayout({
        containerWidth: width,
        columns,
        margin,
        photos,
      });
      const height = thumbs[thumbs.length - 1].containerHeight;
      galleryStyle.value = { position: "relative", height: `${height}px` };
    }

    return thumbs;
  },
  { immediate: true }
);

let animationFrameID = null;
onMounted(() => {
  const observer = new ResizeObserver((entries) => {
    // only do something if width changes
    const newWidth = entries[0].contentRect.width;
    if (containerWidth.value !== newWidth) {
      // put in an animation frame to stop "benign errors" from
      // ResizObserver https://stackoverflow.com/questions/49384120/resizeobserver-loop-limit-exceeded
      animationFrameID = window.requestAnimationFrame(() => {
        containerWidth.value = Math.floor(newWidth);
      });
    }
  });
  observer.observe(galleryEl.value);
});

onUnmounted(() => {
  observer.disconnect();
  window.cancelAnimationFrame(animationFrameID);
});
</script>
<style>
.react-photo-gallery--gallery {
  width: 800px;
  background-color: #f1f1f1;
}
</style>
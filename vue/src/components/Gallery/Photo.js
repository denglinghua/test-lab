import { h } from "vue";

export default {
  props: {
    index : Number,
    onClick : Function,
    photo: Object,
    margin: Number,
    direction: String,
    top: Number,
    left: Number,
    key: String,
  },

  setup(props) {
    const { index, onClick, photo, margin, direction, top, left, key } = props;
    const imgStyle = { margin: margin, display: "block" };
    if (direction === "column") {
      imgStyle.position = "absolute";
      imgStyle.left = `${left}px`;
      imgStyle.top = `${top}px`;
    }

    const handleClick = (event) => {
      onClick(event, { photo, index });
    };

    return () =>
      h("img", {
        key: key,
        style: onClick ? { ...imgStyle, ...imgWithClick } : imgStyle,
        ...photo,
        onClick: onClick ? handleClick : null,
      });
  },
};

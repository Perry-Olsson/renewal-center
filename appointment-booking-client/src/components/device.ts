export const device = {
  tablet: {
    width: 770,
    pixels: "770px",
  },
  isTabletOrSmaller: function (width: number) {
    return width <= this.tablet.width;
  },
  isLapTopOrBigger: function (width: number) {
    return width > this.tablet.width;
  },
};

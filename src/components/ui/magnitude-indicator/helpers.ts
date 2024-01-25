const LIGHT: number = 3;
const MODERATE: number = 5;
const STRONG: number = 7;

export const getMagnitudeColors = (magnitude: number) => {
  if (magnitude < LIGHT) {
    return {
      border: 'border-ritcher-scales-green',
      background: 'bg-ritcher-scales-green',
      shadow: 'shadow-ritcher-scales-green',
    };
  }
  if (magnitude < MODERATE) {
    return {
      border: 'border-ritcher-scales-yellow',
      background: 'bg-ritcher-scales-yellow',
      shadow: 'shadow-ritcher-scales-yellow',
    };
  }
  if (magnitude < STRONG) {
    return {
      border: 'border-ritcher-scales-orange',
      background: 'bg-ritcher-scales-orange',
      shadow: 'shadow-ritcher-scales-orange',
    };
  }
  return {
    border: 'border-ritcher-scales-red',
    background: 'bg-ritcher-scales-red',
    shadow: 'shadow-ritcher-scales-red',
  };
};

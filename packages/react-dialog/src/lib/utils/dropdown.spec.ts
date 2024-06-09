import { MiddlewareData } from '@floating-ui/react-dom';
import {
  getArrowStyles,
  getDialogStyles,
  getPlacementPrefix,
} from './dropdown';

describe('getPlacementPrefix()', () => {
  it('should return "top" for placements starting with "bottom"', () => {
    expect(getPlacementPrefix('bottom')).toEqual('top');
    expect(getPlacementPrefix('bottom-start')).toEqual('top');
    expect(getPlacementPrefix('bottom-end')).toEqual('top');
  });
  it('should return "bottom" for placements starting with "top"', () => {
    expect(getPlacementPrefix('top')).toEqual('bottom');
    expect(getPlacementPrefix('top-start')).toEqual('bottom');
    expect(getPlacementPrefix('top-end')).toEqual('bottom');
  });
  it('should return "right" for placements starting with "left"', () => {
    expect(getPlacementPrefix('left')).toEqual('right');
    expect(getPlacementPrefix('left-start')).toEqual('right');
    expect(getPlacementPrefix('left-end')).toEqual('right');
  });
  it('should return "left" for placements starting with "right"', () => {
    expect(getPlacementPrefix('right')).toEqual('left');
    expect(getPlacementPrefix('right-start')).toEqual('left');
    expect(getPlacementPrefix('right-end')).toEqual('left');
  });
});

describe('getArrowStyles()', () => {
  const constantArrowProps = {
    display: 'block',
    position: 'absolute',
  };
  it('should properly compute css properties for bottom placement', () => {
    const mData: MiddlewareData = {
      offset: { placement: 'bottom', x: 0, y: 0 },
      arrow: { x: 100, centerOffset: 0, alignmentOffset: 0 },
    };
    const props = getArrowStyles({ middlewareData: mData });
    expect(props).toEqual({
      ...constantArrowProps,
      insetInlineStart: 100,
      transform: 'rotate(0deg)',
      top: 2,
    });
  });
  it('should properly compute css properties for top placement', () => {
    const mData: MiddlewareData = {
      offset: { placement: 'top', x: 0, y: 0 },
      arrow: { x: 100, centerOffset: 0, alignmentOffset: 0 },
    };
    const props = getArrowStyles({ middlewareData: mData });
    expect(props).toEqual({
      ...constantArrowProps,
      insetInlineStart: 100,
      transform: 'rotate(180deg)',
      bottom: 2,
    });
  });
  it('should properly compute css properties for left placement', () => {
    const mData: MiddlewareData = {
      offset: { placement: 'left', x: 0, y: 0 },
      arrow: { y: 100, centerOffset: 0, alignmentOffset: 0 },
    };
    const props = getArrowStyles({ middlewareData: mData });
    expect(props).toEqual({
      ...constantArrowProps,
      insetBlockStart: 100,
      transform: 'rotate(90deg)',
      right: 2,
    });
  });
  it('should properly compute css properties for right placement', () => {
    const mData: MiddlewareData = {
      offset: { placement: 'right', x: 0, y: 0 },
      arrow: { y: 100, centerOffset: 0, alignmentOffset: 0 },
    };
    const props = getArrowStyles({ middlewareData: mData });
    expect(props).toEqual({
      ...constantArrowProps,
      insetBlockStart: 100,
      transform: 'rotate(-90deg)',
      left: 2,
    });
  });
});

describe('getDialogStyles()', () => {
  const constantStyles = {
    background: 'transparent',
    border: 0,
    margin: 0,
  };
  it('should correctly set paddingProp for all placements', () => {
    const config = {
      middlewareData: { offset: { placement: 'bottom' } } as MiddlewareData,
      arrowDimensions: { width: 10, height: 10 },
    };
    let styles = getDialogStyles(config);
    expect(styles.paddingTop).toEqual(10);
    config.middlewareData.offset!.placement = 'top';
    styles = getDialogStyles(config);
    expect(styles.paddingBottom).toEqual(10);
    config.middlewareData.offset!.placement = 'right';
    styles = getDialogStyles(config);
    expect(styles.paddingLeft).toEqual(10);
    config.middlewareData.offset!.placement = 'right-start';
    styles = getDialogStyles(config);
    expect(styles.paddingLeft).toEqual(10);
    config.middlewareData.offset!.placement = 'left';
    styles = getDialogStyles(config);
    expect(styles).toEqual({
      ...constantStyles,
      paddingRight: 10,
    });
  });
});

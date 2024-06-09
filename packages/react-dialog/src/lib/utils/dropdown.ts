import { type Placement } from '@floating-ui/react-dom';
import { IGetStyles } from '../types';
import { CSSProperties } from 'react';

/**
 * Retrieves the offset prefix based on placement properties for layout purposes.
 * @param {Placement} placement - The placement string to determine its corresponding offset prefix.
 * @returns {string} The offset prefix ('top', 'right', 'bottom', or 'left').
 */
export function getPlacementPrefix(placement: Placement): string {
  const placementPrefix = placement.split('-')[0];
  const offsetProperty: Record<string, string> = {
    bottom: 'top',
    left: 'right',
    right: 'left',
    top: 'bottom',
  };

  return offsetProperty[placementPrefix];
}

/**
 * Generates CSS properties for an arrow element based on provided configuration data.
 *
 * @param {Omit<IGetStyles, 'arrowDimensions'} middlewareData - Configuration object excluding `arrowDimensions`.
 * @returns {CSSProperties} An object containing the computed styles for the arrow.
 */
export function getArrowStyles({
  middlewareData,
}: Omit<IGetStyles, 'arrowDimensions'>): CSSProperties {
  const prefix = getPlacementPrefix(
    middlewareData.offset?.placement || 'bottom'
  );
  let arrowRotateAngles: number;
  switch (middlewareData.offset?.placement) {
    case 'top':
      arrowRotateAngles = 180;
      break;
    case 'right':
      arrowRotateAngles = -90;
      break;
    case 'left':
      arrowRotateAngles = 90;
      break;
    default:
      arrowRotateAngles = 0;
  }
  return {
    display: 'block',
    position: 'absolute',
    insetInlineStart: middlewareData.arrow?.x,
    insetBlockStart: middlewareData.arrow?.y,
    transform: `rotate(${arrowRotateAngles}deg)`,
    [prefix]: 2,
  };
}
/**
 * Generates CSS properties for a dialog element based on provided configuration data.
 *
 * @param {IGetStyles} - Configuration object containing styling options, including `arrowDimensions` and `middlewareData`.
 * @returns {CSSProperties} An object representing CSS properties to style a dialog element with its arrow (if present).
 */
export function getDialogStyles({
  arrowDimensions,
  middlewareData,
}: IGetStyles): CSSProperties {
  const prefix = getPlacementPrefix(
    middlewareData.offset?.placement || 'bottom'
  );
  const paddingProp = `padding${
    prefix.charAt(0).toUpperCase() + prefix.slice(1)
  }`;
  return {
    background: 'transparent',
    border: 0,
    margin: 0,
    [paddingProp]: arrowDimensions.height,
  };
}

import { NewBBox, NewBBoxClass } from './NewBBox';
import React, {
  useRef,
  useState,
  useCallback,
  useImperativeHandle,
  isValidElement,
  ComponentType,
  forwardRef,
  PropsWithChildren,
  useContext,
  useEffect,
} from 'react';
import { isNaN } from 'lodash';

export type Measurable = any;
export type MeasureResult = Partial<NewBBox>;

export type Measure = (measurables: Array<Measurable>, constraints: Constraints) => MeasureResult;

export type BBox = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export type BBoxWithChildren = Partial<PropsWithChildren<BBox>>;
export type NewBBoxWithChildren = Partial<PropsWithChildren<NewBBox>>;

// export type Constraints = {
//   minWidth: number;
//   maxWidth: number;
//   minHeight: number;
//   maxHeight: number;
// };
export type Constraints = any;

export type Placeable = {
  place: (point: { x?: number; y?: number }) => void;
  placeUnlessDefined: (point: { x?: number; y?: number }) => void;
  measuredWidth: number;
  measuredHeight: number;
};

export type NewPlaceable = {
  top?: number;
  left?: number;
  right?: number;
  bottom?: number;
  width?: number;
  height?: number;
};

// a layout hook
export const useBluefishLayout = (
  measure: Measure,
  bbox: Partial<NewBBox>,
  ref: React.ForwardedRef<unknown>,
  children?: React.ReactNode,
  name?: any,
): NewBBoxWithChildren => {
  const context = useContext(BluefishContext);

  const childrenRef = useRef<any[]>([]);

  const [left, setLeft] = useState(bbox.left);
  const [top, setTop] = useState(bbox.top);
  const [right, setRight] = useState(bbox.right);
  const [bottom, setBottom] = useState(bbox.bottom);
  const [width, setWidth] = useState(bbox.width);
  const [height, setHeight] = useState(bbox.height);
  // const [bboxClass, setBBoxClass] = useState<NewBBoxClass | undefined>(undefined);
  const bboxClassRef = useRef<NewBBoxClass | undefined>(undefined);

  useEffect(() => {
    console.log(name, 'left updated to', left);
  }, [name, left]);

  useEffect(() => {
    console.log(name, 'top updated to', top);
  }, [name, top]);

  // useEffect(() => {
  //   if (name !== undefined) {
  //     console.log('setting ref', name, ref);
  //     context.bfMap.set(name, ref as any);
  //   }
  // });

  useImperativeHandle(
    ref,
    () => ({
      name,
      measure(constraints: Constraints): NewBBoxClass {
        let bbox;
        if (bboxClassRef.current === undefined) {
          console.log('measuring', name);
          const { width, height } = measure(childrenRef.current, constraints);
          setWidth(width);
          setHeight(height);
          const left = undefined;
          const top = undefined;
          const right = undefined;
          const bottom = undefined;

          bbox = new NewBBoxClass(
            { left, top, right, bottom, width, height },
            {
              left: (left) => {
                console.log(name, 'left set to', left);
                return setLeft(left);
              },
              top: (top) => {
                console.log(name, 'top set to', top);
                return setTop(top);
              },
              right: (right) => {
                console.log(name, 'right set to', right);
                return setRight(right);
              },
              bottom: (bottom) => {
                console.log(name, 'bottom set to', bottom);
                return setBottom(bottom);
              },
              width: (width) => {
                console.log(name, 'width set to', width);
                return setWidth(width);
              },
              height: (height) => {
                console.log(name, 'height set to', height);
                return setHeight(height);
              },
            },
          );
          // setBBoxClass(bbox);
          // this.bbox = 'foo';
          bboxClassRef.current = bbox;
        } else {
          bbox = bboxClassRef.current;
          console.log('using cached bbox', name, bbox);
          // bbox = bboxClass;
        }

        return bbox;

        // return {
        //   get left() {
        //     return left;
        //   },

        //   set left(left: number | undefined) {
        //     if (isNaN(left)) {
        //       throw new Error(`left is NaN`);
        //     }
        //     console.log('set left', left);
        //     setLeft(left);
        //     if (right !== undefined && left !== undefined) {
        //       setWidth(right - left);
        //     }
        //     if (left !== undefined && width !== undefined) {
        //       setRight(left + width);
        //     }
        //   },

        //   get top() {
        //     return top;
        //   },

        //   set top(top: number | undefined) {
        //     if (isNaN(top)) {
        //       throw new Error(`top is NaN`);
        //     }
        //     console.log('set top', top);
        //     setTop(top);
        //     if (bottom !== undefined && top !== undefined) {
        //       setHeight(bottom - top);
        //     }
        //     if (top !== undefined && height !== undefined) {
        //       setBottom(top + height);
        //     }
        //   },

        //   get right() {
        //     return right;
        //   },

        //   set right(right: number | undefined) {
        //     if (isNaN(right)) {
        //       throw new Error(`right is NaN`);
        //     }
        //     setRight(right);
        //     if (left !== undefined && right !== undefined) {
        //       setWidth(right - left);
        //     }
        //     if (right !== undefined && width !== undefined) {
        //       setLeft(right - width);
        //     }
        //   },

        //   get bottom() {
        //     return bottom;
        //   },

        //   set bottom(bottom: number | undefined) {
        //     if (isNaN(bottom)) {
        //       throw new Error(`bottom is NaN`);
        //     }
        //     setBottom(bottom);
        //     if (top !== undefined && bottom !== undefined) {
        //       setHeight(bottom - top);
        //     }
        //     if (bottom !== undefined && height !== undefined) {
        //       setTop(bottom - height);
        //     }
        //   },

        //   get width() {
        //     return width;
        //   },

        //   set width(width: number | undefined) {
        //     if (isNaN(width)) {
        //       throw new Error(`width is NaN`);
        //     }
        //     setWidth(width);
        //     if (left !== undefined && width !== undefined) {
        //       setRight(left + width);
        //     }
        //     if (right !== undefined && width !== undefined) {
        //       setLeft(right - width);
        //     }
        //   },

        //   get height() {
        //     return height;
        //   },

        //   set height(height: number | undefined) {
        //     if (isNaN(height)) {
        //       throw new Error(`height is NaN`);
        //     }

        //     setHeight(height);
        //     if (top !== undefined && height !== undefined) {
        //       setBottom(top + height);
        //     }
        //     if (bottom !== undefined && height !== undefined) {
        //       setTop(bottom - height);
        //     }
        //   },
        // };
      },
    }),
    [measure, childrenRef, setLeft, setTop, setRight, setBottom, setWidth, setHeight, name, bboxClassRef],
  );

  console.log(`returning bbox for ${name}`, { left, top, right, bottom, width, height });
  return {
    left: left,
    top: top,
    right: right,
    bottom: bottom,
    width: width,
    height: height,
    children: React.Children.map(children, (child, index) => {
      if (isValidElement(child)) {
        return React.cloneElement(child as React.ReactElement<any>, {
          // store a pointer to every child's ref in an array
          // also pass through outer refs
          // see: https://github.com/facebook/react/issues/8873
          ref: (node: any) => {
            childrenRef.current[index] = node;
            // console.log('setting child ref', index, node, node.name);
            if (node !== null && 'name' in node && node.name !== undefined) {
              console.log('setting ref', node.name, node);
              context.bfMap.set(node.name, node);
            }
            const { ref } = child as any;
            console.log('current ref on child', ref);
            if (typeof ref === 'function') ref(node);
            else if (ref) {
              ref.current = node;
            }
          },
        });
      } else {
        // TODO: what to do with non-elements?
        console.log('warning: non-element child', child);
        return child;
      }
    }),
  };
};

// a layout HOC
export const withBluefish = <ComponentProps,>(
  measure: Measure,
  WrappedComponent: React.ComponentType<ComponentProps & { $bbox?: Partial<NewBBox> }>,
) =>
  forwardRef(
    (props: PropsWithChildren<ComponentProps> /* & { $bbox?: Partial<NewBBox> } */ & { name?: any }, ref: any) => {
      const { left, top, bottom, right, width, height, children } = useBluefishLayout(
        measure,
        {
          // left: props.bbox?.left,
          // top: props.bbox?.top,
          // right: props.bbox?.right,
          // bottom: props.bbox?.bottom,
          // width: props.bbox?.width,
          // height: props.bbox?.height,
        },
        ref,
        props.children,
        props.name,
      );
      return (
        <WrappedComponent
          {...props}
          $bbox={{
            left,
            top,
            bottom,
            right,
            width,
            height,
          }}
        >
          {children}
        </WrappedComponent>
      );
    },
  );

export const withBluefishFn = <ComponentProps,>(
  measureFn: (props: ComponentProps & PropsWithChildren<{ $bbox?: Partial<NewBBox> }>) => Measure,
  WrappedComponent: React.ComponentType<ComponentProps & { $bbox?: Partial<NewBBox> }>,
) =>
  forwardRef((props: PropsWithChildren<ComponentProps> & { name?: any }, ref: any) => {
    const { left, top, bottom, right, width, height, children } = useBluefishLayout(
      measureFn(props),
      {
        // left: props.bbox?.left,
        // top: props.bbox?.top,
        // right: props.bbox?.right,
        // bottom: props.bbox?.bottom,
        // width: props.bbox?.width,
        // height: props.bbox?.height,
      },
      ref,
      props.children,
      props.name,
    );
    return (
      <WrappedComponent
        {...props}
        $bbox={{
          left,
          top,
          bottom,
          right,
          width,
          height,
        }}
      >
        {children}
      </WrappedComponent>
    );
  });

export const withBluefishFnWithContext = <ComponentProps,>(
  measureFn: (
    props: ComponentProps & PropsWithChildren<{ $bbox?: Partial<NewBBox> }>,
    context: BluefishContextValue,
  ) => Measure,
  WrappedComponent: React.ComponentType<ComponentProps & { $bbox?: Partial<NewBBox> }>,
) =>
  forwardRef((props: PropsWithChildren<ComponentProps> & { name?: any }, ref: any) => {
    const context = useContext(BluefishContext);
    const { left, top, bottom, right, width, height, children } = useBluefishLayout(
      measureFn(props, context),
      {
        // left: props.bbox?.left,
        // top: props.bbox?.top,
        // right: props.bbox?.right,
        // bottom: props.bbox?.bottom,
        // width: props.bbox?.width,
        // height: props.bbox?.height,
      },
      ref,
      props.children,
      props.name,
    );
    return (
      <WrappedComponent
        {...props}
        $bbox={{
          left,
          top,
          bottom,
          right,
          width,
          height,
        }}
      >
        {children}
      </WrappedComponent>
    );
  });

// a pure layout component builder
export const Layout = (measurePolicy: Measure) =>
  withBluefish(measurePolicy, (props: PropsWithChildren<{ $bbox?: Partial<NewBBox> }>) => {
    return <g transform={`translate(${props.$bbox?.left ?? 0}, ${props.$bbox?.top ?? 0})`}>{props.children}</g>;
  });

export const LayoutFn = <T,>(
  measurePolicyFn: (props: T & PropsWithChildren<{ $bbox?: Partial<NewBBox> }>) => Measure,
) =>
  withBluefishFn(measurePolicyFn, (props: PropsWithChildren<{ $bbox?: Partial<NewBBox> }>) => {
    return <g transform={`translate(${props.$bbox?.left ?? 0}, ${props.$bbox?.top ?? 0})`}>{props.children}</g>;
  });

// TODO: this HOC doesn't work :/
export const withBluefishComponent = <ComponentProps,>(
  WrappedComponent: React.ComponentType<ComponentProps & BBoxWithChildren>,
) =>
  forwardRef((props: ComponentProps & BBoxWithChildren, ref: any) => {
    return (
      <WrappedComponent {...props}>
        {React.Children.map(props.children, (child, index) => {
          if (isValidElement(child)) {
            return React.cloneElement(child as React.ReactElement<any>, {
              ref,
              // store a pointer to every child's ref in an array
              // also pass through outer refs
              // see: https://github.com/facebook/react/issues/8873
              // ref: (node: any) => {
              //   childrenRef.current[index] = node;
              //   const { ref } = child as any;
              //   if (typeof ref === 'function') ref(node);
              //   else if (ref) ref.current = node;
              // },
            });
          } else {
            // TODO: what to do with non-elements?
            console.log('warning: non-element child', child);
            return child;
          }
        })}
      </WrappedComponent>
    );
  });

export type BluefishContextValue = {
  bfMap: Map<any, React.MutableRefObject<any>>;
  setBFMap: React.Dispatch<React.SetStateAction<Map<any, any>>>;
};

export const BluefishContext = React.createContext<BluefishContextValue>({
  bfMap: new Map(),
  setBFMap: () => {},
});
export const useBluefishContext = () => useContext(BluefishContext);

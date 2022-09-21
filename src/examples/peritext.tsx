import { forwardRef, useEffect, useId, useRef, useState } from 'react';
import { Col } from '../components/Col';
import { Rect } from '../components/Rect';
import { Text } from '../components/Text';
import { Row } from '../components/Row';
import { SVG } from '../components/SVG';
import { Align } from '../components/Align';
import {
  BBoxWithChildren,
  Measure,
  useBluefishLayout,
  withBluefish,
  withBluefishComponent,
  useBluefishContext,
} from '../bluefish';
import { Ref } from '../components/Ref';
import { Group } from '../components/Group';
import { Line } from '../components/Line';
import { Arrow } from '../components/Arrow';

export type CharProps = {
  value: string;
  opId: string;
  deleted: boolean;
  marks: ('italic' | 'bold')[];
};

export const Char = forwardRef(({ value, marks, opId }: CharProps, ref: any) => {
  const tile = useRef(null);
  const leftHandle = useRef(null);
  const rightHandle = useRef(null);
  const letter = useRef(null);
  const opIdLabel = useRef(null);

  return (
    <Group ref={ref} name={opId} x={50}>
      <Rect ref={tile} height={65} width={50} rx={5} fill={'#eee'} />
      <Rect ref={leftHandle} height={30} width={10} fill={'#fff'} rx={5} stroke={'#ddd'} />
      <Rect ref={rightHandle} height={30} width={10} fill={'#fff'} rx={5} stroke={'#ddd'} />
      <Text
        ref={letter}
        contents={value === ' ' ? '␣' : value.toString()}
        fontSize={'30px'}
        fontWeight={marks.includes('bold') ? 'bold' : 'normal'}
        fontStyle={marks.includes('italic') ? 'italic' : 'normal'}
      />
      <Text ref={opIdLabel} contents={opId} fontSize={'12px'} fill={'#999'} />
      <Align center>
        <Ref to={tile} />
        <Ref to={letter} />
      </Align>
      <Align top>
        <Ref to={tile} />
        <Ref to={opIdLabel} />
      </Align>
      <Align left to={'center'}>
        <Ref to={tile} />
        <Ref to={leftHandle} />
      </Align>
      <Align right to={'center'}>
        <Ref to={tile} />
        <Ref to={rightHandle} />
      </Align>
    </Group>
  );
});

export type MarkOpProps = {
  action: string;
  markType: string;
  backgroundColor: string;
  borderColor: string;
  opId: string;
  start: { opId: string };
  end: { opId: string };
};

export const MarkOp: React.FC<MarkOpProps> = forwardRef(
  ({ action, markType, backgroundColor, borderColor, start, end, opId }, ref: any) => {
    const rectRef = useRef(null);
    const textRef = useRef(null);

    const context = useBluefishContext();

    const startRef = context.bfMap.get(start.opId);
    const endRef = context.bfMap.get(end.opId);

    return (
      <Group ref={ref} name={opId}>
        {/* TODO: remove width */}
        <Rect ref={rectRef} fill={backgroundColor} stroke={borderColor} rx={5} width={50} height={20} />
        <Text ref={textRef} contents={`${action} ${markType}`} />
        {/* TODO: starting to think the naming is backwards. currently second arg to align mutates, but first doesn't.
            maybe I should flip them?
          Rationale: Read it as "align first to second," which implies that the first is mutated. */}
        <Align left>
          <Ref to={startRef} />
          <Ref to={rectRef} />
        </Align>
        <Arrow from={startRef} to={rectRef} />
        <Align right>
          <Ref to={endRef} />
          <Ref to={rectRef} />
        </Align>
        <Arrow from={rectRef} to={endRef} />
        <Align center>
          <Ref to={rectRef} />
          <Ref to={textRef} />
        </Align>
      </Group>

      // proposed API:
      // <Group rels={({ rect, text }) => (<>
      //   <Align left>
      //       <Ref to={startRef} />
      //       {rect}
      //     </Align>
      //     <Align right>
      //       <Ref to={endRef} />
      //       {rect}
      //     </Align>
      //     <Align center>
      //       {rect}
      //       {text}
      //     </Align>
      //   </>)}>
      //   {/* TODO: remove width */}
      //   <Rect name={'rect'} fill={backgroundColor} stroke={borderColor} rx={5} width={50} height={20} />
      //   <Text name={'text'} contents={`${action} ${markType}`} />
      // </Group>

      <Group ref={ref} name={opId}>
        {/* TODO: remove width */}
        <Rect ref={rectRef} fill={backgroundColor} stroke={borderColor} rx={5} width={50} height={20} />
        <Text ref={textRef} contents={`${action} ${markType}`} />
        {/* TODO: starting to think the naming is backwards. currently second arg to align mutates, but first doesn't.
            maybe I should flip them?
          Rationale: Read it as "align first to second," which implies that the first is mutated. */}
        <Align left>
          <Ref to={rectRef} />
          <Ref to={startRef} />
        </Align>
        <Arrow from={startRef} to={rectRef} />
        <Align right>
          <Ref to={rectRef} />
          <Ref to={endRef} />
        </Align>
        <Arrow from={rectRef} to={endRef} />
        <Align center>
          <Ref to={textRef} />
          <Ref to={rectRef} />
        </Align>
      </Group>
    );
  },
);

export type PeritextProps = {
  chars: CharProps[];
  markOps: MarkOpProps[];
};

export const Peritext: React.FC<PeritextProps> = ({ chars, markOps }) => {
  const charsRef = useRef(null);
  const markOpsRef = useRef(null);

  const context = useBluefishContext();

  return (
    <SVG width={1000} height={500}>
      {/* chars */}
      {/* BUG: the spacing is 5 points smaller than the specification */}
      <Row ref={charsRef} spacing={15} alignment={'middle'}>
        {chars.map((char) => (
          <Char {...char} />
        ))}
      </Row>
      {/* markOps */}
      {/* TODO: need to loosen alignment here or even just switch to a spacing component... */}
      {/* <Col ref={markOpsRef} spacing={8} alignment={'center'}> */}
      <Group ref={markOpsRef}>
        {markOps.map((markOp) => (
          <MarkOp {...markOp} />
        ))}
      </Group>
      {/* </Col> */}
      {/* <Col spacing={10} alignment={'center'}>
        <Ref to={charsRef} />
        <Ref to={markOpsRef} />
      </Col> */}
    </SVG>
  );
};

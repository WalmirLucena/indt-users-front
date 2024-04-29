import React, { useMemo } from 'react';
import * as d3 from 'd3';
import { User } from '../../../services/types';

const MARGIN = { top: 30, right: 30, bottom: 30, left: 30 };
const BAR_PADDING = 0.3;

type BarplotProps = {
  width: number;
  height: number;
  data: User[];
};

export const Barplot = ({ width, height, data }: BarplotProps) => {
  const boundsWidth = width - MARGIN.right - MARGIN.left;
  const boundsHeight = height - MARGIN.top - MARGIN.bottom;

  function dataStatus(database: User[]) {
    let nullCount = 0;
    let dateCount = 0;

    database.forEach((item) => {
      if (item.deleted === null) {
        nullCount += 1;
      } else {
        dateCount += 1;
      }
    });

    return [
      { deleted: 'Usuários Ativos', value: nullCount },
      { deleted: 'Usuários Inativos', value: dateCount },
    ];
  }
  const finalData = dataStatus(data);

  const groups = finalData.sort((a, b) => b.value - a.value).map((d) => d.deleted);
  const yScale = useMemo(
    () => d3.scaleBand().domain(groups).range([0, boundsHeight]).padding(BAR_PADDING),
    [finalData, height]
  );

  const xScale = useMemo(() => {
    const [min, max] = d3.extent(finalData.map((d) => d.value));
    return d3
      .scaleLinear()
      .domain([0, max || 10])
      .range([0, boundsWidth]);
  }, [finalData, width]);

  const allShapes = finalData.map((d, i) => {
    const y = yScale(d.deleted);
    if (y === undefined) {
      return null;
    }

    return (
      <g key={i}>
        <rect
          x={xScale(0)}
          y={yScale(d.deleted)}
          width={xScale(d.value)}
          height={yScale.bandwidth()}
          opacity={0.7}
          stroke="#9d174d"
          fill="#9d174d"
          fillOpacity={0.3}
          strokeWidth={1}
          rx={1}
        />
        <text
          x={xScale(d.value) - 7}
          y={y + yScale.bandwidth() / 2}
          textAnchor="end"
          alignmentBaseline="central"
          fontSize={12}
          opacity={xScale(d.value) > 90 ? 1 : 0}
        >
          {d.value}
        </text>
        <text
          x={xScale(0) + 7}
          y={y + yScale.bandwidth() / 2}
          textAnchor="start"
          alignmentBaseline="central"
          fontSize={12}
        >
          {d.deleted}
        </text>
      </g>
    );
  });

  const grid = xScale
    .ticks(5)
    .slice(1)
    .map((value, i) => (
      <g key={i}>
        <line x1={xScale(value)} x2={xScale(value)} y1={0} y2={boundsHeight} stroke="#808080" opacity={0.2} />
        <text
          x={xScale(value)}
          y={boundsHeight + 10}
          textAnchor="middle"
          alignmentBaseline="central"
          fontSize={9}
          stroke="#808080"
          opacity={0.8}
        >
          {value}
        </text>
      </g>
    ));

  return (
    <div>
      <svg width={width} height={height}>
        <g width={boundsWidth} height={boundsHeight} transform={`translate(${[MARGIN.left, MARGIN.top].join(',')})`}>
          {grid}
          {allShapes}
        </g>
      </svg>
    </div>
  );
};

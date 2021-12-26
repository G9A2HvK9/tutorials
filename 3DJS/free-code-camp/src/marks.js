import { curveNatural, line } from "d3";

export const Marks = ({
    data,
    xScale,
    yScale,
    xValue,
    yValue,
    toolTipFormat,
    circleRadius
}) => (
    <g className="marks">
        <path 
            fill = 'none'
            stroke = 'black'
            d={line()
            .x(d => xScale(xValue(d)))
            .y( d => yScale(yValue(d)))
            .curve(curveNatural)(data)}
            />
        {/* {data.map(d => (
            <circle
                className="mark"
                cx={xScale(xValue(d))}
                cy={yScale(yValue(d))}
                r={circleRadius}
            >
                <title>{toolTipFormat(xValue(d))}</title>
            </circle>
        ))}; */}
    </g>
);
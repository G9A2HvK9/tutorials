
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
        {data.map(d => (
            <circle
                className="mark"
                cx={xScale(xValue(d))}
                cy={yScale(yValue(d))}
                r={circleRadius}
            >
                <title>{toolTipFormat(xValue(d))}</title>
            </circle>
        ))};
    </g>
);
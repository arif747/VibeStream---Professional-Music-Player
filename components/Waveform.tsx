
import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

interface WaveformProps {
  isPlaying: boolean;
  currentTime: number;
}

const Waveform: React.FC<WaveformProps> = ({ isPlaying, currentTime }) => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const width = 120;
    const height = 40;
    const barPadding = 2;
    const barCount = 30;
    const barWidth = width / barCount - barPadding;

    const data = Array.from({ length: barCount }, () => Math.random());

    svg.attr('width', width).attr('height', height);

    const bars = svg.selectAll('rect')
      .data(data)
      .enter()
      .append('rect')
      .attr('x', (d, i) => i * (barWidth + barPadding))
      .attr('width', barWidth)
      .attr('fill', '#10b981')
      .attr('rx', 2);

    const animate = () => {
      if (!isPlaying) return;
      bars.transition()
        .duration(300)
        .attr('height', () => Math.random() * height)
        .attr('y', function() {
           const h = parseFloat(d3.select(this).attr('height'));
           return (height - h) / 2;
        })
        .on('end', animate);
    };

    if (isPlaying) {
      animate();
    } else {
      bars.attr('height', height / 3)
          .attr('y', height / 3);
    }

    return () => {
      bars.interrupt();
    };
  }, [isPlaying]);

  return <svg ref={svgRef} className="opacity-60"></svg>;
};

export default Waveform;

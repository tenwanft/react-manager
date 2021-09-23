import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { data } from '../../api/mock/g6Data.js';
import G6 from '@antv/g6';


export default  function Charts() {

    const ref = React.useRef(null);
    let graph = null;
    const height = ReactDOM.findDOMNode(ref.current)?ReactDOM.findDOMNode(ref.current).scrollHeight : 400;
    useEffect(() => {
        const container = ReactDOM.findDOMNode(ref.current)
        const width = container.scrollWidth;
        const height = container.scrollHeight || 400;
        if (!graph) {
            graph = new G6.Graph({
                container: container,
                // width,
                // height,
                // fitView:true,
                modes: {
                    default: ['zoom-canvas', 'drag-canvas', 'drag-node'],
                },
                layout: {
                    type: 'forceAtlas2',
                    preventOverlap: true,
                    kr: 10,
                    center: [250, 250],
                },
                defaultNode: {
                    size: 20,
                },
            });
        }
        if(data){
            data.nodes.forEach(node => {
                node.x = Math.random() * 1;
            });
            graph.on('afterlayout', e => {
                graph.fitView()
            })
            graph.data(data);
            graph.render();
        }

        if (typeof window !== 'undefined')
            window.onresize = () => {
                if (!graph || graph.get('destroyed')) return;
                if (!container || !container.scrollWidth || !container.scrollHeight) return;
                graph.changeSize(container.scrollWidth, container.scrollHeight);
            };
    }, []);

    return <div ref={ref} style={{width:'86%',height:height}}></div>;
}
